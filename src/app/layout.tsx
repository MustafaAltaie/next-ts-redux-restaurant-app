import './globals.css';
import { Providers } from './Providers';
import { Dosis } from 'next/font/google';

const dosis = Dosis({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Your App Title',
  description: 'App description here',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={dosis.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}