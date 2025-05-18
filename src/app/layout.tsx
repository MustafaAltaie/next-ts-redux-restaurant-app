// import './globals.css';
import { Providers } from './Providers';

export const metadata = {
  title: 'Your App Title',
  description: 'App description here',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}