import React from "react";
import { Link } from "react-router-dom";

const First = () => {
  return (
    <>
      <div className="h-screen bg-gradient-to-r from-slate-500 to-zinc-900">
        <nav className="text-white flex justify-between">
            <h1 className="pl-6 text-xl font-bold font-sans text-black-600 p-2"> TodoApp </h1>
           
          <ul className="   flex justify-end gap-6 pr-4 py-2">
            <a href="" className="hover:text-orange-500">Home</a>
            <a href="" className="hover:text-orange-500">Contact</a>
            <a href="" className="hover:text-orange-500">About</a>
          </ul>
        </nav>
        <div className="text-white ml-56 mt-64 text-3xl   ">
          <h1>Hello buddy!</h1>
          <p>Please Login to create Todo</p>
          <Link to={'/login'}><button className="bg-blue-700 p-2 rounded-md mt-3 text-lg">Login</button></Link>
        </div>
        
        

      </div>
    </>
  );
};

export default First;
