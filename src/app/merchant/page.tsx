'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

// Mock data for recent transactions
const initialTransactions = [
  { id: 1, studentName: 'Alice', amount: 50, timestamp: '2023-05-01 11:30' },
  { id: 2, studentName: 'Bob', amount: 75, timestamp: '2023-05-02 13:45' },
  { id: 3, studentName: 'Charlie', amount: 100, timestamp: '2023-05-03 15:20' },
]

export default function MerchantPage() {
  const [balance, setBalance] = useState(5000)
  const [receiveAmount, setReceiveAmount] = useState('')
  const [transactions, setTransactions] = useState(initialTransactions)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleReceivePoints = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(receiveAmount)
    if (isNaN(amount) || amount <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' })
      return
    }

    const newBalance = balance + amount
    const newTransaction = {
      id: transactions.length + 1,
      studentName: 'New Student',
      amount: amount,
      timestamp: new Date().toLocaleString()
    }

    setBalance(newBalance)
    setTransactions([newTransaction, ...transactions])
    setReceiveAmount('')
    setMessage({ type: 'success', text: `Received ${amount} Campus Points` })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
            <CardDescription>Your Campus Points balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{balance} Points</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Receive Points</CardTitle>
            <CardDescription>Accept payment from students</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReceivePoints} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receiveAmount">Amount</Label>
                <Input
                  id="receiveAmount"
                  type="number"
                  value={receiveAmount}
                  onChange={(e) => setReceiveAmount(e.target.value)}
                  placeholder="Enter amount to receive"
                  required
                  min="1"
                />
              </div>
              <Button type="submit">Receive</Button>
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
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest payments received</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{transaction.studentName}</p>
                  <p className="text-sm text-gray-500">{transaction.timestamp}</p>
                </div>
                <p className="font-bold text-green-600">+{transaction.amount} Points</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

