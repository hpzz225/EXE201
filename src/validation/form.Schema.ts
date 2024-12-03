import { z } from 'zod';
import { phoneValidate } from './phone-number';

export const formSchema = z.object({
    fullName: z
        .string()
        .min(2, { message: 'Họ và tên phải có ít nhất 2 ký tự.' }),
    phoneNumber: z
        .string()
        .regex(/^\d{10}$/, { message: 'Số điện thoại phải gồm 10 chữ số.' })
        .refine(phoneValidate, {
            message: 'Số điện thoại không hợp lệ.',
        }),
    address: z.string().nonempty({ message: 'Địa chỉ không được để trống.' }),
    email: z.string().email({ message: 'Email không hợp lệ.' }),
});

export type ContactFormData = z.infer<typeof formSchema>;
