import { formatNumber } from "@/utils/format"

type CartItemProps = {
    no: number,
    name: string,
    quantity: number,
    price: number,
}

export default function CartItem({
    no, name, quantity, price
}: CartItemProps) {
    return <div className="flex justify-between text-slate-400">
        <div className="w-[40%] flex gap-2 items-center">
            <span className="text-sm text-slate-600">{no}</span>
            <span>{name}</span>
        </div>
        <div className="w-[30%] text-center">{quantity}</div>
        <div className="w-[30%] text-right">{formatNumber(quantity * price)}</div>
    </div>
}