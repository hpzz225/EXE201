import Image from 'next/image';

export const ServiceVeSinh = () => {
    return (
        <section className="relative w-full py-32">
            <Image
                src="/images/service-vesinh.png"
                alt="sv2"
                width={2000}
                height={1000}
                // className="w-full h-auto object-cover"
                className="object-cover"
            />
            <div className="absolute inset-y-0 left-[10%] flex flex-col justify-center items-start px-8 md:px-20 text-white">
                <h2 className="text-4xl font-bold text-[#d37569] max-md:text-3xl">
                    VỆ SINH GIÀY DÉP
                </h2>
                <p className="mt-4 max-w-lg text-base font-medium max-md:text-sm">
                    Phù hợp cho áo quần thường ngày, ví dụ như áo thun, áo sơ
                    mi, quần jeans, khăn, tất vớ, đồ lót …
                    <br />
                    <br />
                    MOON sẽ giặt, sấy khô, đóng gói cẩn thận cho bạn
                </p>
                <button className="mt-6 px-4 py-2 text-lg bg-[#f49791] rounded-xl shadow max-md:px-3 max-md:mt-4 hover:bg-[#f49791]/70">
                    Chi tiết giá
                </button>
            </div>
        </section>
    );
};
