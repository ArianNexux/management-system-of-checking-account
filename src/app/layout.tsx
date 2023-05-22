import { ReactNode } from 'react'

import './globals.css'
import { Roboto, Poppins } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '500', '700', '900'],
  variable: '--font-roboto',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Conta corrente',
  description: 'Desenvolvente um sistema de conta corrente',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${poppins.variable} bg-gray-50 font-sans text-gray-900`}
      >
        {children}
      </body>
    </html>
  )
}
