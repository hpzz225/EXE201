import Image from 'next/image';
import React from 'react';

const FeeDelivery = () => {
    return (
        <section className="max-w-screen-xl mx-auto">
            {' '}
            <div className="relative flex items-center py-10">
                <div className="w-1/2 h-[600px] z-10 relative">
                    <Image
                        src={'/images/shipper.png'}
                        alt="Shipper"
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="relative w-full md:w-1/2 h-[500px] z-0">
                    <div className="relative inset-0 w-full h-full">
                        <Image
                            src={'/images/bgship.png'}
                            alt="BG Ship"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-center items-start z-10 space-y-4 pl-4 md:pl-36">
                        <h2 className="text-[#158283] text-4xl font-bold">
                            PHÍ SHIP
                        </h2>
                        <p className="text-[#22566e] text-xl font-normal">
                            Giao nhận 2 chiều (tận nhà) <br />
                            Từ 7h-22h mỗi ngày, 7 ngày/tuần
                        </p>
                        <div className="mt-4 flex justify-between gap-6 ">
                            <p className="text-[#22566e] text-2xl font-bold">
                                Ship 2 chiều
                            </p>
                            <ul className="text-[#22566e] text-2xl font-medium space-y-2">
                                <li className="flex items-center">
                                    <Image
                                        src={'/images/red-star.png'}
                                        alt="star"
                                        width={20}
                                        height={20}
                                        className="w-[24px] h-[22px] inline-block mr-2"
                                    />
                                    Dưới 5km: <strong>10k</strong>
                                </li>
                                <li className="flex items-center">
                                    <Image
                                        src={'/images/red-star.png'}
                                        alt="star"
                                        width={20}
                                        height={20}
                                        className="w-[24px] h-[22px] inline-block mr-2"
                                    />
                                    Trên 5km: <strong>20k</strong>
                                </li>
                                <li className="flex items-center font-semibold">
                                    <Image
                                        src={'/images/red-star.png'}
                                        alt="star"
                                        width={20}
                                        height={20}
                                        className="w-[24px] h-[22px] inline-block mr-2"
                                    />
                                    Free ship cho đơn trên 50k
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeeDelivery;
