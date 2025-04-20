'use client';

import { useState, useEffect } from 'react';
import { getResumesByUserId } from '@/lib/actions/resume.actions';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import AddResume from '@/components/common/AddResume';
import ResumeCard from '@/components/common/ResumeCard';

const DashboardCards = () => {
  const [resumes, setResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded, isSignedIn } = useUser();

  const getResumes = async () => {
    if (user?.id) {
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
            <div
              key={i}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm"
            >
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <div className="flex justify-end space-x-2 mt-4">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
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

          <AddResume />
        </div>
      )}
    </>
  );
};

export default DashboardCards;
