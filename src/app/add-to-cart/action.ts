'use server'

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { products, type Product } from "./page";

export type Cart = {
    userId: string;
    items: Array<{
        id: number,
        name: string,
        price: number,
        quantity: number
    }>
}

export async function addItem(userId: string, productId: number) {
    let cart: Cart | null = await kv.get(`testcart-${userId}`);

    const selectedProduct: Product | undefined = products.find(product => product.id === productId);

    if (!selectedProduct) {
        console.error(`Product with id ${productId} not found.`);
        return;
    }

    let myCart = {} as Cart;

    if (!cart || !cart.items) {
        myCart = {
            userId: userId,
            items: [
                {
                    ...selectedProduct,
                    quantity: 1
                }
            ]
        };
    } else {
        let itemFound = false;

        myCart.items = cart.items.map(item => {
            if (item.id === productId) {
                itemFound = true;
                item.quantity += 1;
            }
            return item;
        }) as Cart['items'];

        if (!itemFound) {
            console.log('Adding new item to the cart.');
            myCart.items.push({
                ...selectedProduct,
                quantity: 1,
            });
        }
    }

    console.log('Updated Cart:', myCart);

    await kv.set(`testcart-${userId}`, myCart);
    revalidatePath('/add-to-cart');
}

export async function delItem(userId: string, productId: number) {
    let cart: Cart | null = await kv.get(`testcart-${userId}`);

    if (cart && cart.items) {
        const updatedCart = {
            userId: userId,
            items: cart.items.filter(item => item.id !== productId),
        };

        await kv.set(`testcart-${userId}`, updatedCart);
        revalidatePath('/add-to-cart');
    }
}

export async function delOneItem(userId: string, productId: number) {
    let cart: Cart | null = await kv.get(`testcart-${userId}`);

    if (cart && cart.items) {
        const updatedCart = {
            userId: userId,
            items: cart.items.map(item => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        return null;
                    }
                }
                return item;
            }).filter(Boolean) as Cart['items'],
        };

        await kv.set(`testcart-${userId}`, updatedCart);
        revalidatePath('/add-to-cart');
    }
}