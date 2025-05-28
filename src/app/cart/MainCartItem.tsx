import Image from "next/image";
import { CartItem } from "../../../types/Cart";
import { useState } from "react";
import { removeFromCart } from "../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";


interface MainCartItemProps {
    item: CartItem,
}

const MainCartItem = ({ item }: MainCartItemProps) => {
    const [count, setCount] = useState(1);
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleDicrease = () => {
        setCount(prev => prev <= 1 ? 1 : prev - 1);
    }

    const handleIncrease = () => {
        setCount(prev => prev + 1);
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
                <h4>{item.title}</h4>
                <p>Price: {item.price}:-</p>
                <h5>Quantity: {item.quantity}st</h5>
            </div>
            <div className="mainCartAmountWrapper flexColumn10">
                <div>
                    <h1 className='flexCenter' onClick={handleDicrease} style={{ pointerEvents: count <= 1 ? 'none' : 'all' }}>-</h1>
                    <h3 className='flexCenter'>{count}</h3>
                    <h1 className='flexCenter' onClick={handleIncrease}>+</h1>
                </div>
                <h4>Total price: {item.price * count}:-</h4>
            </div>
            <div className='mainCartDeleteWrapper flexCenter' onClick={() => handleDelete(item.id)}><h3>🗑️</h3></div>
        </div>
    )
}

export default MainCartItem;