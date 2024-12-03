import Image from 'next/image';

interface BannerProps {
    imageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl }) => {
    return (
        <>
            {/* <section className="relative w-full h-[500px]">
                <Image
                    alt="Banner"
                    src={imageUrl}
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </section> */}
            <section>
                <Image
                    alt="Banner"
                    src={imageUrl}
                    width={1000}
                    height={475}
                    sizes="100vw"
                    className="w-full h-auto "
                />
            </section>
        </>
    );
};

export default Banner;
