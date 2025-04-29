from server import get_metrics
from server import get_file

def test_get_file():
    """
    Checks that the get_file function is returning the active csv data files
    >>> test_get_file()
    True
    """
    output = get_file("Semiconductors")
    expected = "semiconductors_model_frontend.csv"
    return output.endswith(expected)

#output = get_metrics("Semiconductors", "StarPower Semiconductor", "2022", "e_risk")
#print(output)

if __name__ == "__main__":
    import doctest
    doctest.testmod()