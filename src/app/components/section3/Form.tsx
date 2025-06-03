import React from "react";
import { Item } from "../../../../types/Dish";
import Image from "next/image";

interface FormProps {
    handleSave: (e: React.FormEvent<HTMLFormElement>) => void,
    formRef: React.RefObject<HTMLFormElement | null>,
    setForm: React.Dispatch<React.SetStateAction<boolean>>,
    itemObj: Item,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    file: File | null,
    handlePrepareItem: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

const Form = ({
    handleSave,
    formRef,
    setForm,
    itemObj,
    setFile,
    file,
    handlePrepareItem,
}: FormProps) => {
    return (
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
                    <Image
                        className='formImageView'
                        src={
                            file ?
                            URL.createObjectURL(file) :
                            `https://res.cloudinary.com/dswmp2omq/image/upload/v1748941553/section3-images/${itemObj.imageLink}`
                        }
                        alt="Preview"
                        onClick={() => setFile(null)}
                        width={100}
                        height={100}
                        priority
                    />
                    }
                    <button disabled={!itemObj.title || !itemObj.description} type='submit'>Save</button>
                </div>
            </div>
        </form>
    )
}

export default Form;