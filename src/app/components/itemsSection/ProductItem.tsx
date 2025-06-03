import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
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
    handleDeleteItem: (item: Item) => void,
    isAdminLogedIn: boolean
}

const ProductItem = ({ item, handlePrepareUpdate, handleDeleteItem, isAdminLogedIn }: ItemProps) => {
    const [itemMenu, setItemMenu] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.cart.items);
    const currentItem = items.find(i => i.id === item.id);
    const itemQuantity = currentItem?.quantity;

    const handleAddToCart = (item: Item) => {
        const newItem: CartItem = {
            id: item.id!,
            title: item.title,
            price: Number(item.price),
            quantity: 1,
            image: `https://res.cloudinary.com/dswmp2omq/image/upload/v1748941553/itemSection/${item.imageLink}`
        }
        dispatch(addToCart(newItem));
    }

    return (
        <div className="itemCard flexColumn10">
            {isAdminLogedIn &&
            <>
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
            </>}
            <p className='itemCardCategory'>{item.category.toUpperCase()}</p>
            <div className='itemWrapperImageWrapper flexCenter'>
                <Image
                    className='itemWrapperImage'
                    width={150}
                    height={150}
                    src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1748941553/itemSection/${item.imageLink}`}
                    alt='Category'
                    priority
                />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className='flexSpaceBetween'>
                <h3>{item.price}:-</h3>
                <button onClick={() => handleAddToCart(item)} className='relatived'>
                    🛒
                    {itemQuantity && itemQuantity > 0 &&
                    <span className='itemButtonLabel'>{itemQuantity}</span>}
                </button>
            </div>
        </div>
    )
}

export default ProductItem;