import React from 'react';
import '../Css/Global.css';
import AppNavigator from './Components/AppNavigator';
import AppOptions from './Components/AppOptions';
import AppHeader from './Components/AppHeader';

function Home() {
    return (
        <div className="App">
            <AppHeader />
            <div className="Body">
                <AppNavigator />
                <div className="Main">
                    <div className="Content">
                        <AppOptions />
                    </div>
                </div>
            </div>
        </div>
      
    );
}

export default Home;