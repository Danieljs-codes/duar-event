'use client';

import { useRouter } from 'next/navigation';
import { trpc } from '../_trpc/client';
import Loader from '~/components/loader';
import { useToast } from '~/hooks/use-toast';

const AuthCallback = () => {
  const router = useRouter();
  const { toast } = useToast();

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      console.log(success);
      if (success) {
        router.push('/dashboard');
      }
    },
    onError: ({ data }) => {
      console.log(data);
      router.push('/sign-in');
      toast({
        title: data?.code ?? 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  return (
    <Loader>
      <h1 className="text-2xl text-foreground font-semibold mb-2">
        We are setting up your account
      </h1>
      <p className="text-base text-muted-foreground font-normal">
        Redirecting...
      </p>
    </Loader>
  );
};

export default AuthCallback;
