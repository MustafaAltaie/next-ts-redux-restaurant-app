'use client';
import { useState } from 'react';
import './Section3.css';

interface Item {
    id?: string,
    title: string,
    imageLink: string,
    description: string
}

const Section3 = () => {
    const [list, setList] = useState<Item[]>([
        { id: '1', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/1.png' },
        { id: '2', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/2.png' },
        { id: '3', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/3.webp' },
        { id: '4', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/4.webp' },
    ]);

    return (
        <section className='section3'>
            <h1>Most popular Pasta salad, Macaroni salad, and Mixed salad</h1>
            <div className="sec3ItemsWrapper">
                {list.map(item =>
                    <div key={item.id} className="sec3Item flexCenter">
                        <div className="sec3ImageWrapper">
                            <img src={item.imageLink} alt="Salad" />
                        </div>
                        <div className="sec3DetailsWrapper">
                            <h3>{item.title}</h3>
                            <h4>{item.description}</h4>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Section3;