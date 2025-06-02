'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { setLogin } from "../../../../features/admin/adminSlice";

interface AuthGuardProps {
    children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const stored = localStorage.getItem('isLoginValid');
        const parsed = stored ? JSON.parse(stored) : false;
        dispatch(setLogin(parsed))
        if(!parsed){
            router.push('/dashboard');
        }
    }, [dispatch]);

    return (
        <>{children}</>
    )
}

export default AuthGuard;