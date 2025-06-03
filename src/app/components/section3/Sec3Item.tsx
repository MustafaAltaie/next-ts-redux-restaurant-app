import Image from 'next/image';
import { useState } from 'react';

interface Item {
    id?: string,
    title: string,
    imageLink: string,
    description: string
}

interface Sec3ItemProps {
    item: Item,
    handlePrepareUpdate: (item: Item) => void,
    handleDelete: (item: Item) => void,
    isAdminLogedIn: boolean
}

const Sec3Item = ({ item, handlePrepareUpdate, handleDelete, isAdminLogedIn }: Sec3ItemProps) => {
    const [menu, setMenu] = useState(false);

    return (
        <div key={item.id} className="sec3Item flexCenter">
            <div className="sec3ImageWrapper flexCenter">
                <Image
                    className='sec3Image'
                    src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1748945194/section3-images/${item.imageLink}`}
                    alt="Salad"
                    width={150}
                    height={150}
                    priority
                />
                {isAdminLogedIn &&
                <>
                <div className="overflowMenuButton" onClick={() => setMenu(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`
                        overflowMenuPanel
                        ${menu ? 'overflowMenuPanelOn' : ''}
                    `}>
                    <h5 onClick={() => {handlePrepareUpdate(item); setMenu(false)}}><i className="fa-solid fa-pen-to-square"></i>Update item</h5>
                    <h5 onClick={() => handleDelete(item)}><i className="fa-solid fa-trash"></i>Remove item</h5>
                    <h5 onClick={() => setMenu(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
                </div>
                </>}
            </div>
            <div className="sec3DetailsWrapper">
                <h3>{item.title}</h3>
                <h4>{item.description}</h4>
            </div>
        </div>
    )
}

export default Sec3Item;