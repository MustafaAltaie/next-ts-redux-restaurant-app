import { Item } from "../../../../types/Item";
import Image from "next/image";

interface FormProps {
    itemObj: Item,
    handleSaveItem: (e: React.FormEvent<HTMLFormElement>) => void,
    formRef: React.RefObject<HTMLFormElement | null>,
    setForm: React.Dispatch<React.SetStateAction<boolean>>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    file: File | string | null,
    handlePrepareItem: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

const Form = ({
    itemObj,
    handleSaveItem,
    formRef,
    setForm,
    setFile,
    file,
    handlePrepareItem
}: FormProps) => {
    return (
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
                    <Image
                        className='formImageView'
                        src={
                            file instanceof File ?
                            URL.createObjectURL(file) :
                            `https://res.cloudinary.com/dswmp2omq/image/upload/v1748941553/itemSection/${itemObj.imageLink}`
                        }
                        alt="Preview"
                        onClick={() => setFile(null)}
                        width={100}
                        height={100}
                        priority
                    />}
                    <button disabled={!itemObj.title || !itemObj.price || !itemObj.description || (!itemObj.imageLink && !file)} type='submit'>Save</button>
                </div>
            </div>
        </form>
    )
}

export default Form;