import '../Css/Report.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function Report() {
  return (
    <div className="App">
      <AppHeader />
      <div className='Body'>
        <AppNavigator />
        <div className="content">
          <div className='allContent'>
            <div className="mainMetrics">
                <div className='metricRow1'>
                    <div className='metric1'>
                        <p className='metricTitle'>Environmental Risk</p>
                        <div className='ERContent'>ERContent</div>
                    </div>
                    <div className='metric2'>
                        <p className='metricTitle'>Social Risk</p>
                        <div className='SRContent'>SRContent</div>
                    </div>
                    <div className='metric3'>
                        <p className='metricTitle'>Governance Risk</p>
                        <div className='GRContent'>GRContent</div>
                    </div>
                </div>
                <div className='metricRow2'>
                    <div className='metric4'>
                        <p className='metricTitle'>EO</p>
                        <div className='EOContent'>EOContent</div>
                    </div>
                    <div className='metric5'>
                        <p className='metricTitle'>SO</p>
                        <div className='SOContent'>SOContent</div>
                    </div>
                    <div className='metric6'>
                        <p className='metricTitle'>GO</p>
                        <div className='GOContent'>GOContent</div>
                    </div>
                </div>
            </div>
            <div className='calculatedPanel'>
                <p>Calculation comes here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;