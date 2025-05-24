'use client';
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useRef } from "react";
import './about.css';

const page = () => {
    const contactRef = useRef<HTMLDivElement>(null);
    const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return (
        <section>
            <Header scrollToContact={scrollToContact} />
            <div className="aboutPage">
                about
            </div>
            <Footer ref={contactRef} />
        </section> 
    )
}

export default page;