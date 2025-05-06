'use client';

import DashboardCards from '@/components/layout/DashboardCards';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useUser } from '@clerk/nextjs';
import { Container } from '@/components/layout/Container';

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen flex-col bg-gray-950 text-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />
      <div className="min-h-screen bg-gray-950 text-white pt-16">
        <Container className="py-8 flex flex-col gap-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                {user?.firstName || 'User'}!
              </span>
            </h1>
            <p className="mt-1 text-gray-400">
              Manage your resumes and create new ones with ease.
            </p>
          </div>

          {/* Your Resumes */}
          <div className="flex flex-col gap-8">
            <h2 className="text-xl font-semibold text-white">Your Resumes</h2>
            <DashboardCards />
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default Dashboard;
