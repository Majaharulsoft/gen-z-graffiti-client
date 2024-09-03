import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterComponent from '@/components/FooterComponent';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gen-z Graffiti',
  description:
    'The artwork found on an urban wall, blending the old-school graffiti style with a modern, digital aesthetic. Would you like me to create an image based on this description?',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <div className='container min-h-[75vh] my-4 lg:my-8'>{children}</div>
        <Toaster position="top-center" reverseOrder={false}/> 
        <FooterComponent />
        <div id='modal-root-content' />
        <GoogleAnalytics gaId='G-578NYEMVH7' />
      </body>
    </html>
  );
}
