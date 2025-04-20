'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, MoreVertical, FileText } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import { deleteResume } from '@/lib/actions/resume.actions';
import { useToast } from '../ui/use-toast';
import { usePathname } from 'next/navigation';

const ResumeCard = ({
  resume,
  refreshResumes,
}: {
  resume: any;
  refreshResumes: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    setIsLoading(true);

    const result = await deleteResume(resume.resumeId, pathname);

    setIsLoading(false);
    setOpenAlert(false);

    if (result.success) {
      toast({
        title: 'Information saved.',
        description: 'Resume deleted successfully.',
        className: 'bg-gray-900 text-white border-gray-800',
      });

      refreshResumes();
    } else {
      toast({
        title: 'Uh Oh! Something went wrong.',
        description: result?.error,
        variant: 'destructive',
        className: 'bg-gray-900 text-white border-gray-800',
      });
    }
  };

  return (
    <div className="relative aspect-[1/1.2] flex flex-col hover:scale-105 transition-all duration-300">
      <Link href={`/my-resume/${resume.resumeId}/view`} className="flex-grow">
        <div className="bg-gray-900 rounded-lg h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
              {/* <FileText className="w-10 h-10 text-violet-500" /> */}
              <FileText className="w-10 h-10 text-primary-500" />
            </div>
          </div>
          <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-b-lg">
            <h2 className="text-sm font-medium text-gray-300 text-center">
              {resume.title}
            </h2>
          </div>
        </div>
      </Link>

      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-300" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-gray-900 border-gray-800 text-gray-300">
            <DropdownMenuItem
              onClick={() =>
                router.push('/my-resume/' + resume.resumeId + '/view')
              }
              className="focus:bg-gray-800 focus:text-gray-200 cursor-pointer rounded-md"
            >
              View
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                router.push('/my-resume/' + resume.resumeId + '/edit')
              }
              className="focus:bg-gray-800 focus:text-gray-200 cursor-pointer rounded-md"
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setOpenAlert(true)}
              className="focus:bg-gray-800 focus:text-gray-200 text-red-400 cursor-pointer rounded-md"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete your
              resume and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setOpenAlert(false)}
              disabled={isLoading}
              className="border-gray-700 text-gray-600"
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={onDelete}
              disabled={isLoading}
              className="bg-primary-500 text-white hover:bg-primary-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeCard;
