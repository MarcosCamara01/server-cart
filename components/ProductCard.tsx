'use client'

import Image from "next/image";
import { formatNumber } from "@/utils/format";
import { useTransition } from "react";
import { addItem } from "@/app/add-to-cart/action";
import CoffeeImage from "@/public/product.png";

type ProductCartProps = {
    id: number,
    name: string
    price: number,
}

export default function ProductCard({
    id, name, price
}: ProductCartProps) {
    let [isPending, startTransition] = useTransition()

    return (
        <div className="p-3 border rounded-xl border-slate-700">
            <div className="mb-2 bg-gray-300 rounded-md">
                <Image src={CoffeeImage} alt="coffee" width={180} height={180} className="w-[180px] h-[180px] rounded object-cover" />
            </div>
            <h2 className="text-slate-400">{name}</h2>
            <h2 className="font-semibold text-green-400">$ {formatNumber(price)}</h2>
            <button
                className="w-full px-2 py-1 mt-4 text-sm font-semibold text-center rounded-md bg-slate-100 text-slate-800"
                onClick={() => {
                    startTransition(() => addItem(id));
                }}
            >
                Add To Cart
            </button>
        </div>
    )
}