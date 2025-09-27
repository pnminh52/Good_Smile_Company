import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../../../hook/useToast";
import { createNews } from "../../../api/new";
const NewAdd = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (!form.content.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (!form.type.trim()) {
      toast.error("Type is required!");
      return;
    }
    try {
      setLoading(true);
      await createNews(form);
      toast.success("New created successfully!");
      setForm({ title: "", content: "" });
      navigate("/admin/news");
    } catch (error) {
      toast.error("Failed to add news, please try again!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Add new page</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">title</label>
        <input
          type="text"
          placeholder="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <label htmlFor="">content</label>
        <input
          type="text"
          placeholder="content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <select
          name="  
        
        type
        "
          id="
          type
          "
        >
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewAdd;
