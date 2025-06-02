'user client';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import './Header.css';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

interface HeaderProps {
    scrollToItems?: () => void,
    scrollToContact?: () => void,
    setShowCart?: React.Dispatch<SetStateAction<boolean>>,
    showCart?: boolean
}

const Header = ({ scrollToItems, scrollToContact, setShowCart, showCart }: HeaderProps) => {
    const [nav, setNav] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const pathName = usePathname();
    const router = useRouter();
    const itemNm = useSelector((state: RootState) => state.cart.totalQuantity);
    const isAdminLogedIn = useSelector((state: RootState) => state.admin.isLogedIn);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setNav(window.innerWidth >= 1024);
        }
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(navRef.current) {
            if(nav) {
                navRef.current.style.maxHeight = `${navRef.current.scrollHeight}px`;
            } else {
                navRef.current.style.maxHeight = '0px';
            }
        }
    }, [nav]);

    useEffect(() => {
        const bodyClassList = document.body.classList;
        if(isDark) {
            bodyClassList.add('darkMode');
            bodyClassList.remove('lightMode');
        } else {
            bodyClassList.remove('darkMode');
            bodyClassList.add('lightMode');
        }
    }, [isDark]);

    const toggleMode = () => {
        setIsDark(prev => !prev);
    }

    return (
        <header>
            <div>
                <h3 className='logo' onClick={() => router.push('/')}>Restaurant <span>logo</span></h3>
                <div>
                    <div className="toggleModeWrapper">
                        <p>Light</p>
                        <div className='toggleDarkMode' onClick={toggleMode}>
                            <div className={isDark ? 'darkToggleThumb' : 'lightToggleThumb'}></div>
                        </div>
                        <p>Dark</p>
                    </div>
                    {pathName !== '/cart' &&
                    <div className='cartWrapper'>
                        {itemNm > 0 &&
                        <h6 className='cartNumOfItems flexCenter'>{itemNm}</h6>}
                        <h1 onClick={() => setShowCart && setShowCart(!showCart)}>🛒</h1>
                    </div>}
                    <div className='toggleNav' onClick={() => setNav(!nav)}>
                        <div style={{ transform: `translateY(${nav ? '800%' : '0%'}) rotate(${nav ? '45deg' : '0deg'})` }}></div>
                        <div style={{ opacity: nav ? 0 : 1 }}></div>
                        <div style={{ transform: `translateY(${nav ? '-800%' : '0%'}) rotate(${nav ? '-45deg' : '0deg'})` }}></div>
                    </div>
                </div>
            </div>
            <nav ref={navRef}>
                <ul>
                    <li className={`${pathName === '/' ? 'active' : ''}`} onClick={() => router.push('/')}>Home</li>
                    {pathName !== "/about" && pathName !== '/cart' &&
                    <li onClick={() => {
                        if(scrollToItems) scrollToItems();
                        if(window.innerWidth < 1024) setNav(false);
                    }}>Food list</li>}
                    <li className={`${pathName === '/about' ? 'active' : ''}`} onClick={() => router.push('/about')}>About us</li>
                    <li className={`${pathName === '/contact' ? 'active' : ''}`} onClick={() => {
                        if(scrollToContact) scrollToContact();
                        if(window.innerWidth < 1024) setNav(false);
                    }}>Contact</li>
                    {isAdminLogedIn &&
                    <li className={`${pathName === '/orderScreen' ? 'active' : ''}`} onClick={() => router.push('/orderScreen')}>Orders screen</li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;