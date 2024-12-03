'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneCall, User } from 'lucide-react'; // Thêm icon User
import { usePathname, useRouter } from 'next/navigation';
import { useLoginModalStore } from './store/useLoginModalStore';
import { useAuthContext } from '@/context/authContext';

interface NavLink {
    href: string;
    label: string;
}

const links: NavLink[] = [
    { href: '/bang-gia/dich-vu-giat-say', label: 'Dịch Vụ Giặt Sấy' },
    { href: '/bang-gia/ve-sinh-giay-dep', label: 'Vệ Sinh Giày Dép' },
    { href: '/bang-gia/giat-say-khan-rem', label: 'Giặt Sấy Khăn Rèm' },
    {
        href: '/bang-gia/ve-sinh-gau-bong-topper',
        label: 'Vệ Sinh Gấu Bông, Topper',
    },
];

const Navbar = () => {
    const pathname = usePathname();
    const { user } = useAuthContext(); // Assuming `signOut` is available from context
    const router = useRouter();
    const login = useLoginModalStore();

    const isPriceActive = links.some((link) => link.href === pathname);
    const handleLogout = async () => {
        try {
            // Xóa token từ localStorage
            localStorage.removeItem('token');

            // Gửi yêu cầu POST đến server để xóa cookie sessionToken
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ force: true }), // Nếu muốn buộc logout
            });

            // Reload trang để cập nhật giao diện
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };
    return (
        <nav className="bg-[#eaf3f7]">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center min-h-[100px]">
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={200}
                        height={64}
                        style={{ width: '108px', height: '45px' }}
                    />
                </Link>

                <div className="flex items-center space-x-6 font-semibold relative">
                    <Link
                        href="/"
                        className={`${
                            pathname === '/'
                                ? 'text-[#f37470]'
                                : 'text-[#1b8b8d]'
                        } hover:text-[#46b4b6]`}
                    >
                        Về Moon
                    </Link>
                    <Link
                        href="/dich-vu"
                        className={`${
                            pathname === '/dich-vu'
                                ? 'text-[#f37470]'
                                : 'text-[#1b8b8d]'
                        } hover:text-[#46b4b6]`}
                    >
                        Dịch vụ
                    </Link>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger
                            className={`text-[#1b8b8d] hover:text-[#46b4b6] focus:outline-none ${
                                isPriceActive
                                    ? 'text-[#f37470]'
                                    : 'text-[#1b8b8d]'
                            }`}
                        >
                            Bảng giá
                            <span className="ml-1">&#9662;</span>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
                            className="bg-white shadow-lg rounded-md py-2 w-full z-50"
                            sideOffset={5}
                        >
                            {links.map((link) => (
                                <DropdownMenu.Item asChild key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`block px-4 py-2 ${
                                            pathname === link.href
                                                ? 'text-[#f37470]'
                                                : 'text-[#1b8b8d]'
                                        } hover:bg-[#f3f4f6] hover:text-[#46b4b6] outline-none`}
                                    >
                                        {link.label}
                                    </Link>
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>

                    <Link
                        href="/cua-hang"
                        className={`${
                            pathname === '/cua-hang'
                                ? 'text-[#f37470]'
                                : 'text-[#1b8b8d]'
                        } hover:text-[#46b4b6]`}
                    >
                        Cửa hàng
                    </Link>
                    <Link
                        href="/lien-he"
                        className={`${
                            pathname === '/lien-he'
                                ? 'text-[#f37470]'
                                : 'text-[#1b8b8d]'
                        } hover:text-[#46b4b6]`}
                    >
                        Liên hệ
                    </Link>
                    <div className="bg-[#54B8BD] text-white py-2 px-6 rounded-full flex items-center gap-2">
                        <PhoneCall color="white" />
                        <span>0123 456 789</span>
                    </div>

                    {user ? (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className="flex items-center gap-2 text-[#1b8b8d] hover:text-[#46b4b6] cursor-pointer">
                                <User size={24} />
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content
                                className="bg-white shadow-lg rounded-md py-2 w-40 z-50"
                                sideOffset={5}
                            >
                                <DropdownMenu.Item asChild>
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-[#1b8b8d] hover:bg-[#f3f4f6] hover:text-[#46b4b6] outline-none"
                                    >
                                        Profile
                                    </Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item asChild>
                                    <button
                                        onClick={() => handleLogout()} // Call signOut method
                                        className="block px-4 py-2 text-[#1b8b8d] hover:bg-[#f3f4f6] hover:text-[#46b4b6] outline-none"
                                    >
                                        Đăng xuất
                                    </button>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    ) : (
                        <button
                            onClick={() => login.onOpen()}
                            className="flex justify-center login-btn ht_mirror w-40"
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
