export const POST = async (request: Request) => {
    try {
        console.log('request', request);

        const res = await request.json();

        console.log(res);
        const { accessToken, role } = res;

        if (!accessToken || !role) {
            return Response.json(
                { message: 'Không nhận được token hoặc role' },
                { status: 400 }
            );
        }

        const headers = new Headers();
        headers.append(
            'Set-Cookie',
            `access_token=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
        );
        headers.append(
            'Set-Cookie',
            `role=${role}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
        );

        return new Response(
            JSON.stringify({
                message: 'Cả accessToken và refreshToken đã được lưu cookie',
            }),
            { status: 200, headers }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Lỗi server khi set cookie' }),
            { status: 500 }
        );
    }
};
