'use client';
import './TeamSection.css';
import Image from 'next/image';

interface socialMedia {
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
    socialMedia: socialMedia
}

const list: Member[] = [
    {
        id: '1',
        title: 'Head Chef',
        position: 'Kitchen Supervisor',
        name: 'Marco Bellini',
        imageLink: '/images/team-section/1.webp',
        socialMedia: {
            instagram: 'instagram',
            facebook: 'facebook',
            linkedIn: 'linkedIn'
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
    return (
        <section className='teamSection shiningTop'>
            <h6>Restaurant team</h6>
            <h1>Meet our awesome team</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui doloribus tenetur fuga maiores suscipit voluptatibus. Iusto aperiam.</p>
            <div className="teamWrapper">
                {list.map((member: Member) =>
                <div key={member.id} className="teamMember flexColumn10">
                    <div className='flexColumn10'>
                        <div className="memberImageWrapper flexCenter">
                            <Image
                                className='memberImage'
                                src={member.imageLink}
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
                </div>)}
            </div>
        </section>
    )
}

export default TeamSection;