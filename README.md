# NFT Generator

Welcome to the FratPunks collection! This is the place to be if you want to pseudo-randomly generate and deploy your very own frat-themed NFT art piece on the Ethereum Rinkeby testnet.

# What exactly are you doing here?

I (the developer) have deployed a smart contract to the public Ethereum blockchain, albeit on the Rinkeby testnet (where real funds aren't used). This smart contract, when called pseudorandomly (by hashing a predetermined string using Keccak256 and casting to an int) selects three greek alphabet characters to concatenate in order to represent the name of a fraternity. The reason this process cannot be truly random is simply due to the deterministic nature of the blockchain.

When a user connects their wallet (through Metamask, one of the most common EOA hot wallet options on Google Chrome), they effectively "login" to the website by verifying their identity (private key) of their wallet.

After this authentication process, the user can then mint an NFT by calling the smart contract's mintNFT() function. This process is completed once the user sends enough ETH to cover the gas transaction fee (the cost of completing a transaction on the blockchain).

Upon an NFT being minted, the user will now own the unique NFT, and can access their collection of NFTs through Opensea, the dashboard for all-things NFT in web3.

# How to use it?

Go to [the deployed website](https://www.andrewzhen.com/NFTgenerator/)

## Download Metamask and set up a wallet

https://metamask.io/download/

## Obtain Rinkeby Eth from a faucet

Get your wallet's public address like [this](https://metamask.zendesk.com/hc/en-us/articles/360015488791-How-to-view-your-account-details-public-address#:~:text=To%20find%20your%20account's%20address,to%20tap%20a%20few%20times.&text=You%20will%20then%20see%3A,QR%20code%20for%20your%20account) and navigate to a faucet in order to receive some free test ETH. Below are some options:

https://rinkebyfaucet.com/
https://faucets.chain.link/rinkeby

## Login + Sign Transactions

Make sure you have enough test ETH to sign the bellow transactions!

Click the Connect Wallet button and sign the transaction - this effectively "logs" you into the app.

Click `Mint NFT` and sign the transaction, paying the transaction fee.

While you're waiting for your NFT to be minted to your wallet, you can checkout the link to the block explorer, where you can see the progress of your transaction, as well as its "location" on the blockchain!

Finally, click the link to view your newly-minted NFT on Opensea. Congratulations! You've minted your very own, unique, Frat NFT!
