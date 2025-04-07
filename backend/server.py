from flask import Flask, jsonify, request, abort
from flask_cors import CORS

import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/data/<string:category>', methods=['GET'])
def get_subcategories(category):
    df = pd.read_csv("../Normalized_Data/esg_master_mapping_pillar_updated1.csv")

    # select query
    category_df = df[df["Pillar"] == category]
    sorted_df = category_df.sort_values(category_df.columns[0], ascending = True)
    unique_subcategory_df = sorted_df["Topic"].unique()

    # return result
    n_array = unique_subcategory_df.tolist()
    return jsonify(n_array)

@app.route('/data/<string:category>/<string:subcategory>/metrics', methods=['GET'])
def get_environment_risks_metrics(category, subcategory):
    df = pd.read_csv("../Normalized_Data/esg_master_mapping_pillar_updated1.csv")

    # select query
    df_category = df[df["Pillar"] == category]
    df_subcategory = df_category[df_category["Topic"] == subcategory]
    sorted_df = df_subcategory.sort_values(df_subcategory.columns[0], ascending = True)
    unique_metric_df = sorted_df["Metric"].unique()

    # return result
    n_array = unique_metric_df.tolist()
    return jsonify(n_array)

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