import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUser = async () => {
      const user = { password, email };
      try {
        const response = await axios.post(
          "http://localhost:5001/api/user/login",
          user
        );
        // console.log("success", response.data);
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        setEmail("");
        setPassword("");
        toast.success("Login Success");
        Navigate("/home");
      } catch (error) {
        console.log("Invalid username or password", error);
      }
    };

    loginUser();
  };
  return (
    <div className=" bg-slate-200 min-h-screen flex justify-center items-center ">
      <form action="" onSubmit={handleSubmit}>
        <div className=" w-[380px] h-[478px] font-serif bg-white text-center rounded-lg  mt-14 p-6 mb-7">
          <div className="text-center mb-4">
            <img
              src="/src/assets/blue-logo.png"
              alt=""
              className="h-24 w-44 mx-auto"
            />
          </div>
          <div className="text-center mb-6">
            <p className="font-sans text-gray-600">Sign in to your account </p>
          </div>
          <div className="mb-4 ">
            <label htmlFor="email" className="mr-72 font-sans text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-500 focus:ring-sky-400 focus:outline-none focus:ring-2 rounded-md p-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="input password "
              className="mr-72 font-sans text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-500 focus:ring-sky-400 focus:outline-none focus:ring-2 rounded-md p-1"
            />
          </div>
          <div className="ml-44">
            <p className="text-blue-500 font-sans">Forgot Password?</p>
          </div>
          <div className="mt-4 text-white">
            <button className="w-full bg-blue-600 text-lg rounded-xl p-2 font-sans">
              {" "}
              Sign In
            </button>
            <p className="text-gray-600 mt-2 font-sans">
              {" "}
              Don't have account?{" "}
              <Link to={"/signup"} className="text-blue-600">
                signup
              </Link>{" "}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
