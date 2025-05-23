import Image from 'next/image';
import { useState } from 'react';

interface Item {
    id?: string,
    title: string,
    description: string,
    price: number | string,
    imageLink: string
}

interface Sec2ItemProps {
    item: Item,
    handlePrepareUpdate: (item: Item) => void
}

const Sec2Item = ({ item, handlePrepareUpdate }: Sec2ItemProps) => {
    const [itemMenu, setItemMenu] = useState(false);

    return (
        <div className="sec2Card flexColumn10">
            <div className={`
                    overflowMenuPanel
                    ${itemMenu ? 'overflowMenuPanelOn' : ''}
                `}>
                <h5 onClick={() => {handlePrepareUpdate(item); setItemMenu(false)}}><i className="fa-solid fa-pen-to-square"></i>Edit item</h5>
                <h5><i className="fa-solid fa-trash"></i>Remove item</h5>
                <h5 onClick={() => setItemMenu(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
            <h4>
                {item.title}
                <div className="overflowMenuButton" onClick={() => setItemMenu(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </h4>
            <div className='flexCenter sec2CardImageWrapper'>
                <Image
                    src={item.imageLink}
                    alt='Milkshake'
                    className='sec2CardImage'
                    width={100}
                    height={100}
                    priority
                />
            </div>
            <div className='flexColumn10'>
                <h5>{item.description}</h5>
                <div className='flexSpaceBetween gap10'>
                    <h3>{item.price}:-</h3>
                    <button>🛒</button>
                </div>
            </div>
        </div>
    )
}

export default Sec2Item;