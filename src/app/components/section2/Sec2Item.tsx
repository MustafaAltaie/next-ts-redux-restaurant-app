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
    price: number | string,
    imageLink: string
}

interface Sec2ItemProps {
    item: Item,
    handlePrepareUpdate: (item: Item) => void,
    handleDelete: (item: Item) => void,
    isAdminLogedIn: boolean
}

const Sec2Item = ({ item, handlePrepareUpdate, handleDelete, isAdminLogedIn }: Sec2ItemProps) => {
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
            image: `https://res.cloudinary.com/dswmp2omq/image/upload/v1748941553/section2-images/${item.imageLink}`,
        }
        dispatch(addToCart(newItem));
    }

    return (
        <div className="sec2Card flexColumn10">
            <div className={`
                    overflowMenuPanel
                    ${itemMenu ? 'overflowMenuPanelOn' : ''}
                `}>
                <h5 onClick={() => {handlePrepareUpdate(item); setItemMenu(false)}}><i className="fa-solid fa-pen-to-square"></i>Edit item</h5>
                <h5 onClick={() => handleDelete(item)}><i className="fa-solid fa-trash"></i>Remove item</h5>
                <h5 onClick={() => setItemMenu(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
            <h4>
                {item.title}
                {isAdminLogedIn &&
                <div className="overflowMenuButton" onClick={() => setItemMenu(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
            </h4>
            <div className='flexCenter sec2CardImageWrapper'>
                <Image
                    src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1748941553/section2-images/${item.imageLink}`}
                    alt='Milkshake'
                    className='sec2CardImage'
                    width={100}
                    height={100}
                    priority
                    sizes="(max-width: 768px) 50vw, 300px"
                    placeholder="blur"
                    blurDataURL={`https://res.cloudinary.com/dswmp2omq/image/upload/w_10,q_10/v1748941553/section2-images/${item.imageLink}`}
                />
            </div>
            <div className='flexColumn10'>
                <h5>{item.description}</h5>
                <div className='flexSpaceBetween gap10'>
                    <h3>{item.price}:-</h3>
                    <button onClick={() => handleAddToCart(item)} className='relatived'>
                        {itemQuantity && itemQuantity > 0 &&
                        <span className='itemButtonLabel'>{itemQuantity}</span>}
                        🛒
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sec2Item;