'use client';
import './Section2.css';
import { useState } from "react";

interface Item {
    id: string,
    title: string,
    description: string,
    price: number,
    imageLink: string
}

const Section2 = () => {
    const [list, setList] = useState<Item[]>([
        { id: '1', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 90, imageLink: '/images/section2-images/1.webp' },
        { id: '2', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/2.png' },
        { id: '3', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/3.webp' },
        { id: '4', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/4.webp' },
        { id: '5', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/5.webp' },
        { id: '6', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/6.webp' },
    ]);

    return (
        <section className="section2">
            <div className="sec2MainWrapper">
                <div className="sec2ImageMainWrapper">
                    <div className="sec2ImageWrapper">
                        {list.map(item =>
                            <div key={item.id} className="sec2Card flexColumn10">
                                <h4>{item.title}</h4>
                                <div className='flexCenter'>
                                    <img src={item.imageLink} alt="Milkshake" />
                                </div>
                                <div className='flexColumn10'>
                                    <h5>{item.description}</h5>
                                    <div className='flexSpaceBetween gap10'>
                                        <h3>{item.price}:-</h3>
                                        <button>🛒</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section2;