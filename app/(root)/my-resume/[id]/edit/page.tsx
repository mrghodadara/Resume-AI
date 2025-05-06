import React, { use } from 'react';
import PageWrapper from '@/components/common/PageWrapper';
import Header from '@/components/layout/Header';
import { currentUser } from '@clerk/nextjs/server';
import { checkResumeOwnership } from '@/lib/actions/resume.actions';
import { redirect } from 'next/navigation';
import ResumeEditor from '@/components/layout/my-resume/ResumeEditor';
import Footer from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

const EditResume = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const isResumeOwner = await checkResumeOwnership(user?.id || '', params.id);

  if (!isResumeOwner) {
    return redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />
      <div className="min-h-screen bg-gray-950 pt-16">
        <Container className="py-8 flex flex-col gap-8">
          <div>
            <h2 className="text-center text-2xl font-bold text-white">
              Edit Your Resume
            </h2>
            <p className="text-center text-gray-400">
              Please provide the necessary information for your resume.
            </p>
          </div>

          <ResumeEditor params={params} userId={user?.id} />
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default EditResume;
