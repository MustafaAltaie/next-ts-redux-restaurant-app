'use client';
import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header';
import { useRef } from 'react';
import Footer from '../components/footer/Footer';
import './cart.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CartItem } from '../../../types/Cart';
import MainCartItem from './MainCartItem';

const page = () => {
    const contactRef = useRef<HTMLDivElement>(null);
    const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const items = useSelector((state: RootState) => state.cart.items);
    const subTotal = useSelector((state: RootState) => state.cart.totalPrice);

    const handleSendOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert()
    }

    return (
        <>
        <Header scrollToContact={scrollToContact} />
        <section className='cartSection'>
            {items.length === 0 &&
            <h1 style={{ padding: '50px', textAlign: 'center' }}>Your cart is empty</h1>}
            {items.length > 0 &&
            <div className="cartMainWrapper">
                {items.map((item: CartItem) =>
                <MainCartItem key={item.id} item={item} />
                )}
            </div>}
            {items.length > 0 &&
            <div className="orderSummaryWrapper flexColumn10">
                <h1>Order Summary</h1>
                <h5>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus ratione aliquid in quibusdam, dolore architecto beatae.</h5>
                <div className='orderSummaryTotalWrapper'>
                    <h3>Subtotal:</h3>
                    <p>{subTotal}:-</p>
                </div>
                <form onSubmit={handleSendOrder} className='orderSummaryForm'>
                    <div className='orderSummaryFormInnerWrapper flexColumn10'>
                        <div>
                            <h5>Full name</h5>
                            <input type="text" placeholder='Full name' title='Full name' name='fullName' />
                        </div>
                        <div>
                            <h5>Tabel number</h5>
                            <input type="text" placeholder='Tabel number' title='Tabel number' name='tableNumber' />
                        </div>
                        <div>
                            <h5>Message to the chefs</h5>
                            <textarea placeholder='Message to the chefs' title='Message to the chefs' name='message'></textarea>
                        </div>
                        <button type='submit'>Send order</button>
                    </div>
                </form>
                <p>Payment will be when the food's served</p>
            </div>}
        </section>
        <Footer ref={contactRef} />
        </>
    )
}

export default page;