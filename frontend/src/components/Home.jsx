import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get("http://localhost:5001/api/todo/read", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const todoStatus = async (id) => {
    const token = localStorage.getItem("authToken");
    const todos = todo.find((to) => to._id === id);
    try {
      const response = await axios.put(
        `http://localhost:5001/api/todo/update/${id}`,
        {
          ...todos,
          completed: !todos.completed,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodo(todo.map((to) => (to._id === id ? response.data : to)));
      fetch();
      return toast.success("Todo updated??????!");
    } catch (error) {
      console.log(error);
      alert("Failed to update todo");
    }
  };

  const todoDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:5001/api/todo/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodo(todo.filter((to) => to._id !== id));
      return toast.success("Todo deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logout successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center ">
      <div className=" min-w-24 min-h-4 font-serif bg-white text-center rounded-lg  mt-14 p-6 mb-6">
        <h1 className="mb-6 text-xl">Add a new Task here...</h1>

        <Link to={"/create"}>
          {" "}
          <button className="bg-blue-500 text-white rounded-2xl p-2 w-fit">
            Click here to Add Task
          </button>
        </Link>

        <ul>
          {todo.map((todoItem, index) => (
            <li key={todoItem._id || index}>
              <div className="flex items-center justify-between mt-5 p-4 border border-gray-200 rounded-md shadow-sm">
                <input
                  type="checkbox"
                  checked={todoItem.completed}
                  onChange={() => todoStatus(todoItem._id)}
                  className="w-5 h-5 accent-blue-500"
                />

                <div className="flex-1 ml-4">
                  <h3
                    className={`text-lg font-semibold ${
                      todoItem.completed
                        ? " text-gray-400"
                        : "text-black"
                    }`}
                  >
                    Title: {todoItem.text}
                  </h3>
                  <p
                    className={`text-sm ${
                      todoItem.completed
                        ? " text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    Description: {todoItem.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    onClick={() => todoDelete(todoItem._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/edit/${todoItem._id}`}>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="text-white bg-red-500 hover:bg-red-600 rounded-md mt-6 p-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
