import Image from 'next/image';
import React from 'react';

interface Step {
    img: string;
    title: string;
    description: string[];
}

const steps: Step[] = [
    {
        img: '/images/buoc1.png',
        title: 'Bước 1',
        description: [
            'Bạn đặt dịch vụ thông qua website, fanpage hoặc hotline.',
            'MOON liên hệ nhận đồ của bạn vào thời gian và địa điểm thuận tiện nhất cho bạn.',
        ],
    },
    {
        img: '/images/buoc2.png',
        title: 'Bước 2',
        description: [
            'Hãy báo với MOON yêu cầu riêng của bạn, nếu bạn có nhu cầu giặt riêng đồ trắng hoặc không xài nước xả.',
        ],
    },
    {
        img: '/images/buoc3.png',
        title: 'Bước 3',
        description: [
            'Đồ của bạn sẽ được giặt sạch – sấy khô – gấp gọn gàng và đóng gói sạch sẽ.',
            'MOON giặt RIÊNG cho từng khách hàng, đảm bảo đồ của bạn luôn an toàn và sạch sẽ.',
        ],
    },
    {
        img: '/images/buoc4.png',
        title: 'Bước 4',
        description: [
            'Sau 24h MOON sẽ liên hệ bạn để giao hàng tận nơi và theo thời gian bạn mong muốn.',
        ],
    },
];

const ServiceProcess: React.FC = () => {
    return (
        <section className="max-w-screen-xl grid grid-cols-4 gap-10 mx-auto py-10">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center gap-10 p-4 bg-white rounded-lg shadow-lg "
                >
                    <div className="relative w-24 h-24">
                        <Image
                            src={step.img}
                            alt={step.title}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                    <h3 className="text-[#1b8b8d] text-2xl font-bold uppercase ">
                        {step.title}
                    </h3>

                    <div className="text-[#22566e] text-xl font-normal space-y-10 p-4">
                        {step.description.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ServiceProcess;
