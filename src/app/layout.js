/* eslint-disable react/prop-types */
'use client'
import React from 'react'
import { Providers } from '@/app/provider'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children
}) {
  return (
    <html lang='en'>
      <body style={{ overflow: 'hidden' }}>
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
