import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import React from 'react';

interface CustomModalProps {
    isOpen: boolean; // Trạng thái mở modal
    onClose: () => void; // Hàm đóng modal
    title?: string; // Tiêu đề
    children?: React.ReactNode; // Nội dung
    footer?: React.ReactNode; // Footer
    iconSrc?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    iconSrc,
    footer,
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />

                <Dialog.Content className="fixed space-y-6 top-1/2 left-1/2 w-full max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 focus:outline-none">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt="Icon"
                            width={200}
                            height={150}
                            className="text-center mx-auto "
                        />
                    )}
                    {title && (
                        <Dialog.Title className="text-xl font-semibold mb-4">
                            {title}
                        </Dialog.Title>
                    )}

                    <div className="mb-4">{children}</div>

                    {footer && <div className="mt-4">{footer}</div>}

                    {/* Close Button */}
                    <Dialog.Close asChild>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CustomModal;
