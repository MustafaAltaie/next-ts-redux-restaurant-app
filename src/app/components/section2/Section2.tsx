'use client';
import Sec2Item from './Sec2Item';
import './Section2.css';
import { useEffect, useRef, useState } from "react";

interface Item {
    id?: string,
    title: string,
    description: string,
    price: number | string,
    imageLink: string
}

const Section2 = () => {
    const [list, setList] = useState<Item[]>([
        { id: '1', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 90, imageLink: '/images/section2-images/1.webp' },
        { id: '2', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/2.png' },
        { id: '3', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/3.webp' },
        { id: '4', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/4.webp' },
        { id: '5', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/5.webp' },
        { id: '6', title: 'Milkshake title', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', price: 95, imageLink: '/images/section2-images/6.webp' },
    ]);
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

    useEffect(() => {
        if(formRef.current) {
            if(form) {
                formRef.current.style.height = `${formRef.current.scrollHeight}px`;
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            price: Number(itemObj.price),
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
            price: item.price,
            imageLink: item.imageLink
        });
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
            <form onSubmit={handleSaveUpdateItem} ref={formRef} className="addUpdateItemForm">
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
                                if(e.target.files && e.target.files[0])
                                    setFile(e.target.files[0]);
                                }}
                            />
                            <h5><i className="fa-solid fa-images"></i>{file ? 'Change image' : 'Add image'}</h5>
                        </label>
                        {file && <img className='formImageView' src={URL.createObjectURL(file)} alt="Preview" onClick={() => setFile(null)} />}
                        <button disabled={!itemObj.title || !itemObj.price || !itemObj.description || !file} type='submit'>Save</button>
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
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section2;