import './globals.css'
import { Inter } from 'next/font/google'
import { Nav } from './components/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Campus Points System',
  description: 'A digital currency system for campus transactions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main className="container mx-auto p-4 pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}

