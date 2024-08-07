import { changeLoading } from "@/features/countslice";
import { useRouter } from "next/router";
import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const loading = useSelector((state)=>state.counter.loading);
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoginPage = router.pathname === '/login';
  const logOut = () =>{
    localStorage.removeItem("my_token");
    router.push("/login");
    dispatch(changeLoading(false))
  }
  return (
    <div>
      {!isLoginPage&&(
         <header className="bg-white shadow-sm translate-x-0 inset-0 z-50 my-4 mx-4 h-16 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 flex justify-between items-center p-4">
         <div className="flex items-center">
           <button onClick={()=>dispatch(changeLoading(!loading))} className="text-gray-500 focus:outline-none ">
             <FaBars className="text-xl" />
           </button>
         </div>
         <button onClick={logOut} className="flex items-center rounded-xl  bg-red-200 p-2 font-semibold">
           <span className="mr-2">Logout</span>
           <FaSignOutAlt className="text-xl" />
         </button>
       </header>
      )}
    </div>
   
  );
}
