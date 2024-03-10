'use server'

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { products, type Product } from "./page";

export type Cart = {
  items: [
    {
      id: number,
      name: string,
      price: number,
      quantity: number
    }
  ]
}

export async function addItem(id: number) {
    let cart: Cart | null = await kv.get("cart");

    const selectedProduct: Product = products.filter(product => product.id === id)[0];
    let myCart = {} as Cart;

    if (!cart || !cart?.items) {
        myCart = {
            items: [
                {
                    ...selectedProduct,
                    quantity: 1
                }
        ]};
    } else {
        let itemNotFound = true;

        myCart.items = cart.items.map(item => {
            if (item.id === id) {
                itemNotFound = false;
                item.quantity += 1;
            }
            return item;
        }) as Cart['items'];

        if (itemNotFound) {
            myCart.items.push({
                ...selectedProduct,
                quantity: 1,
            })
        }
    }

    await kv.set("cart", myCart);
    revalidatePath('/add-to-cart');
}