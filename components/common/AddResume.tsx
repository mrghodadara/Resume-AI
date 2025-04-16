'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const AddResume = () => {
  return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-primary-500/50 transition-colors">
      <CardContent className="flex flex-col items-center justify-center p-6 h-full">
        <Button
          variant="ghost"
          className="w-full h-full flex flex-col items-center justify-center space-y-2 text-gray-400 hover:text-primary-500 hover:bg-primary-500/10"
          asChild
        >
          <Link href="/create-resume">
            <Plus className="h-8 w-8" />
            <span className="text-sm font-medium">Create New Resume</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddResume;
