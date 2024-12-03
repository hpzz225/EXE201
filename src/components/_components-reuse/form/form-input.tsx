import React from 'react';
import clsx from 'clsx';

interface FormInputProps {
    label?: string;
    type?: string;
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    error,
    className,
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-1 text-sm font-medium text-gray-200"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={clsx(
                    'w-full px-4 py-2 text-gray-900 rounded-lg outline-none',
                    'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    'transition duration-200 ease-in-out',
                    error ? 'border-red-500' : 'border-gray-300',
                    className
                )}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default FormInput;
