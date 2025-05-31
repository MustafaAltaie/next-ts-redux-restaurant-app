'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const page = () => {
  const router = useRouter();
  const isAdminLogedIn = useSelector((state: RootState) => state.admin.isLogedIn);

  useEffect(() => {
    if(!isAdminLogedIn) {
      router.push('/dashboard');
    }
  }, [isAdminLogedIn, router]);

  return (
    <div>
      
    </div>
  )
}

export default page;