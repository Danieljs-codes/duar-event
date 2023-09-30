import Breadcrumbs from '~/components/breadcrumbs';
import NavHeader from '~/components/nav-header';
import Navbar from '~/components/navbar';
import React, { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <NavHeader />
      <Navbar />
      <Breadcrumbs />
      <div className="container">{children}</div>
    </div>
  );
};

export default MainLayout;
