import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  FaHome,
  FaQuestionCircle,
  FaNewspaper,
  FaBlog,
  FaBriefcase,
  FaDatabase,
} from "react-icons/fa";
import { changeLoading } from "@/features/countslice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Sidebar() {
  const loading = useSelector((state)=>state.counter.loading);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';
  return (
    <section className="">

      { !isLoginPage&&(
        <aside className="bg-white shadow-sm inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 flex flex-col  ">
        <div className="flex  justify-center my-4 cursor-pointer">
          
          <Link href="/">
          <Image
          src="/Images/_logo.png"
          width={80}
          height={80}
          alt="err"
          />
          </Link>
        </div>
        <nav className="text-slate-500">
          <ul>
            <li className="flex items-center mx-4">
             
              <Link
                href="/"
                className="font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg bg-gradient-to-tr  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-4 px-4 capitalize w-full"
              >
                <FaHome className="text-xl" />
                <span className="block antialiased font-sans text-xl leading-relaxed text-inherit font-medium capitalize">
                Dashboard
                </span>
              </Link>
            </li>
            
            <li className=" flex items-center mx-4">
              <Link
                href="/news"
                className="font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg bg-gradient-to-tr  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-4 px-4 capitalize w-full"
              >
                <FaNewspaper className="text-lg" />
                <span className="block antialiased font-sans text-xl leading-relaxed text-inherit font-medium capitalize">Add Product</span>
              </Link>
            </li>
            <li className=" flex items-center mx-4">
              <Link
                href="/blogs"
                className="font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg bg-gradient-to-tr  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-4 px-4 capitalize w-full"
              >
                <FaBlog className="text-xl" />
                <span className="block antialiased font-sans text-xl leading-relaxed text-inherit font-medium capitalize"> Blogs</span>
              </Link>
            </li>
           
          </ul>
        </nav>
      </aside>
      )}
      
    </section>
  );
}
