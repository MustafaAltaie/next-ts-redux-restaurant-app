'use client';
import { useEffect, useState } from 'react';
import './Section1.css';
import Image from 'next/image';

const list: string[] = [
    '/images/1.webp',
    '/images/2.webp',
    '/images/3.png',
    '/images/4.png'
]

const Section1 = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCount(prev => (prev + 1) % list.length);
        }, 5000);

        return () => clearTimeout(timer);
    }, [count, list.length]);

    return (
        <section className="section1">
            <div className="sec1DetailsWrapper">
                <div>
                    <h5>Lorem ipsum dolor sit amet consectetur.</h5>
                    <h1>Handmade bakery shop</h1>
                </div>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam doloribus, officia eius facilis numquam, ipsam non aspernatur harum quasi, optio pariatur quas dolor eveniet natus quaerat quidem excepturi! Sit, mollitia.</h5>
                <button>Shop now</button>
            </div>
            <div className='sec1ImagesWrapper'>
                {list.map((image, index) =>
                    <div key={index} className={index === count ? 'sec1ImageShow' : 'sec1ImageHide'}>
                        <Image
                            src={image}
                            alt='Image'
                            className='sec1Image'
                            width={300}
                            height={300}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

export default Section1;