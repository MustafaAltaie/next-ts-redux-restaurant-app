'use client';
import Header from "./components/header/Header";
import Section1 from './components/section1/Section1'
import Section2 from "./components/section2/Section2";

const page = () => {
  return (
    <div>
      <Header />
      <Section1 />
      <Section2 />
    </div>
  )
}

export default page;