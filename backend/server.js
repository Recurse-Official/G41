const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');  // Connect to Ganache

// ABI of the contract (adjust it as per your contract's ABI)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
];

// Replace with the actual contract address from Ganache
const contractAddress = '0xf8887bf3bc625b57974131ca4c6c7bdd49a763afa6556dffa62e5eea63625037'; // Replace with actual contract address

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function fetchLogs() {
  try {
    const latestBlock = await web3.eth.getBlockNumber();
    console.log('Latest Block:', latestBlock);

    const logs = await web3.eth.getPastLogs({
      fromBlock: latestBlock,   // Get logs from the latest block
      toBlock: latestBlock,     // Limit to just this block
      address: contractAddress, // Filter by contract address
      topics: [web3.utils.sha3('Transfer(address,address,uint256)')] // Event signature
    });

    if (logs.length === 0) {
      console.log('No logs found in the latest block');
    } else {
      console.log('Transaction Logs:', logs);
      // Decode the logs
      logs.forEach((log) => {
        try {
          const decodedLog = contract.events.Transfer.decode(log);
          console.log(decodedLog);
        } catch (error) {
          console.error('Error decoding log:', error);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching logs:', error);
  }
}

// Call the fetchLogs function after some delay to ensure the event is logged
setTimeout(fetchLogs, 5000); // 5 seconds delay to allow transaction to be mined
