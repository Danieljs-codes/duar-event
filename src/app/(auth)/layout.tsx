import React, { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen grid place-items-center">{children}</main>
  );
};

export default AuthLayout;
