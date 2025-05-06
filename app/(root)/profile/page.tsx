'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { UserProfile } from '@clerk/nextjs';
import { Container } from '@/components/layout/Container';

const Profile = () => {
  return (
    <main className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />
      <div className="min-h-screen bg-gray-950 text-white pt-16">
        <Container className="py-8 flex flex-col gap-8">
          <div className="text-white flex justify-center items-center flex-col">
            <UserProfile routing="path" path="/profile" />
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default Profile;
