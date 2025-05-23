'use client';
import { useEffect, useRef, useState } from 'react';
import './Section3.css';
import Sec3Item from './Sec3Item';

interface Item {
    id?: string,
    title: string,
    imageLink: string,
    description: string
}

const Section3 = () => {
    const [list, setList] = useState<Item[]>([
        { id: '1', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/1.png' },
        { id: '2', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/2.png' },
        { id: '3', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/3.webp' },
        { id: '4', title: 'Lorem ipsum dolor sit amet consectetur', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, architecto.', imageLink: '/images/section3-images/4.webp' },
    ]);
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

    useEffect(() => {
        if(formRef.current) {
            if(form) {
                formRef.current.style.height = `${formRef.current.scrollHeight}px`;
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

    const handleSaveUpdateItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newItem: Item = {
            id: itemObj.id,
            title: itemObj.title,
            description: itemObj.description,
            imageLink: ''
        }
        setList(prev => {
            const isExisted = list.some(item => item.id === itemObj.id);
            if(isExisted) {
                return prev.map(item => item.id === newItem.id ? newItem : item)
            } else {
                return [...prev, newItem];
            }
        });
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
                <h5 onClick={() => setHideSec(!hideSec)}><i className={hideSec ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>{hideSec ? 'Show' : 'Hide'} this section</h5>
                <h5 onClick={() => setMenuPanel(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
            <form ref={formRef} className='addUpdateItemForm'>
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
                            <h5><i className="fa-solid fa-images"></i>{file ? 'Change image' : 'Add image'}</h5>
                        </label>
                        {file && <img src={URL.createObjectURL(file)} alt="Preview" onClick={() => setFile(null)} />}
                        <button disabled={!itemObj.title || !itemObj.description || !file} type='submit'>Save</button>
                    </div>
                </div>
            </form>
            {hideSec && <h1 style={{ color: 'red' }}>This section is hidden for users</h1>}
            <h1>Most popular Pasta salad, Macaroni salad, and Mixed salad</h1>
            <div className="sec3ItemsWrapper">
                {list.map(item =>
                    <Sec3Item
                        key={item.id}
                        item={item}
                        handlePrepareUpdate={handlePrepareUpdate}
                    />
                )}
            </div>
        </section>
    )
}

export default Section3;