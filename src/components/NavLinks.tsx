import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
    href: string;
    label: string;
}

const links: NavLink[] = [
    { href: '/giat-say', label: 'Dịch Vụ Giặt Sấy' },
    { href: '/giay-dep', label: 'Vệ Sinh Giày Dép' },
    { href: '/khan-rem', label: 'Giặt Sấy Khăn Rèm' },
    { href: '/gau-bong', label: 'Vệ Sinh Gấu Bông, Topper' },
];

const NavLinks = () => {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 ${
                        pathname === link.href
                            ? 'text-primary'
                            : 'text-secondary'
                    } hover:bg-[#f3f4f6] hover:text-hover`}
                >
                    {link.label}
                </Link>
            ))}
        </>
    );
};

export default NavLinks;
