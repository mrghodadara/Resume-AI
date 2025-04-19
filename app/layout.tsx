import type { Metadata } from 'next';
import { IBM_Plex_Serif, Inter, Nunito } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import Providers from '@/components/common/ProgressBarProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'ResumeAI - Create Professional Resumes with AI',
  description:
    'Create professional resumes with the help of AI. Get personalized suggestions and templates to make your resume stand out.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        layout: {
          socialButtonsPlacement: 'bottom',
          logoImageUrl: '/icons/logo.svg',
          animations: true,
        },
        baseTheme: dark,
        variables: { colorPrimary: '#0ea5e9', colorBackground: '#101828' },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${nunito.variable} font-inter`}>
          <Providers>{children}</Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
