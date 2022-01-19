import { useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';




const useConnection = () => {
  const [provider, setProvider] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [connection, setConnection] = useState({});
  const [networkId, setNetworkId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      provider?.eth?.requestAccounts().then((accounts) => {
        if (accounts && accounts[0] !== currentAddress) {
          console.log('setting address')
          setCurrentAddress(accounts[0])
        }
      }).catch(e => {});
    }, 5000);
    return () => clearInterval(interval);
  }, [provider, currentAddress]);

  const updateProvider = useCallback(
      (newProvider) => {
        // Unlock issues:
        //https://github.com/MetaMask/metamask-extension/issues/10368

        // Subscribe to accounts change
        newProvider.currentProvider.on('accountsChanged', (accounts) => {
          setCurrentAddress(accounts.length ? accounts[0] : null);
        });

        // Subscribe to chainId change
        newProvider.currentProvider.on('chainChanged', (chainId) => {
          setNetworkId(chainId);
        });

        setProvider(newProvider);
      },
      [],
  );

  const connectToModal = useCallback(async () => {
    console.log('connectTomodal')
    if (!web3Modal) {
      return;
    }

    await web3Modal.clearCachedProvider();
    let currProvider = await web3Modal.connect();
    //const info = await getProviderInfo(currProvider);

    window.web3 = new Web3(currProvider);
    updateProvider(window.web3);
      setNetworkId(getNetworkId());
      console.log('networkid', getNetworkId())
    await updateCurrentAddress();
  }, [web3Modal, updateProvider]);

  const updateCurrentAddress = async () => {
    const address = await window.web3.eth
      .getAccounts()
      .then(function(accounts) {
        return accounts[0];
      });

    setCurrentAddress(address);
    return address;
  };

  const getNetworkId = () => {
    if (!window.web3.currentProvider) {
      return 0;
    }

    if (window.web3.currentProvider.isMetaMask) {
      return window.web3.currentProvider.networkVersion;
    }
    else {
      return 0;
    }
  };

    const convertAddressToChecksum = (address) => {
        return Web3.utils.toChecksumAddress(address)
    }

  const getCurrentAddress = useCallback(async () => {
    while (currentAddress === null) {
      const currAddress = await updateCurrentAddress();
      return currAddress;
    }
  }, [currentAddress]);

  // Instantiate a web3Modal
  useEffect(() => {
    if (!window.web3Modal) {
      const providerOptions = {
        /*
        authereum: {
          package: Authereum
        },
        frame: {
          package: ethProvider
        },
        */
      };

      window.web3Modal = new Web3Modal({
        // TODO: change to mainnet
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
      });
    }

    window.web3Modal.connect().then(async (currProvider) => {
      window.web3 = new Web3(currProvider);
      await updateCurrentAddress();
     // await initContractsWithWeb3(window.web3);
      updateProvider(window.web3);
        setNetworkId(getNetworkId());
    });

    setWeb3Modal(window.web3Modal);
  }, [updateProvider]);

  useEffect(() => {
    setConnection({
      provider,
      currentAddress,
      connectToModal,
      getCurrentAddress,
        networkId,
      convertAddressToChecksum
    });
  }, [provider, currentAddress, connectToModal, getCurrentAddress, networkId]);

  return connection;
};

export default useConnection;
