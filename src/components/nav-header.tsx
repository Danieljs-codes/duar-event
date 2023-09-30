'use client';

import { Bell, Search } from 'lucide-react';
import { Icons } from './icons';
import { Button } from './ui/button';
import Link from 'next/link';
import UserDropdown from './user-dropdown';

const NavHeader = () => {
  return (
    <div className="flex items-center justify-between p-6 container">
      <div className="flex items-center">
        <Icons.logo className="w-[6.9375rem] h-8 pr-8 border-r-2 border-b-foreground" />
        <Button
          size="default"
          className="hidden pr-16 ml-8 md:inline-flex"
          variant="outline"
        >
          <Search className="w-[1.125rem] h-[1.125rem] mr-3" />
          Search Something here
        </Button>
      </div>
      <div className="flex items-center gap-x-3">
        <Button className="md:hidden" asChild variant="outline" size="icon">
          <Link href="/notification">
            <Search className="w-5 h-5" />
          </Link>
        </Button>
        <Button variant="outline" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <UserDropdown />
      </div>
    </div>
  );
};

export default NavHeader;
