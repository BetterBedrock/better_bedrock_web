import { ReactNode } from 'react';
import { LayoutNavbar } from './layout-navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <LayoutNavbar />
    {children}
  </>
);