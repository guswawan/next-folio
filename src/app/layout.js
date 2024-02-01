import { Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { Provider } from '@/components/provider/Provider';

const plusjakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Devscale x Portfolio',
  description: 'Discover Devscale Top Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusjakarta.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
