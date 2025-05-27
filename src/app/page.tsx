'use client';
import { useRef, useState } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ItemsSection from "./components/itemsSection/ItemsSection";
import Section1 from './components/section1/Section1'
import Section2 from "./components/section2/Section2";
import Section3 from "./components/section3/Section3";
import TeamSection from "./components/teamSection/TeamSection";
import ShoppingCart from './components/cart/ShoppingCart';

const page = () => {
  const itemRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const scrollToItems = () => itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const [showCart, setShowCart] = useState(false);

  return (
    <div>
      <Header
        scrollToItems={scrollToItems}
        scrollToContact={scrollToContact}
        showCart={showCart}
        setShowCart={setShowCart}
      />
      <ShoppingCart showCart={showCart} />
      <Section1 />
      <Section2 />
      <Section3 />
      <ItemsSection ref={itemRef} />
      <TeamSection />
      <Footer ref={contactRef} />
    </div>
  )
}

export default page;