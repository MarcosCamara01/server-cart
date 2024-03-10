import React from 'react';
import { type Cart } from "@/app/add-to-cart/action";
import { kv } from "@vercel/kv";

const Navbar = async () => {
    const cart: Cart | null = await kv.get("cart");

    const total = cart?.items.map(item => item.quantity)
        .reduce((sum, current) => sum = sum + current);

    return (
        <div className='fixed h-[50px] w-full flex items-center justify-between px-5 text-white'>
            <span>LOGO</span>
            <span>{total}</span>
        </div>
    )
}

export default Navbar
