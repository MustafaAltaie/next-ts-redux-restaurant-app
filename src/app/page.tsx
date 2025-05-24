'use client';
import { useRef } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ItemsSection from "./components/itemsSection/ItemsSection";
import Section1 from './components/section1/Section1'
import Section2 from "./components/section2/Section2";
import Section3 from "./components/section3/Section3";
import TeamSection from "./components/teamSection/TeamSection";

const page = () => {
  const itemRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const scrollToItems = () => itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div>
      <Header scrollToItems={scrollToItems} scrollToContact={scrollToContact} />
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