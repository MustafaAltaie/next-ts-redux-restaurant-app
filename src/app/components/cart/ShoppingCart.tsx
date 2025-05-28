import { useEffect, useRef, useState } from 'react';
import './ShoppingCart.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ShoppingCartItem from './ShoppingCartItem';

interface CartProps {
    showCart: boolean,
}

const Cart = ({ showCart }: CartProps) => {
    const cartRef = useRef<HTMLDivElement>(null);
    const lastScrollYRef = useRef(0);
    const [shiftCartDown, setShiftCartDown] = useState(true);
    const list = useSelector((state: RootState) => state.cart.items);

    useEffect(() => {
        if(typeof window === 'undefined') return;
        lastScrollYRef.current = window.scrollY;

        const scrollListener = () => {
            setShiftCartDown(window.scrollY < lastScrollYRef.current);
            lastScrollYRef.current = window.scrollY;
        }

        window.addEventListener('scroll', scrollListener);
        return () => window.removeEventListener('scroll', scrollListener);
    }, []);

    useEffect(() => {
        if(!cartRef.current) return;
        if(showCart) {
            cartRef.current.style.top = `-${cartRef.current?.offsetHeight}px`;
        } else {
            cartRef.current.style.top = window.innerWidth >= 1024 ? '60px' : '50px';
        }
    }, [showCart]);

    return (
        <div
        ref={cartRef}
        className={`
            shoppingCartWrapper flexColumn10
            ${shiftCartDown ? 'cartShiftDown' : ''}
        `}>
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
            <button>CHECKOUT</button>
        </div>
    )
}

export default Cart;