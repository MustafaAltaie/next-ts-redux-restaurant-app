'use client';
import './ItemsSection.css';

interface Item {
    id: string,
    title: string,
    description: string,
    price: number,
    imageLink: string,
    category: string
}

const ItemsSection = () => {
    const categoryList: string[] = [...new Set(['hamburger', 'pizza', 'drinks', 'bread', 'meat', 'sandwich', 'hamburger', 'hamburger', 'pizza'])];
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
            category: 'meal'
        }
    ]

    return (
        <section className='itemsSection'>
            <nav className='itemSectionsNav'>
                <ul>
                    {categoryList.map(category => <li key={category}>{category}</li>)}
                </ul>
            </nav>
            <div className="itemsWrapper">
                {itemList.map(item => 
                    <div key={item.id} className="itemCard flexColumn10">
                        <p className='itemCardCategory'>{item.category.toUpperCase()}</p>
                        <img src={item.imageLink} alt='Category' />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className='flexSpaceBetween'>
                            <h3>{item.price}:-</h3>
                            <h2>🛒</h2>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ItemsSection;