import React, { useState } from 'react';
import Web3 from 'web3';

const BlockchainIntegrationWidget = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

  const connectWallet = async () => {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    const balance = await web3.eth.getBalance(accounts[0]);
    setBalance(web3.utils.fromWei(balance, 'ether'));
  };

  const sendTransaction = async () => {
    try {
      const transaction = await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: web3.utils.toWei(transferAmount, 'ether'),
      });
      setTransactionHash(transaction.transactionHash);
    } catch (error) {
      console.error('Transaction Error:', error);
    }
  };

  return (
    <div className="widget blockchain-integration">
      <h3>Blockchain Integration</h3>
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
        {account && (
          <div>
            <p><strong>Account:</strong> {account}</p>
            <p><strong>Balance:</strong> {balance} ETH</p>
          </div>
        )}
      </div>
      {account && (
        <div>
          <h4>Send Transaction</h4>
          <div>
            <label>Recipient:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div>
            <label>Amount (ETH):</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
          <button onClick={sendTransaction}>Send</button>
          {transactionHash && (
            <div>
              <p><strong>Transaction Hash:</strong> {transactionHash}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlockchainIntegrationWidget;
