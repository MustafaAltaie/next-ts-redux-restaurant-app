import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { addToCart } from '../../../../features/cart/cartSlice';
import { CartItem } from '../../../../types/Cart';

interface Item {
    id?: string,
    title: string,
    description: string,
    price: number | string
    imageLink: string,
    category: string
}

interface ItemProps {
    item: Item,
    handlePrepareUpdate: (item: Item) => void,
    handleDeleteItem: (item: Item) => void
}

const ProductItem = ({ item, handlePrepareUpdate, handleDeleteItem }: ItemProps) => {
    const [itemMenu, setItemMenu] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = (item: Item) => {
        const newItem: CartItem = {
            id: item.id!,
            title: item.title,
            price: Number(item.price),
            quantity: 1,
            image: `/itemSection/${item.imageLink}`
        }
        dispatch(addToCart(newItem));
    }

    return (
        <div className="itemCard flexColumn10">
            <div className="itemCardSpace">
                <div className="overflowMenuButton" onClick={() => setItemMenu(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={`
                    overflowMenuPanel
                    ${itemMenu ? 'overflowMenuPanelOn' : ''}
                `}>
                <h5 onClick={() => {handlePrepareUpdate(item); setItemMenu(false)}}><i className="fa-solid fa-pen-to-square"></i>Edit item</h5>
                <h5 onClick={() => handleDeleteItem(item)}><i className="fa-solid fa-trash"></i>Remove item</h5>
                <h5 onClick={() => setItemMenu(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
            <p className='itemCardCategory'>{item.category.toUpperCase()}</p>
            <div className='itemWrapperImageWrapper flexCenter'>
                <Image
                    className='itemWrapperImage'
                    width={150}
                    height={150}
                    src={`/itemSection/${item.imageLink}`}
                    alt='Category'
                    priority
                />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className='flexSpaceBetween'>
                <h3>{item.price}:-</h3>
                <h4 onClick={() => handleAddToCart(item)}>🛒</h4>
            </div>
        </div>
    )
}

export default ProductItem;