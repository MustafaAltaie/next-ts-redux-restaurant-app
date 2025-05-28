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

    return (
        <>
        <Header scrollToContact={scrollToContact} />
        <section className='cartSection'>
            <div className="cartMainWrapper">
                {items.map((item: CartItem) =>
                <MainCartItem key={item.id} item={item} />
                )}
            </div>
            <div className="cartPaymentDetailWrapper"></div>
        </section>
        <Footer ref={contactRef} />
        </>
    )
}

export default page;