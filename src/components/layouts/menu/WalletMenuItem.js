import React, { useContext } from 'react';
import ConnectionContext from '../../web3/ConnectionContext';

const WalletMenuItem = () => {
  const connection = useContext(ConnectionContext);

  const getNetworkVersion = () => {
    return connection.networkId || 0;
  };

    const getLoggedInButton = () => {
      console.log("Connected to Network:" , connection.networkId)

    if (+getNetworkVersion() !== 137) {
        return <div><span style={{'marginRight': '2em'}}>Connect Metamask to Polygon</span><button className="ui red mini button invalid-network" onClick={connection.connectToModal}>
          invalid network
          {connection && connection.currentAddress ?
              <><br />{connection.currentAddress.slice(0, 8)}</>
              : ''
          }
      </button></div>;

    }

    return (
      <>
        <button className="ui green mini button logged-in-button">
          Logged in
          {connection && connection.currentAddress ?
              <><br />{connection.currentAddress.slice(0, 8)}</>
              : ''
          }
        </button>
      </>
    );
  };

  return (
    <div className="item ui wallet-item">
          <div className="content">
        {connection.currentAddress ? (
          getLoggedInButton()
        ) : (
            <div className="meta-mask-btn">
              <button className="ui orange mini button wallet-not-connected" onClick={connection.connectToModal}>Connect with MetaMask</button>
                <div><a href={"https://metamask.io"}><i>Download MetaMask</i></a></div>
            </div>
        )}
      </div>
    </div>
  );
};

export default WalletMenuItem;
