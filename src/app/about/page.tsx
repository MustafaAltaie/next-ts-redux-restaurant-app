'use client';
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useRef, useState } from "react";
import './about.css';
import ShoppingCart from '../components/cart/ShoppingCart';
import Image from "next/image";
import { useReadMemberQuery } from "../../../features/teamSection/teamSectionApi";
import { useReadDishesQuery } from "../../../features/section3/section3Api";

const Page = () => {
    const contactRef = useRef<HTMLDivElement>(null);
    const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const [showCart, setShowCart] = useState(true);
    const { data: teamList = [], isLoading: isMemberListLoading } = useReadMemberQuery();
    const { data: dishes = [], isLoading: isDishListLoading } = useReadDishesQuery();

    return (
        <section className="aboutSection">
            <Header
                scrollToContact={scrollToContact}
                showCart={showCart}
                setShowCart={setShowCart}
            />
            <ShoppingCart showCart={showCart} />
            <div className="aboutPage">
                <div className="aboutPart1">
                    <div className="aboutPart1ImageWrapper">
                        <div className="aboutPart1MainImageWrapper">
                            <Image
                                src='/about-images/1.avif'
                                alt="AboutImage"
                                width={199}
                                height={199}
                                priority
                            />
                        </div>
                    </div>
                    <div className="aboutPart1DetailsWrapper">
                        <h6>Lorem ipsum dolor sit.</h6>
                        <h1>Lorem ipsum dolor <span>sit amet</span></h1>
                        <h6>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, sit eius, officiis facere quibusdam blanditiis numquam ratione.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, sit eius, officiis facere quibusdam blanditiis numquam ratione.</h6>
                    </div>
                </div>
                <div className="aboutPart2Wrapper">
                    <div className="aboutPart1SmallImageWrapper">
                        <Image src='/about-images/2.avif' alt="AboutImage" width={200} height={200} priority />
                    </div>
                    <div className="aboutPart1SmallImageWrapper">
                        <Image src='/about-images/3.avif' alt="AboutImage" width={200} height={200} priority />
                    </div>
                    <div className="aboutPart1SmallImageWrapper">
                        <Image src='/about-images/4.avif' alt="AboutImage" width={200} height={200} priority />
                    </div>
                </div>
                <h6><span>Lorem ipsum dolor sit</span>, amet consectetur adipisicing elit. Eius excepturi consequuntur cum autem doloribus temporibus blanditiis corrupti ipsam, ratione fugit beatae dolorum, dolore mollitia aut velit, quibusdam et sapiente veniam!</h6>
            </div>
            <div className="aboutTeamWrapper">
                <h6><span>Lorem ipsum dolor sit</span>, amet consectetur adipisicing elit</h6>
                <h2>Meet our team</h2>
                {isMemberListLoading && <p>Loading...</p>}
                <div className="aboutTeamInnerWrapper">
                    {teamList?.map(member => 
                        <div key={member._id} className="aboutTeamMemberWrapper">
                            <div className="aboutTeamMemberImageWrapper">
                                <Image
                                    src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1748945194/memberSection/${member.imageLink}`}
                                    alt="Image"
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </div>
                            <p>{member.name}</p>
                            <h6>{member.position}</h6>
                        </div>
                    )}
                </div>
            </div>
            <div className="aboutDishesWrapper">
                <h1>Our most popular dishes</h1>
                <p><span>Lorem ipsum dolor sit</span> amet consectetur adipisicing elit. Sint dolore, deserunt sapiente ipsam hic illum. Corporis, repellat? Cumque possimus delectus quas ut, eius facilis sit cum molestiae, harum, laborum voluptatibus.</p>
                {isDishListLoading && <p>...Loading</p>}
                <div className="aboutDishesInnerWrapper">
                    {dishes?.map(dish => 
                        <div key={dish._id} className="aboutDish">
                            <div className="aboutDishImageWrapper">
                                <Image
                                    src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1748945194/section3-images/${dish.imageLink}`}
                                    alt="Dish image"
                                    width={180}
                                    height={180}
                                    priority
                                />
                            </div>
                            <div className="aboutDishDetailsWrapper">
                                <p>{dish.title}</p>
                                <h5>{dish.description}</h5>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer ref={contactRef} />
        </section> 
    )
}

export default Page;