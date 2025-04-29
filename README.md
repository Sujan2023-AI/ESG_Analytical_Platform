
### Sujan's Turtle's

## Installation Instructions

# Build Docker Image

Run the following command from the root of the repo:

docker-compose -f docker/docker-compose.yml build

# Run Docker Image

Run the following command from the root of the repo:

docker-compose -f docker/docker-compose.yml up

# Go to Website

Go to this url in your web browser:

http://localhost:3000/

# Go to GraphDB website

Go to this url in your web browser:

http://localhost:7200/

Explore the ESG knowledge graph, view the loaded repository, and run sample SPARQL queries from the SPARQL tab.

There are few queries which have been already executed which  shows the foillowing model semantics:

1) 	Path-Based Query: Retrieves ESG data explicitly following the direct hierarchical paths between metrics, categories, and pillars.

2)  Rule-Based Query: Extracts ESG metrics indirectly using inferred relationships between metrics and calculation models in the ontology.

3)  Constraint-Based Query: Filters ESG observations based on specified numeric thresholds to ensure data quality and relevance.

4)  Ontology-Based Query: Leverages ontology-defined semantic classes and relationships directly to query ESG data.

To view the saved visuals on Graph DB follow this steps


1) Open your web browser and navigate to the GraphDB Workbench:

               http://localhost:7200/

2) In the left sidebar, go to:

               Explore → Visual graph

3) Under Saved Grpahs you can see a Graph name called "Visual Graph"

If you want to visualize a differnt view you can search using the Below IRI Format:

-->   " http://example.org/esg#<entity_details> "

| **Entity Type**     | **URI Structure Example**                                                                                  |
|---------------------|-------------------------------------------------------------------------------------------------------------|
| Company             | `http://example.org/esg#<company_name>`                                                                     |
| Industry            | `http://example.org/esg#<industry_name>`                                                                    |
| Metric              | `http://example.org/esg#<metric_name>_<industry_name>`                                                       |
| Category            | `http://example.org/esg#<category_name>`                                                                    |
| Pillar              | `http://example.org/esg#<pillar_name>`                                                                      |
| Calculation Model   | `http://example.org/esg#<metric_name>_model`                                                                 |
| ESG Observation     | `http://example.org/esg#<company_name>_<industry_name>_<metric_name>_<category_name>_<pillar_name>_<year>`    |

Expanded Example Table :

| **Part**        | **Placeholder Example**                                      |
|-----------------|---------------------------------------------------------------|
| Company         | `http://example.org/esg#3dfamily_technology_co_ltd`            |
| Industry        | `http://example.org/esg#semiconductors`                       |
| Metric          | `http://example.org/esg#scope1_ghg_emissions_semiconductors`   |
| Category        | `http://example.org/esg#ghg_emissions`                        |
| Pillar          | `http://example.org/esg#e_risk`                                |
| Model           | `http://example.org/esg#scope1_ghg_emissions_model`            |
| Observation     | `http://example.org/esg#3dfamily_technology_co_ltd_semiconductors_scope1_ghg_emissions_ghg_emissions_e_risk_2021` |


# View Jupyter Notebooks

## Navigate to the "notebooks" folder-

**Note:** The Jupyter notebooks (`EDA.ipynb`, `Ontology_RDF.ipynb`, `Ontology_PCA.ipynb`,`Traditional_PCA.ipynb`) have already been fully executed, and the outputs are visible. **Please do not re-run the notebooks**, as the original datasets are not available in the Git repository, and re-execution will result in errors.

1) EDA.ipynb - EDA.ipynb performs industry-specific exploratory data analysis on the Eurofidai ESG dataset by cleaning, matching industries, splitting metrics into ESG pillars, and preparing the data for ontology-enhanced PCA modeling.

2) Onotology_RDF.ipynb -Ontology_RDF.ipynb generates RDF/TTL files and SHACL shapes to define ESG ontologies and validate ESG metric structures for the knowledge graph.

3) Traditional_PCA.ipynb - Traditional_PCA.ipynb applies year,indutry, metric-based filtering on ESG data and performs traditional PCA analysis to extract and visualize principal components.

4) Ontology_PCA.ipynb- performs ontology-enhanced PCA using year, metric, industry, and pillar filters based on ESG data queried from the GraphDB TTL files.