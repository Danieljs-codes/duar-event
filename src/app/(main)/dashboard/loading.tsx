'use client';

import { useEffect, useState } from 'react';

const DashboardLoading = () => {
  const [width, setWidth] = useState(10);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setWidth(w => w + 10);
    }, 1000);

    return () => clearInterval(timeoutId);
  }, []);

  return (
    <div
      style={{ width: width + '%' }}
      className="absolute h-2 w-full bg-primary top-1 inset-x-0"
    />
  );
};

export default DashboardLoading;
