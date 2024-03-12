import ProductCard from "@/components/ProductCard";
import CartItem from "@/components/CartItem";
import { type Cart } from "./action";
import { kv } from "@vercel/kv";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export type Product = {
    id: number,
    name: string,
    price: number
}

export const products: Product[] = [
    {
        id: 1,
        name: "Americano",
        price: 40
    },
    {
        id: 2,
        name: "Expresso",
        price: 20
    },
    {
        id: 3,
        name: "Arabica",
        price: 10
    }
];

export default async function AddToCart() {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }
    
    const userId = session.user._id;
    const cart: Cart | null = await kv.get(`cart-${userId}`);
    const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return (
        <main className="flex flex-col items-center min-h-screen p-24 bg-slate-950">
            <div className="w-full">
                <h1 className="mb-6 text-xl font-semibold text-left text-slate-400">Products: </h1>

                <div className="flex gap-6">
                    {products.map(product =>
                        <ProductCard key={product.id}
                            id={product.id}
                            userId={userId}
                            name={product.name}
                            price={product.price}
                        />
                    )}
                </div>
            </div>

            <div className="w-full mt-6">
                <h1 className="text-xl font-semibold text-slate-400">Cart: </h1>

                <div className="flex flex-col gap-2 px-6 py-4 mt-2 border rounded-xl border-slate-700">
                    {cart?.items ? cart.items.map((item, index) =>
                        <CartItem key={item.id}
                            no={index + 1}
                            id={item.id}
                            userId={userId}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                        />
                    ) :
                        <span className="text-sm text-slate-600">No Item</span>
                    }
                </div>

                <div className="flex justify-between px-6 mt-4 font-semibold text-slate-400">
                    <div>Total</div>
                    <div>{total}</div>
                </div>
            </div>
        </main>
    )
}