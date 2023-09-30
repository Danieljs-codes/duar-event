'use client';

import { useState } from 'react';
import Dialog from '~/components/dialog';
import { useRouter } from 'next/navigation';

const InitialDialog = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  router.prefetch('/events');

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="You't don't have an active event"
      description="Create an event to get started"
      actionLabel="Create Event"
      onAction={() => {
        setOpen(false);
        router.push('/events');
      }}
      className="bg-primary hover:bg-primary/90"
      onCancel={() => {
        setOpen(false);
        setTimeout(() => {
          setOpen(true);
        }, 300);
      }}
    />
  );
};

export default InitialDialog;
