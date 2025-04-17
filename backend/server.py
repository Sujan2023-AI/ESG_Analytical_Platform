from flask import Flask, jsonify, request, abort
from flask_cors import CORS

import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/data/<string:category>', methods=['GET'])
def get_subcategories(category):
    df = pd.read_csv("../Normalized_Data/semiconductors_sasb_final.csv")

    # 'Amlogic Shanghai Co Ltd' - 5068926914

    # select query
    company_df = df[df["company_name"] == 'Amlogic Shanghai Co Ltd']
    category_df = company_df[company_df["pillar"] == category]
    sorted_df = category_df.sort_values(category_df.columns[12], ascending = True)
    unique_subcategory_df = sorted_df["metric_name"].unique()

    # return result
    n_array = unique_subcategory_df.tolist()
    return jsonify(n_array)

@app.route('/data/<string:category>/<string:subcategory>/models', methods=['GET'])
def get_models(category, subcategory):
    df = pd.read_csv("../Normalized_Data/semiconductors_sasb_final.csv")

    # select query
    company_df = df[df["company_name"] == 'Amlogic Shanghai Co Ltd']
    df_category = company_df[company_df["pillar"] == category]
    df_subcategory = df_category[df_category["metric_name"] == subcategory]
    sorted_df = df_subcategory.sort_values(df_subcategory.columns[14], ascending = True)
    unique_metric_df = sorted_df["model"].unique()

    # return result
    n_array = unique_metric_df.tolist()
    return jsonify(n_array)

@app.route('/data/<string:category>/<string:subcategory>/<string:model>/metrics', methods=['GET'])
def get_metrics(category, subcategory, model):
    df = pd.read_csv("../Normalized_Data/semiconductors_sasb_final.csv")

    # select query
    df_category = df[df["pillar"] == category]
    df_subcategory = df_category[df_category["metric_name"] == subcategory]
    df_model = df_subcategory[df_subcategory["model"] == model]
    sorted_df = df_model.sort_values(df_model.columns[5], ascending = True)

    metric_df = sorted_df["category"].unique()
    value_df = sorted_df["metric_value"].unique()

    # return result
    m_array = metric_df.tolist()
    v_array = value_df.tolist()
    combined = list(zip(m_array, v_array))
    return jsonify(combined)

@app.route('/api/categories', methods=['GET'])
def get_groups():
    """
    Route to get all groups
    return: Array of group objects
    """

    # TODO: (sample response below)
    return jsonify([
        {
            "id": 1,
            "category": "environment",
            "subCategory": "opportunity",
        },
        {
            "id": 2,
            "category": "environment",
            "subCategory": "risk",
        },
        {
            "id": 3,
            "category": "social",
            "subCategory": "opportunity",
        },
        {
            "id": 4,
            "category": "social",
            "subCategory": "risk",
        },
        {
            "id": 5,
            "category": "governance",
            "subCategory": "opportunity",
        },
        {
            "id": 6,
            "category": "governance",
            "subCategory": "risk",
        },
    ])

if __name__ == '__main__':
    app.run(port=3902, debug=True)