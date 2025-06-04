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
    const { data: images = [], isLoading, refetch } = useGetHomeImagesQuery();
    const [deleteHomeImages] = useDeleteHomeImagesMutation();
    const isAdminLogedIn = useSelector((state: RootState) => state.admin.isLogedIn);
    const [working, setWorking] = useState(false);

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

        setWorking(true);
        const extension = file.name.includes('.') 
            ? file.name.substring(file.name.lastIndexOf('.')) 
            : '.png';
        const newFileName = `${Date.now()}${extension}`;
        const renamedFile = new File([file], newFileName, { type: file.type });

        const formData = new FormData();
        formData.append('image', renamedFile);
        try {
            await uploadHomeImages(formData).unwrap();
            setList(prev => [...prev, `home-images/${renamedFile.name}`]);
            await refetch();
        } catch(err) {
            console.log('Error saving image:', err);
            alert('Error uploading image');
        } finally {
            setWorking(false);
            setFile(null);
        }
    }

    const handleDeleteImage = async (img: string) => {
        const imageName = img.split('/').pop();
        if(!imageName) return;
        try {
            setWorking(true);
            const encodedFilename = encodeURIComponent(imageName);
            await deleteHomeImages(encodedFilename).unwrap();
            setList(prev => prev.filter(image => !image.endsWith(imageName)));
        } catch (err) {
            console.log(err);
            alert('Error deleting image');
        } finally {
            setWorking(false);
        }
    }

    return (
        <section className="section1">
            {isLoading || working &&
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
                {!file &&
                <label><i className="fa-regular fa-square-plus"></i>
                    <input type="file" style={{ display: 'none' }} onChange={e => setFile(e.target.files?.[0] ?? null)} />
                    Add new image
                </label>}
                {file &&
                <div
                    className='flexCenter gap10'
                    style={{ justifyContent: 'flex-start', background: '#00aa0055', padding: '5px', borderRadius: '10px', cursor: 'pointer' }}
                    onClick={uploadImage}
                >
                    <Image
                        src={file ? URL.createObjectURL(file) : ''}
                        alt='Uploaded image'
                        width={30}
                        height={30}
                        priority
                    />
                    <p>Add Image</p>
                </div>}
                <p onClick={() => setMenuImages(!menuImages)}><i className="fa-solid fa-images"></i>View images</p>
                <div ref={galleryRef} className='overflowMenuPanelImageWrapper'>
                    <h5>Click on any image to delete it.</h5>
                    <div className='overflowMenuGallery'>
                        {list.map(image =>
                            <div key={image} className='overflowMenuPanelImageContainer' onClick={() => handleDeleteImage(image)}>
                                <Image
                                    src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1749064890/${image}`}
                                    alt='Image'
                                    className='overflowMenuPanelImage'
                                    width={300}
                                    height={300}
                                    priority
                                    sizes='(max-width: 768px) 70vw, 700px'
                                    placeholder='blur'
                                    blurDataURL={`https://res.cloudinary.com/dswmp2omq/image/upload/w_10,p_10/v1749064890/${image}`}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <p onClick={() => {setMenuPanel(false); setFile(null)}}><i className="fa-solid fa-xmark"></i>Close menu</p>
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
                    <div key={image} className={index === count ? 'sec1ImageShow' : 'sec1ImageHide'}>
                        <Image
                            src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1749064890/${image}`}
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