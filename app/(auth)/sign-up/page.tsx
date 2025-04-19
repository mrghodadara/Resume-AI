import { SignUp } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
  return (
    <div className="flex h-screen items-center justify-center flex-col p-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_50%)] " />
      <SignUp
        forceRedirectUrl={'/'}
        routing="hash"
        appearance={{
          elements: {
            cardBox: 'min-w-[480px]',
          },
        }}
      />
    </div>
  );
};

export default Page;
