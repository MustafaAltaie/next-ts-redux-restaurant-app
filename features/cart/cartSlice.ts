import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/Cart';

interface CartState {
    items: CartItem[],
    totalQuantity: number,
    totalPrice: number
}

const initialState: CartState = {
    items: [
        {
            id: '1',
            name: 'dfgsdg',
            price: 22,
            quantity: 2,
            image: '/section2-images/1.webp',
        },
        {
            id: '2',
            name: 'dsredrhv',
            price: 32,
            quantity: 1,
            image: '/section2-images/2.png',
        },
    ],
    totalQuantity: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const item = action.payload;
            const existing = state.items.find(i => i === item);
            if(existing) {
                state.totalQuantity += 1;
                state.totalPrice += item.price * item.quantity;
            } else {
                state.items.push(item);
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            const itemId = action.payload;
            state.items = state.items.filter(i => i.id !== itemId);
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;