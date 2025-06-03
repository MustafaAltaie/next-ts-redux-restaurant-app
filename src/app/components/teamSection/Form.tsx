import { Member } from "../../../../types/Member";
import Image from "next/image";

interface FormProps {
    handleSaveMember: (e: React.FormEvent<HTMLFormElement>) => void,
    formRef: React.RefObject<HTMLFormElement | null>,
    setForm: React.Dispatch<React.SetStateAction<boolean>>,
    memberObj: Member
    handlePrepareItem: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handlePrepareSocialMedia: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    file: File | null,
}

const Form = ({
    handleSaveMember,
    formRef,
    setForm,
    memberObj,
    handlePrepareItem,
    handlePrepareSocialMedia,
    setFile,
    file,
}: FormProps) => {
    return (
        <form onSubmit={handleSaveMember} ref={formRef} className='addUpdateItemForm'>
            <h3 className='closeFormButton' onClick={() => setForm(false)}>X</h3>
            <div className="formInnerWrapper">
                <div>
                    <h5>Title</h5>
                    <input type="text" title='Title' name='title' placeholder='Title' value={memberObj.title || ''} onChange={handlePrepareItem} />
                </div>
                <div>
                    <h5>Position</h5>
                    <input type='text' title='Position' name='position' placeholder='Position' value={memberObj.position || ''} onChange={handlePrepareItem} />
                </div>
                <div>
                    <h5>Name</h5>
                    <input type='text' title='Name' name='name' placeholder='Name' value={memberObj.name || ''} onChange={handlePrepareItem} />
                </div>
                <div>
                    <h5>Instagram</h5>
                    <input type='text' title='Instagram' name='instagram' placeholder='Instagram' value={memberObj.socialMedia.instagram || ''} onChange={handlePrepareSocialMedia} />
                </div>
                <div>
                    <h5>Facebook</h5>
                    <input type='text' title='Facebook' name='facebook' placeholder='Facebook' value={memberObj.socialMedia.facebook || ''} onChange={handlePrepareSocialMedia} />
                </div>
                <div>
                    <h5>LinkedIn</h5>
                    <input type='text' title='LinkedIn' name='linkedIn' placeholder='LinkedIn' value={memberObj.socialMedia.linkedIn || ''} onChange={handlePrepareSocialMedia} />
                </div>
                <div className='labelButtonWrapper'>
                    <label>
                        <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if(e.target.files && e.target.files[0])
                                setFile(e.target.files[0]);
                            }}
                        />
                        <h5><i className="fa-solid fa-images"></i>{file || memberObj.id ? 'Change image' : 'Add image'}</h5>
                    </label>
                    {(file || memberObj.id) &&
                    <Image
                        className='formImageView'
                        src={file ?
                            URL.createObjectURL(file) :
                            `https://res.cloudinary.com/dswmp2omq/image/upload/v1748941553/memberSection/${memberObj.imageLink}`
                        }
                        alt="Preview"
                        onClick={() => setFile(null)}
                        width={100}
                        height={100}
                        priority
                    />
                    }
                    <button type='submit'>Save</button>
                </div>
            </div>
        </form>
    )
}

export default Form;