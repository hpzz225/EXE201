'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Image from 'next/image';
import { PhoneCall } from 'lucide-react';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import FormSubmit from '@/components/_components-reuse/form/form-submit';
import { useState } from 'react';

const getInTouchSchema = z.object({
    fullName: z.string().min(1, 'Họ và tên là bắt buộc.'),
    phoneNumber: z.string().min(10, 'Số điện thoại không hợp lệ.'),
    address: z.string().optional(),
    feedback: z.string().optional(),
});

export function GetInTouch() {
    const form = useForm({
        resolver: zodResolver(getInTouchSchema),
        defaultValues: {
            fullName: '',
            phoneNumber: '',
            address: '',
            feedback: '',
        },
    });
    const [isPending, setIsPending] = useState<boolean>(false);

    const onSubmit = async (data: z.infer<typeof getInTouchSchema>) => {
        // console.log('Form data:', data);
        setIsPending(true);
        try {
            // Simulate an API call or handle submission logic
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating network delay
            alert('Submission successful!'); // Confirm successful submission
        } catch (error) {
            console.error('Submission error:', error);
            setIsPending(false); // Reset pending state after error
            alert('Submission failed! Please try again.');
        } finally {
            setIsPending(false); // Reset pending state after successful submission or error
        }
    };

    return (
        <section className="max-w-screen-xl mx-auto flex py-20 ">
            {/* <div className="max-w-screen-xl mx-auto flex px-[130px] "> */}
            <div className="w-full md:w-1/2 bg-[#8fd3d3] p-10 rounded-3xl">
                <div className="bg-[#ee887a] rounded-3xl mx-auto w-1/2">
                    <h2 className="text-2xl font-bold text-center text-white px-6 py-4 mb-6">
                        GỬI TIN NHẮN
                    </h2>
                </div>
                <p className="text-center text-[#158283] text-xl font-medium mb-8">
                    Vui lòng điền thông tin vào ô bên dưới, MOON sẽ liên lạc lại
                    bạn trong thời gian sớm nhất.
                </p>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 "
                    >
                        <div className=" grid grid-cols-2 gap-10">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem className="w-full text-[#158283] text-2xl font-semibold">
                                        <FormLabel>Họ và tên</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Họ và tên"
                                                {...field}
                                                className="bg-white rounded-lg"
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
                                    <FormItem className="w-full text-[#158283] text-2xl font-semibold">
                                        <FormLabel>Số điện thoại</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Số điện thoại"
                                                {...field}
                                                className='bg-white rounded-lg"'
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
                                <FormItem className="w-full text-[#158283] text-2xl font-semibold">
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Địa chỉ"
                                            {...field}
                                            className="bg-white rounded-lg"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                                <FormItem className="w-full text-[#158283] text-2xl font-semibold">
                                    <FormLabel>Ý kiến phản hồi</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Ý kiến phản hồi."
                                            {...field}
                                            className="max-h-[100px] bg-white rounded-lg"
                                        />
                                        {/* <Input
                                                type="textarea"
                                                placeholder="Ý kiến phản hồi"
                                                {...field}
                                                className="min-h-[150px] "
                                            /> */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center">
                            <FormSubmit disabled={isPending}>Gửi</FormSubmit>
                        </div>
                    </form>
                </Form>
            </div>

            <div className="w-full md:w-1/2 flex flex-col p-10 justify-center items-start text-[#22566e] text-xl font-medium">
                <p className="flex items-center mb-4">
                    <PhoneCall className="mr-4" /> 0123 456 789
                </p>
                <p className="flex items-center mb-4">
                    <Mail className="mr-4" />
                    tiemgiatnhamoon@gmail.com
                </p>
                <p className="flex items-center mb-4">
                    <MapPin className="mr-4" /> 28/8, đường 25, phường Long
                    Thạnh Mỹ, Tp Thủ Đức.
                </p>
                <p className="flex items-center mb-4">
                    <Clock className="mr-4" /> Hoạt động 7:00 AM - 22:00 PM
                </p>
                <p className="flex items-center mb-4">
                    <Clock className="mr-4" /> 7 ngày/tuần
                </p>
                <br />
                <br />
                <Image
                    src="/images/logo2.png"
                    alt="MOON Logo"
                    width={300}
                    height={150}
                />
            </div>
            {/* </div> */}
        </section>
    );
}
export default GetInTouch;
