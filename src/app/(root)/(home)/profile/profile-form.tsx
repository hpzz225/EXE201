// // /profile/ProfileForm.tsx
// 'use client';

// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { useState } from 'react';
// import accountApiRequest from '@/apiRequest/account';
// import { toast } from '@/hooks/use-toast';
// import { useRouter } from 'next/navigation';

// type ProfileFormProps = {
//     profile: {
//         username: string;
//         email: string;
//         // Các trường dữ liệu khác của người dùng
//     };
// };

// const ProfileForm = ({ profile }: ProfileFormProps) => {
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const form = useForm({
//         defaultValues: {
//             name: profile.username,
//             email: profile.email,
//         },
//     });

//     const onSubmit = async (values: any) => {
//         if (loading) return;
//         setLoading(true);
//         try {
//             const result = await accountApiRequest.updateProfile(values);
//             toast({ description: result.payload.message });
//             router.refresh(); // Làm mới trang sau khi cập nhật thông tin
//         } catch (error) {
//             toast({
//                 description: 'Đã có lỗi xảy ra, vui lòng thử lại.',
//                 variant: 'destructive',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Form {...form}>
//             <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
//             >
//                 <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                         <Input
//                             placeholder="Email"
//                             type="email"
//                             value={profile.email}
//                             readOnly
//                         />
//                     </FormControl>
//                     <FormMessage />
//                 </FormItem>

//                 <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Tên</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="Nhập tên" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <Button
//                     type="submit"
//                     disabled={loading}
//                     className="!mt-8 w-full"
//                 >
//                     {loading ? 'Đang cập nhật...' : 'Cập nhật'}
//                 </Button>
//             </form>
//         </Form>
//     );
// };

// export default ProfileForm;
'use client';
import React, { useState } from 'react';

type ProfileFormProps = {
    username: string;
    email: string;
    // profile: {
    //     username: string;
    //     email: string;
    //     // Các trường dữ liệu khác của người dùng
    // };
};
export default function ProfileForm({
    profileData,
}: {
    profileData: ProfileFormProps;
}) {
    const [formData, setFormData] = useState(profileData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // Gửi yêu cầu cập nhật hồ sơ
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Tên</label>
                <input
                    type="text"
                    name="name"
                    value={formData.username || ''}
                    onChange={handleChange}
                    className="border rounded w-full p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="border rounded w-full p-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Cập nhật
            </button>
        </form>
    );
}
