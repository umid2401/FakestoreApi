import Login from '@/components/auth/Login'
import React from 'react'
import { changeLoading } from "@/features/countslice";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {id} = router.query;
  if(id==="login"){
    dispatch(changeLoading(false))
  }
  return (
    <div>
      <Login/>
    </div>
  )
}
