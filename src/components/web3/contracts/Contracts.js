import dojoNFTABI  from './abis/dojoNFTABI';

let dojoNFTContract = null;
function getDojoNFTContract() {
    return dojoNFTContract;
}


function initContractsWithWeb3(web3, contractAddress) {
    console.log(dojoNFTABI)
    console.log(web3)
    dojoNFTContract = new web3.eth.Contract(dojoNFTABI, contractAddress);

}

export { getDojoNFTContract, initContractsWithWeb3}