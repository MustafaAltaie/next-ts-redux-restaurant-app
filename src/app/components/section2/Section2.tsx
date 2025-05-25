'use client';
import Sec2Item from './Sec2Item';
import './Section2.css';
import { useEffect, useRef, useState } from "react";
import {
    useCreateMilkShakeMutation,
    useUploadMilkShakeImageMutation,
    useReadMilkShakesQuery,
    useDeleteMilkShakeMutation,
    useDeleteSec2ImageMutation,
    useUpdateMilkShakeMutation,
    useUpdateSec2ImageMutation,
} from '../../../../features/section2/section2Api';
import { Item } from '../../../../types/MilkShake';

const Section2 = () => {
    const [list, setList] = useState<Item[]>([]);
    const [menuPanel, setMenuPanel] = useState(false);
    const [form, setForm] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [itemObj, setItemObj] = useState<Item>({
        id: '',
        title: '',
        description: '',
        price: '',
        imageLink: ''
    });
    const [hideSec, setHideSec] = useState(false);
    const [createMilkShake] = useCreateMilkShakeMutation();
    const [uploadMilkShakeImage] = useUploadMilkShakeImageMutation();
    const { data: itemList = [], isLoading: isItemListLoading } = useReadMilkShakesQuery();
    const [deleteMilkShake] = useDeleteMilkShakeMutation();
    const [deleteSec2Image] = useDeleteSec2ImageMutation();
    const [updateMilkShake] = useUpdateMilkShakeMutation();
    const [updateSec2Image] = useUpdateSec2ImageMutation();

    useEffect(() => {
        if(itemList && !isItemListLoading) {
            const transformed: Item[] = itemList.map(item => ({
                id: item._id,
                title: item.title,
                description: item.description,
                price: item.price,
                imageLink: item.imageLink,
            }));
            setList(transformed);
        }
    }, [itemList, isItemListLoading]);

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

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!file && !itemObj.id) return;
        const imageLink = file?.name || itemObj.imageLink;
        try {
            if(!itemObj.id) {
                const formData = new FormData();
                formData.append('image', file!);
                await uploadMilkShakeImage(formData).unwrap();
            } else if(file) {
                const formData = new FormData();
                formData.append('image', file);
                await updateSec2Image({ formData, oldImageName: itemObj.imageLink });
            }

            const newItem: Item = {
                ...itemObj,
                price: Number(itemObj.price),
                imageLink
            };

            if(itemObj.id){
                await updateMilkShake({ id: itemObj.id, data: newItem }).unwrap();
            } else {
                await createMilkShake(newItem).unwrap();
            }

            clearFields();
        } catch (err) {
            console.error('Error:', err);
            alert('Could not save the item and/or upload image');
        }
    }

    const handlePrepareUpdate = (item: Item) => {
        if(!item) return;
        setForm(true);
        setItemObj({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            imageLink: item.imageLink
        });
    }

    const handleDelete = async (item: Item) => {
        if(!item.id || !item.imageLink) return;
        try {
            await deleteMilkShake(item.id).unwrap();
            await deleteSec2Image(item.imageLink).unwrap();
        } catch (err) {
            console.error('Could not delete item:', err);
            alert('Could not delete item');
        }
    }

    const clearFields = () => {
        setItemObj({
            id: '',
            title: '',
            description: '',
            price: '',
            imageLink: ''
        });
        setFile(null);
    }

    return (
        <section className="section2">
            {/* settings */}
            <div className="overflowMenuButton" onClick={() => setMenuPanel(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`
                    overflowMenuPanel
                    ${menuPanel ? 'overflowMenuPanelOn' : ''}
                `}>
                <h5 onClick={() => {setForm(true); setMenuPanel(false)}}><i className="fa-regular fa-square-plus"></i>Add new item</h5>
                <h5 onClick={() => {setHideSec(!hideSec); setMenuPanel(false)}}><i className={hideSec ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>{hideSec ? 'Show' : 'Hide'} this section</h5>
                <h5 onClick={() => setMenuPanel(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
            {/* addUpdateItemForm */}
            <form onSubmit={handleSave} ref={formRef} className="addUpdateItemForm">
                <div className="formInnerWrapper">
                    <h3 className='closeFormButton' onClick={() => setForm(false)}>X</h3>
                    <div>
                        <h5>Title</h5>
                        <input type="text" title='Title' placeholder='Title' name='title' value={itemObj.title || ''} onChange={handlePrepareItem} />
                    </div>
                    <div>
                        <h5>Description</h5>
                        <textarea title='Description' placeholder='Description' name='description' value={itemObj.description || ''} onChange={handlePrepareItem}></textarea>
                    </div>
                    <div>
                        <h5>Price</h5>
                        <input type="number" title='Price' placeholder='Price' name='price' value={itemObj.price || ''} onChange={handlePrepareItem} />
                    </div>
                    <div className='labelButtonWrapper'>
                        <label>
                            <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if(e.target.files && e.target.files[0]){
                                    setFile(e.target.files[0]);
                                }
                            }}/>
                            <h5><i className="fa-solid fa-images"></i>{file || itemObj.imageLink ? 'Change image' : 'Add image'}</h5>
                        </label>
                        {(file || itemObj.imageLink) && (
                        <img
                            className="formImageView"
                            src={
                            file
                                ? URL.createObjectURL(file)
                                : `/section2-images/${itemObj.imageLink}`
                            }
                            alt="Preview"
                            onClick={() => setFile(null)}
                        />
                        )}
                        <button disabled={!itemObj.title || !itemObj.price || !itemObj.description || !file} type='submit'>{itemObj.id ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </form>
            {/* html */}
            <div className="sec2MainWrapper">
                {hideSec && <h1 className='hiddenSection'>HIDDEN</h1>}
                <div className="sec2ImageMainWrapper">
                    <div className="sec2CardWrapper">
                        {list.map(item =>
                            <Sec2Item
                                key={item.id}
                                item={item}
                                handlePrepareUpdate={handlePrepareUpdate}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section2;