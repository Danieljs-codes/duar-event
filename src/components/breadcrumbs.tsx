'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { PAGE_SEGMENT_KEY } from 'next/dist/shared/lib/constants';

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Split the pathname into segments
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    ...segments.map((segment, index) => ({
      name: segment,
      href: `/${segments.slice(0, index + 1).join('/')}`,
    })),
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm container py-4">
      <ol role="list" className="flex items-center space-x-2">
        {breadcrumbItems.map((page, index) => (
          <Fragment key={index}>
            {index !== 0 && (
              <li>
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              </li>
            )}
            <li>
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-700 capitalize">{page.name}</span>
              ) : (
                <Link
                  className="text-gray-400 hover:text-gray-700 capitalize"
                  href={page.href}
                >
                  {page.name}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
