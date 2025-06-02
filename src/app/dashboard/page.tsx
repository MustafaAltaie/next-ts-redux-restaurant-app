'use client';
import { useEffect, useState } from "react";
import { useCheckPasswordMutation } from "../../../features/password/passwordApi";
import { useRouter } from "next/navigation";
import './dashboard.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setLogin } from "../../../features/admin/adminSlice";

const Page = () => {
    const [password, setPassword] = useState<string>('');
    const [checkPassword] = useCheckPasswordMutation();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const stored = localStorage.getItem('isLoginValid');
        const parsed = stored ? JSON.parse(stored) : false;
        if(parsed){
            dispatch(setLogin(true));
            router.push('/');
        }
    }, [dispatch, router]);

    const handleCheckPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password) return;
        try {
            const res = await checkPassword(password).unwrap();
            if (res.valid) {
                localStorage.setItem('isLoginValid', 'true');
                dispatch(setLogin(true));
                router.push('/');
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