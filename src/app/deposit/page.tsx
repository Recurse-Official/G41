'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Script from 'next/script';

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.paypal && amount && parseFloat(amount) > 0) {
      setLoading(true);  // Start loading when amount is valid
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';  // Clear any previous PayPal button
        
        window.paypal.Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: parseFloat(amount).toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              setLoading(false);  // Stop loading after transaction is approved
              setMessage({
                type: 'success',
                text: `Transaction completed by ${details.payer.name.given_name}.`,
              });
            });
          },
          onError: function (err) {
            setLoading(false);  // Stop loading if there is an error
            setMessage({ type: 'error', text: 'Transaction failed. Please try again.' });
            console.error('Transaction Error:', err);
          },
        }).render('#paypal-button-container');
      }
    }
  }, [amount]);

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Deposit Money</CardTitle>
          <CardDescription>Enter amount to convert and pay</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in USD"
                required
                min="1"
              />
            </div>
            <div id="paypal-button-container" className="mt-4"></div>
          </div>
        </CardContent>
        <CardFooter>
          {message && (
            <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
              {message.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
      {loading && <div>Loading PayPal Button...</div>} {/* Show loading state */}
      <Script
        src="https://www.paypal.com/sdk/js?client-id=ATdE4YOmbgn532CqDkfrTnBEe7RcJaNQ84SqRXPof78MgXrxiAzLOjFxJk9V6nnQCSM61dqqiisrYanp"
        strategy="afterInteractive"
      />
    </div>
  );
}
