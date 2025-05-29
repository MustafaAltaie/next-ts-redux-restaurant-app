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
import DiningInForm from './DiningInForm';
import SomeWhereElseForm from './SomeWhereElseForm';

const page = () => {
    const contactRef = useRef<HTMLDivElement>(null);
    const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const items = useSelector((state: RootState) => state.cart.items);
    const subTotal = useSelector((state: RootState) => state.cart.totalPrice);
    const [selected, setSelected] = useState<string>('diningIn');

    const handleSendOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handleSendOrderRemote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                <div className='orderSummaryOrderOptionsWrapper flexColumn10'>
                    <div>
                        <input type="radio" id='diningIn' checked={selected === 'diningIn'} onChange={() => setSelected('diningIn')} />
                        <label htmlFor='diningIn'>Dining in (at the restaurant)</label>
                    </div>
                    <div>
                        <input type="radio" id='someWhereElse' checked={selected === 'someWhereElse'}  onChange={() => setSelected('someWhereElse')} />
                        <label htmlFor='someWhereElse'>Ordering from somewhere else</label>
                    </div>
                </div>
                {selected === 'diningIn' &&
                <DiningInForm handleSendOrder={handleSendOrder} />}
                {selected === 'someWhereElse' &&
                <SomeWhereElseForm handleSendOrderRemote={handleSendOrderRemote} />
                }
            </div>
            }
        </section>
        <Footer ref={contactRef} />
        </>
    )
}

export default page;