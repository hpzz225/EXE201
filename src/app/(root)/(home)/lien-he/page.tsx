import ContactForm from '@/components/_components-reuse/ContactForm';

import IntroService from '@/components/_components-reuse/ServiceIntro';
import GetInTouch from '@/components/home-ui/LienHe/GetInTouch';
import Maps from '@/components/home-ui/LienHe/Maps';

import React from 'react';

const LienHe = () => {
    return (
        <>
            {/* <section className="max-w-screen-xl mx-auto"> */}
            <IntroService
                title="LIÊN HỆ VỚI CHÚNG TÔI"
                description="Đội ngũ chuyên viên tư vấn Tiệm Giặt Nhà MOON luôn sẵn sàng hỗ trợ
                            khách hàng để tìm được dịch vụ mong muốn."
                imageUrl="/images/lien-he.png"
                isImageFirst={false}
            />
            <GetInTouch />
            <Maps />
            <ContactForm />
            {/* </section> */}
        </>
    );
};

export default LienHe;
