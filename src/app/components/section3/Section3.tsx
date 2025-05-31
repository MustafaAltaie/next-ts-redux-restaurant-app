'use client';
import { useEffect, useRef, useState } from 'react';
import './Section3.css';
import Sec3Item from './Sec3Item';
import { Item } from '../../../../types/Dish';
import {
    useCreateDishMutation,
    useUploadImageMutation,
    useReadDishesQuery,
    useDeleteDishMutation,
    useDeleteImageMutation,
    useUpdateDishMutation,
    useUpdateImageMutation,
} from '../../../../features/section3/section3Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const Section3 = () => {
    const [list, setList] = useState<Item[]>([]);
    const [menuPanel, setMenuPanel] = useState(false);
    const [form, setForm] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [hideSec, setHideSec] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [itemObj, setItemObj] = useState<Item>({
        id: '',
        title: '',
        imageLink: '',
        description: ''
    });
    const [createDish] = useCreateDishMutation();
    const [uploadImage] = useUploadImageMutation();
    const { data: dishes = [], isLoading: isDishListLoading } = useReadDishesQuery();
    const [deleteDish] = useDeleteDishMutation();
    const [deleteImage] = useDeleteImageMutation();
    const [updateDish] = useUpdateDishMutation();
    const [updateImage] = useUpdateImageMutation();
    const isAdminLogedIn = useSelector((state: RootState) => state.admin.isLogedIn);

    useEffect(() => {
        if(dishes && !isDishListLoading) {
            const transformed: Item[] = dishes.map(dish => ({
                id: dish._id,
                title: dish.title,
                imageLink: dish.imageLink,
                description: dish.description,
            }));
            setList(transformed);
        }
    }, [dishes]);

    useEffect(() => {
        if(formRef.current) {
            if(form) {
                formRef.current.style.height = `${formRef.current.scrollHeight}px`;
                setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
            } else {
                formRef.current.style.height = '0px';
                clearFields();
            }
        }
    }, [form]);

    const handlePrepareItem = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItemObj(prev => ({
            ...prev, [name]: value
        }));
    }

    const handlePrepareUpdate = (item: Item) => {
        if(!item) return;
        setForm(true);
        setItemObj({
            id: item.id,
            title: item.title,
            description: item.description,
            imageLink: item.imageLink
        });
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!file && !itemObj.id) return;
        const imageLink = file?.name || itemObj.imageLink;
        try {
            if(!itemObj.id && file) {
                const formData = new FormData();
                formData.append('image', file);
                await uploadImage(formData).unwrap(); 
            } else if(file) {
                const formData = new FormData();
                formData.append('image', file);
                await updateImage({ formData, oldImage: itemObj.imageLink }).unwrap();
            }

            const mewItem: Item = {
                ...itemObj,
                imageLink
            }

            if(!itemObj.id) {
                await createDish(mewItem).unwrap();
            } else {
                await updateDish({ id: itemObj.id, data: mewItem }).unwrap();
            }

            clearFields();
            setFile(null);
        } catch (err) {
            console.log('Error saving item:', err);
            alert('Error saving item');
        }
    }

    const handleDelete = async (item: Item) => {
        if(!item) return;
        try {
            await deleteDish(item.id!).unwrap();
            await deleteImage(item.imageLink).unwrap();
        } catch (err) {
            console.log('Error deleting item:', err);
            alert('Error deleting item');
        }
    }

    const clearFields = () => {
        setItemObj({
            id: '',
            title: '',
            description: '',
            imageLink: ''
        });
        setFile(null);
    }

    return (
        <section className='section3'>
            {/* settings */}
            {isAdminLogedIn &&
            <>
            <div className="overflowMenuButton" onClick={() => setMenuPanel(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`
                    overflowMenuPanel
                    ${menuPanel ? 'overflowMenuPanelOn' : ''}
                `}>
                <h5 onClick={() => {setForm(true); setMenuPanel(false)}}><i className="fa-regular fa-square-plus"></i>Add new dish</h5>
                <h5 onClick={() => {setHideSec(!hideSec); setMenuPanel(false)}}><i className={hideSec ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>{hideSec ? 'Show' : 'Hide'} this section</h5>
                <h5 onClick={() => setMenuPanel(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
            <form onSubmit={handleSave} ref={formRef} className='addUpdateItemForm'>
                <h3 className='closeFormButton' onClick={() => setForm(false)}>X</h3>
                <div className="formInnerWrapper">
                    <div>
                        <h5>Title</h5>
                        <input type="text" title='Title' name='title' placeholder='Title' value={itemObj.title || ''} onChange={handlePrepareItem} />
                    </div>
                    <div>
                        <h5>Description</h5>
                        <textarea title='Description' name='description' placeholder='Description' value={itemObj.description || ''} onChange={handlePrepareItem}></textarea>
                    </div>
                    <div className='labelButtonWrapper'>
                        <label>
                            <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if(e.target.files && e.target.files[0])
                                    setFile(e.target.files[0]);
                                }}
                            />
                            <h5><i className="fa-solid fa-images"></i>{file || itemObj.imageLink ? 'Change image' : 'Add image'}</h5>
                        </label>
                        {(file || itemObj.id) &&
                        <img
                            className='formImageView'
                            src={
                                file ?
                                URL.createObjectURL(file) :
                                `/section3-images/${itemObj.imageLink}`
                            }
                            alt="Preview"
                            onClick={() => setFile(null)}
                        />}
                        <button disabled={!itemObj.title || !itemObj.description} type='submit'>Save</button>
                    </div>
                </div>
            </form>
            </>}
            {/* html */}
            {hideSec && <h1 className='hiddenSection'>HIDDEN</h1>}
            <h1>Most popular Pasta salad, Macaroni salad, and Mixed salad</h1>
            <div className="sec3ItemsWrapper">
                {list.map(item =>
                    <Sec3Item
                        key={item.id}
                        item={item}
                        handlePrepareUpdate={handlePrepareUpdate}
                        handleDelete={handleDelete}
                        isAdminLogedIn={isAdminLogedIn}
                    />
                )}
            </div>
        </section>
    )
}

export default Section3;