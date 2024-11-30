'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Web3 from 'web3'

// Mock data for recent transactions
const recentTransactions = [
  { id: 1, type: 'Deposit', amount: 500, timestamp: '2023-05-01 10:30' },
  { id: 2, type: 'Transfer', amount: -200, timestamp: '2023-05-02 14:15' },
  { id: 3, type: 'Received', amount: 100, timestamp: '2023-05-03 09:45' },
]

export default function DashboardPage() {
  const [balance, setBalance] = useState(1000)
  const [walletAddress, setWalletAddress] = useState(null)
  const [web3, setWeb3] = useState(null)

  // Function to connect to the local blockchain (Ganache)
  const connectBlockchain = async () => {
    // Connect to local Ganache instance
    const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache RPC URL

    // Fetch accounts from Ganache
    const accounts = await web3Instance.eth.getAccounts(); // Get accounts directly from Ganache

    // Set the first account as the default wallet
    setWalletAddress(accounts[0]);

    // Fetch and set balance of the account
    const balanceInWei = await web3Instance.eth.getBalance(accounts[0]);
    setBalance(web3Instance.utils.fromWei(balanceInWei, "ether")); // Convert from Wei to Ether

    // Optionally, store the web3 instance in state for later use
    setWeb3(web3Instance);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
            <CardDescription>Current Campus Points balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{balance} ETH</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your Campus Points</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button asChild><Link href="/deposit">Deposit</Link></Button>
            <Button asChild><Link href="/transfer">Transfer</Link></Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Connect Blockchain Section */}
      {!walletAddress ? (
        <div className="flex justify-center">
          <Button onClick={connectBlockchain} className="w-full">
            Connect Blockchain (Ganache)
          </Button>
        </div>
      ) : (
        <div className="flex justify-center">
          <p>Connected Wallet: {walletAddress}</p>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentTransactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{transaction.type}</p>
                  <p className="text-sm text-gray-500">{transaction.timestamp}</p>
                </div>
                <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount} Points
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
