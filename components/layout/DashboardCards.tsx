'use client';

import { useState, useEffect } from 'react';
import { getResumesByUserId } from '@/lib/actions/resume.actions';
import { useUser } from '@clerk/nextjs';
import AddResume from '@/components/common/AddResume';
import ResumeCard from '@/components/common/ResumeCard';
import ResumeCardSkeleton from '@/components/common/ResumeCardSkeleton';
import { Micro_5 } from 'next/font/google';

const DashboardCards = () => {
  const [resumes, setResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded, isSignedIn } = useUser();

  const getResumes = async () => {
    if (user?.id) {
      setIsLoading(true);

      getResumesByUserId(user?.id)
        .then((response) => {
          setResumes(response);
        })
        .catch((error) => {
          console.error('Error fetching resumes:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getResumes();
    }
  }, [isLoaded, isSignedIn]);

  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <ResumeCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {resumes &&
            resumes?.length > 0 &&
            resumes?.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                refreshResumes={getResumes}
              />
            ))}

          <AddResume refreshResumes={() => getResumes()} />
        </div>
      )}
    </>
  );
};

export default DashboardCards;
