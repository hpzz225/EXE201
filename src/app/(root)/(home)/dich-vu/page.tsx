import ContactForm from '@/components/_components-reuse/ContactForm';

import IntroService from '@/components/_components-reuse/ServiceIntro';
import { ServiceGiat } from '@/components/home-ui/DichVu/ServiceGiat';
import { ServiceVeSinh } from '@/components/home-ui/DichVu/ServiceVeSinh';
import React from 'react';

function DichVu() {
    return (
        <>
            <section className="max-w-screen-xl mx-auto">
                <IntroService
                    title="GIẶT GÌ KHÓ ĐÃ CÓ MOON LO!"
                    description="MOON hiểu nỗi lo về cái áo trắng tinh mới mua ko lâu bị lem màu, chiếc áo khoác len sợ bị xù lông hay bộ drap giường bị phai màu khi gửi giặt dịch vụ của khách hàng."
                    imageUrl="/images/intro-dich-vu-giat-say.png"
                    isImageFirst={false}
                />
                {/* </div> */}
            </section>
            <ServiceGiat />
            <ServiceVeSinh />
            <ContactForm />
        </>
    );
}

export default DichVu;
