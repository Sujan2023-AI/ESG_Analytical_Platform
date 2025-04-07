from flask import Flask, jsonify, request, abort
from flask_cors import CORS

import pandas as pd

app = Flask(__name__)
CORS(app)

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

@app.route('/data/er', methods=['GET'])
def get_environment_risks():
    df = pd.read_csv("../Normalized_Data/esg_master_mapping_pillar_updated1.csv")
    filtered_df = df[df["Pillar"] == "E_risk"]
    sorted_df = filtered_df.sort_values(filtered_df.columns[0], ascending = True)
    unique_values = sorted_df["Topic"].unique()
    n_array = unique_values.tolist()
    return jsonify(n_array)

@app.route('/data/er/<string:subcategory>/metrics', methods=['GET'])
def get_environment_risks_metrics(subcategory):
    print(subcategory)
    df = pd.read_csv("../Normalized_Data/esg_master_mapping_pillar_updated1.csv")
    df1 = df[df["Pillar"] == "E_risk"]
    print(df1)
    df2 = df1[df1["Topic"] == subcategory]
    print(df2)
    sorted_df = df2.sort_values(df2.columns[0], ascending = True)
    unique_values = sorted_df["Metric"].unique()
    n_array = unique_values.tolist()
    print(n_array)
    return jsonify(n_array)



@app.route('/api/students', methods=['GET'])
def get_students():
    """
    Route to get all students
    return: Array of student objects
    """
    # TODO: (sample response below)
    return jsonify([
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"},
        {"id": 3, "name": "Charlie"},
        {"id": 4, "name": "David"},
        {"id": 5, "name": "Eve"},
    ])

@app.route('/api/groups', methods=['POST'])
def create_group():
    """
    Route to add a new group
    param groupName: The name of the group (from request body)
    param members: Array of member names (from request body)
    return: The created group object
    """
    
    # Getting the request body (DO NOT MODIFY)
    group_data = request.json
    group_name = group_data.get("groupName")
    group_members = group_data.get("members")
    
    # TODO: implement storage of a new group and return their info (sample response below)

    return jsonify({
        "id": 3,
        "groupName": "New Group",
        "members": [1, 2],
    }), 201

@app.route('/api/groups/<int:group_id>', methods=['DELETE'])
def delete_group(group_id):
    """
    Route to delete a group by ID
    param group_id: The ID of the group to delete
    return: Empty response with status code 204
    """
    # TODO: (delete the group with the specified id)

    return '', 204  # Return 204 (do not modify this line)

@app.route('/api/groups/', methods=['GET'])
def get_group(group_id):
    """
    Route to get a group by ID (for fetching group members)
    param group_id: The ID of the group to retrieve
    return: The group object with member details
    """
    # TODO: (sample response below)
    return jsonify({
        "id": 1,
        "groupName": "Group 1",
        "members": [
            {"id": 1, "name": "Alice"},
            {"id": 2, "name": "Bob"},
            {"id": 3, "name": "Charlie"},
        ],
    })
    # TODO:
    # if group id isn't valid:
    #     abort(404, "Group not found")

if __name__ == '__main__':
    app.run(port=3902, debug=True)
