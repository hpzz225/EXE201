import Banner from '@/components/_components-reuse/Banner';
// import ContactForm from '@/components/_components-reuse/ContactForm';
import ContentHeader from '@/components/_components-reuse/ContentHeader';
// import FeeDelivery from '@/components/_components-reuse/FreeDelivery';
import { PriceTable } from '@/components/_components-reuse/PriceTable';
import ServiceIntro from '@/components/_components-reuse/ServiceIntro';
import ServiceProcess from '@/components/_components-reuse/ServiceProcess';
import { Service } from '@/types';

import dynamic from 'next/dynamic';
const ContactForm = dynamic(
    () => import('@/components/_components-reuse/ContactForm')
);
const FeeDelivery = dynamic(
    () => import('@/components/_components-reuse/FreeDelivery')
);

const slugToIdMap: { [key: string]: number } = {
    'dich-vu-giat-say': 1,
    've-sinh-giay-dep': 2,
    'giat-say-khan-rem': 3,
    've-sinh-gau-bong-topper': 4,
};
const getBannerImageUrl = (slug: string) => {
    const bannerImages: { [key: string]: string } = {
        'dich-vu-giat-say': '/images/logo-dich-vu.png',
        've-sinh-giay-dep': '/images/logo-giay-dep.png',
        'giat-say-khan-rem': '/images/logo-giat-say-khan-rem.png',
        've-sinh-gau-bong-topper': '/images/logo-gaubong-topper.png',
    };
    return bannerImages[slug] || '/images/default-banner.png';
};
const getImageUrl = (slug: string) => {
    const images: { [key: string]: string } = {
        'dich-vu-giat-say': '/images/giatsaylaylien.png',
        've-sinh-giay-dep': '/images/ve-sinh-giay-dep.png',
        'giat-say-khan-rem': '/images/giat-say-khan-rem.png',
        've-sinh-gau-bong-topper': '/images/ve-sinh-gaubong-topper.png',
    };
    return images[slug] || null;
};

type ServiceDetailParams = {
    params: Promise<{ slug: string }>;
};

const ServiceDetail = async ({ params }: ServiceDetailParams) => {
    const { slug } = await params;

    const serviceId = slugToIdMap[slug as string];
    const bannerImageUrl = getBannerImageUrl(slug);
    const imageUrl = getImageUrl(slug);

    const response = await fetch(
        `https://moonwash.azurewebsites.net/api/ServiceCategory/${serviceId}`,
        {
            // next: { revalidate: 3600 },
        }
    );

    if (!response.ok) {
        const errorMessage = `Error loading service details: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        return <div className="text-center text-red-500">{errorMessage}</div>;
    }

    const serviceDetails = await response.json();

    // console.log(serviceDetails);

    if (!serviceDetails.data) {
        return (
            <div className="text-center text-gray-500">
                No service details available.
            </div>
        );
    }

    const { name, description, services = [] } = serviceDetails.data;
    // console.log(services);

    if (services.length === 0) {
        // return (
        //     <div className="text-center text-gray-500">
        //         No service details available.
        //     </div>
        // );
    }

    return (
        <>
            <Banner imageUrl={bannerImageUrl} />

            <ServiceIntro
                imageUrl={imageUrl || ''}
                title={name}
                description={description || ''}
                isImageFirst={true}
            />

            <ContentHeader title="Bảng Giá" iconSrc="/images/symbol.png" />

            {slug === 'dich-vu-giat-say' || slug === 'giat-say-khan-rem' ? (
                <PriceTable items={services} layoutType="grid" />
            ) : slug === 've-sinh-giay-dep' ? (
                <PriceTable items={services} layoutType="side-by-side" />
            ) : slug === 've-sinh-gau-bong-topper' ? (
                <>
                    {services.map((service: Service, index: number) => (
                        <PriceTable
                            key={index}
                            items={[service]}
                            isImageFirst={index === 1}
                            layoutType="side-by-side"
                        />
                    ))}
                </>
            ) : null}

            <ContentHeader
                title="QUY TRÌNH DỊCH VỤ"
                iconSrc="/images/symbol.png"
            />
            <ServiceProcess />
            <FeeDelivery />
            <ContactForm />
        </>
    );
};

export default ServiceDetail;
