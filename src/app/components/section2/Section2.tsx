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
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import Form from './Form';
import LoadingModal from '../loadingModal/LoadingModal';

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
    const isAdminLogedIn = useSelector((state: RootState) => state.admin.isLogedIn);
    const [working, setWorking] = useState(false);

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
        if (!file && !itemObj.id) return;

        setWorking(true);

        let imageLink = file?.name || itemObj.imageLink;

        try {
            if(file) {
                const extension = file.name.includes('.') 
                    ? file.name.substring(file.name.lastIndexOf('.')) 
                    : '.png';
                const newFileName = `${Date.now()}${extension}`;
                const renamedFile = new File([file], newFileName, { type: file.type });

                const formData = new FormData();
                formData.append('image', renamedFile);
                imageLink = newFileName;
                if(itemObj.id) {
                    await updateSec2Image({ formData, oldImageName: itemObj.imageLink }).unwrap();
                } else {
                    await uploadMilkShakeImage(formData).unwrap();
                }
            }

            const newItem: Item = {
                ...itemObj,
                price: Number(itemObj.price),
                imageLink
            }

            if(itemObj.id){
                await updateMilkShake({ id: itemObj.id, data: newItem }).unwrap();
            } else {
                await createMilkShake(newItem).unwrap();
            }

            clearFields();
        } catch (err) {
            console.error('Error:', err);
            alert('Could not save the item and/or upload image');
        } finally {
            setWorking(false);
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
        setWorking(true);
        try {
            await deleteMilkShake(item.id).unwrap();
            await deleteSec2Image(`${item.imageLink}`).unwrap();
        } catch (err) {
            console.error('Could not delete item:', err);
            alert('Could not delete item');
        } finally {
            setWorking(false);
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
            {working &&
            <LoadingModal />}
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
                <h5 onClick={() => {setForm(true); setMenuPanel(false)}}><i className="fa-regular fa-square-plus"></i>Add new item</h5>
                <h5 onClick={() => {setHideSec(!hideSec); setMenuPanel(false)}}><i className={hideSec ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>{hideSec ? 'Show' : 'Hide'} this section</h5>
                <h5 onClick={() => setMenuPanel(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
            {/* addUpdateItemForm */}
            <Form
                handleSave={handleSave}
                formRef={formRef}
                setForm={setForm}
                itemObj={itemObj}
                setFile={setFile}
                file={file}
                handlePrepareItem={handlePrepareItem}
            />
            </>}
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
                                isAdminLogedIn={isAdminLogedIn}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section2;