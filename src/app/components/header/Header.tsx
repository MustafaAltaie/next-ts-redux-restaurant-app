'user client';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import './Header.css';
import { usePathname, useRouter } from 'next/navigation';

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
    const lastScrollYRef = useRef(0);
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        lastScrollYRef.current = window.scrollY;

        const handleScroll = () => {
            setShowHeader(window.scrollY < lastScrollYRef.current);
            lastScrollYRef.current = window.scrollY;
        }

        const handleResize = () => {
            setNav(window.innerWidth >= 1024);
        }
        handleResize();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        }
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
        <header className={`${!showHeader ? 'hideHeader' : ''}`}>
            <div>
                <h2>Restaurant logo</h2>
                <div>
                    <div className='toggleDarkMode' onClick={toggleMode}>
                        <div className={isDark ? 'darkToggleThumb' : 'lightToggleThumb'}></div>
                    </div>
                    {pathName !== '/cart' &&
                    <div className='cartWrapper'>
                        <h1 onClick={() => setShowCart!(!showCart)}>🛒</h1>
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
                    <li onClick={() => {scrollToItems && scrollToItems(); window.innerWidth < 1024 && setNav(false)}}>Food list</li>}
                    <li className={`${pathName === '/about' ? 'active' : ''}`} onClick={() => router.push('/about')}>About us</li>
                    <li className={`${pathName === '/contact' ? 'active' : ''}`} onClick={() => {scrollToContact!(); window.innerWidth < 1024 && setNav(false)}}>Contact</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;