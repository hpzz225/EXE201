import * as React from 'react';

import { Metadata } from 'next';
import SideBar from './_components/SideBar';
import SearchBar from './_components/SearchBar';

export interface IAppProps {
    children: React.ReactNode;
}
export const metadata: Metadata = {
    title: 'Hệ Thống',
    description: 'Hệ thống quản trị viên',
};
export default function AdminLayout({ children }: IAppProps) {
    return (
        <div className="flex min-h-screen">
            <div className="hidden md:block w-64 bg-white  p-4">
                <SideBar />
            </div>

            <div className="flex-1 p-6 bg-[#93d4d4]/30">
                <SearchBar />
                {children}
            </div>
        </div>
    );
}
