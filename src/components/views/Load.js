import React, { useState, useEffect } from "react";

import {
  getDojoNFTContract,
  initContractsWithWeb3
} from "../web3/contracts/Contracts";
import useConnection from "../web3/useConnection";
import axios from "axios";

const Load = () => {
  const [contractAddress, setContractAddress] = useState(
    ""
  );
  const [view, setView] = useState("select");
  const [dojoNFTContract, setdojoNFTContract] = useState(null);
  const [owner, setOwner] = useState();
  const [addStaff, setAddStaff] = useState();
  const [removeStaff, setRemoveStaff] = useState();
  const [newOwner, setNewOwner] = useState();
  const [numStaff, setNumStaff] = useState();
  const [checkStaff, setCheckStaff] = useState();
  const [badgeString, setBadgeString] = useState();
  const [numBadgeTypes, setNumBadgeTypes] = useState(-1);
  const [imageHash, setImageHash] = useState("1234");
  const [isStaff, setIsStaff] = useState();
  const [addressIsStaff, setAddressIsStaff] = useState({});
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [copied, setCopied] = useState(false);
  const [loadingAddBadgeType, setLoadingAddBadgeType] = useState(false);
  const [notification, setNotification] = useState(null);
  const [addToken, setAddToken] = useState();
  const [badges, setBadges] = useState([]);
  const [badgeOptions, setBadgeOptions] = useState([
    <option value={-1}>No Badges Found</option>
  ]);
  const [selectedBadgeType, setSelectedBadgeType] = useState(-1);
    const [confirmingMint, setConfirmingMint] = useState(false);
    const [mustLogin, setMustLogin] = useState()
    const [collectionName, setCollectionName] = useState();
    const [symbol, setSymbol] = useState();
  const connection = useConnection();

  const loadContract = () => {
    setView("loaded");
    initContractsWithWeb3(connection.provider, contractAddress);
    setdojoNFTContract(getDojoNFTContract);
  };

  const loadData = async () => {
    const _owner = await dojoNFTContract.methods.owner().call();
    setOwner(_owner);
    const _numStaff = await dojoNFTContract.methods.totalStaff().call();
    setNumStaff(_numStaff);
    let _isStaff = false;
    if (connection.currentAddress) {
      _isStaff = await dojoNFTContract.methods.staff(connection.currentAddress);
    }
    setIsStaff(_isStaff);
    // read the current badges
      const _numBadges = await dojoNFTContract.methods.numBadgeTypes().call();
      console.log(_numBadges)
    setNumBadgeTypes(_numBadges);
    const _cards = [];
      const _badgeOptions = [<option value={-1} key={-2}>Select a badge to mint</option>];
    let badge;
    for (let i = 0; i < _numBadges; i++) {
      badge = await dojoNFTContract.methods.MetadataAddresses(i).call();
      let result = await axios(badge);

      _cards.push(
        <div className="four wide column" key={_cards.length}>
          {" "}
          <div className="ui link card">
            <div className="image">
                      <img
                          alt='NFT'
                src={
                 result.data.image
                }
              />
            </div>
            <div className="content">
              <span className="header">{result.data.name}</span>
              <div className="meta">
                <span className="date">ID: {_cards.length}</span>
              </div>
              <div className="description">{result.data.description}</div>
            </div>
          </div>
        </div>
      );
      _badgeOptions.push(
        <option key={i} value={i}>
          ID: {i} - Name: {result.data.name}{" "}
        </option>
      );
    }
    setBadges(_cards);
    setBadgeOptions(_badgeOptions);
  }

  const copyJSON = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
    navigator.clipboard.writeText(
      JSON.stringify({
        name: name,
        description: description,
          image: `https://gateway.pinata.cloud/ipfs/${imageHash}`
      })
    );
  };

  useEffect(
    () => {
      if (!dojoNFTContract) {
        return;
      } else {
        loadData();
      }
    },
    [dojoNFTContract]
  );

  const doAddStaff = () => {
    setView("loading");
    dojoNFTContract.methods
      .addStaff(addStaff)
      .send({ from: connection.currentAddress })
      .on("confirmation", () => {
        console.log("success");
        setView("manage");
        setNotification(`Successfully added staff for address ${addStaff}`);
      });
  };

  const doRemoveStaff = () => {
    setView("loading");
    dojoNFTContract.methods
      .addStaff(removeStaff)
      .send({ from: connection.currentAddress })
      .on("confirmation", () => {
        console.log("success");
        setView("manage");
        setNotification(
          `Successfully removed staff for address ${removeStaff}`
        );
      });
  };

  const doChangeOwner = () => {
    setView("loading");
    dojoNFTContract.methods
      .changeStaff(newOwner)
      .send({ from: connection.currentAddress })
      .on("confirmation", () => {
        console.log("success");
        setView("manage");
        setNotification(`Successfully changed owner to address ${newOwner}`);
      });
    };

    const doSetName = () => {
        setView("loading");
        dojoNFTContract.methods
            .setName(collectionName)
            .send({ from: connection.currentAddress })
            .on("confirmation", () => {
                console.log("success");
                setView("manage");
                setNotification(`Successfully changed collection name to ${collectionName}`);
            });
    };

    const doSetSymbol = () => {
        setView("loading");
        dojoNFTContract.methods
            .setSymbol(symbol)
            .send({ from: connection.currentAddress })
            .on("confirmation", () => {
                console.log("success");
                setView("manage");
                setNotification(`Successfully changed collection symbol to ${symbol}`);
            });
    };

  const checkAddress = async () => {
    const _addressIsStaff = await dojoNFTContract.methods
      .staff(checkStaff)
          .call();
      console.log(_addressIsStaff)
    setAddressIsStaff({
      address: checkStaff,
      isStaff: _addressIsStaff
    });
  };

  const doAddToken = () => {
    if (!connection.currentAddress) {
      console.error("Your wallet is not connected");
      return;
    }
    setConfirmingMint(true);
    dojoNFTContract.methods
      .mintToken(addToken, selectedBadgeType)
      .send({ from: connection.currentAddress })
      .on("confirmation", () => {
        console.log("success");
          setConfirmingMint(false);
          
        setNotification(
          `successfully minted badge type ${selectedBadgeType} to address ${addToken}`
        );
      });
  };

  const addBadgeType = () => {
    if (!connection.currentAddress) {
      console.error("Your wallet is not connected");
      return;
    }
    setLoadingAddBadgeType(true);
      const hash = `https://gateway.pinata.cloud/ipfs/${badgeString}`;
    console.log(hash);
    dojoNFTContract.methods
      .addBadgeType(hash)
      .send({ from: connection.currentAddress })
      .on("confirmation", () => {
          console.log("success");
          loadData();
        setLoadingAddBadgeType(false);
        setNotification("Badge Type added successfully! ");
      });
    };

    useEffect(
        () => {
      
                if (connection.provider) {
                    setMustLogin(false)
         
                }
                else {
                    setMustLogin(true)
                }
        },
        [ connection.provider]
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
          Load Existing
        </div>

        {view === "select" && (
          <div className="ui segment info-segment">
            <p>
              While anyone can load any collection, only the creator and their approved
              staff can manage it.
            </p>
                      <p>Enter the contract address for your collection below. </p>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="ui input">
              <input
                                  type="text"
                                  placeholder="Enter contract address 0x...."
                                  value={contractAddress}
                                  onChange={e => setContractAddress(connection.convertAddressToChecksum(e.target.value))}
                                  style={{'width': '30em'}}
              />
            </div>
            <button className="ui primary button" onClick={loadContract}>
              Load Collection
            </button>
                      </div>
                      </div>
        )}
        {view === "loading" && (
          <div className="ui icon message">
            <i className="notched circle loading icon" />
            <div className="content">
              <div className="header">
                Please wait while the blockchain is confirming your transaction
              </div>
              <p>
                You can check your metamask history or a block explorer to see
                progress.
              </p>
            </div>
          </div>
        )}

        {view !== "select" && (
          <div className="ui segment info-segment">
            <h4>Collection (Contract) Loaded: {contractAddress} </h4>
                      <div style={{'marginBotton': '2em'}}>
              You can see all transactions and manage the contract
              directly at the{" "}
              <a href={`https://polygonscan.com/address/${contractAddress}`}>
                {" "}
                PoylgonScan Address{" "}
              </a>{" "}
            </div>
            <p>Choose one of the following </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="ui primary button"
                onClick={() => setView("manage")}
              >
                Manage (Owner)
              </button>
              <button
                className="ui primary button"
                onClick={() => setView("addBadge")}
              >
                Add Badges
              </button>
              <button
                className="ui primary button"
                onClick={() => setView("issue")}
              >
                Issue Tokens (NFTs)
              </button>
            </div>
          </div>
        )}
              {notification && (
                  <div className="ui positive message">
                      <i className="close icon" onClick={()=> setNotification(null)} />
                      <div className="header">{notification}</div>
                  </div>
              )}
        {view === "manage" && (
          <div className="ui segment info-segment">
            <p>
              Management tasks can be done by the owner of the contract: {owner}{" "}
            </p>
            <div>The collection has {numStaff} staff members </div>
            {numStaff > 0 && (
              <div>
                <div>
                  Enter an address to check if it is a staff member. If you are
                  not sure who you set as staff, go to the contract address on
                  Polygonscan and check the <b>addStaff</b> transactions you
                  sent.
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "2em"
                  }}
                >
                  <div className="ui input">
                    <input
                      type="text"
                      placeholder="Address to check 0x...."
                      onChange={e => setCheckStaff(e.target.value)}
                    />
                  </div>
                  <button className="ui primary button" onClick={checkAddress}>
                    Check Address
                  </button>
                </div>
                {addressIsStaff && (
                  <div>
                    <p> Address: {addressIsStaff.address} </p>
                    <p> Is Staff: {addressIsStaff.isStaff} </p>
                  </div>
                )}
              </div>
            )}
            <div>
                          <div className="ui divider" />
                          <div style={{ 'display': 'flex', 'justifyContent': 'center', 'marginBottom': '2em', }}> <h4>Add Staff Member</h4></div>
              <div>
                If you add an address as a staff member, that person can do the
                same tasks as the owner, with the exception of transfering
                ownership and adding and removing staff.
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "2em"
                }}
              >
                <div className="ui input">
                  <input
                    type="text"
                    placeholder="New staff address 0x...."
                    onChange={e => setAddStaff(e.target.value)}
                  />
                </div>
                <button className="ui primary button" onClick={doAddStaff}>
                  Add Staff
                </button>
              </div>
            </div>

            <div>
                          <div className="ui divider" />
                          <div style={{ 'display': 'flex', 'justifyContent': 'center', 'marginBottom': '2em', }}> <h4>Remove Staff Member</h4></div>
              <div>
                If you remove an address as a staff member, they will no longer
                be able to make badges and mint tokens
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "2em"
                }}
              >
                <div className="ui input">
                  <input
                    type="text"
                    placeholder="Staff address 0x...."
                    onChange={e => setRemoveStaff(e.target.value)}
                  />
                </div>
                <button className="ui primary button" onClick={doRemoveStaff}>
                  Remove Staff
                </button>
              </div>
            </div>
            <div>
                          <div className="ui divider" />
                          <div style={{ 'display': 'flex', 'justifyContent': 'center', 'marginBottom': '2em', }}> <h4>Set Collection Name</h4></div>
              <div>
                The name of the collection is how it will appear in Opensea or
                other results. For most collections, you probably want to set
                this at the beginning and never change it. It is important to set this before issuing your first NFT.
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "2em"
                }}
              >
                <div className="ui input">
                  <input
                    type="text"
                    placeholder="New collection name"
                    onChange={e => setCollectionName(e.target.value)}
                  />
                </div>
                <button className="ui primary button" onClick={doSetName}>
                  Set Collection Name
                </button>
              </div>
            </div>
            <div>
                          <div className="ui divider" />
                          <div style={{ 'display': 'flex', 'justifyContent': 'center', 'marginBottom': '2em', }}> <h4>Set Collection Symbol</h4></div>
              <div>
                The symbol is usually three or four letters. For instance, the
                symbol for United States Dollars is USD, the symbol for bitcoin
                is btc, etc. Again, you will likley set this only once when the
                contract is created. It is important to set this before issuing your first NFT. 
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "2em"
                }}
              >
                <div className="ui input">
                  <input
                    type="text"
                    placeholder="New symbol...."
                    onChange={e => setSymbol(e.target.value)}
                  />
                </div>
                <button className="ui primary button" onClick={doSetSymbol}>
                  Set Symbol
                </button>
              </div>
            </div>
            <div>
                          <div className="ui divider" />
                          <div style={{ 'display': 'flex', 'justifyContent': 'center', 'marginBottom': '2em', }}> <h4>Change Owner</h4></div>
              <div>
                <span style={{ color: "red" }}> WARNING: </span>Changing the
                owner of a collection is IRREVERSABLE. Unless, of course, the
                new owner changes it back. Sometimes you might want to 'burn' a
                collection, to ensure that the rarity is locked and no more
                tokens can ever be issued. In that case, first remove all staff,
                and secondly transfer the owner of the collection to the{" "}
                <b>dead address</b> 0x000000000000000000000000000000000000dead
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "2em"
                }}
              >
                <div className="ui input">
                  <input
                    type="text"
                    placeholder="New owner address 0x...."
                    onChange={e => setNewOwner(e.target.value)}
                  />
                </div>
                <button className="ui primary button" onClick={doChangeOwner}>
                  Change Owner
                </button>
              </div>
            </div>
          </div>
        )}
        {view === "addBadge" && (
          <div className="ui segment info-segment">
            <h4>Add New Badge</h4>
            <p>
              Adding badges can be done by owner of the contract: {owner} or
              staff members.
            </p>
            <div>The collection has {numStaff} staff members </div>
            {isStaff ? (
              <div> You are a staff member</div>
            ) : (
              <div> You are not currently logged in as a staff member </div>
            )}
            <div>
              <div className="ui divider" style={{ marginBottom: "1em" }} />
              <div style={{ marginBottom: "2em" }}>
                To add a new badge to a collection, follow these steps: Note:
                You can store the image and json file on any server (ie your
                dojang's web site). However, NFTs are generally more trusted and
                valued when stored on IPFS because this ensures that the NFT
                image and metadata will be available if your dojang site goes
                down. It is also free and super easy to follow the steps below.
              </div>
              <div style={{ marginBottom: "1em" }}>
                <p>
                  {" "}
                  <b>Note:</b> Steps 1-4 are just a step by step way to generate
                  the json location in step 5. Once you get comfortable with the
                  process, you can just paste the JSON location in step 5 and
                  click to add the badge there.{" "}
                </p>
              </div>
              <div style={{ marginBottom: "1em" }}>
                {" "}
                <b> 1. Upload your NFT image </b> to your pinata.cloud account.
                This is what it will look like when you are done.{" "}
              </div>
                          <img src={"image/pinata.jpg"} width="100%" alt={'step1'} />
              <div style={{ marginBottom: "2em" }}>
                {" "}
                <b> 2. Copy the Content Id (CID) </b> and paste it below along
                with the name and description. Once you have pasted in the CID,
                you can verify that the image loads and copy the JSON string to
                the clibpoard. Note: The image might take a while to load for
                the first time - don't worry, Opensea will cache this.
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2em"
                  }}
                >
                  <div
                    className="ui input"
                    style={{ width: "35em", marginRight: "4em" }}
                  >
                    <input
                      type="text"
                      placeholder="Image CID..."
                      onChange={e => setImageHash(e.target.value)}
                    />
                  </div>
                  <button
                    className="ui primary button"
                    onClick={() =>
                        window.open(`https://gateway.pinata.cloud/ipfs/${imageHash}`, "_blank")
                    }
                  >
                    Verify Image
                  </button>
                </div>
                <div
                  className="ui input"
                  style={{ width: "35em", marginBottom: "2em" }}
                >
                  <input
                    type="text"
                    placeholder="Name..."
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div
                  className="ui input"
                  style={{ width: "35em", marginBottom: "2em" }}
                >
                  <input
                    type="text"
                    placeholder="Description"
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2em"
                }}
              >
                {copied === true ? (
                  <button className="ui disabled button">Copied!</button>
                ) : (
                  <button className="ui primary button" onClick={copyJSON}>
                    Copy JSON to Clipboard
                  </button>
                )}
              </div>
              <div style={{ marginBottom: "1em" }}>
                <b> 3. Open any text editor </b> like notepad and paste in the
                copied JSON. Optional/Advanced: You can add in attributes,
                animations (GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are
                supported by opensea), youtube videos, etc to your badges. Just
                make sure you follow the{" "}
                <a href="https://docs.opensea.io/docs/metadata-standards">
                  {" "}
                  standards.{" "}
                </a>
              </div>
              <div style={{ marginBottom: "1em" }}>
                <b> 4. Save the file </b> with any name, but make sure you save
                it as a .json file. In notepad, do 'save as all files' and type
                json
              </div>
              <div style={{ marginBottom: "1em" }}>
                <b> 5. Now, upload this .json file to pinata </b> and paste in
                the CID below. You can verify that the .json file loads in a new
                browser window. It will probably look similar to your text file,
                something like the image below. Note, you can get free browser
                plugins that will make the JSON look nice if you use more
                complicated ones.
              </div>
                          <img src={"image/json.jpg"} width="100%" alt={'tutorial screencap'}/>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2em"
                  }}
                >
                  <div
                    className="ui input"
                    style={{ width: "35em", marginRight: "4em" }}
                  >
                    <input
                      type="text"
                      placeholder="Metadata CID..."
                      onChange={e => setBadgeString(e.target.value)}
                    />
                  </div>
                  <button
                    className="ui primary button"
                    onClick={() =>
                      window.open(
                        `https://gateway.pinata.cloud/ipfs/${badgeString}`,
                        "_blank"
                      )
                    }
                  >
                    Verify Metadata
                  </button>
                </div>

                <div style={{ marginBottom: "1em" }}>
                  <b>6. Click to send a transaction </b> to record the badge in
                  the contract. A notification should pop up in your metamask
                  browser extension for you to approve the transaction and the
                  gas fee. You only have to add each badge once, and then you
                  can issue unlimited tokens (NFTs) of that badge.
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      margin: "2em"
                    }}
                  >
                    {loadingAddBadgeType ? (
                      <button className="ui loading button">
                        Sending TX to blockchain...
                      </button>
                    ) : (
                      <button
                        className="ui primary button"
                        onClick={addBadgeType}
                      >
                        Add Badge Type
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {view === "issue" && (
          <div className="ui segment info-segment">
            <p>
              Issuing tokens can be done by designated staff and the owner of
              the contract: {owner}{" "}
            </p>
            <div>The collection has {numStaff} staff members </div>
            {numStaff > 0 && (
              <div>
                <div>
                  Enter an address to check if it is a staff member. If you are
                  not sure who you set as staff, go to the contract address on
                  Polygonscan and check the <b>addStaff</b> transactions you
                  sent.
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "2em"
                  }}
                >
                  <div className="ui input">
                    <input
                      type="text"
                      placeholder="Address to check 0x...."
                      onChange={e => setCheckStaff(e.target.value)}
                    />
                  </div>
                  <button className="ui primary button" onClick={checkAddress}>
                    Check Address
                  </button>
                </div>
              </div>
            )}
            <div>
              <div className="ui divider" />
              <div>
                To issue a token, enter the new owner's address and the badge
                type. You may also issue tokens to yourself for now and then
                transfer or sell them later.
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "2em"
                }}
              >
                <label>
                                  Mint Badge: 
                  <select className="ui dropdown" style={{'marginLeft': '1em'} } onChange={e => setSelectedBadgeType(e.target.value)}>
                    {badgeOptions}
                  </select>
                </label>
                              <div className="ui input" style={{'width':'30em'}}>
                  <input
                    type="text"
                    placeholder="Mint to address 0x...."
                    onChange={e => setAddToken(e.target.value)}
                  />
                </div>

                {confirmingMint ? (
                  <button className="ui loading button">
                    Sending TX to blockchain...
                  </button>
                ) : (
                  <button className="ui primary button" onClick={doAddToken}>
                    Mint Token (NFT)
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
              {dojoNFTContract && <div className="ui segment info-segment">
                  <h4>Existing Badges In Contract</h4>
                  {numBadgeTypes === -1 && (
                      <div>
                          Loading Badge Types for this collection
                          <div className="ui loader active" />
                      </div>
                  )}
                  {numBadgeTypes === 0 && (
                      <div>
                          No badge types found for this collection. Please add one above to
              issue NFTs.{" "}
                      </div>
                  )}
                  {numBadgeTypes > 0 && (
                      <div className="ui stackable grid"> {badges} </div>
                  )}
              </div>}
      </div>
    </>
  );
};

export default Load;
