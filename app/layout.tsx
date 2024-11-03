import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usman Asim',
  description: 'Personal website and portfolio',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
