'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaShoppingBag, FaUsers } from 'react-icons/fa';

const SideBar = () => {
    const pathname = usePathname();

    const menuItems = [
        {
            name: 'Trang chủ',
            path: '/quan-tri-vien/trang-chu',
            icon: <FaHome size={24} />,
        },
        {
            name: 'Đơn hàng',
            path: '/quan-tri-vien/don-hang',
            icon: <FaShoppingBag size={24} />,
        },
        {
            name: 'Khách hàng',
            path: '/quan-tri-vien/khach-hang',
            icon: <FaUsers size={24} />,
        },
    ];

    return (
        <>
            <div className="mb-8 flex justify-center">
                <Image
                    src="/images/logo3.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-[120px] h-[100px]"
                />
            </div>

            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.path}
                            className={`px-6 py-4 rounded-xl w-full  text-center flex space-x-4 ${
                                pathname === item.path
                                    ? 'bg-[#35a5a7] text-white'
                                    : 'hover:bg-gray-600 text-[#35a5a7]'
                            }`}
                        >
                            <span
                                className={`${
                                    pathname === item.path
                                        ? 'text-white'
                                        : 'text-[#35a5a7]'
                                }`}
                            >
                                {item.icon}
                            </span>

                            <span
                                className={`text-xl font-bold ${
                                    pathname === item.path
                                        ? 'text-white'
                                        : 'text-[#35a5a7]'
                                }`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default SideBar;
