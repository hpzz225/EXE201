'use client';

import React from 'react';

const Maps: React.FC = () => {
    return (
        <section className="max-w-screen-xl mx-auto">
            <h2 className="text-[#35a5a7] text-4xl font-bold py-16 text-center">
                XEM TRÊN BẢN ĐỒ
            </h2>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d244.91108329399682!2d106.83137979829512!3d10.843622276428274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d10.843605!2d106.8315245!5e0!3m2!1svi!2s!4v1728178943457!5m2!1svi!2s"
                width="100%"
                height="400"
                style={{ border: '0' }}
                loading="lazy"
                title="Map Location"
            />
        </section>
    );
};

export default Maps;
