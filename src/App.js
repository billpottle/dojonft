import React, { useEffect} from 'react';
import useConnection from './components/web3/useConnection';
import ConnectionContext from './components/web3/ConnectionContext';
import Header from './components/layouts/Header';
import Routes from './components/routes/Routes'

const App = () => {
    const connection = useConnection();


    useEffect(() => {
        if (!connection) {
            return;
        }

    }, [connection]);

    return (
        <ConnectionContext.Provider value={connection}>
            <div style={{ 'backgroundColor': '#21ba45', 'height': '200em' }}>
            <Header
        
            />
              <Routes
          
            />
           </div>
          
        </ConnectionContext.Provider>
    );
}

export default App;
