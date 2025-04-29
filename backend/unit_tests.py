"""
This file tests all the base functionality of the backend server.py file
These tests are written using doctest
To run these use the following command within this folder:
    python unit_tests.py -v
"""

# import direct functions from backend
from server import get_file

# import requests module to handle api call tests
import requests

retriever_address = 'http://localhost:3902/'

def test_get_file(industry, expected):
    """
    Checks that the get_file function is returning the active csv data files

    Standard test case for semiconductor industry
    >>> test_get_file("Semiconductors", "semiconductors_model_frontend.csv")
    True

    Standard test case for biopharma industry
    >>> test_get_file("biotechnology_pharmaceuticals", "biopharma_model_frontend.csv")
    True

    Semiconductor should be used by default
    >>> test_get_file("dummy", "semiconductors_model_frontend.csv")
    True
    """
    output = get_file(industry)
    return output.endswith(expected)

def test_api_route_metrics(industry, company, year, pillar):
    """
    /metrics endpoint tests

    Standard test for semiconductor industry
    >>> test_api_route_metrics("Semiconductors", "StarPower Semiconductor Ltd", "2022", "E_risk")
    ['GHG_Emissions', 'Water_Management', 'Waste_Management']

    Standard test for biopharma industry
    >>> test_api_route_metrics("Biotechnology & Pharmaceuticals", "Summit Therapeutics Inc", "2022", "S_risk")
    ['Employee_Development']

    Compnay not in dataset should return nothing
    >>> test_api_route_metrics("Semiconductors", "Fake Incorporated", "2022", "E_risk")
    []
    """
    route = "metrics/"
    parametres = industry + "/" + company + "/" + year + "/" + pillar
    url = retriever_address + route + parametres
    response = requests.get(url)
    return response.json()

def test_api_route_models(industry, company, year, pillar, metric):
    """
    /models endpoint tests

    Standard test for semiconductor industry
    >>> test_api_route_models("Semiconductors", "StarPower Semiconductor Ltd", "2022", "E_risk", "GHG_Emissions")
    ['GHG_Emissions_model']

    Standard test for biopharma industry
    >>> test_api_route_models("Biotechnology & Pharmaceuticals", "Summit Therapeutics Inc", "2022", "S_risk", "Employee_Development")
    ['Employee_Development_model']

    Compnay not in dataset should return nothing
    >>> test_api_route_models("Semiconductors", "Fake Incorporated", "2022", "E_risk", "GHG_Emissions")
    []
    """
    route = "models/"
    parametres = industry + "/" + company + "/" + year + "/" + pillar + "/" + metric
    url = retriever_address + route + parametres
    response = requests.get(url)
    return response.json()

def test_api_route_categories(industry, company, year, pillar, metric, model):
    """
    /categories endpoint tests

    Standard test for semiconductor industry
    >>> test_api_route_categories("Semiconductors", "StarPower Semiconductor Ltd", "2022", "E_risk", "GHG_Emissions", "GHG_Emissions_model")
    [['SOXEMISSIONS', 424.0], ['NOXEMISSIONS', 1183.06], ['PARTICULATE_MATTER_EMISSIONS', 2.39], ['VOCEMISSIONS', 1222.0600000000002]]

    Standard test for biopharma industry
    >>> test_api_route_categories("Biotechnology & Pharmaceuticals", "Summit Therapeutics Inc", "2022", "S_risk", "Employee_Development", "Employee_Development_model")
    [['SUPPLY_CHAINHS_POLICY', 0.0], ['EMPLOYEE_HEALTH_SAFETY_POLICY', 1.0]]

    Compnay not in dataset should return nothing
    >>> test_api_route_categories("Semiconductors", "Fake Incorporated", "2022", "E_risk", "GHG_Emissions", "GHG_Emissions_model")
    []
    """
    route = "categories/"
    parametres = industry + "/" + company + "/" + year + "/" + pillar + "/" + metric + "/" + model
    url = retriever_address + route + parametres
    response = requests.get(url)
    return response.json()

def test_api_route_metrics_without_parameters(industry, company, year):
    """
    /metrics (with only basic parametres) endpoint tests

    Standard test for semiconductor industry
    >>> test_api_route_metrics_without_parameters("Semiconductors", "StarPower Semiconductor Ltd", "2022")
    ['Business_Ethics', 'Diversity_Equity_Inclusion', 'GHG_Emissions', 'Waste_Management', 'Water_Management']

    Standard test for biopharma industry
    >>> test_api_route_metrics_without_parameters("Biotechnology & Pharmaceuticals", "Summit Therapeutics Inc", "2022")
    ['Employee_Development', 'Supply_Chain_Management']

    Compnay not in dataset should return nothing
    >>> test_api_route_metrics_without_parameters("Biotechnology & Pharmaceuticals", "Fake Incorporated", "2022")
    []
    """
    route = "metrics/"
    parametres = industry + "/" + company + "/" + year
    url = retriever_address + route + parametres
    response = requests.get(url)
    return response.json()

if __name__ == "__main__":
    import doctest
    doctest.testmod()