import React from 'react';
import { type Cart } from "@/app/add-to-cart/action";
import { kv } from "@vercel/kv";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";

const Navbar = async () => {
    const session: Session | null = await getServerSession(authOptions);
    const userId = session?.user._id;
    const cart: Cart | null = await kv.get(`testcart-${userId}`);

    const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
    
    return (
        <div className='fixed h-[50px] w-full flex items-center justify-between px-5 text-slate-900'>
            <span className='text-lg font-medium'>LOGO</span>
            <span className='font-medium'>{total}</span>
        </div>
    )
}

export default Navbar
