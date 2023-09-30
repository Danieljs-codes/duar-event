'use client';

import { Button } from '~/components/ui/button';
import { trpc } from './_trpc/client';

export default function Home() {
  return (
    <div className="space-x-2">
      <Button
        // onClick={() => {
        //   setQuery(true);
        //   if (query === true) {
        //     refetch();
        //   }
        // }}
        variant={'default'}
      >
        Get Started
      </Button>
      <Button variant={'ghost'}>Get Started</Button>
      <Button variant={'outline'}>Get Started</Button>
      <Button variant={'destructive'}>Get Started</Button>
      <Button variant={'link'}>Get Started</Button>
      <Button variant={'secondary'}>Get Started</Button>/{/* <p>{}</p> */}
    </div>
  );
}
