'use client'

import Image from "next/image";
import { formatNumber } from "@/utils/format";
import { useTransition } from "react";
import { addItem } from "@/app/add-to-cart/action";
import CoffeeImage from "../../public/coffe.jpg";

type ProductCartProps = {
    id: number,
    userId: string;
    name: string
    price: number,
}

export default function ProductCard({
    id, userId, name, price
}: ProductCartProps) {
    let [isPending, startTransition] = useTransition()

    return (
        <div className="p-3 border rounded-xl border-slate-700">
            <div className="mb-2 bg-gray-300 rounded-md">
                <Image src={CoffeeImage} alt="coffee" width={180} height={180} className="w-[180px] h-[180px] rounded object-cover" />
            </div>
            <h2 className="text-slate-900">{name}</h2>
            <h2 className="font-semibold text-green-500">$ {formatNumber(price)}</h2>
            <button
                className="w-full px-2 h-[30px] mt-4 text-sm font-semibold text-center rounded-md bg-slate-100 text-slate-900"
                onClick={() => {
                    startTransition(() => addItem(userId, id));
                }}
            >
                {isPending ?
                    <div className="grid w-full overflow-x-scroll rounded-lg place-items-center lg:overflow-visible">
                        <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                            width="18" height="18">
                            <path
                                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path
                                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                            </path>
                        </svg>
                    </div>
                    : "Add To Cart"}
            </button>
        </div>
    )
}