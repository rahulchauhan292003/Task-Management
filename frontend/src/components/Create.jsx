import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const [newDes, setNewDes] = useState("");

  const todoCreate = async () => {
    if (!newTodo) {
      alert("Todo cannot be empty!");
      return;
    }
    if (!newDes) {
      alert("Description cannot be empty!");
      return;
    }

    const token = localStorage.getItem("authToken");
    console.log("Tokenn:", token);
    if (!token) {
      console.log("no token found ,Login again");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5001/api/todo/create",
        {
          text: newTodo,
          completed: false,
          description: newDes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //   setTodo((todo) => [...todo, res.data]);
      setNewTodo("");
      setNewDes("");
      toast.success("Create success !");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="p-6 border border-gray-100 rounded-lg shadow-lg bg-white w-full max-w-md">
        <h2 className="flex justify-center mb-4 text-xl">Create Task ..!</h2>
        <div className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="enter the title"
          value={newTodo}
          className="w-full outline-none border border-sky-200 ring-1 p-2 rounded-md "
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter the description"
          value={newDes}
          className="w-full outline-none border border-sky-200 ring-1 p-2 rounded-md "
          onChange={(e) => setNewDes(e.target.value)}
        />
        <button
          className="text-white bg-blue-400 rounded-2xl p-2 hover:bg-sky-600"
          onClick={todoCreate}
        >
          Add
        </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Create;
