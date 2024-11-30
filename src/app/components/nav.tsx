'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavProps {
  role: 'student' | 'merchant' | 'university'; // Define the available roles
}

const navItems = {
  student: [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/transfer', label: 'Transfer' },
    { href: '/deposit', label: 'Deposit' },
    { href: '/history', label: 'History' },
    { href: '/offers', label: 'Offers' },
    { href: '/profile', label: 'Profile' },
  ],
  merchant: [
    { href: '/', label: 'Home' },
    { href: '/merchant-dashboard', label: 'Merchant Dashboard' },
    
    { href: '/merchant-offers', label: 'Offers' },  // Added Offers
    { href: '/merchant-withdraw', label: 'Withdraw' },  // Added Withdraw
    { href: '/merchant-profile', label: 'Profile' },
  ],
  university: [
    { href: '/', label: 'Home' },
    { href: '/university-dashboard', label: 'University Dashboard' },
    { href: '/university-settings', label: 'Settings' },
    { href: '/university-reports', label: 'Reports' },
  ],
}

export function Nav({ role }: NavProps) {
  const pathname = usePathname()

  // Ensure a default role if none is provided
  const userRole = role || 'student'; // Default to 'student' if role is undefined

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-primary">Campus Points</Link>
          <ul className="flex space-x-4">
            {navItems[userRole].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
