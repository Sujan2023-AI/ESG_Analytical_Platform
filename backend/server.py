from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import logging
import os
from importnb import Notebook
import pandas as pd
from flask import Flask, jsonify
import json
from sklearn.decomposition import PCA
import numpy as np
import plotly.graph_objects as go
import math

# Disbale flask cors default logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

# Import ontology result notebook
with Notebook():
    import Ontology_PCA as OPCA # type: ignore # this points to our ipynb file
    import Traditional_PCA as TPCA # type: ignore # this points to our ipynb file

# Initialise flask to await for frontend requests
app = Flask(__name__)
CORS(app)


## API DATA ROUTES

# Returns list of metrics from data file using parameters as filters
@app.route('/metrics/<string:industry>/<string:company>/<int:year>/<string:pillar>', methods=['GET'])
def get_metrics(industry, company, year, pillar):
    print("call made to GET/metrics/<string:industry>/<string:company>/<int:year>/<string:pillar>")
    df = pd.read_csv(get_file(industry))
    df = filter(df, company, year, pillar)
    df = df.sort_values(df.columns[0], ascending = True)
    nda = df["metric"].unique()
    return jsonify(nda.tolist())

# Returns list of models from data file using parameters as filters
@app.route('/models/<string:industry>/<string:company>/<int:year>/<string:pillar>/<string:metric>', methods=['GET'])
def get_models(industry, company, year, pillar, metric):
    print("call made to GET/models/<string:industry>/<string:company>/<int:year>/<string:pillar>/<string:metric>")
    df = pd.read_csv(get_file(industry))
    df = filter(df, company, year, pillar, metric)
    df = df.sort_values(df.columns[0], ascending = True)
    nda = df["model"].unique()
    return jsonify(nda.tolist())

# Returns list of categories from data file using parameters as filters
@app.route('/categories/<string:industry>/<string:company>/<int:year>/<string:pillar>/<string:metric>/<string:model>', methods=['GET'])
def get_categories(industry, company, year, pillar, metric, model):
    print('call made to GET/categories/<string:industry>/<string:company>/<int:year>/<string:pillar>/<string:metric>/<string:model>')
    df = pd.read_csv(get_file(industry))
    df = filter(df, company, year, pillar, metric, model)
    df = df.sort_values(df.columns[0], ascending = True)
    nda_c = df["category"].unique()
    nda_v = df["metric_value"].unique()
    return jsonify(list(zip(nda_c.tolist(), nda_v.tolist()))) # zips the iterative tuple of both into a jsonified list

# Returns list of all metrics from data file
@app.route('/metrics/<string:industry>/<string:company>/<int:year>', methods=['GET'])
def get_metrics_all(industry, company, year):
    print('call made to GET/metrics/<string:industry>/<string:company>/<int:year>')
    df = pd.read_csv(get_file(industry))
    df = filter(df, company, year)
    df = df.sort_values(df.columns[10], ascending = True)
    nda = df["metric"].unique()
    return jsonify(nda.tolist())

