'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

const CONVERSION_RATE = 10 // 1 INR = 10 Campus Points

export default function DepositPage() {
  const [amount, setAmount] = useState('')
  const [points, setPoints] = useState(0)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    setPoints(parseFloat(amount) * CONVERSION_RATE || 0)
  }, [amount])

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to process the deposit
    if (amount && parseFloat(amount) > 0) {
      setMessage({ type: 'success', text: `Deposited ${amount} INR (${points} Campus Points)` })
      setAmount('')
    } else {
      setMessage({ type: 'error', text: 'Please enter a valid amount' })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Deposit Money</CardTitle>
          <CardDescription>Convert INR to Campus Points</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeposit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (INR)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in INR"
                required
                min="1"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              You will receive: {points} Campus Points
            </p>
            <Button type="submit" className="w-full">Deposit</Button>
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
  )
}

