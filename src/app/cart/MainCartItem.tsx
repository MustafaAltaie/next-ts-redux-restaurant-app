import Image from "next/image";
import { CartItem } from "../../../types/Cart";
import { useState } from "react";
import { removeFromCart, handleIncrement, handleDecrement } from "../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";


interface MainCartItemProps {
    item: CartItem,
}

const MainCartItem = ({ item }: MainCartItemProps) => {
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleDicrease = (id: string) => {
        dispatch(handleDecrement(id));
    }

    const handleIncrease = (id: string) => {
        dispatch(handleIncrement(id));
    }

    const handleDelete = (id: string) => {
        setDeleted(true);
        setTimeout(() => {
            dispatch(removeFromCart(id));
        }, 200);
    }

    return (
        <div key={item.id} className={`
            mainCartItem
            ${deleted ? 'mainCartItemDeleted' : ''}
        `}>
            <div className="mainCartImageWrapper flexCenter">
                <Image
                    src={item.image!}
                    alt='CartImage'
                    width={100}
                    height={100}
                    priority
                />
            </div>
            <div className="mainCartDetailWrapper">
                <h5>{item.title.slice(0, 10)}...</h5>
                <h5>Price: {item.price}:-</h5>
                <h5>{item.quantity} st</h5>
            </div>
            <div className="mainCartAmountWrapper flexColumn10">
                <div>
                    <h1 className='flexCenter' onClick={() => handleDicrease(item.id)} style={{ pointerEvents: item.quantity <= 1 ? 'none' : 'all' }}>-</h1>
                    <h3 className='flexCenter'>{item.quantity}</h3>
                    <h1 className='flexCenter' onClick={() => handleIncrease(item.id)}>+</h1>
                </div>
                <h4>Total price: {item.price * item.quantity}:-</h4>
            </div>
            <div className='mainCartDeleteWrapper flexCenter' onClick={() => handleDelete(item.id)}><h3>🗑️</h3></div>
        </div>
    )
}

export default MainCartItem;