'use client';
import { useEffect, useRef, useState } from 'react';
import './ShoppingCart.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ShoppingCartItem from './ShoppingCartItem';
import { useRouter } from 'next/navigation';
import { CartItem } from '../../../../types/Cart';

interface CartProps {
    showCart: boolean,
}

const Cart = ({ showCart }: CartProps) => {
    const cartRef = useRef<HTMLDivElement>(null);
    const list = useSelector((state: RootState) => state.cart.items);
    const router = useRouter();

    useEffect(() => {
        if(!cartRef.current) return;
        if(showCart) {
            cartRef.current.style.right = `-${cartRef.current?.offsetWidth + 10}px`;
        } else {
            cartRef.current.style.right = '0px';
        }
    }, [showCart]);

    return (
        <div ref={cartRef} className='shoppingCartWrapper flexColumn10'>
            <div className="shoppingCartInnerWrapper flexColumn10">
                {list.length === 0 &&
                <h3 style={{ padding: '10px', textAlign: 'center' }}>Your cart is empty</h3>}
                {list.map(item =>
                    <ShoppingCartItem
                        key={item.id}
                        item={item}
                    />
                )}
            </div>
            {list.length > 0 &&
            <button onClick={() => router.push('/cart')}>CHECKOUT</button>}
        </div>
    )
}

export default Cart;