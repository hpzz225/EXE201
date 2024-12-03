'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginBody, LoginFormData } from '@/validation/auth.Schema';
import { useLoginModalStore } from '../store/useLoginModalStore';
import { useRegisterModalStore } from '../store/useRegisterModalStore';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import CustomModal from '../_components-reuse/form/form-dialog';
import FormSubmit from '../_components-reuse/form/form-submit';
import envConfig from '@/configure';
import { toast } from '@/hooks/use-toast';
import { useAuthContext } from '@/context/authContext';

// import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const login = useLoginModalStore();
    const register = useRegisterModalStore();
    const [isPending, setIsPending] = useState<boolean>(false);
    // const router = useRouter();
    const { setToken } = useAuthContext();
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsPending(true);
        // console.log(data);
        try {
            const response = await fetch(
                `${envConfig.NEXT_PUBLIC_API_ENDPOINT}api/authentication/Login`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || 'Có lỗi xảy ra khi gửi yêu cầu.'
                );
            }
            const result = await response.json();
            setToken(result.dataToken);
            const auth = await fetch('api/auth', {
                method: 'POST',
                body: JSON.stringify({
                    accessToken: result.dataToken,
                    role: result.role,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!auth.ok) {
                const errorData = await auth.json();
                console.log(errorData);

                throw new Error(
                    errorData.message || 'Có lỗi xảy ra khi gửi yêu cầu.'
                );
            }
            toast({
                title: 'Thành công!',
                description: 'Đăng nhập thành công!',
                variant: 'default',
            });

            login.onClose();
        } catch (error: any) {
            console.log(error);
            toast({
                title: 'Thát bại!',
                description: error.message,
                variant: 'destructive',
            });
            setIsPending(false);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <CustomModal
            isOpen={login.isOpen}
            onClose={login.onClose}
            title="Đăng nhập"
            iconSrc="/images/logo.png"
            footer={
                <button
                    className="text-blue-500"
                    onClick={() => {
                        login.onClose();
                        register.onOpen();
                    }}
                >
                    Bạn chưa có tài khoản? Đăng ký ngay
                </button>
            }
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Phone Field */}
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nhập email"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormSubmit disabled={isPending} className="w-full">
                        {isPending ? 'Đang xử lý...' : 'Đăng nhập'}
                    </FormSubmit>
                </form>
            </Form>
        </CustomModal>
    );
};

export default LoginModal;
