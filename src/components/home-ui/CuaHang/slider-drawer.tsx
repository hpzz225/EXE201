'use client';

import { Product } from '@/types';
import Image from 'next/image';
import React from 'react';

type CartSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    products: Product[];
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemoveFromCart: (productId: number) => void;
};

const CartSidebar: React.FC<CartSidebarProps> = ({
    isOpen,
    onClose,
    products,
    onUpdateQuantity,
    onRemoveFromCart,
}) => {
    const totalPrice = products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                ></div>
            )}
            <div
                className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-all ease-in-out duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4 relative">
                    <h2 className="text-2xl font-bold">Giỏ hàng</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-600"
                    >
                        Đóng
                    </button>

                    {products.length === 0 ? (
                        <p className="mt-6 text-center">Giỏ hàng trống.</p>
                    ) : (
                        <div className="mt-4 space-y-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex justify-between items-center border-b pb-4"
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={50}
                                        height={50}
                                        className="w-16 h-16 rounded-md"
                                    />
                                    <div className="flex-1 ml-4">
                                        <h3 className="font-semibold">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-500">
                                            {product.price.toLocaleString()} VND
                                        </p>
                                        <div className="flex items-center mt-2 space-x-2">
                                            <button
                                                onClick={() =>
                                                    onUpdateQuantity(
                                                        product.id,
                                                        Math.max(
                                                            1,
                                                            product.quantity - 1
                                                        )
                                                    )
                                                }
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                -
                                            </button>
                                            <span>{product.quantity}</span>
                                            <button
                                                onClick={() =>
                                                    onUpdateQuantity(
                                                        product.id,
                                                        product.quantity + 1
                                                    )
                                                }
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            onRemoveFromCart(product.id)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))}
                            <div className="mt-6 border-t pt-4 flex justify-between">
                                <span className="font-bold">Tổng cộng:</span>
                                <span className="font-semibold">
                                    {totalPrice.toLocaleString()} VND
                                </span>
                            </div>
                            <button className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg">
                                Thanh toán
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
