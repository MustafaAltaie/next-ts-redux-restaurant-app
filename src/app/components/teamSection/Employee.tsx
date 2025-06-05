import Image from 'next/image';
import { useState } from 'react';
import { Member } from '../../../../types/Member';
import { motion } from 'framer-motion';

interface EmployeeProps {
    member: Member,
    handlePrepareUpdate: (member: Member) => void,
    handleDeleteMember: (member: Member) => void,
    isAdminLogedIn: boolean,
}

const Employee = ({ member, handlePrepareUpdate, handleDeleteMember, isAdminLogedIn }: EmployeeProps) => {
    const [menu, setMenu] = useState(false);

    return (
        <motion.div
            className="teamMember flexColumn10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
        >
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
                        src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1748941553/memberSection/${member.imageLink}`}
                        alt={`${member.name}-image`}
                        width={130}
                        height={130}
                        priority
                        sizes='(max-width: 768px) 50vw, 300px'
                        placeholder='blur'
                        blurDataURL={`https://res.cloudinary.com/dswmp2omq/image/upload/w_10,q_10/v1748941553/memberSection/${member.imageLink}`}
                    />
                </div>
                <div className="memberInfoWrapper">
                    <h4>{member.name}</h4>
                    <h5>{member.title}</h5>
                    <p>{member.position}</p>
                </div>
            </div>
            <div className="memberSocialWrapper flexCenter">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin-in"></i>
                <i className="fa-brands fa-facebook-f"></i>
            </div>
        </motion.div>
    )
}

export default Employee;