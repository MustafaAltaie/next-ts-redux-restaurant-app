'use client';
import { useState } from 'react';
import './ItemsSection.css';
import Image from 'next/image';

interface Item {
    id: string,
    title: string,
    description: string,
    price: number,
    imageLink: string,
    category: string
}

const itemList: Item[] = [
    {
        id: '0',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 100,
        imageLink: '/images/items-section-images/1.webp',
        category: 'meal'
    },
    {
        id: '1',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/2.webp',
        category: 'hamburger'
    },
    {
        id: '2',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/3.png',
        category: 'hamburger'
    },
    {
        id: '3',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/4.png',
        category: 'beef'
    },
    {
        id: '4',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/5.webp',
        category: 'hamburger'
    },
    {
        id: '5',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/6.webp',
        category: 'meal'
    },
    {
        id: '6',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/7.png',
        category: 'meal'
    },
    {
        id: '7',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/8.png',
        category: 'salad'
    },
    {
        id: '8',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/9.png',
        category: 'salad'
    },
    {
        id: '9',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/10.webp',
        category: 'salad'
    },
    {
        id: '10',
        title: 'Item title',
        description: 'Lorem ipsum dolor sit amet consectetur',
        price: 90,
        imageLink: '/images/items-section-images/11.webp',
        category: 'salad'
    },
];
const categoryList: string[] = [...new Set(itemList.map(item => item.category))];

const ItemsSection = () => {
    const [selected, setSelected] = useState<string>('SHOW ALL');

    return (
        <section className='itemsSection'>
            <nav className='itemSectionsNav'>
                <ul>
                    <li className={selected === 'SHOW ALL' ? 'selectedCategoryOption' : ''} onClick={() => setSelected('SHOW ALL')}>SHOW ALL</li>
                    {categoryList.map((category: string) =>
                        <li
                            className={category === selected ? 'selectedCategoryOption' : ''}
                            key={category}
                            onClick={() => setSelected(category)}>
                                {category.toUpperCase()}
                        </li>
                    )}
                </ul>
            </nav>
            <div className="itemsWrapper">
                {itemList.map(item => (item.category.toLowerCase() === selected.toLowerCase() || selected === 'SHOW ALL') ?
                    <div key={item.id} className="itemCard flexColumn10">
                        <p className='itemCardCategory'>{item.category.toUpperCase()}</p>
                        <div className='itemWrapperImageWrapper flexCenter'>
                            <Image
                                className='itemWrapperImage'
                                width={150}
                                height={150}
                                src={item.imageLink}
                                alt='Category'
                                priority
                            />
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className='flexSpaceBetween'>
                            <h3>{item.price}:-</h3>
                            <h4>🛒</h4>
                        </div>
                    </div>
                : null)}
            </div>
        </section>
    )
}

export default ItemsSection;