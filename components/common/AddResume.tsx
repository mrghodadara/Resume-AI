import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { z } from 'zod';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { ResumeNameValidationSchema } from '@/lib/validations/resume';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { createResume } from '@/lib/actions/resume.actions';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next-nprogress-bar';
import { useUser } from '@clerk/nextjs';

const AddResume = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(ResumeNameValidationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ResumeNameValidationSchema>
  ) => {
    if (user?.id) {
      setIsLoading(true);

      const uuid = uuidv4();

      createResume({
        resumeId: uuid,
        userId: user?.id,
        title: values.name,
      })
        .then((response) => {
          setIsOpenModal(false);
          form.reset();
          router.push(`/my-resume/${response?.data?.resumeId}/edit`);
        })
        .catch((error) => {
          console.log('error', error);
          toast({
            title: 'Uh Oh! Something went wrong.',
            description: error?.error,
            variant: 'destructive',
            className: 'bg-gray-900 text-white border-gray-800',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Card
        onClick={() => setIsOpenModal(true)}
        className="bg-gray-900/50 cursor-pointer border-gray-800 backdrop-blur-sm hover:border-violet-500/50 transition-colors aspect-[1/1.2]"
      >
        <CardContent className="flex flex-col items-center justify-center p-6 h-full">
          <Button
            variant="ghost"
            className="w-full h-full flex flex-col items-center justify-center space-y-2 text-gray-400 hover:text-violet-500 hover:bg-violet-500/10"
            asChild
          >
            <>
              <Plus className="h-8 w-8" />
              <span className="text-sm font-medium">Create New Resume</span>
            </>
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Create New Resume
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Start building your professional resume by giving it a name.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Resume Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500"
                        placeholder="e.g., Software Engineer Resume"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Resume'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddResume;
