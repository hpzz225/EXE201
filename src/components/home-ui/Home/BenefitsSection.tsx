'use client';

import ContentHeader from '@/components/_components-reuse/ContentHeader';
import Image from 'next/image';

interface Benefit {
    title: string;
    description: string;
    imageSrc: string;
}

const benefits: Benefit[] = [
    {
        title: 'CHI PHÍ HỢP LÝ',
        description:
            'Tiệm giặt nhà MOON với chi phí hợp lý cho tất cả khách hàng khi so sánh trên thị trường.',
        imageSrc: '/images/bnf1.png',
    },
    {
        title: 'GIAO HÀNG TẬN NƠI',
        description:
            'Hỗ trợ giao nhận tận nhà từ 7h – 22h tất cả 7 ngày trong tuần.',
        imageSrc: '/images/bnf2.png',
    },
    {
        title: 'CHẤT LƯỢNG',
        description:
            'Đảm bảo chất lượng giặt sấy với máy móc hiện đại và dịch vụ an toàn, hiệu quả cho quần áo.',
        imageSrc: '/images/bnf3.png',
    },
    {
        title: 'UY TÍN-TỈ MỈ',
        description:
            'Cam kết chăm sóc quần áo của bạn tốt nhất, đảm bảo làm sạch đúng yêu cầu và giặt lại nếu bạn không hài lòng.',
        imageSrc: '/images/bnf4.png',
    },
];

const BenefitCard = ({ title, description, imageSrc }: Benefit) => (
    <div className="bg-white p-8 rounded-3xl shadow-md w-[300px] min-h-[350px] flex flex-col">
        <div className="relative flex justify-center w-full mb-4 h-[100px]">
            <Image
                src={imageSrc}
                alt={title}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw , 50vw"
                className="object-contain"
            />
        </div>
        <h3 className="text-[#35A6A8] text-[24px] font-bold">{title}</h3>
        <p className="text-[#22566e] text-[18px] font-normal mt-4 flex-grow">
            {description}
        </p>
    </div>
);

const BenefitsSection = () => {
    return (
        <section className="bg-[#EAF6F6] py-16">
            <div className="max-w-screen-xl mx-auto text-center">
                {/* <h2 className="text-[#35A6A8] text-[40px] font-bold">
                    TẠI SAO NÊN CHỌN MOON?
                </h2> */}
                <ContentHeader
                    title="tại sao nên chọn moon ?"
                    iconSrc="/images/symbol.png"
                />
                <div className="w-[60px] h-[3px] bg-[#35A6A8] mx-auto my-4"></div>

                <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8 mt-10">
                    {benefits.map((benefit, index) => (
                        <BenefitCard key={index} {...benefit} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
