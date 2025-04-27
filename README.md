
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

There are few queries whioch have been al;ready executed which  shows the foillowing model semantics:

1) 	Path-Based Query: Retrieves ESG data explicitly following the direct hierarchical paths between metrics, categories, and pillars.

2)  Rule-Based Query: Extracts ESG metrics indirectly using inferred relationships between metrics and calculation models in the ontology.

3)  Constraint-Based Query: Filters ESG observations based on specified numeric thresholds to ensure data quality and relevance.

4)  Ontology-Based Query: Leverages ontology-defined semantic classes and relationships directly to query ESG data.

# View Jupyter Notebooks

## Navigate to the "notebooks" folder-

1) EDA.ipynb - EDA.ipynb performs industry-specific exploratory data analysis on the Eurofidai ESG dataset by cleaning, matching industries, splitting metrics into ESG pillars, and preparing the data for ontology-enhanced PCA modeling.

2) Onotology_RDF.ipynb -Ontology_RDF.ipynb generates RDF/TTL files and SHACL shapes to define ESG ontologies and validate ESG metric structures for the knowledge graph.

3) Traditional_PCA.ipynb - Traditional_PCA.ipynb applies year,indutry, metric-based filtering on ESG data and performs traditional PCA analysis to extract and visualize principal components.

4) Ontology_PCA.ipynb- performs ontology-enhanced PCA using year, metric, industry, and pillar filters based on ESG data queried from the GraphDB TTL files.