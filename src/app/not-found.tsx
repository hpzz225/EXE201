import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-[#35a5a7] animate-pulse">
                    404
                </h1>
                <h2 className="text-4xl mt-4 text-[#ee887a] font-semibold">
                    Oops! Trang không tồn tại
                </h2>
                <p className="text-lg mt-6 text-gray-400">
                    Chúng tôi không thể tìm thấy trang mà bạn đang tìm kiếm. Hãy
                    thử quay lại trang chủ hoặc kiểm tra lại đường dẫn.
                </p>
                <div className="mt-8">
                    <Link
                        href={'/'}
                        className="px-6 py-3 bg-[#ee887a] hover:bg-[#dc6b5b] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105/>
                        "
                    >
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}
