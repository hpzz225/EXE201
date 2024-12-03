'use client';
import Image from 'next/image';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';

import FormSubmit from './form/form-submit';
import { useToast } from '@/hooks/use-toast';
import { ContactFormData, formSchema } from '@/validation/form.Schema';

const ContactForm = () => {
    const form = useForm<ContactFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            phoneNumber: '',
            address: '',
            email: '',
        },
    });
    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();
    // useEffect(() => {
    //     console.log('Form errors:', form.formState.errors);
    // }, [form.formState.errors]);

    const onSubmit = async (data: ContactFormData) => {
        setIsPending(true); // Hiển thị trạng thái đang xử lý

        try {
            const bodyData = {
                customerName: data.fullName,
                customerEmail: data.email,
                cusomterPhone: data.phoneNumber,
                address: data.address,
            };

            const result = await fetch(
                'https://moonwash.azurewebsites.net/api/Order/OrderService',
                {
                    method: 'POST',
                    body: JSON.stringify(bodyData),
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (!result.ok) {
                const errorData = await result.json();
                throw new Error(
                    errorData.message || 'Có lỗi xảy ra khi gửi yêu cầu.'
                );
            }

            const req = await result.json();
            console.log('Response:', req);

            // Hiển thị toast thành công
            toast({
                title: 'Thành công!',
                description: 'Yêu cầu của bạn đã được gửi thành công.',
                variant: 'default',
            });

            // Reset form sau khi gửi thành công
            form.reset();
        } catch (error: any) {
            console.error('Submission error:', error);

            // Hiển thị toast lỗi
            toast({
                title: 'Lỗi',
                description:
                    error.message || 'Có lỗi xảy ra. Vui lòng thử lại.',
                variant: 'destructive',
            });
        } finally {
            setIsPending(false); // Tắt trạng thái đang xử lý
        }
    };

    return (
        <section className="max-w-screen-xl mx-auto py-16">
            <div className="relative w-full h-[450px]">
                <Image
                    src="/images/contactform.png"
                    alt="Contact Form Background"
                    fill
                    sizes="100vw"
                />
                <div className="absolute flex flex-col md:flex-row justify-center items-center w-full h-full">
                    <div className="w-1/2"></div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-1/2 h-full flex flex-col justify-between p-6"
                        >
                            <p className="text-white text-xl font-semibold">
                                Hotline
                            </p>
                            <p className="text-[#35a5a7] text-4xl font-bold">
                                0123 456 789
                            </p>
                            <p className="text-white text-xl font-bold">
                                Để lại sđt để được hỗ trợ nhanh nhất!
                                <br />
                            </p>

                            <div className="flex flex-col w-full max-w-[500px] font-medium gap-6">
                                <div className="flex justify-between gap-4">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Họ và tên"
                                                        {...field}
                                                        className="bg-white rounded-xl p-6 focus:outline-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Số điện thoại"
                                                        {...field}
                                                        className="bg-white rounded-xl p-6 focus:outline-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Địa chỉ"
                                                    {...field}
                                                    className="bg-white rounded-xl p-6 focus:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Email"
                                                    {...field}
                                                    className="bg-white rounded-xl p-6 focus:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormSubmit disabled={isPending}>Gửi</FormSubmit>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
