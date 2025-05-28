import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CartItem } from '../../../../types/Cart';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { removeFromCart } from '../../../../features/cart/cartSlice';

interface ShoppingCartItemProps {
    item: CartItem,
}

const ShoppingCartItem = ({ item }: ShoppingCartItemProps) => {
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = (id: string) => {
        setTimeout(() => {
            dispatch(removeFromCart(id));
        }, 200);
    }

    return (
        <div className="cartItem">
            <div className={`
                    cartItemWrapper
                    ${deleted ? 'cartItemWrapperDeleted' : ''}
                `}>
                <div className="cartItemImageWrapper flexCenter">
                    <Image
                        src={`/section2-images/${item.image!}`}
                        alt='ItemImage'
                        width={70}
                        height={70}
                        priority
                    />
                </div>
                <div className="cartItemDetailsWrapper">
                    <h6>{item.title}</h6>
                    <h6>Quantity: {item.quantity} st</h6>
                </div>
                <div className="cartItemDeleteWrapper flexCenter" onClick={() => {setDeleted(true); handleDelete(item.id)}}>
                    <p>🗑️</p>
                </div>
            </div>
            <div className="cartItemBackground"></div>
        </div>
    )
}

export default ShoppingCartItem;