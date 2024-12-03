import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const res = await request.json();
    const force = res.force as boolean | undefined;

    const headers = new Headers();
    headers.append(
        'Set-Cookie',
        `access_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict; Secure`
    );
    headers.append(
        'Set-Cookie',
        `role=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict; Secure`
    );
    // Nếu buộc logout, xóa cookie và trả về thành công
    if (force) {
        return Response.json(
            {
                message: 'Buộc đăng xuất thành công',
            },
            {
                status: 200,

                headers,
            }
        );
    }

    // Kiểm tra cookie
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('access_token');

    // Nếu không có sessionToken trong cookie
    if (!sessionToken) {
        return Response.json(
            { message: 'Không nhận được session token' },
            {
                status: 401,
            }
        );
    }

    // Xử lý đăng xuất thành công
    try {
        return Response.json(
            { message: 'Đăng xuất thành công' },
            {
                status: 200,

                headers,
            }
        );
    } catch (error) {
        return Response.json(
            { message: 'Không thể đăng xuất, có lỗi xảy ra' },
            {
                status: 500,
            }
        );
    }
}
