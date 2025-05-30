'use client';
import { useEffect, useState } from "react";
import { useCheckPasswordMutation } from "../../../features/password/passwordApi";
import { useRouter } from "next/navigation";
import './Password.css';

const Page = () => {
    const [password, setPassword] = useState<string>('');
    const [checkPassword] = useCheckPasswordMutation();
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('isLoginValid')
        const stored = localStorage.getItem('isLoginValid');
        const parsed = stored ? JSON.parse(stored) : false;
        if(parsed) router.push('/dashboard');
    }, []);

    const handleCheckPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password) return;
        try {
            const res = await checkPassword(password).unwrap();
            if (res.valid) {
                localStorage.setItem('isLoginValid', 'true');
                router.push('/dashboard');
                
            } else {
                alert('Incorrect password');
            }
        } catch (err) {
            console.log('Error happened during checking:', err);
            alert('Error happened while checking password');
        }
    }

    return (
        <section>
            <h3 onClick={() => router.push('/')}>Restaurant logo</h3>
            <div className="passwordPageWrapper flexCenter">
                <form className="flexColumn10" onSubmit={handleCheckPassword}>
                    <input type="password" placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    <button type="submit">Check password</button>
                </form>
            </div>
        </section>
    )
}

export default Page;