import { createContext, useContext, useState } from 'react';
import Web3 from 'web3';

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <Web3Context.Provider value={{ web3, account, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}