# Returns ontology scree graph from ontology enhanced pca analysis notebook
@app.route("/ontology/scree/<string:industry>/<int:year>/<string:pillar>/<string:model>/<string:metric>", methods=['GET'])
def get_ontology_scree(industry, year, pillar, model, metric):
    print("call made to /ontology/scree/<string:industry>/<int:y${tesear>/<string:pillar>/<string:model>/<string:metric>")

    # Adjust industry name to match the backend
    newIndustry = industry.lower()
    if (newIndustry == "biotechnology & pharmaceuticals"):
        newIndustry = "biotechnology_pharmaceuticals"

    # Query traditional pca initial function from Ontology_PCA.py
    results = OPCA.query_esg_observations(
        industry=newIndustry,
        year=year,
        pillar_filter=pillar.lower(),
        metric_filter=metric.lower()
    )

    # Refine traditional pca with functions from Ontology_PCA.py
    records = OPCA.parse_esg_results(results)
    pivot_df = OPCA.prepare_pivot_table(records, model_name=model.lower())
    pca, scores, imputed_df = OPCA.pca_workflow(pivot_df)
    explained_variance = pca.explained_variance_ratio_
    cumulative_variance = np.cumsum(explained_variance)
    components = [f"PC{i+1}" for i in range(len(explained_variance))]
    threshold = 0.7
    threshold_text = f"{int(threshold * 100)}% Threshold"

    # Create graph figure object
    fig = go.Figure()

    # Graph explained variance bar chart
    fig.add_trace(go.Scatter(x=components, y=explained_variance, mode='lines+markers', name='Explained Variance', marker=dict(color='rgba(55, 128, 191, 0.7)')))

    # Graph cumulative variance line plot
    fig.add_trace(go.Scatter(x=components, y=cumulative_variance, mode='lines+markers', name='Cumulative Variance', line=dict(color='rgba(255, 100, 102, 0.7)')))

    # Graph horizontal threshold line
    fig.add_shape(type='line', x0=0, x1=len(components) - 1, y0=threshold, y1=threshold, line=dict(color='red', dash='dash'))
    fig.add_annotation(x=components, y=threshold, text=threshold_text, ax=15, ay=-15)
    fig.update_layout(legend=dict(x=1.05, y=1.05, traceorder='normal', bgcolor='rgba(0,0,0,0)', bordercolor='Black', borderwidth=1), margin=dict(r=100))

    # Graph layout
    fig.update_layout(title="PCA Explained Variance", xaxis_title="Principle Components", yaxis_title="Variance Ratio", template='plotly_white', legend=dict(x=0.01, y=0.99), margin=dict(t=60, b=40, l=50, r=20))

    # Return figure JSON
    return jsonify(json.loads(fig.to_json()))

# Returns ontology loading value table from ontology enhanced pca analysis notebook
@app.route('/ontology/table/<string:industry>/<int:year>/<string:pillar>/<string:model>/<string:metric>', methods=['GET'])
def get_ontology_table(industry, year, pillar, model, metric):
    print("call made to GET/ontology/table/<string:industry>/<int:year>/<string:pillar>/<string:model>/<string:metric>")

    # Adjust industry name to match backend
    newIndustry = industry.lower()
    if (newIndustry == "biotechnology & pharmaceuticals"):
        newIndustry = "biotechnology_pharmaceuticals"

    # Query initial PCA results from ontology notebook
    results = OPCA.query_esg_observations(
        industry=newIndustry,
        year=year,
        pillar_filter=pillar.lower(),
        metric_filter=metric.lower()
    )

    # Refine PCA results using functions from ontology notebook
    records = OPCA.parse_esg_results(results)
    pivot_df = OPCA.prepare_pivot_table(records, model_name=model.lower())
    pca, scores, imputed_df = OPCA.pca_workflow(pivot_df)
    top_loadings = OPCA.get_top_pca_loadings(pca, imputed_df)
    top_metrics = OPCA.get_top_metric_categories(top_loadings)

    # Format and return results in JSON
    m_array = top_metrics["metric"].tolist()
    p_array = top_metrics["importance_percent"].tolist()
    new_combined = list(zip(m_array, p_array))
    return jsonify(new_combined)

# Returns traditional scree graph using queries from the traditional PCA notebook
@app.route('/traditional/scree/<string:industry>/<int:year>', methods=['GET'])
def get_traditional_scree(industry, year):
    print("call made to /traditional/scree/<string:industry>/<int:year>")

    # Adjust industry to match the backend
    newIndustry = industry.lower()
    if (newIndustry == "biotechnology & pharmaceuticals"):
        newIndustry = "biotechnology_pharmaceuticals"

    # Query pca functions from Traditional_PCA.py
    filtered_df = TPCA.load_and_filter_esg_data(get_file(newIndustry, "traditional"), year)
    pivot_df_clean = TPCA.pivot_and_impute_esg_data(filtered_df)
    pca_model, pca_df, scaled_data = TPCA.perform_pca_on_esg_data(pivot_df_clean)
    pca_full = PCA()
    pca_full.fit(scaled_data)
    explained_variance = pca_full.explained_variance_ratio_
    cumulative_variance = np.cumsum(explained_variance)
    components = [f"PC{i+1}" for i in range(len(explained_variance))]

    # Graph build the plotly figure
    fig = go.Figure()

    # Grpah explained variance bar chart
    fig.add_trace(go.Scatter(x=components, y=explained_variance, mode='lines+markers', name='Explained Variance', marker=dict(color='rgba(55, 128, 191, 0.7)')))

    # Graph cumulative variance line plot
    fig.add_trace(go.Scatter(x=components, y=cumulative_variance, mode='lines+markers', name='Cumulative Variance', line=dict(color='rgba(255, 100, 102, 0.7)')))

    # Graph update layout
    fig.update_layout(legend=dict(x=1.05, y=1.05, traceorder='normal', bgcolor='rgba(0,0,0,0)', bordercolor='Black', borderwidth=1), margin=dict(r=100))
    fig.update_layout(title="PCA Explained Variance", xaxis_title="Principle Components", yaxis_title="Variance Ratio", template='plotly_white', legend=dict(x=0.01, y=0.99), margin=dict(t=60, b=40, l=50, r=20))

    # Return figure JSON
    return jsonify(json.loads(fig.to_json()))

