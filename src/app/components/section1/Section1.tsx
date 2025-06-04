'use client';
import { useEffect, useRef, useState } from 'react';
import './Section1.css';
import Image from 'next/image';
import { useUploadHomeImagesMutation, useGetHomeImagesQuery, useDeleteHomeImagesMutation } from '../../../../features/restaurant/restaurantApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import LoadingModal from '../loadingModal/LoadingModal';

const Section1 = () => {
    const [list, setList] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const [menuPanel, setMenuPanel] = useState(false);
    const [menuImages, setMenuImages] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploadHomeImages] = useUploadHomeImagesMutation();
    const { data: images = [], isLoading } = useGetHomeImagesQuery();
    const [deleteHomeImages] = useDeleteHomeImagesMutation();
    const isAdminLogedIn = useSelector((state: RootState) => state.admin.isLogedIn);

    useEffect(() => {
        if(images && !isLoading) {
            setList(images);
        }
    }, [images, isLoading]);

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
    }, [menuImages, list]);

    const uploadImage = async () => {
        if(!file) return;
        if(list.some(image => image === file.name)) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
            await uploadHomeImages(formData).unwrap();
        } catch(err) {
            console.log('Error saving image:', err);
            alert('Error uploading image');
        }
    }

    useEffect(() => {
        if(file) {
            uploadImage();
        }
    }, [file, uploadImage]);

    const handleDeleteImage = async (img: string) => {
        const imageName = img.split('/').pop();
        if(!imageName) return;
        const encodedFilename = encodeURIComponent(imageName);
        await deleteHomeImages(encodedFilename).unwrap();
    }

    return (
        <section className="section1">
            {isLoading &&
            <LoadingModal />}
            {isAdminLogedIn &&
            <div className="overflowMenuButton" onClick={() => setMenuPanel(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>}
            {isAdminLogedIn &&
            <div className={`
                overflowMenuPanel
                ${menuPanel ? 'overflowMenuPanelOn' : ''}
            `}>
                <label><i className="fa-regular fa-square-plus"></i>
                    <input type="file" style={{ display: 'none' }} onChange={e => setFile(e.target.files?.[0] ?? null)} />
                    Add new image
                </label>
                <p onClick={() => setMenuImages(!menuImages)}><i className="fa-solid fa-images"></i>View images</p>
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
                <p onClick={() => setMenuPanel(false)}><i className="fa-solid fa-xmark"></i>Close menu</p>
            </div>}
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