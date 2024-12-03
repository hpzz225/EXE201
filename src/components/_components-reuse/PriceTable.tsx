import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Service } from '@/types';

interface PriceTableProps {
    items: Service[];
    layoutType: 'grid' | 'side-by-side';
    isImageFirst?: boolean;
}

export const PriceTable: React.FC<PriceTableProps> = ({
    items,
    layoutType,
    isImageFirst = false,
}) => {
    console.log('items', items);

    return (
        <section className="max-w-screen-xl mx-auto">
            {layoutType === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
                    {items.map((item) => (
                        <div
                            key={item.name}
                            className="text-center flex flex-col"
                        >
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src={item.imageURL}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="bg-white rounded-[20px] p-6 shadow-lg flex flex-col justify-between items-center  h-[500px]">
                                <h3 className="text-[#1b8b8d] text-3xl font-bold mb-2">
                                    {item.name}
                                </h3>
                                {item.description && (
                                    <p className=" text-[#22566e] text-xl font-normal ">
                                        {item.description}
                                    </p>
                                )}
                                <div className="flex flex-col">
                                    <p className="text-center text-[#22566e] text-7xl font-extrabold">
                                        {item.price}k
                                    </p>
                                    <p className="text-right text-[#22566e] text-3xl font-normal">
                                        /{item.clothUnit}
                                    </p>
                                </div>

                                <button className="mt-4 px-6 py-4 bg-[#f3908a] rounded-lg">
                                    <span className="text-white text-xl font-extrabold">
                                        {/* {item.buttonLabel} || Đặt dịch vụ */}
                                        Đặt dịch vụ
                                    </span>
                                </button>
                                {/* {item.note && (
                                    <div className="mt-4">
                                        {item.note.map((note, index) => (
                                            <p
                                                key={index}
                                                className="text-[#22566e] text-md font-normal line-clamp-2"
                                            >
                                                {note}
                                            </p>
                                        ))}
                                    </div>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full px-16">
                    {items.map((item) => (
                        <div
                            key={item.name}
                            className={cn(
                                'flex flex-col md:flex-row items-center justify-center',
                                isImageFirst
                                    ? 'md:flex-row-reverse'
                                    : 'md:flex-row'
                            )}
                        >
                            <div className="relative w-[500px] h-[500px]">
                                <Image
                                    src={item.imageURL}
                                    alt={item.name}
                                    fill
                                    sizes="max-width(720px) 100vw, 500px"
                                    className="object-contain"
                                />
                            </div>
                            <div className="bg-white p-6 w-1/3 rounded-lg shadow-lg space-y-8">
                                <h3 className="text-[#158283] text-2xl font-bold">
                                    {item.name}
                                </h3>
                                <div className="flex items-center my-4">
                                    <p className="text-[#22566e] text-4xl font-extrabold">
                                        {item.price}k/
                                    </p>
                                    <p className="text-[#22566e] text-4xl font-extrabold uppercase">
                                        {item.clothUnit}
                                    </p>
                                </div>
                                {/* {item.headSubtitle && (
                                    <span className="text-[#ee887a] text-lg font-bold">
                                        {item.headSubtitle}
                                    </span>
                                )} */}
                                {item.description && (
                                    <>
                                        <div className="flex items-center space-x-2">
                                            <Image
                                                src="/images/star.png"
                                                alt="icon"
                                                width={24}
                                                height={24}
                                                className="text-[#22566e]"
                                            />
                                            <p className="text-[#22566e] text-xl font-normal">
                                                {item.description.split(',')[0]}{' '}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Image
                                                src="/images/star.png"
                                                alt="icon"
                                                width={24}
                                                height={24}
                                                className="text-[#22566e]"
                                            />
                                            <p className="text-[#22566e] text-xl font-normal">
                                                {item.description.split(',')[1]}{' '}
                                            </p>
                                        </div>
                                    </>
                                )}
                                <button className="mt-4 px-6 py-3 bg-[#f3908a] rounded-lg text-white text-lg font-bold">
                                    {/* {item.buttonLabel} */}
                                    Đặt dịch vụ
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
