'use client';

import { useState, useEffect } from 'react';
import { fetchUserResumes } from '@/lib/actions/resume.actions';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import AddResume from '@/components/common/AddResume';
import ResumeCard from '@/components/common/ResumeCard';

const DashboardCards = () => {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchResumes = async () => {
      if (user?.id) {
        try {
          const fetchedResumes = await fetchUserResumes(user?.id);
          console.log('fetchedResumes', fetchedResumes);
          setResumes(JSON.parse(fetchedResumes as string));
        } catch (error) {
          console.error('Error fetching resumes:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResumes();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AddResume />
      {resumes &&
        resumes?.length > 0 &&
        resumes?.map((resume) => (
          <ResumeCard
            key={resume._id}
            resume={resume}
            refreshResumes={() => {}}
          />
        ))}
    </div>
  );
};

export default DashboardCards;
