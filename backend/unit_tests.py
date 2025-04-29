"""
These tests are written using doctest
To run these use the following command within this folder:
    python unit_tests.py -v
"""

# import direct functions from backend
from server import get_file

# import requests module to handle api call tests
import requests

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

def test_api_route_metrics(industry, company, year):
    """
    Checks api endpoint that retrieves all metric data

    Standard test for semiconductor industry
    >>> test_api_route_metrics("Semiconductors", "StarPower Semiconductor Ltd", "2022")
    ['Business_Ethics', 'Diversity_Equity_Inclusion', 'GHG_Emissions', 'Waste_Management', 'Water_Management']

    Standard test for biopharma industry
    >>> test_api_route_metrics("Biotechnology & Pharmaceuticals", "Summit Therapeutics Inc", "2022")
    ['Employee_Development', 'Supply_Chain_Management']
    """
    route = "metrics/" + industry + "/" + company + "/" + year
    url = 'http://localhost:3902/' + route
    response = requests.get(url)
    return response.json()

if __name__ == "__main__":
    import doctest
    doctest.testmod()