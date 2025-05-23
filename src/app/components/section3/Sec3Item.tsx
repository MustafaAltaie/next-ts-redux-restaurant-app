import Image from 'next/image';

interface Item {
    id?: string,
    title: string,
    imageLink: string,
    description: string
}

interface Sec3ItemProps {
    item: Item,
    handlePrepareUpdate: (item: Item) => void
}

const Sec3Item = ({ item, handlePrepareUpdate }: Sec3ItemProps) => {
    return (
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
                <div className="overflowMenuButton" onClick={() => handlePrepareUpdate(item)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="sec3DetailsWrapper">
                <h3>{item.title}</h3>
                <h4>{item.description}</h4>
            </div>
        </div>
    )
}

export default Sec3Item;