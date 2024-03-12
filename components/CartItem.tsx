"use client"

import { formatNumber } from "@/utils/format";
import { useTransition } from "react";
import { delItem, delOneItem } from "@/app/add-to-cart/action";

type CartItemProps = {
    no: number,
    id: number,
    userId: string,
    name: string,
    quantity: number,
    price: number,
}

export default function CartItem({
    no, id, userId, name, quantity, price
}: CartItemProps) {
    let [isPending, startTransition] = useTransition()

    return <div className="flex justify-between text-slate-400">
        <div className="w-[40%] flex gap-2 items-center">
            <span className="text-sm text-slate-600">{no}</span>
            <span>{name}</span>
        </div>
        <div className="w-[30%] text-center">{quantity}</div>
        <div className="w-[30%] text-right">{formatNumber(quantity * price)}</div>
        <button
            className="px-1 py-0.5 mt-4 text-sm font-semibold text-center rounded-md bg-slate-100 text-slate-800"
            onClick={() => {
                startTransition(() => delItem(userId, id));
            }}
        >
            Delete all items
        </button>
        <button
            className="px-1 py-0.5 mt-4 text-sm font-semibold text-center rounded-md bg-slate-100 text-slate-800"
            onClick={() => {
                startTransition(() => delOneItem(userId, id));
            }}
        >
            Delete one item
        </button>
    </div>
}