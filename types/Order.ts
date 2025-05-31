import { CartItem } from "./Cart"

export interface Order {
    _id?: string,
    name: string,
    table?: number | string,
    message?: string,
    address?: string,
    mobile?: string,
    portCode?: number | string,
    orderType: 'diningIn' | 'delivery',
    totalQuantity: number,
    subTotal: number,
    items: CartItem[],
    createdAt?: number
}