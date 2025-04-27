{
  "users" : {
    "admin" : {
      "username" : "admin",
      "password" : "{bcrypt}$2a$10$ysq.OG0EI7WgQSEItw.y1.xXljo7c4rT1cucrG2kdqg33/pEooCC6",
      "grantedAuthorities" : [ "ROLE_ADMIN" ],
      "appSettings" : {
        "DEFAULT_INFERENCE" : true,
        "DEFAULT_VIS_GRAPH_SCHEMA" : true,
        "DEFAULT_SAMEAS" : true,
        "IGNORE_SHARED_QUERIES" : false,
        "EXECUTE_COUNT" : true
      },
      "dateCreated" : 1745052551910
    }
  },
  "user_queries" : {
    "admin" : {
      "SPARQL Select template" : {
        "name" : "SPARQL Select template",
        "body" : "SELECT ?s ?p ?o\nWHERE {\n\t?s ?p ?o .\n} LIMIT 100",
        "shared" : false
      },
      "Clear graph" : {
        "name" : "Clear graph",
        "body" : "CLEAR GRAPH <http://example>",
        "shared" : false
      },
      "Add statements" : {
        "name" : "Add statements",
        "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nINSERT DATA\n      {\n      GRAPH <http://example> {\n          <http://example/book1> dc:title \"A new book\" ;\n                                 dc:creator \"A.N.Other\" .\n          }\n      }",
        "shared" : false
      },
      "Remove statements" : {
        "name" : "Remove statements",
        "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nDELETE DATA\n{\nGRAPH <http://example> {\n    <http://example/book1> dc:title \"A new book\" ;\n                           dc:creator \"A.N.Other\" .\n    }\n}",
        "shared" : false
      },
      "Ontology Based" : {
        "name" : "Ontology Based",
        "body" : "PREFIX ex: <http://example.org/esg#>\n\nSELECT DISTINCT ?company ?industry ?metric ?category ?pillar ?year ?value ?unit\nWHERE {\n  ?obs a ex:ESGObservation ;\n       ex:hasCompany ?company_uri ;\n       ex:belongsToIndustry ex:semiconductors ;\n       ex:hasMetric ?metric_uri ;\n       ex:hasCategory ?category_uri ;\n       ex:hasPillar ex:e_risk ;\n       ex:hasYear ?year ;\n       ex:hasValue ?value ;\n       ex:hasUnit ?unit .\n\n  # Resolve URIs\n  BIND(STRAFTER(STR(?company_uri), \"#\") AS ?company)\n  BIND(\"semiconductors\" AS ?industry)\n  BIND(STRAFTER(STR(?metric_uri), \"#\") AS ?metric)\n  BIND(STRAFTER(STR(?category_uri), \"#\") AS ?category)\n  BIND(\"e_risk\" AS ?pillar)\n}\nORDER BY ?company ?year\nLIMIT 10\n",
        "shared" : false
      },
      "Rule Based" : {
        "name" : "Rule Based",
        "body" : "PREFIX ex: <http://example.org/esg#>\n\nSELECT DISTINCT ?company ?metric ?model ?value ?year\nWHERE {\n  ?obs a ex:ESGObservation ;\n       ex:hasCompany ?company_uri ;\n       ex:hasMetric ?metric_uri ;\n       ex:hasYear ?year ;\n       ex:hasValue ?value ;\n       ex:belongsToIndustry ?industry_uri ;\n       ex:hasPillar ?pillar_uri .\n\n  ?model_uri ex:relatedToMetric ?metric_uri .\n\n  # Resolve URIs\n  BIND(STRAFTER(STR(?company_uri), \"#\") AS ?company)\n  BIND(STRAFTER(STR(?metric_uri), \"#\") AS ?metric)\n  BIND(STRAFTER(STR(?model_uri), \"#\") AS ?model)\n  BIND(STRAFTER(STR(?industry_uri), \"#\") AS ?industry)\n  BIND(STRAFTER(STR(?pillar_uri), \"#\") AS ?pillar)\n\n  FILTER(?industry = \"semiconductors\" && ?pillar = \"e_risk\")\n}\nORDER BY ?company ?year\nLIMIT 10\n",
        "shared" : false
      },
      "Path Based" : {
        "name" : "Path Based",
        "body" : "PREFIX ex: <http://example.org/esg#>\n\nSELECT DISTINCT ?company ?industry ?metric ?category ?pillar ?year ?value ?unit\nWHERE {\n  ?obs a ex:ESGObservation ;\n       ex:hasCompany ?company_uri ;\n       ex:belongsToIndustry ?industry_uri ;\n       ex:hasMetric ?metric_uri ;\n       ex:hasCategory ?category_uri ;\n       ex:hasPillar ?pillar_uri ;\n       ex:hasYear ?year ;\n       ex:hasValue ?value ;\n       ex:hasUnit ?unit .\n\n  ?metric_uri ex:hasPillar ?pillar_uri .\n\n  # Resolve URIs to readable labels\n  BIND(STRAFTER(STR(?company_uri), \"#\") AS ?company)\n  BIND(STRAFTER(STR(?industry_uri), \"#\") AS ?industry)\n  BIND(STRAFTER(STR(?metric_uri), \"#\") AS ?metric)\n  BIND(STRAFTER(STR(?category_uri), \"#\") AS ?category)\n  BIND(STRAFTER(STR(?pillar_uri), \"#\") AS ?pillar)\n\n  FILTER(?industry = \"semiconductors\" && ?pillar = \"e_risk\")\n}\nORDER BY ?company ?year\nLIMIT 10",
        "shared" : false
      }
    }
  },
  "graphConfigs" : {
    "d1d42fbe11ca4b39a262c351b0e401ba" : {
      "id" : "d1d42fbe11ca4b39a262c351b0e401ba",
      "name" : "Graph Visualization",
      "startMode" : "search",
      "owner" : "admin",
      "startQueryIncludeInferred" : true,
      "startQuerySameAs" : true,
      "startGraphQuery" : null,
      "startIRI" : null,
      "startIRILabel" : null,
      "expandQuery" : "PREFIX ex: <http://example.org/esg#>\n\nCONSTRUCT {\n    ?node ?predicate ?object .\n    ?object a ?objectType .\n}\nWHERE {\n    {\n        ?node ?predicate ?object .\n        OPTIONAL { ?object a ?objectType . }\n    } UNION {\n        ?subject ?predicate ?node .\n        OPTIONAL { ?subject a ?objectType . }\n        BIND(?subject AS ?object)\n    }\n}\nLIMIT 100",
      "resourceQuery" : "PREFIX ex: <http://example.org/esg#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\nSELECT ?type ?label ?comment ?rank\nWHERE {\n  BIND(?node AS ?resource)\n\n  OPTIONAL {\n    ?resource a ?type .\n  }\n\n  OPTIONAL {\n    BIND(STRAFTER(STR(?resource), \"#\") AS ?cleanLabel)\n    BIND(REPLACE(?cleanLabel, \"_\", \" \") AS ?label)\n  }\n\n  OPTIONAL {\n    ?resource rdfs:comment ?comment .\n  }\n\n  OPTIONAL {\n    # Assign node size based on RDF type\n    ?resource a ?type .\n    BIND(\n      IF(?type = ex:Company, 0.9,\n        IF(?type = ex:Industry, 0.8,\n          IF(?type = ex:ESGMetric, 0.7,\n            IF(?type = ex:Category, 0.6,\n              IF(?type = ex:Pillar, 0.5,\n                IF(?type = ex:CalculationModel, 0.4,\n                  IF(?type = ex:ESGObservation, 0.3, 0.2)\n                )\n              )\n            )\n          )\n        )\n      )\n      AS ?rank\n    )\n  }\n}",
      "predicateLabelQuery" : "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\nSELECT ?label\nWHERE {\n  BIND(?edge AS ?predicate)\n\n  OPTIONAL {\n    ?predicate rdfs:label ?definedLabel .\n  }\n\n  BIND(\n    COALESCE(?definedLabel, REPLACE(STRAFTER(STR(?predicate), \"#\"), \"_\", \" \"))\n    AS ?label\n  )\n}",
      "resourcePropertiesQuery" : "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\nSELECT ?property ?value\nWHERE {\n  BIND(?node AS ?resource)\n\n  # Fetch all datatype (literal) properties attached to the node\n  ?resource ?prop ?value .\n\n  # Filter only datatype properties (literals)\n  FILTER(isLiteral(?value))\n\n  # Get a clean readable property name\n  BIND(\n    REPLACE(STRAFTER(STR(?prop), \"#\"), \"_\", \" \")\n    AS ?property\n  )\n}",
      "shared" : false,
      "description" : null,
      "hint" : null
    }
  },
  "graphs" : {
    "ff26c10143674248b5c8539e13170b99" : {
      "id" : "ff26c10143674248b5c8539e13170b99",
      "name" : "Visual 1",
      "data" : "{\"nodes\":[{\"iri\":\"http://example.org/esg#3dfamily_technology_co_ltd_semiconductors_energy_management_energyusetotal_e_opportunity_2016\",\"isTriple\":false,\"size\":64,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"3dfamily technology co ltd semiconductors energy management energyusetotal e opportunity 2016\"}],\"types\":[\"http://example.org/esg#ESGObservation\"],\"rdfRank\":0.3,\"x\":244.54711187889626,\"y\":593.5947023808142,\"fixed\":true},{\"iri\":\"http://example.org/esg#semiconductors\",\"isTriple\":false,\"size\":104,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"semiconductors\"}],\"types\":[\"http://example.org/esg#Industry\"],\"rdfRank\":0.8,\"x\":490.74116490986876,\"y\":60.66937036393773,\"fixed\":true},{\"iri\":\"http://example.org/esg#energyusetotal\",\"isTriple\":false,\"size\":88,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"energyusetotal\"}],\"types\":[\"http://example.org/esg#Category\"],\"rdfRank\":0.6,\"x\":609.8593834229797,\"y\":471.6932333333334,\"fixed\":true},{\"iri\":\"http://example.org/esg#3dfamily_technology_co_ltd\",\"isTriple\":false,\"size\":112,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"3dfamily technology co ltd\"}],\"types\":[\"http://example.org/esg#Company\"],\"rdfRank\":0.9,\"x\":600.7350331194639,\"y\":761.239235931397,\"fixed\":true},{\"iri\":\"http://example.org/esg#energy_management_semiconductors\",\"isTriple\":false,\"size\":96,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"energy management semiconductors\"}],\"types\":[\"http://example.org/esg#ESGMetric\"],\"rdfRank\":0.7,\"x\":134.28122982755647,\"y\":822.1521647227818,\"fixed\":true},{\"iri\":\"http://example.org/esg#e_opportunity\",\"isTriple\":false,\"size\":80,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"e opportunity\"}],\"types\":[\"http://example.org/esg#Pillar\"],\"rdfRank\":0.5,\"x\":76.11925168736823,\"y\":373.4982375998093,\"fixed\":true},{\"iri\":\"http://example.org/esg#ESGObservation\",\"isTriple\":false,\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"ESGObservation\"}],\"types\":[],\"rdfRank\":0,\"x\":-73.6666354979804,\"y\":580.8479636765039,\"fixed\":true},{\"iri\":\"http://example.org/esg#Industry\",\"isTriple\":false,\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"Industry\"}],\"types\":[],\"rdfRank\":0,\"x\":744.3742411894779,\"y\":36.19884517048314,\"fixed\":true},{\"iri\":\"http://example.org/esg#Category\",\"isTriple\":false,\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"Category\"}],\"types\":[],\"rdfRank\":0,\"x\":987.9191314129828,\"y\":462.1994422602197,\"fixed\":true},{\"iri\":\"http://example.org/esg#Company\",\"isTriple\":false,\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"Company\"}],\"types\":[],\"rdfRank\":0,\"x\":915.9927747123413,\"y\":759.4634702508749,\"fixed\":true},{\"iri\":\"http://example.org/esg#ESGMetric\",\"isTriple\":false,\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"ESGMetric\"}],\"types\":[],\"rdfRank\":0,\"x\":434.8255984468211,\"y\":885.1686815454632,\"fixed\":true},{\"iri\":\"http://example.org/esg#Pillar\",\"isTriple\":false,\"size\":48,\"labels\":[{\"lang\":\"\",\"priority\":0,\"label\":\"Pillar\"}],\"types\":[],\"rdfRank\":0,\"x\":69.06230063744795,\"y\":74.61186571433882,\"fixed\":true}],\"links\":[{\"source\":\"http://example.org/esg#3dfamily_technology_co_ltd_semiconductors_energy_management_energyusetotal_e_opportunity_2016\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#semiconductors\",\"isTripleTarget\":false,\"predicates\":[\"belongsToIndustry\"]},{\"source\":\"http://example.org/esg#3dfamily_technology_co_ltd_semiconductors_energy_management_energyusetotal_e_opportunity_2016\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#energyusetotal\",\"isTripleTarget\":false,\"predicates\":[\"hasCategory\"]},{\"source\":\"http://example.org/esg#3dfamily_technology_co_ltd_semiconductors_energy_management_energyusetotal_e_opportunity_2016\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#3dfamily_technology_co_ltd\",\"isTripleTarget\":false,\"predicates\":[\"hasCompany\"]},{\"source\":\"http://example.org/esg#3dfamily_technology_co_ltd_semiconductors_energy_management_energyusetotal_e_opportunity_2016\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#energy_management_semiconductors\",\"isTripleTarget\":false,\"predicates\":[\"hasMetric\"]},{\"source\":\"http://example.org/esg#3dfamily_technology_co_ltd_semiconductors_energy_management_energyusetotal_e_opportunity_2016\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#e_opportunity\",\"isTripleTarget\":false,\"predicates\":[\"hasPillar\"]},{\"source\":\"http://example.org/esg#3dfamily_technology_co_ltd_semiconductors_energy_management_energyusetotal_e_opportunity_2016\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#ESGObservation\",\"isTripleTarget\":false,\"predicates\":[\"type\"]},{\"source\":\"http://example.org/esg#semiconductors\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#Industry\",\"isTripleTarget\":false,\"predicates\":[\"type\"]},{\"source\":\"http://example.org/esg#energyusetotal\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#Category\",\"isTripleTarget\":false,\"predicates\":[\"type\"]},{\"source\":\"http://example.org/esg#3dfamily_technology_co_ltd\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#Company\",\"isTripleTarget\":false,\"predicates\":[\"type\"]},{\"source\":\"http://example.org/esg#energy_management_semiconductors\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#ESGMetric\",\"isTripleTarget\":false,\"predicates\":[\"type\"]},{\"source\":\"http://example.org/esg#e_opportunity\",\"isTripleSource\":false,\"target\":\"http://example.org/esg#Pillar\",\"isTripleTarget\":false,\"predicates\":[\"type\"]}],\"tripleNodes\":\"[]\",\"tripleLinksCopy\":\"[]\",\"colorIndex\":7,\"type2color\":{\"http://example.org/esg#Industry\":0,\"http://example.org/esg#ESGObservation\":1,\"undefined\":2,\"http://example.org/esg#Category\":3,\"http://example.org/esg#Company\":4,\"http://example.org/esg#ESGMetric\":5,\"http://example.org/esg#Pillar\":6},\"scale\":1,\"translate\":[-34.56494140625,34.88676452636719]}",
      "owner" : "admin",
      "config" : "d1d42fbe11ca4b39a262c351b0e401ba",
      "shared" : false
    }
  }
}