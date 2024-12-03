import { z } from 'zod';
import { phoneValidate } from './phone-number'; // Đảm bảo phoneValidate trả về boolean

export const RegisterBody = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, { message: 'Tên người dùng phải có ít nhất 2 ký tự.' })
            .max(256, {
                message: 'Tên người dùng không được vượt quá 256 ký tự.',
            }),
        phone: z
            .string()
            .trim()
            .min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự.' })
            .max(12, { message: 'Số điện thoại không được vượt quá 12 ký tự.' })
            .refine(phoneValidate, {
                message: 'Số điện thoại không hợp lệ.',
            }),

        email: z.string().trim().email({ message: 'Email không hợp lệ.' }),
        password: z
            .string()
            .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
            .max(100, { message: 'Mật khẩu không được vượt quá 100 ký tự.' }),
        confirmPassword: z
            .string()
            .min(6, { message: 'Xác nhận mật khẩu phải có ít nhất 6 ký tự.' })
            .max(100, {
                message: 'Xác nhận mật khẩu không được vượt quá 100 ký tự.',
            }),
    })
    .strict()
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Mật khẩu và xác nhận mật khẩu không khớp.',
                path: ['confirmPassword'],
            });
        }
    });

export const LoginBody = z.object({
    email: z.string().trim().email({ message: 'Email không hợp lệ.' }),

    password: z
        .string()
        .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
        .max(100, { message: 'Mật khẩu không được vượt quá 100 ký tự.' }),
});

// Loại dữ liệu
export type RegisterFormData = z.infer<typeof RegisterBody>;
export type LoginFormData = z.infer<typeof LoginBody>;
