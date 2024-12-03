import Image from 'next/image';
import React from 'react';

interface ContentHeaderProps {
    title: string;
    iconSrc?: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ title, iconSrc }) => {
    return (
        <div className="flex flex-col items-center text-center justify-center space-y-6 py-10">
            <h1 className="text-[#35a5a7] text-4xl font-bold uppercase">
                {title}
            </h1>
            {iconSrc && (
                <div className="relative w-full h-[30px]">
                    <Image
                        src={iconSrc}
                        alt="Section Icon"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw , 50vw"
                        className="object-contain"
                    />
                </div>
            )}
        </div>
    );
};

export default ContentHeader;
