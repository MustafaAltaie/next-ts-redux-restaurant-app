import { Item } from "../../../../types/MilkShake"
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
                    <button disabled={!itemObj.title || !itemObj.price || !itemObj.description} type='submit'>{itemObj.id ? 'Update' : 'Save'}</button>
                </div>
            </div>
        </form>
    )
}

export default Form;