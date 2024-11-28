import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5001/api/todo/read/${id}`);
      console.log(res.data);
      setEditData(res.data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `http://localhost:5001/api/todo/update/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setEditData({ text: "" });
      alert("Todo updated");
      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-2">
          <input
            name="text"
            placeholder="enter the text"
            value={editData.text}
            className="w-full outline-none border border-sky-200 ring-1 p-1 rounded-md "
            onChange={handleChange}
          />
          <button
            className="text-white bg-blue-400 rounded-md p-1 hover:bg-sky-600"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default Edit;
