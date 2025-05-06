'use client';

import { FormProvider } from '@/lib/context/FormProvider';
import React from 'react';
import ResumeEditForm from './ResumeEditForm';
import ResumePreview from './ResumePreview';

const ResumeEditor = ({
  params,
  userId,
}: {
  params: { id: string };
  userId: string | undefined;
}) => {
  if (!userId) {
    return null;
  }

  return (
    <FormProvider params={params}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-start">
        <ResumeEditForm params={params} userId={userId} />
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4">
          <ResumePreview />
        </div>
      </div>
    </FormProvider>
  );
};

export default ResumeEditor;
