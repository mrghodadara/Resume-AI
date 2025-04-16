import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IContainer {
  children: ReactNode;
  className?: string;
}
const Container = ({ children, className }: IContainer) => {
  return (
    <div className={twMerge('max-w-screen-xl  mx-auto px-5', className)}>
      {children}
    </div>
  );
};

export { Container };
