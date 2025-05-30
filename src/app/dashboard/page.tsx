'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(typeof window === 'undefined') return;

    const stored = localStorage.getItem('isLoginValid');
    const parsed = stored ? JSON.parse(stored) : false;

    if(!parsed) {
      router.push('/password');
    }

    setIsMounted(true);
  }, []);

  if(!isMounted) return null;

  return (
    <div>
      Dashboard
    </div>
  )
}

export default page;