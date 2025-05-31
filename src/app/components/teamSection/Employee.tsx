import Image from 'next/image';
import { useState } from 'react';
import { Member } from '../../../../types/Member';

interface EmployeeProps {
    member: Member,
    handlePrepareUpdate: (member: Member) => void,
    handleDeleteMember: (member: Member) => void,
    isAdminLogedIn: boolean,
}

const Employee = ({ member, handlePrepareUpdate, handleDeleteMember, isAdminLogedIn }: EmployeeProps) => {
    const [menu, setMenu] = useState(false);

    return (
        <div className="teamMember flexColumn10">
            {isAdminLogedIn &&
            <>
            <div className="teamMemberSpace">
                <div className="overflowMenuButton" onClick={() => setMenu(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={`
                    overflowMenuPanel
                    ${menu ? 'overflowMenuPanelOn' : ''}
                `}>
                <h5 onClick={() => {setMenu(false); handlePrepareUpdate(member)}}><i className="fa-solid fa-pen-to-square"></i>Update</h5>
                <h5 onClick={() => handleDeleteMember(member)}><i className="fa-solid fa-trash"></i>Remove</h5>
                <h5 onClick={() => setMenu(false)}><i className="fa-solid fa-xmark"></i>Close</h5>
            </div>
            </>}
            <div className='flexColumn10'>
                <div className="memberImageWrapper flexCenter">
                    <Image
                        className='memberImage'
                        src={`/memberSection/${member.imageLink}`}
                        alt={`${member.name}-image`}
                        width={130}
                        height={130}
                        priority
                    />
                </div>
                <div className="memberInfoWrapper">
                    <h4>{member.name}</h4>
                    <h5>{member.title}</h5>
                    <p>{member.position}</p>
                </div>
            </div>
            <div className="memberSocialWrapper flexCenter gap10">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin-in"></i>
                <i className="fa-brands fa-facebook-f"></i>
            </div>
        </div>
    )
}

export default Employee;