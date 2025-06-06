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
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import Form from './Form';
import LoadingModal from '../loadingModal/LoadingModal';

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
    const isAdminLogedIn = useSelector((state: RootState) => state.admin.isLogedIn);
    const [working, setWorking] = useState(false);

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
        if (!file && !memberObj.id) return;
        setWorking(true);
        let imageLink = file?.name || memberObj.imageLink;

        try {
            if(file) {
                const extension = file.name.includes('.') 
                    ? file.name.substring(file.name.lastIndexOf('.')) 
                    : '.png';
                const newFileName = `${Date.now()}${extension}`;
                const renamedFile = new File([file], newFileName, { type: file.type });

                const formData = new FormData();
                formData.append('image', renamedFile);
                imageLink = newFileName;
                if(memberObj.id) {
                    await updateMemberImage({ formData, oldImage: memberObj.imageLink }).unwrap();
                } else {
                    await uploadMemberImage(formData).unwrap();
                }
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
        } finally {
            setWorking(false);
        }
    }

    const handleDeleteMember = async (member: Member) => {
        if(!member) return;
        setWorking(true);
        try {
            await deleteMemberImage(member.imageLink).unwrap();
            await deleteMember(member.id!).unwrap();
        } catch (err) {
            console.error('Could not complete deletion:', err);
            alert('Error delete member');
        } finally {
            setWorking(false);
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
            {working &&
            <LoadingModal />}
            {/* settings */}
            {isAdminLogedIn &&
            <>
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
            <Form
                handleSaveMember={handleSaveMember}
                formRef={formRef}
                setForm={setForm}
                memberObj={memberObj}
                handlePrepareItem={handlePrepareItem}
                handlePrepareSocialMedia={handlePrepareSocialMedia}
                setFile={setFile}
                file={file}
            />
            </>}
            {/* html */}
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
                    isAdminLogedIn={isAdminLogedIn}
                />
                )}
            </div>
        </section>
    )
}

export default TeamSection;