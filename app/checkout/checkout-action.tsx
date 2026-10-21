"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store"
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData) : Promise<void> => {
    const items = formData.get("items") as string
    const itemsArray = JSON.parse(items)
    const line_items = itemsArray.map((item: CartItem) => ({
        price_data: {
            currency: "brl",
            unit_amount: item.price,
            product_data: {
                name: item.name,
            },
        },
        quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/aprovado`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });
    redirect(session.url!);
    };