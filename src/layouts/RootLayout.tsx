import React from 'react';
import { Outlet } from 'react-router-dom';
import { RoleSwitcherBar } from '../components/layout/RoleSwitcherBar';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <RoleSwitcherBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
