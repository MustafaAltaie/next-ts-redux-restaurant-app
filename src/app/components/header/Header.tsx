'user client';
import { useEffect, useRef, useState } from 'react';
import './Header.css';
import { usePathname } from 'next/navigation';

interface HeaderProps {
    scrollToItems: () => void
}

const Header = ({ scrollToItems }: HeaderProps) => {
    const [nav, setNav] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const navRef = useRef<HTMLElement>(null);
    const pathName = usePathname();

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
        toggleMode();
        if(window.innerWidth >= 1024) {
            setNav(true);
        }
    }, []);

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
                <h2>Restaurant logo</h2>
                <div>
                    <div className='toggleDarkMode' onClick={toggleMode}>
                        <div className={isDark ? 'darkToggleThumb' : 'lightToggleThumb'}></div>
                    </div>
                    <div className='cartWrapper'>
                        <h1>🛒</h1>
                    </div>
                    <div className='toggleNav' onClick={() => setNav(!nav)}>
                        <div style={{ transform: `translateY(${nav ? '800%' : '0%'}) rotate(${nav ? '45deg' : '0deg'})` }}></div>
                        <div style={{ opacity: nav ? 0 : 1 }}></div>
                        <div style={{ transform: `translateY(${nav ? '-800%' : '0%'}) rotate(${nav ? '-45deg' : '0deg'})` }}></div>
                    </div>
                </div>
            </div>
            <nav ref={navRef}>
                <ul>
                    <li className={`${pathName === '/' ? 'active' : ''}`}>Home</li>
                    <li onClick={() => {scrollToItems(); setNav(false)}}>Food list</li>
                    <li className={`${pathName === '/about' ? 'active' : ''}`}>About us</li>
                    <li className={`${pathName === '/contact' ? 'active' : ''}`}>Contact</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;