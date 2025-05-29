'use client';
import { useState, useRef, useEffect, forwardRef } from 'react';
import './ItemsSection.css';
import ProductItem from './ProductItem';
import Nav from './Nav';
import { Item } from '../../../../types/Item';
import {
    useCreateItemMutation,
    useUploadItemImageMutation,
    useReadItemQuery,
    useUpdateItemMutation,
    useChangeItemImageMutation,
    useDeleteItemMutation,
    useDeleteItemImageMutation,
} from '../../../../features/itemSection/itemSectionApi';

const ItemsSection = forwardRef<HTMLDivElement>((_, ref) => {
    const [itemList, setItemList] = useState<Item[]>([]);
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
    const [createItem] = useCreateItemMutation();
    const [uploadItemImage] = useUploadItemImageMutation();
    const { data: items = [], isLoading } = useReadItemQuery();
    const [updateItem] = useUpdateItemMutation();
    const [changeItemImage] = useChangeItemImageMutation();
    const [deleteItem] = useDeleteItemMutation();
    const [deleteItemImage] = useDeleteItemImageMutation();

    useEffect(() => {
        if(items && !isLoading) {
            const transformed: Item[] = items.map(item => ({
                id: item._id,
                title: item.title,
                description: item.description,
                price: item.price,
                imageLink: item.imageLink,
                category: item.category
            }));
            setItemList(transformed);
        }
    }, [items, isLoading]);

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

    const handleSaveItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!file && !itemObj.id) return;
        const imageLink = file?.name || itemObj.imageLink;
        try {
            if(itemObj.id && file) { // Update
                const formData = new FormData();
                formData.append('image', file);
                await changeItemImage({ formData, oldImage: itemObj.imageLink }).unwrap();
            } else if (file) { // Create
                const formData = new FormData();
                formData.append('image', file);
                await uploadItemImage(formData).unwrap();
            }

            const newItem: Item = {
                ...itemObj,
                imageLink,
            }

            if(itemObj.id) { // Update
                await updateItem({id: itemObj.id, data: newItem}).unwrap();
            } else { // Create
                await createItem(newItem).unwrap();
            }

            clearFields();
            setFile(null);
        } catch (err) {
            console.error('Error saving item:', err);
            alert('Error saving item');
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
            imageLink: item.imageLink,
            category: item.category
        });
    }

    const handleDeleteItem = async (item: Item) => {
        if(!item) return;
        try {
            await deleteItemImage(item.imageLink).unwrap();
            await deleteItem(item.id!).unwrap();
        } catch (err) {
            console.error('Error deleting item:', err);
            alert('Error deleting item');
        }
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
            <form onSubmit={handleSaveItem} ref={formRef} className="addUpdateItemForm">
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
                            <h5><i className="fa-solid fa-images"></i>{file || itemObj.id ? 'Change image' : 'Add image'}</h5>
                        </label>
                        {(file || itemObj.id) &&
                        <img
                            className='formImageView'
                            src={file ?
                                URL.createObjectURL(file) :
                                `/itemSection/${itemObj.imageLink}`
                            }
                            alt="Preview"
                            onClick={() => setFile(null)}
                        />}
                        <button disabled={!itemObj.title || !itemObj.price || !itemObj.description || !itemObj.imageLink} type='submit'>Save</button>
                    </div>
                </div>
            </form>
            <nav className="itemSectionsNav">
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
                {itemList.map((item: Item) => (item.category.toLowerCase() === selected.toLowerCase() || selected === 'SHOW ALL') ?
                    <ProductItem
                        key={item.id}
                        item={item}
                        handlePrepareUpdate={handlePrepareUpdate}
                        handleDeleteItem={handleDeleteItem}
                    />
                : null)}
            </div>
        </section>
    )
});

export default ItemsSection;