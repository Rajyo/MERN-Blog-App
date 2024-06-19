import React, { useState, useRef, useEffect } from "react";
import "./editBlog.css";
import axios from "axios";
import { useLocation } from "react-router";
import axiosInstance from "../../axios";

const EditBlog = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    //console.log(location);
    const [title, setTitle] = useState(location?.state?.item?.title);
    const [desc, setDesc] = useState(location?.state?.item?.desc);
    const [category, setCategory] = useState("");
    const [finalCategory, setFinalCategory] = useState(location?.state?.item?.category?.category);
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatar] = useState(location?.state?.item?.cover);
    const fileInput = useRef(null);
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(false)

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        try {
            await axiosInstance.get(`category/`).then((res) => {
                //console.log(res.data);
                setCategory(res.data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    const deleteBlog = async () => {
        setLoading(true)
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}blog/deleteBlog/${location.state.item._id}/`, {
                headers: {
                    Authorization: localStorage.getItem("access_token")
                        ? "Bearer " + localStorage.getItem("access_token")
                        : null,
                }
            }).then((res) => {
                setLoading(false)
                //console.log("Success", res);
                window.location.href = "/";
            })
        } catch (e) {
            console.log(e)
        }
    }

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
        const files = event.target.files;
        //console.log(files.length);
        const fileSize = files[0]?.size / 1024
        if (fileSize > 2000) {
            setSelectedFile(null)
            alert("File too Big, please select a file less than 2mb")
            return
        }

        setClick(true)
        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            setSelectedFile(base64);
            return;
        }
    };

    const sendPost = (e) => {
        e.preventDefault();

        if (click) {
            if (selectedFile == null) {
                alert("File too Big, please select a file less than 2mb")
                return
            }
        }
        setLoading(true)
        const formData = new FormData();
        formData.append("title", title);
        if (finalCategory === "Select Category") {
            alert('Select a Catgegory')
        } else {
            formData.append("category", finalCategory);
        }
        formData.append("desc", desc);
        click && formData.append("cover", selectedFile);

        axios
            .put(`${process.env.REACT_APP_BASE_URL}blog/updateBlog/${location.state.item._id}/`, formData, {
                headers: {
                    Authorization: localStorage.getItem("access_token")
                        ? "Bearer " + localStorage.getItem("access_token")
                        : null,
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
            })
            .then((res) => {
                setLoading(false)
                console.log("Success", res);
                window.location.href = "/";
            })
            .catch((err) => { console.log("Error", err) });
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
                Edit Blog
            </h1>
            <div className="flex flex-col md:flex-row justify-center md:max-w-[95%] lg:max-w-[75%] xl:max-w-[60%] mx-auto" style={{ backgroundColor: "white", marginBottom: "7rem", marginTop: "2rem" }}>

                <div className="left basis-1/2 flex flex-col gap-10">
                        <img
                            src={avatar}
                            alt="image1"
                        />
                        <button
                            className="cover"
                            style={{
                                color: "blue",
                                fontSize: "1.1rem",
                                fontWeight: "500"
                            }}
                            onClick={() => (
                                setSelect(true)
                            )}
                        >
                            Change Blog Cover
                        </button>

                </div>

                <div className="right max-w-[95%] basis-1/2" style={{ backgroundColor: "white", border: "1px solid white" }}>
                    <form
                        onSubmit={sendPost}
                        className="w-full mt-5 max-[450px]:p-2"
                        style={{ marginTop: "2rem", paddingTop:"2rem", backgroundColor: "white" }}
                    >
                        <label>
                            Edit Title:
                            <input
                                type="text"
                                name="title"
                                value={title}
                                placeholder="Enter Blog Title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label style={{ marginBottom: "1.3rem" }}>
                            Edit Category:
                            <select
                                id="cars"
                                name="category"
                                defaultChecked={finalCategory}
                                value={finalCategory}
                                onChange={(e) => { setFinalCategory(e.target.value); console.log(e.target.value) }}
                                style={{
                                    width: "100%",
                                    padding: "0.4rem 1rem",
                                    backgroundColor: "#d1b0ea24",
                                    fontSize: "1rem",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                <option>Select Category</option>
                                {
                                    Array.from(category).map((item) => (
                                        <option value={item.category}>{item.category}</option>
                                    ))
                                }
                            </select>
                        </label>
                        <label>
                            Edit Description:
                            <textarea
                                name="desc"
                                value={desc}
                                placeholder="Enter Description"
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        {
                            select && <>
                                <label style={{ marginTop: "-0.5rem" }}>
                                    Edit Image:
                                    <input
                                        type="file"
                                        className="cover"
                                        name="cover"
                                        onChange={uploadImg}
                                    />
                                    <button
                                        onClick={(e) => fileInput.current && fileInput.current.click()}
                                        className="btn btn-primary"
                                    />
                                </label>
                            </>
                        }

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>

                            <button type="submit" disabled={loading} className={loading ? "bg-violet-300 text-black p-2 rounded-md" : "bg-violet-600 text-white p-2 rounded-md"} style={{ border: "1px solid black", color: "white", borderRadius: "0.5rem", display: "flex", justifyContent: "center" }}>{loading ? "Submiting Blog..." : "Submit Blog"}</button>


                            <button disabled={loading} className={loading ? "bg-red-300 text-black p-2 rounded-md" : "bg-red-600 text-white p-2 rounded-md"} style={{ border: "1px solid black", color: "white", borderRadius: "0.5rem", display: "flex", justifyContent: "center" }}><h4 onClick={deleteBlog}>{loading ? "Deleting Blog..." : "Delete Blog"}</h4></button>

                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default EditBlog;
