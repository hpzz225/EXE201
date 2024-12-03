'use client';

import ContentHeader from '@/components/_components-reuse/ContentHeader';
import Image from 'next/image';

interface Service {
    title: string;
    description: string;
    imageSrc: string;
}

const services: Service[] = [
    {
        title: 'Giặt Sấy Quần Áo',
        description:
            'Phù hợp với các loại quần áo có chất liệu vải thông thường, chăn, mền.',
        imageSrc: '/images/intro1.png',
    },
    {
        title: 'VỆ SINH GIÀY DÉP',
        description:
            'Giày của bạn trở nên sáng bóng và thơm tho, sẵn sàng cho mọi chặng đường',
        imageSrc: '/images/intro2.png',
    },
    {
        title: 'GIẶT SẤY KHĂN, RÈM',
        description:
            'Giải pháp chuyên nghiệp để bảo quản và làm sạch khăn, rèm của bạn.',
        imageSrc: '/images/intro3.png',
    },
    {
        title: 'VỆ SINH GẤU BÔNG, TOPPER',
        description:
            'Dịch vụ mang lại sự tươi mới và an toàn cho gấu bông - topper của bạn.',
        imageSrc: '/images/intro4.png',
    },
];

const ServiceCard = ({ title, description, imageSrc }: Service) => (
    <div className="text-center w-full">
        <div className="relative w-full h-[350px]">
            <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw , 50vw"
                className="object-contain"
            />
        </div>
        <div className="w-full p-8">
            <h2 className="text-[#35a5a7] text-3xl font-bold">{title}</h2>
            <p className="text-[#22566e] text-xl font-normal p-4">
                {description}
            </p>
            <button className="bg-[#f3908a] rounded-2xl shadow text-white py-2 px-6 hover:bg-[#2b8c8c] transition duration-300 hover:shadow-xl">
                Xem chi tiết
            </button>
        </div>
    </div>
);

const IntroServices = () => {
    return (
        <section className="max-w-screen-xl mx-auto py-4">
            <ContentHeader title="Moon Có Gì ?" iconSrc="/images/symbol.png" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </section>
    );
};

export default IntroServices;
