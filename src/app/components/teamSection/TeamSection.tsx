'use client';
import Employee from './Employee';
import './TeamSection.css';
import { useState, useEffect, useRef } from 'react';

interface SocialMedia {
    instagram: string,
    facebook: string,
    linkedIn: string,
}

interface Member {
    id: string,
    title: string,
    position: string,
    name: string,
    imageLink: string,
    socialMedia: SocialMedia
}

const list: Member[] = [
    {
        id: '1',
        title: 'Head Chef',
        position: 'Kitchen Supervisor',
        name: 'Marco Bellini',
        imageLink: '/images/team-section/1.webp',
        socialMedia: {
            instagram: 'iiiiiii',
            facebook: 'ffffff',
            linkedIn: 'lllllll'
        }
    },
    {
        id: '2',
        title: 'Sous Chef',
        position: 'Assistant Kitchen Manager',
        name: 'Jordan Smith',
        imageLink: '/images/team-section/2.png',
        socialMedia: {
            instagram: 'instagram',
            facebook: 'facebook',
            linkedIn: 'linkedIn'
        }
    },
    {
        id: '3',
        title: 'Waiter',
        position: 'House Staff',
        name: 'Sara Andersson',
        imageLink: '/images/team-section/3.png',
        socialMedia: {
            instagram: 'instagram',
            facebook: 'facebook',
            linkedIn: 'linkedIn'
        }
    },
    {
        id: '4',
        title: 'Restaurant Manager',
        position: 'Operations Lead',
        name: 'Fatima Reyes',
        imageLink: '/images/team-section/4.webp',
        socialMedia: {
            instagram: 'instagram',
            facebook: 'facebook',
            linkedIn: 'linkedIn'
        }
    },
    {
        id: '5',
        title: 'Dishwasher',
        position: 'Kitchen Support Staff',
        name: 'Luka Petrović',
        imageLink: '/images/team-section/5.png',
        socialMedia: {
            instagram: 'instagram',
            facebook: 'facebook',
            linkedIn: 'linkedIn'
        }
    },
];

const TeamSection = () => {
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
                <h5 onClick={() => {setForm(true); setMenuPanel(false)}}><i className="fa-regular fa-square-plus"></i>Add new dish</h5>
                <h5 onClick={() => {setHideSec(!hideSec); setMenuPanel(false)}}><i className={hideSec ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>{hideSec ? 'Show' : 'Hide'} this section</h5>
                <h5 onClick={() => setMenuPanel(false)}><i className="fa-solid fa-xmark"></i>Close menu</h5>
            </div>
            <form ref={formRef} className='addUpdateItemForm'>
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
                            <h5><i className="fa-solid fa-images"></i>{file ? 'Change image' : 'Add image'}</h5>
                        </label>
                        {file && <img className='formImageView' src={URL.createObjectURL(file)} alt="Preview" onClick={() => setFile(null)} />}
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
                />
                )}
            </div>
        </section>
    )
}

export default TeamSection;