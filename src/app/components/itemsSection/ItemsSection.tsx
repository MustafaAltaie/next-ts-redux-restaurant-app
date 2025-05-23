'use client';
import { useState, useRef, useEffect, forwardRef } from 'react';
import './ItemsSection.css';
import ProductItem from './Item';
import Nav from './Nav';

interface Item {
    id?: string,
    title: string,
    description: string,
    price: number | string
    imageLink: string,
    category: string
}

const ItemsSection = forwardRef<HTMLDivElement>((_, ref) => {
    const [itemList, setItemList] = useState<Item[]>([
        {
            id: '0',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 100,
            imageLink: '/images/items-section-images/1.webp',
            category: 'meal'
        },
        {
            id: '1',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/2.webp',
            category: 'hamburger'
        },
        {
            id: '2',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/3.png',
            category: 'hamburger'
        },
        {
            id: '3',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/4.png',
            category: 'beef'
        },
        {
            id: '4',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/5.webp',
            category: 'hamburger'
        },
        {
            id: '5',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/6.webp',
            category: 'meal'
        },
        {
            id: '6',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/7.png',
            category: 'meal'
        },
        {
            id: '7',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/8.png',
            category: 'salad'
        },
        {
            id: '8',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/9.png',
            category: 'salad'
        },
        {
            id: '9',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/10.webp',
            category: 'salad'
        },
        {
            id: '10',
            title: 'Item title',
            description: 'Lorem ipsum dolor sit amet consectetur',
            price: 90,
            imageLink: '/images/items-section-images/11.webp',
            category: 'salad'
        },
    ]);
    const categoryList: string[] = [...new Set(itemList.map(item => item.category))];
    const [selected, setSelected] = useState<string>('SHOW ALL');
    const [menuPanel, setMenuPanel] = useState(false);
    const [form, setForm] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [itemObj, setItemObj] = useState<Item>({
        id: '',
        title: '',
        description: '',
        price: '',
        imageLink: '',
        category: ''
    });
    const [hideSec, setHideSec] = useState(false);

    useEffect(() => {
        if(formRef.current) {
            if(form) {
                formRef.current.style.height = `${formRef.current.scrollHeight}px`;
                formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            imageLink: '',
            category: itemObj.category
        }
        setItemList(prev => {
            const isExisted = itemList.some(item => item.id === itemObj.id);
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
            imageLink: item.imageLink,
            category: item.category
        });
    }

    const clearFields = () => {
        setItemObj({
            id: '',
            title: '',
            description: '',
            price: '',
            imageLink: '',
            category: ''
        });
        setFile(null);
    }

    return (
        <section ref={ref} className='itemsSection'>
            {/* settings */}
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
                    <div>
                        <h5>Category</h5>
                        <input type="string" title='Category' placeholder='Category' name='category' value={itemObj.category || ''} onChange={handlePrepareItem} />
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
            <nav className='itemSectionsNav'>
                <ul>
                    <li className={selected === 'SHOW ALL' ? 'selectedCategoryOption' : ''} onClick={() => setSelected('SHOW ALL')}>SHOW ALL</li>
                    {categoryList.map((category: string) =>
                        <Nav
                            key={category}
                            category={category}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    )}
                </ul>
            </nav>
            <div className="itemsWrapper">
                <div className="overflowMenuButton" onClick={() => setMenuPanel(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {itemList.map(item => (item.category.toLowerCase() === selected.toLowerCase() || selected === 'SHOW ALL') ?
                    <ProductItem
                        key={item.id}
                        item={item}
                        handlePrepareUpdate={handlePrepareUpdate}
                    />
                : null)}
            </div>
        </section>
    )
});

export default ItemsSection;