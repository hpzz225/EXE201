'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import CartSidebar from '@/components/home-ui/CuaHang/slider-drawer';
import { Product } from '@/types';

const CuaHang = () => {
    const products: Product[] = [
        {
            id: 1,
            name: 'Product 1',
            image: '/images/intro1.png',
            price: 500000,
            quantity: 7,
        },
        {
            id: 2,
            name: 'Product 2',
            image: '/images/intro1.png',
            price: 700000,
            quantity: 8,
        },
        {
            id: 3,
            name: 'Product 3',
            image: '/images/intro1.png',
            price: 1000000,
            quantity: 2,
        },
    ];

    const [cart, setCart] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAddToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.id === product.id
            );
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const handleUpdateQuantity = (productId: number, newQuantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
                    : item
            )
        );
    };

    const handleRemoveFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    return (
        <div className="max-w-screen-xl mx-auto py-16">
            <div className="flex items-center justify-between">
                <p className="text-center text-[#35a5a7] text-4xl font-bold flex-1">
                    Cửa hàng
                </p>
                <div
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer flex justify-end"
                >
                    <Image
                        src={'/images/shop-sm.png'}
                        alt="logo"
                        width={44}
                        height={37}
                        className="w-[44px] h-[37px]"
                    />
                </div>
            </div>
            <CartSidebar
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                products={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 space-y-4"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-full h-[200px] object-cover rounded-lg"
                        />
                        <h3 className="text-lg font-semibold">
                            {product.name}
                        </h3>
                        <p className="text-[#35a5a7] font-bold">
                            {product.price.toLocaleString()} VND
                        </p>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full text-white bg-[#ee887a] hover:bg-[#dc6b5b] text-lg font-semibold rounded-lg px-4 py-2 transition-colors"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CuaHang;
