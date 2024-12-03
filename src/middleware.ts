import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/profile', '/quan-tri-vien/:path*'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = request.cookies.get('access_token')?.value;
    const role = request.cookies.get('role')?.value;
    const userNavigate = request.nextUrl.pathname;

    if (
        privatePaths.some((path) => pathname.startsWith(path)) &&
        !sessionToken
    ) {
        const redirectUrl = new URL('/not-found', request.url);
        return NextResponse.redirect(redirectUrl);
    }

    if (
        userNavigate.startsWith('/quan-tri-vien') &&
        role !== 'Admin' &&
        role !== 'Staff'
    ) {
        const redirectUrl = new URL('/not-found', request.url);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile', '/quan-tri-vien/:path*'],
};

// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//     console.log('Middleware is running');
//     const cookieStore = await cookies();
//     const role = cookieStore.get('role');

//     const userNavigate = req.nextUrl.pathname;

//     // Kiểm tra nếu không có session, chuyển hướng tới trang login
//     if (!session) {
//         return NextResponse.redirect(new URL('/', req.url));
//     }

//     // Kiểm tra quyền truy cập cho các route admin
//     if (userNavigate.startsWith('/quan-tri-vien') && session.role !== 'Admin') {
//         return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }

//     // Cho phép tiếp tục truy cập nếu hợp lệ
//     return NextResponse.next();
// }

// // Chỉ áp dụng middleware cho các route được chỉ định
// export const config = {
//     matcher: ['/quan-tri-vien/:path*', '/protected/:path*'], // Các route cần bảo vệ
// };
