'use client'

import { useState } from 'react'
import Web3 from 'web3'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function TransferPage() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [account, setAccount] = useState<string | null>(null) // Store account info

  // Function to connect to Ganache and fetch account
  const connectBlockchain = async () => {
    const web3 = new Web3("http://127.0.0.1:7545"); // Ganache RPC URL
    const accounts = await web3.eth.getAccounts(); // Get accounts from Ganache
    setAccount(accounts[0]); // Set the first account as the default wallet
  };

  // Function to send transaction to the recipient
  const sendTransaction = async () => {
    if (!account || !recipient || !amount) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    const web3 = new Web3("http://127.0.0.1:7545"); // Ganache RPC URL

    const tx = {
      from: account,
      to: recipient,
      value: web3.utils.toWei(amount, "ether"),
    };

    try {
      await web3.eth.sendTransaction(tx); // Send the transaction
      setMessage({ type: 'success', text: `Transferred ${amount} ETH to ${recipient}` });
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error("Error sending transaction:", error);
      setMessage({ type: 'error', text: 'Transaction Failed!' });
    }
  };

  // Trigger blockchain connection on initial load if not connected
  if (!account) {
    connectBlockchain();
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Transfer Points</CardTitle>
          <CardDescription>Send Campus Points to another user</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); sendTransaction(); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient's ID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to transfer"
                required
                min="1"
              />
            </div>
            <Button type="submit" className="w-full">Transfer</Button>
          </form>
        </CardContent>
        <CardFooter>
          {message && (
            <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
              {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
