'use client';

import { db } from '~/db';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { trpc } from '~/app/_trpc/client';
import InitialDialog from './initial-dialog';

interface Props {
  events: Awaited<ReturnType<typeof db.events.findMany>>;
}

const Dashboard = ({ events }: Props) => {
  const { data, isLoading, refetch, error } = trpc.getAllUserEvent.useQuery();

  if (isLoading) {
    return;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (data.length === 0) {
    return <InitialDialog />;
  }

  return (
    <div>
      {data.map(e => (
        <div key={e.id}>
          <h2>{e.name}</h2>
          <p>{e.description}</p>
          <p>{e.date}</p>
          <p>{e.location}</p>
          <Image
            src={e.thumbnail ?? ''}
            alt={e.name ? e.name : 'Event thumbnail'}
            width={500}
            height={500}
          />
        </div>
      ))}
      <Button
        disabled={isLoading}
        onClick={() => {
          // router.refresh();
          // setHidden(true);
          refetch();
        }}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 mr-2 text-white animate-spin" />
        )}
        Refetch
      </Button>
    </div>
  );
};
export default Dashboard;
