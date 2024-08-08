import Link from "next/link";
import { changeLoading } from "@/features/countslice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Login() {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const login_state = { password: "", username: "" };
  const [products, setProducts] = useState(null);
  const [state, setState] = useState(login_state);
  const dispatch = useDispatch();
  const router = useRouter();
 
  const login = async () => {
    try {
      const res = await fetch(`${api_url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: state.username,
          password: state.password,
        }).toString(),
      });
      const data = await res.json();
      localStorage.setItem("my_token", data.token);
      toast.success("Login successful!");
      router.push("/");
      dispatch(changeLoading(true));
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const toMain = (e) => {
    e.preventDefault();
    router.push("/");
  };
  useEffect(() => {
    // get_data();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h4 className="text-2xl font-bold text-gray-500 text-center pb-4">Login</h4>
        <form>
          <div className="mb-4 ">
            {products}
            <label
             className="text-lg font-normal text-gray-500 block pb-4"
              htmlFor="email"
            >
              Username
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="email"
              type="text"
              placeholder="Username"
              name="username"
              value={state.username}
              onChange={handelChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="text-lg font-normal text-gray-500 block pb-4"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={state.password}
              onChange={handelChange}
            />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-between">
            <button
              onClick={login}
              className="w-[100%] text-white bg-blue-700 duration-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"              type="button"
            >
              Login
            </button>
            <Link href="/register">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
