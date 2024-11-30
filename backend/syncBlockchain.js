// syncBlockchain.js
import Web3 from 'web3';
import mongoose from 'mongoose';
import Balance from './models/Balance.js';  // Note the .js extension for local imports
import Transaction from './models/BTransaction.js';

// Connect to Ganache
const web3 = new Web3('http://localhost:7545'); // Ganache default RPC URL

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/campusPoints', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Fetch and save user balances to MongoDB
async function fetchAndSaveBalance(address) {
  const balanceWei = await web3.eth.getBalance(address);
  const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

  const existingBalance = await Balance.findOne({ address: address });

  if (existingBalance) {
    existingBalance.balance = balanceEther;
    existingBalance.updatedAt = Date.now();
    await existingBalance.save();
  } else {
    const newBalance = new Balance({
      address: address,
      balance: balanceEther
    });
    await newBalance.save();
  }
}

// Monitor new transactions and save them to MongoDB
async function fetchTransactionDetails(txHash) {
  const receipt = await web3.eth.getTransactionReceipt(txHash);
  const tx = await web3.eth.getTransaction(txHash);

  if (receipt && tx) {
    const newTransaction = new Transaction({
      hash: txHash,
      from: tx.from,
      to: tx.to,
      amount: web3.utils.fromWei(tx.value, 'ether'),
      status: receipt.status ? 'Success' : 'Failed'
    });
    await newTransaction.save();
  }
}

// Sync all user balances with Ganache
async function syncBalances() {
  const accounts = await web3.eth.getAccounts();
  for (const account of accounts) {
    await fetchAndSaveBalance(account);
  }
}

// Sync new transactions
async function monitorNewTransactions() {
  const latestBlock = await web3.eth.getBlockNumber();
  const block = await web3.eth.getBlock(latestBlock, true); // Get block with transactions

  for (const tx of block.transactions) {
    await fetchTransactionDetails(tx.hash);
  }
}

// Set intervals to sync data periodically
setInterval(syncBalances, 10000); // Sync every 10 seconds
setInterval(monitorNewTransactions, 10000); // Check for new transactions every 10 seconds
