'use client';
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useRef, useState } from "react";
import './about.css';
import ShoppingCart from '../components/cart/ShoppingCart';

const page = () => {
    const contactRef = useRef<HTMLDivElement>(null);
    const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const [showCart, setShowCart] = useState(true);

    return (
        <section>
            <Header
                scrollToContact={scrollToContact}
                showCart={showCart}
                setShowCart={setShowCart}
            />
            <ShoppingCart showCart={showCart} />
            <div className="aboutPage">
                about
            </div>
            <Footer ref={contactRef} />
        </section> 
    )
}

export default page;