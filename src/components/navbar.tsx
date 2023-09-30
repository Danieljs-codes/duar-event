'use client';

import { Fragment, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '~/lib/utils';

type Link = {
  path: string;
  name: string;
  description: string;
  icon?: string;
};

const links: Link[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    description: 'Dashboard',
    icon: 'home',
  },

  {
    path: '/events`',
    name: 'Event',
    description: 'Event',
    icon: 'event',
  },

  {
    path: '/transaction',
    name: 'Transaction',
    description: 'Transaction',
    icon: 'transactions',
  },

  {
    path: '/customer',
    name: 'Customer',
    description: 'Customer',
    icon: 'customer',
  },

  {
    path: '/reviews',
    name: 'Reviews',
    description: 'Reviews',
    icon: 'reviews',
  },

  {
    path: '/settings',
    name: 'Settings',
    description: 'Settings',
    icon: 'settings',
  },
];

const icons = {
  home: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M10.7363 2.81986L3.80628 8.36985C3.02628 8.98985 2.52628 10.2999 2.69628 11.2799L4.02628 19.2398C4.26628 20.6598 5.62628 21.8099 7.06628 21.8099H18.2663C19.6963 21.8099 21.0663 20.6498 21.3063 19.2398L22.6363 11.2799C22.7963 10.2999 22.2963 8.98985 21.5263 8.36985L14.5963 2.82984C13.5263 1.96984 11.7963 1.96986 10.7363 2.81986Z"
        fill="white"
      />
      <path
        d="M12.6665 15.5C14.0472 15.5 15.1665 14.3807 15.1665 13C15.1665 11.6193 14.0472 10.5 12.6665 10.5C11.2858 10.5 10.1665 11.6193 10.1665 13C10.1665 14.3807 11.2858 15.5 12.6665 15.5Z"
        fill="white"
      />
    </svg>
  ),

  event: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.91 14.6927C18.91 15.9827 19.97 17.0327 21.26 17.0327C21.26 20.7827 20.32 21.7227 16.57 21.7227H7.19C3.44 21.7227 2.5 20.7827 2.5 17.0327V16.5727C3.79 16.5727 4.85 15.5127 4.85 14.2227C4.85 12.9327 3.79 11.8727 2.5 11.8727V11.4127C2.51 7.66266 3.44 6.72266 7.19 6.72266H16.56C20.31 6.72266 21.25 7.66266 21.25 11.4127V12.3527C19.96 12.3527 18.91 13.3927 18.91 14.6927Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2111 6.7225H7.12109L10.0511 3.7925C12.4411 1.4025 13.6411 1.4025 16.0311 3.7925L16.6311 4.3925C16.0011 5.0225 15.8511 5.9525 16.2111 6.7225Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.87891 6.72266L9.87891 21.7227"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="5 5"
      />
    </svg>
  ),

  transactions: (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.333 6V8.42C22.333 10 21.333 11 19.753 11H16.333V4.01C16.333 2.9 17.243 2 18.353 2C19.443 2.01 20.443 2.45 21.163 3.17C21.883 3.9 22.333 4.9 22.333 6Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.33301 7V21C2.33301 21.83 3.27301 22.3 3.93301 21.8L5.64301 20.52C6.04301 20.22 6.60301 20.26 6.96301 20.62L8.62301 22.29C9.01301 22.68 9.65301 22.68 10.043 22.29L11.723 20.61C12.073 20.26 12.633 20.22 13.023 20.52L14.733 21.8C15.393 22.29 16.333 21.82 16.333 21V4C16.333 2.9 17.233 2 18.333 2H7.33301H6.33301C3.33301 2 2.33301 3.79 2.33301 6V7Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33301 13.0098H12.333"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33301 9.00977H12.333"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.32861 13H6.3376"
        stroke="#BAC2FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.32861 9H6.3376"
        stroke="#BAC2FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  customer: (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6665 12C15.4279 12 17.6665 9.76142 17.6665 7C17.6665 4.23858 15.4279 2 12.6665 2C9.90508 2 7.6665 4.23858 7.6665 7C7.6665 9.76142 9.90508 12 12.6665 12Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.07666 22C4.07666 18.13 7.92666 15 12.6667 15C13.6267 15 14.5567 15.13 15.4267 15.37"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6665 18C22.6665 18.75 22.4565 19.46 22.0865 20.06C21.8765 20.42 21.6065 20.74 21.2965 21C20.5965 21.63 19.6765 22 18.6665 22C17.2065 22 15.9365 21.22 15.2465 20.06C14.8765 19.46 14.6665 18.75 14.6665 18C14.6665 16.74 15.2465 15.61 16.1665 14.88C16.8565 14.33 17.7265 14 18.6665 14C20.8765 14 22.6665 15.79 22.6665 18Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1064 17.9995L18.0964 18.9895L20.2264 17.0195"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  reviews: (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 6.19995V10C11.71 10.05 10.55 11.21 10.5 14H6.7C3.7 14 2.5 12.8 2.5 9.80005V6.19995C2.5 3.19995 3.7 2 6.7 2H10.3C13.3 2 14.5 3.19995 14.5 6.19995Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.46019 5.8691C6.93019 5.5091 6.2302 5.50912 5.7002 5.88912"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4602 5.8691C10.9302 5.5091 10.2302 5.50912 9.7002 5.88912"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.65981 11.4197H6.33981C6.03981 11.4197 5.7998 11.1796 5.7998 10.8796C5.7998 9.38964 7.00981 8.17969 8.49981 8.17969C9.13981 8.17969 9.7298 8.39965 10.1898 8.76965"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 14.2V17.8C22.5 20.8 21.3 22 18.3 22H14.7C11.7 22 10.5 20.8 10.5 17.8V14C10.55 11.21 11.71 10.05 14.5 10H18.3C21.3 10 22.5 11.2 22.5 14.2Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4602 13.6196C14.9302 13.9796 14.2302 13.9796 13.7002 13.5996"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4602 13.6196C18.9302 13.9796 18.2302 13.9796 17.7002 13.5996"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3398 16.1797H18.6598C18.9598 16.1797 19.1998 16.4196 19.1998 16.7196C19.1998 18.2096 17.9898 19.4197 16.4998 19.4197C15.0098 19.4197 13.7998 18.2096 13.7998 16.7196C13.7998 16.4196 14.0398 16.1797 14.3398 16.1797Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  settings: (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.833 15C14.4899 15 15.833 13.6569 15.833 12C15.833 10.3431 14.4899 9 12.833 9C11.1762 9 9.83301 10.3431 9.83301 12C9.83301 13.6569 11.1762 15 12.833 15Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.83301 12.8794V11.1194C2.83301 10.0794 3.68301 9.21945 4.73301 9.21945C6.54301 9.21945 7.28301 7.93945 6.37301 6.36945C5.85301 5.46945 6.16301 4.29945 7.07301 3.77945L8.80301 2.78945C9.59301 2.31945 10.613 2.59945 11.083 3.38945L11.193 3.57945C12.093 5.14945 13.573 5.14945 14.483 3.57945L14.593 3.38945C15.063 2.59945 16.083 2.31945 16.873 2.78945L18.603 3.77945C19.513 4.29945 19.823 5.46945 19.303 6.36945C18.393 7.93945 19.133 9.21945 20.943 9.21945C21.983 9.21945 22.843 10.0694 22.843 11.1194V12.8794C22.843 13.9194 21.993 14.7794 20.943 14.7794C19.133 14.7794 18.393 16.0594 19.303 17.6294C19.823 18.5394 19.513 19.6994 18.603 20.2194L16.873 21.2094C16.083 21.6794 15.063 21.3994 14.593 20.6094L14.483 20.4194C13.583 18.8494 12.103 18.8494 11.193 20.4194L11.083 20.6094C10.613 21.3994 9.59301 21.6794 8.80301 21.2094L7.07301 20.2194C6.16301 19.6994 5.85301 18.5294 6.37301 17.6294C7.28301 16.0594 6.54301 14.7794 4.73301 14.7794C3.68301 14.7794 2.83301 13.9194 2.83301 12.8794Z"
        stroke="#BAC2FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const Navbar = () => {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(pathname);
  const router = useRouter();

  const isSelected = (path: string) => {
    return pathname === path;
  };

  const handleChange = (value: string) => {
    router.push(value);
    setSelectedItem(value);
  };

  const renderSvg = (iconName: string) => icons[iconName as keyof typeof icons];

  return (
    <>
      <nav className="bg-primary">
        <div className="bg-primary container hidden md:flex px-6 py-4 md:gap-x-2 lg:gap-x-3 xl:gap-x-4 items-center justify-between">
          {links.map(link => (
            <Link
              href={link.path}
              className={cn(
                'py-4 text-sm lg:text-base px-3 lg:px-6 xl:px-9 text-white/70',
                isSelected(link.path) && 'text-white bg-white/10'
              )}
              key={link.path}
            >
              <div className="flex items-center gap-x-2 lg:gap-x-4">
                {renderSvg(link.icon ?? '')}
                {link.name}
              </div>
            </Link>
          ))}
        </div>
      </nav>
      <div className="md:hidden w-full px-6">
        <Select value={selectedItem} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <>
              {links.map(link => (
                <SelectItem value={link.path} key={link.path}>
                  {link.name}
                </SelectItem>
              ))}
            </>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Navbar;
