'use client';

import { useState, useEffect } from 'react';
import Web3 from 'web3';  // Import web3.js
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Initialize web3 and set up Ganache provider
  const web3 = new Web3('http://127.0.0.1:7545'); // Ganache local provider

  // Replace with your contract address
  const contractAddress = '0x030C030447324780CB5ed454101a1ef26704f2F0'; 
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

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Fetch transaction logs from the blockchain
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const latestBlock = await web3.eth.getBlockNumber();
        const logs = await web3.eth.getPastLogs({
          fromBlock: 0,
          toBlock: latestBlock,
          address: contractAddress
        });

        // Decode logs based on ABI
        const formattedLogs = logs.map((log: any) => {
          try {
            const decoded = contract.events.Transfer.decode(log);
            return {
              id: log.transactionHash,
              date: new Date(log.timestamp * 1000).toLocaleDateString(),
              time: new Date(log.timestamp * 1000).toLocaleTimeString(),
              transactionId: log.transactionHash,
              type: 'Transfer',
              amount: web3.utils.fromWei(decoded.amount, 'ether'),
              from: decoded.from,
              to: decoded.to,
            };
          } catch (error) {
            console.error('Error decoding log:', error);
            return null;
          }
        }).filter((log: any) => log !== null);

        setTransactions(formattedLogs);
      } catch (error) {
        console.error('Error fetching transaction logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [web3]);

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  // Filter transactions based on type
  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter((t) => t.type.toLowerCase() === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transaction History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
          <CardDescription>View and filter your transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Select onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
              </SelectContent>
            </Select>
            <Button>Export to CSV</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction: any) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.time}</TableCell>
                    <TableCell>{transaction.transactionId}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell className={`text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
