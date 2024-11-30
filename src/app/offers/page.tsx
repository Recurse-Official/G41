'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

// Mock offers data
const initialOffers = [
  { id: 1, name: 'Campus Cafe Special', description: '20% off on all items', pointsRequired: 500 },
  { id: 2, name: 'Book Store Discount', description: '10% off on textbooks', pointsRequired: 300 },
  { id: 3, name: 'Gym Membership', description: 'Free 1-month gym membership', pointsRequired: 1000 },
]

export default function OffersPage() {
  const [offers, setOffers] = useState(initialOffers)
  const [userBalance, setUserBalance] = useState(1500) // Mock user balance
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleRedeem = (offerId: number, pointsRequired: number) => {
    if (userBalance >= pointsRequired) {
      setUserBalance(prevBalance => prevBalance - pointsRequired)
      setMessage({ type: 'success', text: 'Offer redeemed successfully!' })
    } else {
      setMessage({ type: 'error', text: 'Insufficient balance to redeem this offer.' })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Special Offers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Balance</CardTitle>
          <CardDescription>Available Campus Points</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-primary">{userBalance} Points</p>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader>
              <CardTitle>{offer.name}</CardTitle>
              <CardDescription>{offer.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{offer.pointsRequired} Points Required</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleRedeem(offer.id, offer.pointsRequired)}
                disabled={userBalance < offer.pointsRequired}
                className="w-full"
              >
                Redeem Offer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {message && (
        <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
          {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

