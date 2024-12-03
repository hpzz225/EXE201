// 'use client';
// import { FieldValues, Form, UseFormReturn } from 'react-hook-form';

// interface FormCustomProps<T extends FieldValues> {
//     form: UseFormReturn<T>;
//     children: React.ReactNode;
//     className?: string;
//     onSubmit: (data: T) => void | Promise<void>;
// }

// export const FormCustom = <T extends FieldValues>(
//     props: FormCustomProps<T>
// ) => {
//     const { form, children, className, onSubmit } = props;

//     const onSubmitError = (errors: any) => {
//         console.log('Form Errors: ', errors);
//     };

//     return (
//         <Form {...form}>
//             <form
//                 className={className}
//                 onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
//             >
//                 {children}
//             </form>
//         </Form>
//     );
// };
