'use client';

import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  UserButton,
  useUser,
  SignInButton,
  SignUpButton,
  UserProfile,
} from '@clerk/nextjs';
import { Button } from '../ui/button';

const Header = () => {
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <Container className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary-500" />
            <span className="text-xl font-bold">ResumeAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-500 ${pathname === link.href ? 'text-primary-500' : 'text-gray-300'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <>
                    <Button onClick={() => router.push('/dashboard')} className="bg-primary-500 hover:bg-primary-600 py-2 h-auto">
                      Dashboard
                    </Button>

                    <UserButton userProfileUrl="/profile" />
                  </>
                ) : (
                  <>
                    <SignInButton>
                      <Button className="border border-primary-500 hover:border-primary-600 text-primary-500 hover:text-primary-600">
                        Sign in
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button className="bg-primary-500 hover:bg-primary-600">
                        Sign up
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </Container>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <Container className="py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary-500 ${pathname === link.href
                      ? 'text-primary-500'
                      : 'text-gray-300'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </Container>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
