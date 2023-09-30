import { usePathname, useSearchParams } from 'next/navigation';
import { PropsWithChildren, useEffect, useTransition } from 'react';

const PageLoader = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // The page is loading, so we can show a loading indicator here.
    // I need to how the percentage so I can display it.
  }, [searchParams, pathname]);

  return <div>PageLoader</div>;
};

export default PageLoader;
