// View Ontology page

import '../Css/Ontology.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function Ontology() {
      
    return (
        <div className="App">
            <AppHeader />
            <div className='Body'>
                <AppNavigator />
                <div className='Main'>
                    <div className='Content'>
                        <div className="ontology-results">
                            <h1>Ontology</h1>
                            <p>In our project, ontology serves as the semantic backbone that structures ESG data by defining relationships between key entities like Frameworks, Categories, Metrics, Models, Datasets, and Data Sources. As shown in the diagram, it captures how ESG metrics are derived from categories within frameworks, how they’re computed using specific models, and how those metrics are supported by datasets sourced from credible origins. This structured ontology enables dynamic querying, model triggering, and context-aware PCA, ensuring that ESG analysis reflects industry relevance, data provenance, and model logic—all within a machine-readable, standardized schema.</p>
                            <h2>Our Primary Ontology</h2>
                            <div className="ontology-image">
                                <img src="/ontology.jpeg" alt="Ontology.jpeg" height={500} width={750} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ontology;