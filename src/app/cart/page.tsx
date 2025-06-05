'use client';
import React, { useState } from 'react'
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
import { Order } from '../../../types/Order';
import { useCreateOrderMutation } from '../../../features/order/orderApi';
import Modal from './Modal';

const Page = () => {
    const contactRef = useRef<HTMLDivElement>(null);
    const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const items = useSelector((state: RootState) => state.cart.items);
    const subTotal = useSelector((state: RootState) => state.cart.totalPrice);
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
    const [selected, setSelected] = useState<string>('diningIn');
    const [order, setOrder] = useState<Order>({
        name: '',
        table: undefined,
        message: undefined,
        address: undefined,
        mobile: undefined,
        portCode: undefined,
        orderType: 'diningIn',
        totalQuantity: 0,
        subTotal: 0,
        items: []
    });
    const [createOrder] = useCreateOrderMutation();
    const [sending, setSending] = useState(false);
    const [modal, setModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handlePrepareOrder = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOrder((prev: Order) => ({
            ...prev, [name]: value
        }));
    }

    const handleSendOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!items.length) return;
        setSending(true);
        try {
            const newOrder: Order = {
                ...order,
                table: order.table ? Number(order.table) : undefined,
                portCode: order.portCode ? Number(order.portCode) : undefined,
                totalQuantity: Number(totalQuantity),
                subTotal: Number(subTotal),
                items: items
            }
            await createOrder(newOrder).unwrap();
            setModal(true);
        } catch (err) {
            console.error('Error saving order:', err);
            alert('Error saving order');
        } finally {
            setSending(false);
        }
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
                        <input type="radio" id='diningIn' checked={selected === 'diningIn'} onChange={() => {setSelected('diningIn'); setOrder((prev: Order) => ({
                            ...prev, orderType: 'diningIn'
                        }))}} />
                        <label htmlFor='diningIn'>Dining in "at the restaurant"</label>
                    </div>
                    <div>
                        <input type="radio" id='delivery' checked={selected === 'delivery'}  onChange={() => {setSelected('delivery'); setOrder((prev: Order) => ({
                            ...prev, orderType: 'delivery'
                        }))}} />
                        <label htmlFor='delivery'>Ordering from somewhere else</label>
                    </div>
                </div>
                {selected === 'diningIn' &&
                <DiningInForm
                    handleSendOrder={handleSendOrder}
                    handlePrepareOrder={handlePrepareOrder}
                    order={order}
                    sending={sending}
                />}
                {selected === 'delivery' &&
                <SomeWhereElseForm
                    handleSendOrder={handleSendOrder}
                    handlePrepareOrder={handlePrepareOrder}
                    order={order}
                    sending={sending}
                />
                }
            </div>
            }
        </section>
        <Modal
            modal={modal}
            setModal={setModal}
            modalRef={modalRef}
            clientName={order.name}
        />
        <Footer ref={contactRef} />
        </>
    )
}

export default Page;