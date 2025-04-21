from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import logging
import sys
import os
from importnb import Notebook
import pandas as pd
from pathlib import Path
import importlib.util
from flask import Flask, jsonify
import plotly.express as px
import json
from sklearn.decomposition import PCA
import numpy as np
import plotly.graph_objects as go

# Disbale flask cors default logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

# Import ontology result notebook
sys.path.append(os.path.abspath('../notebooks'))
with Notebook():
    import Ontology_PCA_SC_v3_cleaned as OPCA # type: ignore # this points to our ipynb file

# Initialise flask to await for frontend requests
app = Flask(__name__)
CORS(app)


## APP ROUTES

# returns a dummy biplot graph
@app.route("/plot/biplot/dummy")
def get_plot_dummy_data():
    fig = px.line(x=[1, 2, 3], y=[4, 5, 6], title="My Plotly Line Chart")
    return jsonify(json.loads(fig.to_json()))

# returns Vinanti's first graph
@app.route("/plot/scree/1")
def get_plot_data_1():
    results = OPCA.query_esg_observations(
        industry="biotechnology_pharmaceuticals",
        year="2020",
        pillar_filter="g_opportunity",
        metric_filter="supply_chain_management"
    )

    records = OPCA.parse_esg_results(results)
    pivot_df = OPCA.prepare_pivot_table(records, model_name='supply_chain_management_model', missing_threshold=0.9)
    pca, scores, imputed_df = OPCA.pca_workflow(pivot_df)
    
    print(pca)

    # just return dummy for now
    fig = px.line(x=[1, 2, 3], y=[4, 5, 6], title="My Plotly Line Chart")
    return jsonify(json.loads(fig.to_json()))
    # return jsonify(json.loads(fig.to_json()))

# return dummy scree plot
@app.route('/plot/scree/dummy')
def scree_plot():
    # Simulate PCA data
    X = np.random.rand(100, 5)
    pca = PCA()
    pca.fit(X)

    explained_variance = pca.explained_variance_ratio_
    cumulative_variance = np.cumsum(explained_variance)
    components = [f"PC{i+1}" for i in range(len(explained_variance))]

    # Build the Plotly figure
    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=components,
        y=explained_variance,
        name='Explained Variance'
    ))
    fig.add_trace(go.Scatter(
        x=components,
        y=cumulative_variance,
        mode='lines+markers',
        name='Cumulative Variance'
    ))

    fig.update_layout(
        title='Scree Plot',
        xaxis_title='Principal Components',
        yaxis_title='Explained Variance Ratio',
        template='plotly_white'
    )

    # Return figure JSON
    return jsonify(json.loads(fig.to_json()))

# returns the top 5 categories, determined by ontology enhanced PCA analysis
@app.route('/top_5', methods=['GET'])
def get_top_5():

    results = OPCA.query_esg_observations(
        industry="biotechnology_pharmaceuticals",
        year="2020",
        pillar_filter="g_opportunity",
        metric_filter="supply_chain_management"
    )

    records = OPCA.parse_esg_results(results)
    pivot_df = OPCA.prepare_pivot_table(records, model_name='supply_chain_management_model', missing_threshold=0.9)
    pca, scores, imputed_df = OPCA.pca_workflow(pivot_df)
    top_loadings = OPCA.get_top_pca_loadings(pca, imputed_df, top_n=10)
    top_metrics = OPCA.get_top_metric_categories(top_loadings, top_n=5, as_percent=True)

    # return result
    m_array = top_metrics["metric"].tolist()
    p_array = top_metrics["importance_percent"].tolist()
    new_combined = list(zip(m_array, p_array))
    return jsonify(new_combined)

@app.route('/data/<string:category>', methods=['GET'])
def get_subcategories(category):
    df = pd.read_csv("../Normalized_Data/semiconductors_sasb_final.csv")

    # 'Amlogic Shanghai Co Ltd' - 5068926914

    # select query
    company_df = df[df["company_name"] == 'Amlogic Shanghai Co Ltd']
    category_df = company_df[company_df["pillar"] == category]
    sorted_df = category_df.sort_values(category_df.columns[10], ascending = True)
    unique_subcategory_df = sorted_df["metric"].unique()

    # return result
    n_array = unique_subcategory_df.tolist()
    return jsonify(n_array)

@app.route('/data/all', methods=['GET'])
def get_all_subcategories():
    df = pd.read_csv("../Normalized_Data/semiconductors_sasb_final.csv")

    # 'Amlogic Shanghai Co Ltd' - 5068926914

    # select query
    company_df = df[df["company_name"] == 'Amlogic Shanghai Co Ltd']
    
    sorted_df = company_df.sort_values(company_df.columns[10], ascending = True)
    unique_subcategory_df = sorted_df["metric"].unique()

    # return result
    n_array = unique_subcategory_df.tolist()
    return jsonify(n_array)

@app.route('/data/<string:category>/<string:subcategory>/models', methods=['GET'])
def get_models(category, subcategory):
    df = pd.read_csv("../Normalized_Data/semiconductors_sasb_final.csv")

    # select query
    company_df = df[df["company_name"] == 'Amlogic Shanghai Co Ltd']
    df_category = company_df[company_df["pillar"] == category]
    df_subcategory = df_category[df_category["metric"] == subcategory]
    sorted_df = df_subcategory.sort_values(df_subcategory.columns[-1], ascending = True)

    # return result
    unique_metric_df = sorted_df["metric"].unique()
    n_array = unique_metric_df.tolist()
    return jsonify(n_array)

@app.route('/data/<string:category>/<string:subcategory>/<string:model>/metrics', methods=['GET'])
def get_metrics(category, subcategory, model):
    df = pd.read_csv("../Normalized_Data/semiconductors_sasb_final.csv")

    # select query
    df_category = df[df["pillar"] == category]
    df_subcategory = df_category[df_category["metric"] == subcategory]
    df_model = df_subcategory[df_subcategory["category"] == model]
    sorted_df = df_model.sort_values(df_model.columns[5], ascending = True)

    metric_df = sorted_df["category"].unique()
    value_df = sorted_df["metric_value"].unique()

    # return result
    m_array = metric_df.tolist()
    v_array = value_df.tolist()
    combined = list(zip(m_array, v_array))
    return jsonify(combined)

# Run server app
if __name__ == '__main__':
    app.run(port=3902, debug=True)