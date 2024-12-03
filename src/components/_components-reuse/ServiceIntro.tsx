import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ServiceIntroProps {
    title: string;
    description: string;
    imageUrl: string;
    isImageFirst?: boolean;
}

const ServiceIntro: React.FC<ServiceIntroProps> = ({
    title,
    description,
    imageUrl,
    isImageFirst = false,
}) => {
    return (
        <section className="py-10">
            <div
                className={cn(
                    'max-w-screen-xl mx-auto flex flex-col md:flex-row ',
                    isImageFirst && 'md:flex-row-reverse'
                )}
            >
                <div className="md:w-1/2 flex">
                    <div className="relative flex flex-wrap p-[10px] content-center items-center">
                        <h2 className="text-[#35a5a7] text-3xl md:text-4xl font-bold mb-4">
                            {title}
                        </h2>
                        <p className="text-[#22566e] text-lg md:text-xl font-normal mt-4">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <div className="p-[10px]">
                        <div className="relative w-full h-[400px]">
                            <Image
                                src={imageUrl}
                                alt={title ? title : ''}
                                fill
                                quality={100}
                                sizes="100vw"
                                className="object-contain"
                            />
                        </div>
                        {/* <Image
                            alt="Giật Sấy Lấy Liền!"
                            src={imageUrl}
                            width={718}
                            height={457}
                            quality={75}
                            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 718px"
                            className="w-auto h-auto"
                            priority={false}
                        /> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceIntro;
