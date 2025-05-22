'use client';
import { useEffect, useRef, useState } from 'react';
import './Section1.css';
import Image from 'next/image';

const Section1 = () => {
    const [list, setList] = useState<string[]>([
        '/images/1.webp',
        '/images/2.webp',
        '/images/3.png',
        '/images/4.png'
    ]);
    const [count, setCount] = useState<number>(0);
    const [menuPanel, setMenuPanel] = useState(false);
    const [menuImages, setMenuImages] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(list.length > 0)
                setCount(prev => (prev + 1) % list.length);
        }, 5000);

        return () => clearTimeout(timer);
    }, [count, list.length]);

    useEffect(() => {
        if(galleryRef.current) {
            if(menuImages) {
                galleryRef.current.style.height = `${galleryRef.current.scrollHeight}px`;
            } else {
                galleryRef.current.style.height = '0px';
            }
        }
    }, [menuImages]);

    const handleDeleteImage = (img: string) => {
        const newList = list.filter(image => image !== img);
        setList(newList);
    }

    return (
        <section className="section1">
            <div className="overflowMenuButton" onClick={() => setMenuPanel(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`
                overflowMenuPanel
                ${menuPanel ? 'overflowMenuPanelOn' : ''}
            `}>
                <h5><i className="fa-regular fa-square-plus"></i>Add new image</h5>
                <h5 onClick={() => setMenuImages(!menuImages)}><i className="fa-solid fa-images"></i>View images</h5>
                <div ref={galleryRef} className='overflowMenuPanelImageWrapper'>
                    <h5>Click on any image to delete it.</h5>
                    <div className='overflowMenuGallery'>
                        {list.map(image =>
                            <div key={image} className='overflowMenuPanelImageContainer' onClick={() => handleDeleteImage(image)}>
                                <Image
                                    src={image}
                                    alt='Image'
                                    className='overflowMenuPanelImage'
                                    width={300}
                                    height={300}
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
                <h5 onClick={() => setMenuPanel(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
            <div className="sec1DetailsWrapper">
                <div>
                    <h5>Lorem ipsum dolor sit amet consectetur.</h5>
                    <h1>Handmade bakery shop</h1>
                </div>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam doloribus, officia eius facilis numquam, ipsam non aspernatur harum quasi, optio pariatur quas dolor eveniet natus quaerat quidem excepturi! Sit, mollitia.</h5>
                <button>Shop now</button>
            </div>
            <div className='sec1ImagesWrapper'>
                {list.map((image, index) =>
                    <div key={index} className={index === count ? 'sec1ImageShow' : 'sec1ImageHide'}>
                        <Image
                            src={image}
                            alt='Image'
                            className='sec1Image'
                            width={300}
                            height={300}
                            priority
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

export default Section1;