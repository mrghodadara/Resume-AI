'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="backdrop-blur-md w-full border-t border-gray-800">
      <div className="w-full mx-auto text-center max-w-screen-xl p-4 flex max-md:flex-col md:items-center md:justify-between">
        <span className="text-sm text-gray-400 sm:text-center">
          © {new Date().getFullYear()}{' '}
          <span className="hover:text-primary-500 hover:cursor-pointer transition-colors">
            ResumeAI™
          </span>
          . All Rights Reserved.
        </span>
        <Link
          href="https://github.com/mrghodadara"
          target="_blank"
          rel="noopener noreferrer"
          className="me-4 md:me-6"
        >
          <span className="hover:text-primary-500 mt-3 text-sm font-medium text-gray-400 sm:mt-0 transition-colors">
            Made with ❤️ by Vivek Ghodadara
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
