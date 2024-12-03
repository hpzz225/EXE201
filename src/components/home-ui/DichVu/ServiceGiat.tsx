import Image from 'next/image';

export function ServiceGiat() {
    return (
        <section className="relative w-full ">
            <Image
                src="/images/service-giat.png"
                alt="sv1"
                width={2000}
                height={1000}
                // className="w-full h-auto object-cover"
                className="object-cover"
            />

            <div className="absolute inset-y-0 right-[10%] flex flex-col justify-center items-start px-8 md:px-20 text-white">
                <h2 className="text-4xl font-bold text-[#d37569] max-md:text-3xl">
                    GIẶT SẤY
                </h2>
                <p className="mt-6 max-w-lg text-base font-medium max-md:text-sm">
                    Phù hợp cho áo quần thường ngày, ví dụ như áo thun, áo sơ
                    mi, quần jeans, khăn, tất vớ, đồ lót …
                    <br />
                    <br />
                    MOON sẽ giặt, sấy khô, đóng gói cẩn thận cho bạn
                </p>
                <button className="mt-12 px-6 py-3 text-center text-xl bg-[#54b8bd] rounded-xl shadow max-md:px-5 max-md:mt-10 hover:bg-[#54b8bd]/70">
                    Chi tiết giá
                </button>
            </div>
        </section>
    );
}
// import Image from 'next/image';

// export function ServiceGiat() {
//     return (
//         <section className="relative w-full">
//             <Image
//                 src="/images/service-giat.png"
//                 alt="sv1"
//                 width={2000}
//                 height={1000}
//                 className="object-cover" // Đảm bảo hình ảnh chiếm toàn bộ chiều rộng
//             />

//             <div className="absolute inset-y-0 right-0 flex flex-col justify-center items-start px-4 md:px-64 text-white">
//                 <h2 className="text-4xl font-bold text-[#d37569] max-md:text-3xl">
//                     GIẶT SẤY
//                 </h2>
//                 <p className="mt-4 max-w-lg text-base font-medium max-md:text-sm">
//                     Phù hợp cho áo quần thường ngày, ví dụ như áo thun, áo sơ
//                     mi, quần jeans, khăn, tất vớ, đồ lót …
//                     <br />
//                     <br />
//                     MOON sẽ giặt, sấy khô, đóng gói cẩn thận cho bạn
//                 </p>
//                 <button className="mt-6 px-4 py-2 text-lg bg-[#54b8bd] rounded-xl shadow max-md:px-3 max-md:mt-4 hover:bg-[#54b8bd]/70">
//                     Chi tiết giá
//                 </button>
//             </div>
//         </section>
//     );
// }
