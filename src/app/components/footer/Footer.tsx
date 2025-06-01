import './Footer.css';
import { forwardRef, useState } from 'react';
import Form from './Form';
import { useReadFooterQuery } from '../../../../features/footer/footerApi';
import { ContactObj } from '../../../../types/Footer';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../../store/store';
// const isAdminLogedIn = useSelector((state: RootState) => state.admin.isLogedIn);

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
    const [form, setForm] = useState(false);
    const { data } = useReadFooterQuery();
    const [contactObj, setContactObj] = useState<ContactObj>({
        mobile: '',
        email: '',
        messenger: '',
        whatsapp: '',
    });

    return (
        <footer ref={ref}>
            <div className="footerMainWrapper">
                <div className="footerGearWrapper" onClick={() => setForm(!form)}>
                    <i className="fa-solid fa-gear"></i>
                </div>
                {/* footerTop */}
                <div className="footerTop">
                    <p>Reach us directly</p>
                    <div>
                        <a href={`sms:${contactObj.mobile}`}><i className="fa-solid fa-comment-dots"></i></a>
                        <a href={`tel:${contactObj.mobile}`}><i className="fa-solid fa-phone-volume"></i></a>
                        <a href={`mailto:${contactObj.email}`}><i className="fa-solid fa-envelope"></i></a>
                        <a href={contactObj.messenger} target='_blank' rel='noopener noreferrer'><i className="fa-brands fa-facebook-messenger"></i></a>
                        <a href={`https://wa.me/${contactObj.whatsapp}`} target='_blank' rel='noopener noreferrer'><i className="fa-brands fa-whatsapp"></i></a>
                    </div>
                    <Form
                        form={form}
                        data={data}
                        setContactObj={setContactObj}
                        contactObj={contactObj}
                    />
                </div>
                <div className='footerPart1_2MainWrapper'>
                    {/* footerPart1 */}
                    <div className="footerPart1">
                        <div className="footerPart11 flexColumn10">
                            <h4>About Us</h4>
                            <h6>Lorem ipsum dolor</h6>
                            <h5>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro labore dolor atque quod quos, consequatur, hic, est dolore quae.</h5>
                        </div>
                        <div className="footerPart12">
                            <h4>Our Branches</h4>
                            <div>
                                <h6>Stockholm</h6>
                                <h6>Linkoping</h6>
                                <h6>Nykoping</h6>
                                <h6>Malmo</h6>
                                <h6>Gothenborg</h6>
                                <h6>Lulia</h6>
                                <h6>Norrkoping</h6>
                                <h6>Umea</h6>
                                <h6>Ostersund</h6>
                                <h6>Katrineholm</h6>
                            </div>
                        </div>
                    </div>
                    {/* footerPart2 */}
                    <div className="footerPart2">
                        <div className="footerPart21 flexColumn10">
                            <h4>Contact Information</h4>
                            <div>
                                <i className="fa-solid fa-phone-volume"></i>
                                <h5>+460712345678</h5>
                            </div>
                            <div>
                                <i className="fa-solid fa-envelope"></i>
                                <h5>restaurant@gmail.com</h5>
                            </div>
                            <div>
                                <i className="fa-brands fa-whatsapp"></i>
                                <h5>+460712345678</h5>
                            </div>
                        </div>
                        <div className="footerPart22">
                            <div className='footerForm'>
                                <input type="text" placeholder='Your number' />
                                <textarea placeholder='Your message'></textarea>
                                <button>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footerBottom */}
                <div className="footerBottom">
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
                    <div>
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-linkedin-in"></i>
                        <i className="fa-brands fa-pinterest-p"></i>
                        <i className="fa-brands fa-tiktok"></i>
                    </div>
                    <h5>Lorem ipsum dolor sit</h5>
                </div>
                {/* footerCopyright */}
                <div className="footerCopyright">
                    <h5>© 2025 restaurant Name. All rights reserved.</h5>
                </div>
                {/* footerDeveloper */}
                <div className="footerDeveloper">
                    <h5>This project was created and developed by <span>Mustafa Altaie</span>.</h5>
                </div>
            </div>
        </footer>
    )
});

export default Footer;