'use client';
import './Section3.css';
import Image from 'next/image';

interface Item {
    id: string,
    title: string,
    imageLink: string,
    description: string
}

const list: Item[] = [
    { id: '1', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/1.png' },
    { id: '2', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/2.png' },
    { id: '3', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/3.webp' },
    { id: '4', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/4.webp' },
];

const Section3 = () => {

    return (
        <section className='section3'>
            <h1>Most popular Pasta salad, Macaroni salad, and Mixed salad</h1>
            <div className="sec3ItemsWrapper">
                {list.map(item =>
                    <div key={item.id} className="sec3Item flexCenter">
                        <div className="sec3ImageWrapper flexCenter">
                            <Image
                                className='sec3Image'
                                src={item.imageLink}
                                alt="Salad"
                                width={150}
                                height={150}
                                priority
                            />
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