# Returns traditional loading value table from traditional pca analysis notebook
@app.route('/traditional/table/<string:pc>/<string:industry>/<int:year>', methods=['GET'])
def get_traditional_table(industry, pc, year):
    print("call made to /traditional/table/<string:pca>/<string:industry>/<int:year>")

    # Adjust input parametres to match the backend
    newIndustry = industry.lower()
    if (newIndustry == "biotechnology & pharmaceuticals"):
        newIndustry = "biotechnology_pharmaceuticals"

    # Get data file
    file_path = get_file(newIndustry, "traditional")
    
    # Call traditional PCA setup functions from Ontology_PCA.py
    filtered_df = TPCA.load_and_filter_esg_data(file_path, year)
    pivot_df_clean = TPCA.pivot_and_impute_esg_data(filtered_df)
    pca_model, pca_df, scaled_data = TPCA.perform_pca_on_esg_data(pivot_df_clean)
    loadings_df, top_pc1, top_pc2 = TPCA.analyze_pca_loadings(pca_model, pivot_df_clean)

    # Pull correct pc level values
    if (pc == "pc2"):
        m_array = top_pc2["Metric Name"]
        p_array = top_pc2["Loading Value"]
    else:
        m_array = top_pc1["Metric Name"]
        p_array = top_pc1["Loading Value"]

    # Reformat output and return data JSON
    rounded = [math.floor(x * 1000) / 1000 for x in p_array]
    new_combined = list(zip(m_array, rounded))
    return jsonify(new_combined)



## API DATA HELPERS

# returns name of the backend data file being used
def get_file(industry, type="model"):
    file_name = ""
    if (type == "model"):
        if (industry == "biotechnology_pharmaceuticals"):
            file_name = "data/biopharma_model_frontend.csv"
        else:
            file_name = "data/semiconductors_model_frontend.csv"
    if (type == "traditional"):
        if (industry == "biotechnology_pharmaceuticals"):
            file_name = "data/biopharma_traditional_frontend.csv"
        else:
            file_name = "data/semiconductors_traditional_frontend.csv"

    # return full file path
    current_folder = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_folder, file_name)
    return csv_path

# filters the given data frame by the backend column name
def filter_by_company(df, company):
    return df[df["company_name"] == company]
def filter_by_year(df, year):
    return df[df["year"] == int(year)]
def filter_by_pillar(df, pillar):
    return df[df["pillar"] == pillar]
def filter_by_metric(df, metric):
    return df[df["metric"] == metric]
def filter_by_model(df, model):
    return df[df["model"] == model]
def filter_by_category(df, category):
    return df[df["category"] == category]

# filters data frame by as many parametres as it's given
def filter(df, company="", year="", pillar="", metric="", model="", category=""):
    if (company != ""):
        df = filter_by_company(df, company)
    if (year != ""):
        df = filter_by_year(df, year)
    if (pillar != ""):
        df = filter_by_pillar(df, pillar)
    if (metric != ""):
        df = filter_by_metric(df, metric)
    if (model != ""):
        df = filter_by_model(df, model)
    if (category != ""):
        df = filter_by_category(df, category)
    return df   



## START THE APP

# Run server app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3902, debug=True)