import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime"
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import Sidebar from "@/components/sidebar/Sidebar";
import store from "@/features/store";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [token, setToken] = useState(null);
  useEffect(() => {
    // Brauzerda tekshirish
    const token = localStorage.getItem('my_token');
    if (!token && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);
  return (
    <Provider store={store}>
      <div className="flex bg-slate-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <Main>

            <Component {...pageProps} />
          </Main>
         
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
}
