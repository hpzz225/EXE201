'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CustomModal from '../_components-reuse/form/form-dialog';
import { useRegisterModalStore } from '../store/useRegisterModalStore';
import { useLoginModalStore } from '../store/useLoginModalStore';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterBody, RegisterFormData } from '@/validation/auth.Schema';
import FormSubmit from '../_components-reuse/form/form-submit';
import envConfig from '@/configure';
import { toast } from '@/hooks/use-toast';
// import envConfig from '@/configure';

const RegisterModal = () => {
    const register = useRegisterModalStore();
    const login = useLoginModalStore();
    const [isPending, setIsPending] = useState<boolean>(false);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            name: '',
            phone: '',
            password: '',
            confirmPassword: '',
            email: '',
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsPending(true);
        // console.log(data);

        try {
            const response = await fetch(
                `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/authentication/Register`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Đăng ký thất bại');
            }

            const result = await response.json();
            console.log('Đăng ký thành công:', result);
            toast({
                title: 'Thành công!',
                description: 'Đăng ký thành công!',
                variant: 'default',
            });

            form.reset();
            register.onClose();
            login.onOpen();
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
            isOpen={register.isOpen}
            onClose={register.onClose}
            title="Đăng ký tài khoản"
            iconSrc="/images/logo.png"
            footer={
                <button
                    className="text-blue-500"
                    onClick={() => {
                        register.onClose();
                        login.onOpen();
                    }}
                >
                    Đã có tài khoản? Đăng nhập
                </button>
            }
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {Object.keys(form.formState.errors).length > 0 && (
                        <div className="text-red-500">
                            <pre>
                                {JSON.stringify(form.formState.errors, null, 2)}
                            </pre>
                        </div>
                    )}
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên người dùng</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nhập tên người dùng"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="phone"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nhập số điện thoại"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="confirmPassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Xác nhận mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSubmit disabled={isPending} className="w-full">
                        Đăng ký
                    </FormSubmit>
                </form>
            </Form>
        </CustomModal>
    );
};

export default RegisterModal;
