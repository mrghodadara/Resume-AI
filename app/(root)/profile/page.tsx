'use client';

import DashboardCards from '@/components/layout/DashboardCards';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useUser, UserProfile } from '@clerk/nextjs';

const Profile = () => {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="pt-16">
        <div className="text-white flex justify-center h-[calc(100dvh-122px)]  items-center">
          <UserProfile routing="path" path="/profile" />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Profile;
