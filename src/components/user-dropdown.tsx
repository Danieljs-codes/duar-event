'use client';

import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import DeleteDialog from './delete-dialog';
import { useEffect, useState } from 'react';
import { RedirectToSignIn, useSession, useUser } from '@clerk/nextjs';
import { Skeleton } from './ui/skeleton';
import { cn } from '~/lib/utils';

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isSignedIn } = useUser();
  const { session, isSignedIn: isLoggedIn } = useSession();

  useEffect(() => {
    if (isSignedIn !== undefined && isLoggedIn !== undefined) {
      setIsLoading(false);
    }
  }, [isSignedIn, isLoggedIn]);

  const renderSkeleton = (width: string, height: string) => (
    <Skeleton className={`${width} ${height} rounded-full`} />
  );

  if (isLoading) {
    return (
      <div className="flex items-center gap-x-2">
        {renderSkeleton('w-10', 'h-10')}
        <div className="space-y-2 hidden md:block">
          {renderSkeleton('w-20', 'h-2')}
          {renderSkeleton('w-16', 'h-2')}
        </div>
      </div>
    );
  }

  if (!isSignedIn || !isLoggedIn) {
    return <RedirectToSignIn />;
  }

  const { imageUrl, fullName, emailAddresses } = user;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="flex items-center">
            {!imageUrl ? (
              renderSkeleton('w-10', 'h-10')
            ) : (
              <Avatar>
                <AvatarImage src={imageUrl} />
                <AvatarFallback>{fullName}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                'flex-col items-start justify-center hidden ml-2 md:flex',
                !imageUrl && 'gap-y-2'
              )}
            >
              {!fullName ? (
                renderSkeleton('w-20', 'h-2')
              ) : (
                <span className="text-sm font-medium">{fullName}</span>
              )}

              {!emailAddresses ? (
                renderSkeleton('w-16', 'h-2')
              ) : (
                <span className="text-xs truncate opacity-60">
                  {emailAddresses[0]?.emailAddress}
                </span>
              )}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 mt-2" align="end">
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        sessionId={session.id}
        userId={user.id}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default UserDropdown;
