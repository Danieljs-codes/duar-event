'use client';
import Dialog from './dialog';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useToast } from '~/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { Dispatch, SetStateAction } from 'react';
import { trpc } from '~/app/_trpc/client';

interface DeleteResponse {
  message: string;
}

const DeleteDialog = ({
  userId,
  sessionId,
  open,
  setOpen,
}: {
  userId: string;
  sessionId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { signOut } = useClerk();

  router.prefetch('/sign-in');

  const { mutate, isLoading, error } = trpc.deleteUser.useMutation({
    onSuccess: async () => {
      await signOut();
      toast({
        title: 'Your account has been deleted.',
        description: 'Redirecting.',
      });
      setOpen(false);
    },

    onError: () => {
      toast({
        description: 'An error occurred while deleting your account.',
        variant: 'destructive',
      });
      router.push(`/sign-in`);
    },
  });

  return (
    <Dialog
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      open={open}
      setOpen={setOpen}
      actionLabel="Delete Account"
      onAction={() => mutate()}
      onCancel={() => console.log('Callback prop for cancelling')}
      className="bg-primary hover:bg-primary/90 focus-visible:ring-primary"
    />
  );
};

export default DeleteDialog;
