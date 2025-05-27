'use client';
import Employee from './Employee';
import './TeamSection.css';
import { useState, useEffect, useRef } from 'react';
import { Member } from '../../../../types/Member';
import {
    useCreateMemberMutation,
    useUploadMemberImageMutation,
    useReadMemberQuery,
    useUpdateMemberMutation,
    useUpdateMemberImageMutation,
    useDeleteMemberMutation,
    useDeleteMemberImageMutation,
} from '../../../../features/teamSection/teamSectionApi';

const TeamSection = () => {
    const [list, setList] = useState<Member[]>([]);
    const [menuPanel, setMenuPanel] = useState(false);
    const [form, setForm] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [hideSec, setHideSec] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [memberObj, setMemberObj] = useState<Member>({
        id: '',
        title: '',
        position: '',
        name: '',
        imageLink: '',
        socialMedia: {
            instagram: '',
            facebook: '',
            linkedIn: ''
        },
    });
    const [createMember] = useCreateMemberMutation();
    const [uploadMemberImage] = useUploadMemberImageMutation();
    const { data: members = [], isLoading: isMemberListLoading } = useReadMemberQuery();
    const [updateMember] = useUpdateMemberMutation();
    const [updateMemberImage] = useUpdateMemberImageMutation();
    const [deleteMember] = useDeleteMemberMutation();
    const [deleteMemberImage] = useDeleteMemberImageMutation()

    useEffect(() => {
        if(members && !isMemberListLoading) {
            const transformed: Member[] = members.map(member => ({
                id: member._id,
                title: member.title,
                position: member.position,
                name: member.name,
                imageLink: member.imageLink,
                socialMedia: member.socialMedia,
            }));
            setList(transformed);
        }
    }, [members, isMemberListLoading]);

    useEffect(() => {
        if(formRef.current) {
            if(form) {
                formRef.current.style.height = `${formRef.current.scrollHeight}px`;
                setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            } else {
                formRef.current.style.height = '0px';
                clearFields();
            }
        }
    }, [form]);

    const handlePrepareItem = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMemberObj(prev => ({
            ...prev, [name]: value
        }));
    }

    const handlePrepareSocialMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMemberObj(prev => ({
            ...prev, socialMedia: {
                ...prev.socialMedia,
                [name]: value
            }
        }));
    }

    const handlePrepareUpdate = (member: Member) => {
        if(!member) return;
        setForm(true);
        setMemberObj({
            id: member.id,
            title: member.title,
            position: member.position,
            name: member.name,
            imageLink: member.imageLink,
            socialMedia: {
                instagram: member.socialMedia.instagram,
                facebook: member.socialMedia.facebook,
                linkedIn: member.socialMedia.linkedIn
            },
        });
    }

    const handleSaveMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!file && !memberObj.id) return;
        const imageLink = file?.name || memberObj.imageLink;
        try {
            if(!memberObj.id && file) {
                const formData = new FormData();
                formData.append('image', file);
                await uploadMemberImage(formData).unwrap();
            } else if(file) {
                const formData = new FormData();
                formData.append('image', file);
                await updateMemberImage({ formData, oldImage: memberObj.imageLink }).unwrap();
            }

            const newMember: Member = {
                ...memberObj,
                imageLink
            }

            if(!memberObj.id) {
                await createMember(newMember).unwrap();
            } else {
                await updateMember({ id: memberObj.id, data: newMember }).unwrap();
            }

            clearFields();
            setFile(null);
        } catch (err) {
            console.error('Could not complete saving:', err);
            alert('Error saving member');
        }
    }

    const handleDeleteMember = async (member: Member) => {
        if(!member) return;
        try {
            await deleteMemberImage(member.imageLink).unwrap();
            await deleteMember(member.id!).unwrap();
        } catch (err) {
            console.error('Could not complete deletion:', err);
            alert('Error delete member');
        }
    }

    const clearFields = () => {
        setMemberObj({
            id: '',
            title: '',
            position: '',
            name: '',
            imageLink: '',
            socialMedia: {
                instagram: '',
                facebook: '',
                linkedIn: ''
            },
        });
        setFile(null);
    }

    return (
        <section className='teamSection shiningTop'>
            <div className="overflowMenuButton" onClick={() => setMenuPanel(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`
                    overflowMenuPanel
                    ${menuPanel ? 'overflowMenuPanelOn' : ''}
                `}>
                <h5 onClick={() => {setForm(true); setMenuPanel(false)}}><i className="fa-regular fa-square-plus"></i>Add new member</h5>
                <h5 onClick={() => {setHideSec(!hideSec); setMenuPanel(false)}}><i className={hideSec ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>{hideSec ? 'Show' : 'Hide'} this section</h5>
                <h5 onClick={() => setMenuPanel(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
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
                        <img
                            className='formImageView'
                            src={file ?
                                URL.createObjectURL(file) :
                                `/memberSection/${memberObj.imageLink}`
                            }
                            alt="Preview"
                            onClick={() => setFile(null)}
                        />
                        }
                        <button type='submit'>Save</button>
                    </div>
                </div>
            </form>
            {hideSec && <h1 className='hiddenSection'>HIDDEN</h1>}
            <h6>Restaurant team</h6>
            <h1>Meet our awesome team</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui doloribus tenetur fuga maiores suscipit voluptatibus. Iusto aperiam.</p>
            <div className="teamWrapper">
                {list.map((member: Member) =>
                <Employee
                    key={member.id}
                    member={member}
                    handlePrepareUpdate={handlePrepareUpdate}
                    handleDeleteMember={handleDeleteMember}
                />
                )}
            </div>
        </section>
    )
}

export default TeamSection;