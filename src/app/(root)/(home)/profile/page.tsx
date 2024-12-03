// // // import accountApiRequest from '@/apiRequest/account';
// // // import { Metadata } from 'next';
// // // import { cookies } from 'next/headers';
// // // import ProfileForm from './profile-form';

// // // export const metadata: Metadata = {
// // //     title: 'Hồ sơ người dùng',
// // // };

// // // export default async function MeProfile() {
// // //     const cookieStore = await cookies();
// // //     const accessToken = cookieStore.get('access_token');
// // //     console.log(accessToken);

// // //     const result = await accountApiRequest.getProfile(accessToken?.value ?? '');

// // //     console.log(result);

// // //     return (
// // //         <div>
// // //             <h1>Profile</h1>
// // //             <ProfileForm profile={result.payload.user} />
// // //         </div>
// // //     );
// // // }
// // // /profile/page.tsx
// // import accountApiRequest from '@/apiRequest/account';
// // import { cookies } from 'next/headers';
// // import ProfileClient from './ProfileClient';
// // import { notFound } from 'next/navigation';

// // export const metadata = {
// //     title: 'Hồ sơ người dùng',
// // };

// // export default async function MeProfile() {
// //     const cookieStore = await cookies();
// //     const accessToken = cookieStore.get('access_token')?.value;

// //     // Kiểm tra nếu không có access_token, chuyển hướng đến trang login hoặc hiển thị lỗi
// //     if (!accessToken) {
// //         notFound(); // Có thể thay bằng `redirect('/login')` nếu muốn chuyển hướng về trang đăng nhập
// //     }

// //     // Truy vấn thông tin người dùng từ API
// //     let result;
// //     try {
// //         result = await accountApiRequest.getProfile(accessToken);
// //         if (!result || !result.payload?.user) {
// //             throw new Error('User not found');
// //         }
// //     } catch (error) {
// //         console.error('Error fetching profile data:', error);
// //         notFound(); // Hoặc chuyển hướng đến trang lỗi
// //     }

// //     return (
// //         <div>
// //             <h1>Thông tin người dùng</h1>
// //             <ProfileClient profile={result.payload.user} />
// //         </div>
// //     );
// // }
// import accountApiRequest from '@/apiRequest/account';

export const metadata = {
    title: 'Hồ sơ người dùng',
};

export default async function MeProfile() {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get('access_token')?.value;

    // if (!accessToken) {
    //     throw new Error('Người dùng chưa đăng nhập');
    // }

    // const result = await accountApiRequest.getProfile(accessToken);
    // console.log('result', result);

    return (
        <section className="max-w-screen-md mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Hồ sơ của bạn</h1>
            {/* <ProfileForm profileData={result.payload.user} /> */}
        </section>
    );
}
