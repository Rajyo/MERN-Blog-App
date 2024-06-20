import React, { useState, useRef, useEffect } from "react";
import "./createPost.css";
import axios from "axios";
import { useNavigate } from "react-router";
import axiosInstance from "../../axios";

const CreatePost = () => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      await axiosInstance.get(`category`).then((res) => {
        //console.log(res.data);
        setCategory(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const uploadImg = async (event) => {
    let files = event.target.files;
    //console.log(files.length);
    const fileSize = files[0]?.size / 1024
    if (fileSize > 2000) {
      setSelectedFile(null)
      alert("File too Big, please select a file less than 2mb")
      return
    }

    if (files?.length === 1) {
      const base64 = await convertBase64(files[0]);
      setSelectedFile(base64);
      return;
    }
  };

  const sendPost = (e) => {
    e.preventDefault();

    if (selectedFile == null) {
      alert("File too Big, please select a file less than 2mb")
      // return
    }
    setLoading(true)
    const formData = new FormData();
    formData.append("cover", selectedFile);
    formData.append("title", title);
    formData.append("desc", desc);
    if (selectedCategory === "Select Category") {
      alert("Please select a Category")
    } else {
      formData.append("category", selectedCategory);
    }
    console.log(formData.values)
    axios
      .post(`${process.env.REACT_APP_BASE_URL}blog/`, formData, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
          'Content-Type': 'multipart/form-data',
          accept: "application/json",
        }
      })
      .then((res) => {
        setLoading(false)
        //console.log("File Upload success", res);
        navigate("/");
      })
      .catch((err) => console.log("File Upload Error", err));
  };


  return (
    <>
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "rgba(169, 112, 23, 0.82)",
          color: "white",
          padding: "10px",
          fontSize: "2rem"
        }}
      >
        Create Blog
      </h1>
      <form
        onSubmit={sendPost}
        className="max-[450px]:w-[98%] max-[450px]:px-2 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]"
        style={{ marginTop: "2rem", marginBottom: "2rem", backgroundColor: "#d1b0ea24" }}
      >
        <label>
          Enter Title:
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter Blog Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label style={{ marginBottom: "1.3rem" }}>
          Enter Category:
          <select
            id="cars"
            name="category"
            value={selectedCategory}
            required
            onChange={(e) => { setSelectedCategory(e.target.value) }}
            style={{
              width: "100%",
              padding: "0.4rem 1rem",
              backgroundColor: "#d1b0ea24",
              fontSize: "1rem",
              marginBottom: "0.5rem",
              border: "1px solid black",
              borderRadius: "0.5rem"
            }}
          >
            <option>Select Category</option>
            {
              Array.from(category).map((item) => (
                <option key={item.category} value={item.category}>{item.category}</option>
              ))
            }
          </select>
        </label>
        <label>
          Enter Description:
          <textarea
            name="desc"
            value={desc}
            required
            placeholder="Enter Description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <label>
          Enter Image:
          <input
            type="file"
            required
            name="cover"
            className="cover place-content-center"
            onChange={uploadImg}
          />
          <button
            onClick={(e) => fileInput.current && fileInput.current.click()}
            className="btn btn-primary"
          />
        </label>

        <button type="submit" disabled={loading} className={loading ? "bg-violet-300 text-black p-2 rounded-md" : "bg-violet-600 text-white p-2 rounded-md"} style={{ marginBottom: "-1rem" }}>{loading ? "Creating Blog..." : "Create Blog"}</button>
      </form>
    </>

  );
};

export default CreatePost;
