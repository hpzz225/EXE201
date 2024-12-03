import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

import { cn } from '@/lib/utils';

interface FormSubmitProps {
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

const FormSubmit: React.FC<FormSubmitProps> = ({
    className,
    disabled,
    children,
}) => {
    return (
        <Button
            type="submit"
            className={cn(
                `bg-[#FA7B6E] w-[200px] text-white text-lg py-6 rounded-3xl hover:bg-[#f76153]`,
                className
            )}
            disabled={disabled}
        >
            {disabled ? (
                <span className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    Đang gửi...
                </span>
            ) : (
                children || 'Gửi'
            )}
        </Button>
    );
};

export default FormSubmit;
