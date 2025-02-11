import 'dotenv/config';
import Web3 from 'web3';
import ContractABI from './ContractABI.json' assert { type: 'json' };

const providerUrl = process.env.ETH_PROVIDER_URL || process.env.INFURA_URL;
if (!providerUrl) {
  throw new Error("No Ethereum provider URL defined in environment variables.");
}

const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// Retrieve the private key from environment variables
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("PRIVATE_KEY is not defined in your environment variables.");
}

// Convert the private key to an account object
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log("Account object from privateKeyToAccount:", account);

// Add the account to the wallet and set it as the default account
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
console.log("Default account set to:", web3.eth.defaultAccount);

// Check the balance of the default account (optional but recommended)
web3.eth.getBalance(web3.eth.defaultAccount).then((balance) => {
  console.log("Balance of default account:", web3.utils.fromWei(balance, 'ether'), "ETH");
}).catch(err => {
  console.error("Error fetching balance:", err);
});

const contractAddress = process.env.CONTRACT_ADDRESS;
if (!contractAddress) {
  throw new Error("CONTRACT_ADDRESS is not defined in environment variables.");
}

// Create the contract instance using the ABI. 
const contract = new web3.eth.Contract(ContractABI.abi || ContractABI, contractAddress);

export { web3, contract };


// // backend/config/web3.js
// import 'dotenv/config';
// import Web3 from 'web3';
// import ContractABI from './ContractABI.json' assert { type: 'json' };

// const providerUrl = process.env.ETH_PROVIDER_URL || process.env.INFURA_URL;
// if (!providerUrl) {
//   throw new Error("No Ethereum provider URL defined in environment variables.");
// }

// const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// const privateKey = process.env.PRIVATE_KEY;
// if (!privateKey) {
//   throw new Error("PRIVATE_KEY is not defined in your environment variables.");
// } else {
//   // Explicitly convert the private key to an account object.
//   const account = web3.eth.accounts.privateKeyToAccount(privateKey);
//   console.log("Account object from privateKeyToAccount:", account);
  
//   // Add the account to the wallet.
//   web3.eth.accounts.wallet.add(account);
  
//   // Set the default account using the account's address.
//   web3.eth.defaultAccount = account.address;
//   console.log("Default account set to:", web3.eth.defaultAccount);
// }

// const contractAddress = process.env.CONTRACT_ADDRESS;
// if (!contractAddress) {
//   throw new Error("CONTRACT_ADDRESS is not defined in environment variables.");
// }

// // Create the contract instance (if your ABI is an artifact, use ContractABI.abi)
// const contract = new web3.eth.Contract(ContractABI.abi || ContractABI, contractAddress);

// export { web3, contract };




// import Web3 from 'web3';
// import dotenv from 'dotenv';
// import ContractABI from './ContractABI.json' assert { type: 'json' };
//  // Make sure the contract ABI file is here

// // Load environment variables from .env file
// dotenv.config();

// // Choose the provider URL. This example checks for ETH_PROVIDER_URL first, then falls back to INFURA_URL.
// const providerUrl = process.env.ETH_PROVIDER_URL || process.env.INFURA_URL;
// if (!providerUrl) {
//   throw new Error("No Ethereum provider URL defined in environment variables (set ETH_PROVIDER_URL or INFURA_URL)");
// }

// // Create a new web3 instance using the provider URL
// const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// // Add the account from the PRIVATE_KEY to the wallet (for signing transactions)
// const privateKey = process.env.PRIVATE_KEY;
// if (!privateKey) {
//   console.warn("PRIVATE_KEY is not defined in your environment. Transactions that require signing will fail.");
// } else {
//   const account = web3.eth.accounts.wallet.add(privateKey);
//   // Optionally set the default account so you don't have to specify it each time
//   web3.eth.defaultAccount = account.address;
//   console.log("Default account set to:", account.address);
// }

// // Create a contract instance using the ABI and contract address
// const contractAddress = process.env.CONTRACT_ADDRESS;
// if (!contractAddress) {
//   throw new Error("CONTRACT_ADDRESS is not defined in your environment variables");
// }

// const contract = new web3.eth.Contract(ContractABI, contractAddress);

// // Export the web3 instance and the contract instance
// export { web3, contract };




// import Web3 from 'web3';
// import { readFileSync } from 'fs';

// // Load contract JSON using fs
// const contractJSON = JSON.parse(
//   readFileSync(new URL('../build/contracts/VoterRegistration.json', import.meta.url))
// );

// const provider = new Web3.providers.HttpProvider(process.env.INFURA_URL);
// const web3 = new Web3(provider);

// export const contract = new web3.eth.Contract(
//   contractJSON.abi,
//   process.env.CONTRACT_ADDRESS
// );

// export { web3 };