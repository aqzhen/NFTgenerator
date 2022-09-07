import React, { useEffect, useState } from 'react';
import './styles/App.css';
import myNFT from './utils/myNFT.json';
import { ethers } from "ethers"



const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const CONTRACT_ADDRESS = "0xD53c8CDbED0f24870403cA610b1e36c3bbF93E87";
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [URL, setURL] = useState("");
  const [explorerURL, setExplorerURL] = useState("")

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    /*
    * Check if we're authorized to access the user's wallet
    */
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    /*
    * User can have multiple authorized accounts, we grab the first one if its there!
    */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      setupEventListener();
    } else {
      console.log("No authorized account found")
    }
  }

  /*
* Implement your connectWallet method here
*/
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setupEventListener();
    } catch (error) {
      console.log(error)
    }
  }

  // Setup our listener to collect tokenID event
  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myNFT.abi, signer);

        connectedContract.on("NewNFTMinted", (from, tokenId) => {
          setURL(`https://testnets.opensea.io/assets/rinkeby/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {

    try {
      const { ethereum } = window;

      if (ethereum) {
        setIsMinted(false);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myNFT.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeNFT();

        setIsMinting(true);
        setExplorerURL(`https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

        console.log("Mining...please wait.")
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        setIsMinting(false);
        setIsMinted(true);


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Fraternity House Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          <p className="explanation-text">
            Generate an NFT on the Rinkeby Testnet with a unique three letter frat name!
          </p>

          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
          )}
        </div>
        {isMinting === true &&
          <div className="sub-text">Minting...</div> && <a target="_blank" rel="noopener noreferrer" className="link-text" href={explorerURL}>While you're waiting, checkout out the transaction on Rinkeby's block explorer</a>}

        {isMinted === true &&
          <a target="_blank" rel="noopener noreferrer" className="link-text" href={URL}>Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 5 min to show up on OpenSea. Click here to go to OpenSea! </a>}




      </div>
    </div>
  );
};

export default App;