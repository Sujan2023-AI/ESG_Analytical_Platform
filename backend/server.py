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
sys.path.append(os.path.abspath('./data/'))
with Notebook():
    import Ontology_PCA as OPCA # type: ignore # this points to our ipynb file

# Initialise flask to await for frontend requests
app = Flask(__name__)
CORS(app)


## STAT APP ROUTES

# returns a dummy biplot graph
@app.route("/plot/biplot/dummy")
def get_plot_dummy_data():
    fig = px.line(x=[1, 2, 3], y=[4, 5, 6], title="My Plotly Line Chart")
    return jsonify(json.loads(fig.to_json()))

# @app.route("/plot/scree/image")
# def get_plot_data_image():

#     results = OPCA.query_esg_observations(
#         industry="semiconductors",
#         year="2022",
#         pillar_filter="e_risk",
#         metric_filter="ghg_emissions"
#     )
 
#     records = OPCA.parse_esg_results(results)
#     pivot_df = OPCA.prepare_pivot_table(records, model_name='ghg_emissions_model', missing_threshold=0.7)
#     pca, scores, imputed_df = OPCA.pca_workflow(pivot_df)
 
#     img_buf = OPCA.plot_scree_image(pca)
#     return OPCA.send_file(img_buf, mimetype='image/png')

# returns Vinanti's first graph
@app.route("/plot/scree/1")
def get_plot_data_1():
    title_graph = "PCA Explained Variance"
    title_x = "Principle Components"
    title_y = "Variance Ratio"
    results = OPCA.query_esg_observations(
        industry="semiconductors",
        year="2022",
        pillar_filter="e_risk",
        metric_filter="ghg_emissions"
    )

    records = OPCA.parse_esg_results(results)
    pivot_df = OPCA.prepare_pivot_table(records, model_name="ghg_emissions_model")
    pca, scores, imputed_df = OPCA.pca_workflow(pivot_df)

    explained_variance = pca.explained_variance_ratio_
    cumulative_variance = np.cumsum(explained_variance)
    components = [f"PC{i+1}" for i in range(len(explained_variance))]
    threshold = 0.7
    threshold_text = f"{int(threshold * 100)}% Threshold"
 
    # Build the Plotly figure
    fig = go.Figure()
 
    # Explained variance bar chart
    fig.add_trace(go.Scatter(
        x=components,
        y=explained_variance,
        mode='lines+markers',
        name='Explained Variance',
        marker=dict(color='rgba(55, 128, 191, 0.7)')
    ))
 
    # Cumulative variance line plot
    fig.add_trace(go.Scatter(
        x=components,
        y=cumulative_variance,
        mode='lines+markers',
        name='Cumulative Variance',
        line=dict(color='rgba(255, 100, 102, 0.7)')
    ))
 
    # Add horizontal threshold line
    fig.add_shape(
        type='line',
        x0=0,
        x1=len(components) - 1,
        y0=threshold,
        y1=threshold,
        line=dict(color='red', dash='dash')
    )
 
    fig.add_annotation(
        x=components,
        y=threshold,
        text=threshold_text,


        ax=15,
        ay=-15
    )
    fig.update_layout(
        legend=dict(
            x=1.05,          # move legend outside to the right
            y=1.05,             # align legend top with the plot
            traceorder='normal',
            bgcolor='rgba(0,0,0,0)',  # transparent background
            bordercolor='Black',
            borderwidth=1
        ),
        margin=dict(r=100),  # add space on the right
    )
 
    # Layout
    fig.update_layout(
        title=title_graph,
        xaxis_title=title_x,
        yaxis_title=title_y,
        template='plotly_white',
        legend=dict(x=0.01, y=0.99),
        margin=dict(t=60, b=40, l=50, r=20)
    )
 
    # Return figure JSON
    return jsonify(json.loads(fig.to_json()))

# return dummy scree plot
@app.route('/plot/scree/dummy')
def scree_plot():
    title_graph = "this is a grapH!"
    title_x = "this is a X axis title"
    title_y = "this is a Y axis title"
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
        title=title_graph,
        xaxis_title=title_x,
        yaxis_title=title_y,
        template='plotly_white'
    )

    # Return figure JSON
    return jsonify(json.loads(fig.to_json()))

# returns the top 5 categories, determined by ontology enhanced PCA analysis
@app.route('/top_5', methods=['GET'])
def get_top_5():

    results = OPCA.query_esg_observations(
        industry="semiconductors",
        year="2022",
        pillar_filter="e_risk",
        metric_filter="ghg_emissions"
    )

    records = OPCA.parse_esg_results(results)
    pivot_df = OPCA.prepare_pivot_table(records, model_name="ghg_emissions_model")
    pca, scores, imputed_df = OPCA.pca_workflow(pivot_df)

    top_loadings = OPCA.get_top_pca_loadings(pca, imputed_df)
    top_metrics = OPCA.get_top_metric_categories(top_loadings)

    m_array = top_metrics["metric"].tolist()
    p_array = top_metrics["importance_percent"].tolist()
    
    new_combined = list(zip(m_array, p_array))
    return jsonify(new_combined)


## API DATA HELPERS

def get_file(industry):
    match industry:
        case "Biotechnology & Pharmaceuticals":
            return "./data/biopharma_model_frontend.csv"
        case "Semiconductors":
            return "./data/semiconductors_model_frontend.csv"
        
def filter_by_company(df, company):
    return df[df["company_name"] == company]
def filter_by_year(df, year):
    return df[df["year"] == year]
def filter_by_pillar(df, pillar):
    return df[df["pillar"] == pillar]
def filter_by_metric(df, metric):
    return df[df["metric"] == metric]
def filter_by_model(df, model):
    return df[df["model"] == model]
def filter_by_category(df, category):
    return df[df["category"] == category]

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


## API DATA ROUTES

@app.route('/metrics/<string:industry>/<string:company>/<int:year>/<string:pillar>', methods=['GET'])
def get_metrics(industry, company, year, pillar):
    df = pd.read_csv(get_file(industry))
    df = filter(df, company, year, pillar)
    df = df.sort_values(df.columns[0], ascending = True)
    nda = df["metric"].unique()
    return jsonify(nda.tolist())

@app.route('/models/<string:industry>/<string:company>/<int:year>/<string:pillar>/<string:metric>', methods=['GET'])
def get_models(industry, company, year, pillar, metric):
    df = pd.read_csv(get_file(industry))
    df = filter(df, company, year, pillar, metric)
    df = df.sort_values(df.columns[0], ascending = True)
    nda = df["model"].unique()
    return jsonify(nda.tolist())

@app.route('/categories/<string:industry>/<string:company>/<int:year>/<string:pillar>/<string:metric>/<string:model>', methods=['GET'])
def get_categories(industry, company, year, pillar, metric, model):
    df = pd.read_csv(get_file(industry))
    df = filter(df, company, year, pillar, metric, model)
    df = df.sort_values(df.columns[0], ascending = True)
    nda_c = df["category"].unique()
    nda_v = df["metric_value"].unique()
    return jsonify(list(zip(nda_c.tolist(), nda_v.tolist()))) # zips the iterative tuple of both into a jsonified list

@app.route('/metrics/<string:industry>/<string:company>/<int:year>', methods=['GET'])
def get_metrics_all(industry, company, year):
    df = pd.read_csv(get_file(industry))
    df = filter(df, company, year)
    df = df.sort_values(df.columns[10], ascending = True)
    nda = df["metric"].unique()
    return jsonify(nda.tolist())


## START THE APP

# Run server app
if __name__ == '__main__':
    app.run(port=3902, debug=True)