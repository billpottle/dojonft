import React, { useState, useEffect } from "react";
import dojoNFTBytecode from "../web3/contracts/bytecode/dojoNFTBytecode";
import { getDojoNFTContract, initContractsWithWeb3 } from "../web3/contracts/Contracts";
import useConnection from "../web3/useConnection";

const Create = () => {
  const [deploying, setDeploying] = useState(false);
  const [notification, setNotification] = useState();
    const [deployedContract, setDeployedContract] = useState();
    const [mustLogin, setMustLogin] = useState(true)

  const connection = useConnection();

  const createCollection = async () => {
    const dojoNFTContract = getDojoNFTContract();
    setDeploying(true);
    const newContract = await dojoNFTContract
      .deploy({ data: dojoNFTBytecode.object })
      .send({ from: connection.currentAddress })
      .on("confirmation", result => {
        setDeploying(false);
      });
      setDeployedContract(connection.convertAddressToChecksum(newContract));
  };

  useEffect(
    () => {
          if (deployedContract) {
              console.log(deployedContract);
              setNotification(
                  `Contract successfully deployed to ${deployedContract._address
                  } Copy this value and paste it in on the load page`
              );
          }
          else {
              if (connection.provider) {
                  setMustLogin(false)
                  initContractsWithWeb3(connection.provider, "0x4208f461ae9A6892776dDC6d2a9847398FB74461");
              }
              else {
                  setMustLogin(true)
              }
          }
    },
    [deployedContract, connection.provider]
  );

    if (mustLogin) {
        return (
            <div className='ui container'> <div className='ui info segment'> Please login to metamask and click the button in the header or refresh the page. You will have to allow metamask to connect to this site.</div></div>
        )
    }

  return (
    <>
          <div className="ui  container" style={{ 'backgroundColor': 'black' }}>
        <div className="ui center aligned inverted huge header title">
          Create A New Collection (Contract)
        </div>
        {notification && (
          <div className="ui positive message">
            <i className="close icon" onClick={() => setNotification(null)} />
            <div className="header">{notification}</div>
          </div>
        )}
      
        <div className="ui segment info-segment">
  
          <p>
            Most users will creat a new collection only once, and then load
            their current collection. When you create a new collection, it
            deploys a pre-written smart contract to the blockchain. This
            contract is basically a list of the different types of NFTs (badges)
            as well as who owns each individual one.{" "}
          </p>
          <p>
            {" "}
            The contract also contains functions to transfer ownership,
            add/remove staff, etc. The contract will set whichever address
            deploys it as the owner.{" "}
          </p>
          <p>
            {" "}
            You may deploy unlimited collections, but this is the most expensive
            step in the process. For instance, you might want one collection for
            promotional NFTs (2 weeks free coupons) but a different one for
            accomplishments of your students. This is just a tool, how you use
            it is up to you.{" "}
                  </p>
                  <div style={{'display': 'flex', 'justifyContent': 'center', 'marginBottom': '2em', 'marginTop': '2em'}}>
          {deploying ? (
            <button className="ui loading button">
              Sending TX to blockchain...
            </button>
          ) : (
            <button onClick={createCollection} className="ui primary button">
              {" "}
              Deploy Contract
            </button>
                          )}
                      </div>
          <p>
            {" "}
            After clicking deploy contract, you will need to go to metamask and
            click confirm. It will tell you the estimated gas cost{" "}
          </p>
              </div>

              <div className="ui segment info-segment">
                  <h4> After Deploying Steps </h4>
                  <p>
            It is highly recommended to take the following steps IN ORDER after
            deploying. Make sure you set the Name and Symbol before issuing NFTs or some external
                      tools may become confused.
                      </p>
            <p>
                      1. Load the contract in the 'load' page and set the <b>Name</b>{" "}
              and <b>Symbol</b> of the token.{" "}
                  </p>
                  <p>
                      2. Add your first badge
                      </p>
                  <p>
                      3. Issue your first NFT
                      </p>
                  <p>
                      4. <a href="https://opensea.io/get-listed/"> Register the collection</a> in Opensea. Click "Live on a mainnet" and then enter the address and make
                          sure to select 'polygon'
                      </p>
              </div>
      </div>
    </>
  );
};

export default Create;
