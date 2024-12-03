import Footer from '@/components/Footer';
import LoginModal from '@/components/modal/LoginModal';
import RegisterModal from '@/components/modal/RegisterModal';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

import * as React from 'react';

export interface IAppProps {
    children: React.ReactNode;
}

export default function DefaultLayout({ children }: IAppProps) {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <LoginModal />
            <RegisterModal />
            <main className="flex-grow bg-white">{children}</main>
            <Toaster />
            <Footer />
        </div>
    );
}
