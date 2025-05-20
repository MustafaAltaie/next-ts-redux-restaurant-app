'use client';
import Header from "./components/header/Header";
import ItemsSection from "./components/itemsSection/ItemsSection";
import Section1 from './components/section1/Section1'
import Section2 from "./components/section2/Section2";
import Section3 from "./components/section3/Section3";

const page = () => {
  return (
    <div>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <ItemsSection />
    </div>
  )
}

export default page;