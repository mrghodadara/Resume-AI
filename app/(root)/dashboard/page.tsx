'use client';

import DashboardCards from '@/components/layout/DashboardCards';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <main className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />
      <div className="min-h-screen bg-gray-950 text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="mt-2 text-gray-400">
              Manage your resumes and create new ones with ease.
            </p>
          </div>

          {/* Your Resumes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Your Resumes</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-primary-500 text-primary-500 hover:bg-primary-500/10"
                asChild
              >
                <Link href="/create-resume">
                  <Plus className="mr-2 h-4 w-4" />
                  New Resume
                </Link>
              </Button>
            </div>
            <div className="p-10 md:px-24 lg:px-48">
              <DashboardCards />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Dashboard;
