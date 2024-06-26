import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import "../../components/blog/blog.css";
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineForm,
  AiOutlineDelete
} from "react-icons/ai";
import { Link } from "react-router-dom";
import MyBlogsSkeleton from "../../components/skeleton/MyBlogsSkeleton";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getPosts()
  }, []);

  const deleteBlog = (id) => {
    try {
      axiosInstance.delete(`blog/deleteBlog/${id._id}/`, {
      }).then((res) => {
        console.log("Success", res);
        getPosts()
      })
    } catch (e) {
      console.log(e)
    }
  }

  const getPosts = async () => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 5000))
      await axiosInstance.get(`blog/getUserBlogs`).then((res) => {
        setBlogs(res.data);
        //console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="min-h-[83.5vh]">
      <div className="container_details">
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
          My Blogs
        </h1>
      </div>
      <section className="blog">
        <div
          className="card_container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {
            (blogs?.length === 0 || blogs == null ) && <MyBlogsSkeleton />
          }
          {blogs?.map((item) => (
            <div
              className="myBlogs box boxItems relative"
              key={item.id}
              style={{
                width: "25rem",
                minHeight: "32rem",
                marginBottom: "3rem",
                marginTop: "1rem",
                backgroundColor: "#859c5f7a", cursor: "default", border: "2px solid #acb7c4", transition: "0s"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#acb7c4", margin: "-1.25rem", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", padding: "0.5rem 0.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={item.userId.profile.avatar} alt="" style={{ margin: "0rem 0.5rem 0rem 1rem", height: "2rem", width: "2rem", borderRadius: "1rem" }} />
                  <h4>@{item.userId.username}</h4>
                </div>

                <div style={{ display: "flex" }} className="edit">
                  <Link to={`/editBlog/${item._id}`} state={{ item: item }}>
                    <button style={{ margin: "0rem 0.5rem", border: "1px solid black", padding: "0.1rem 0.25rem", backgroundColor: "blue", color: "white", borderRadius: "0.5rem", display: "flex", justifyContent: "center", alignItems:"center", height: "1.8rem" }}><h4 style={{ margin: "0.2rem 0.55rem" }} >Edit</h4><AiOutlineForm size="1.25rem" /></button>
                  </Link>
                  <button style={{ margin: "0rem 0.5rem", border: "1px solid black", padding: "0.2rem 0.25rem", backgroundColor: "red", color: "white", borderRadius: "0.5rem", display: "flex", justifyContent: "center", alignItems:"center", height: "1.8rem" }}><h4 style={{ margin: "0.2rem 0.25rem" }} onClick={() => { deleteBlog(item) }}>Delete  </h4><AiOutlineDelete size="1.25rem" /></button>
                </div>
              </div>

              <Link to={`/details/${item._id}`}>
                <div className="img" style={{ marginTop: "1.5rem" }}>
                  <img src={item.cover} alt="" style={{
                    width: "100%",
                    height: "17rem",
                    marginBottom: "1rem",
                    marginTop: "0.25rem",
                    objectFit: "contain",
                  }} />
                </div>
              </Link>
              <div className="details" style={{ marginTop: "-0.25rem" }}>
                <div className="tag">
                  <AiOutlineTags
                    style={{
                      fontSize: "20px",
                      color: "black",
                    }}
                  />
                  <Link to={`/category/${item.category._id}`}>
                    <h4 style={{ marginTop: "-0.15rem", marginLeft: "0.25rem" }}>{item.category.category}</h4>
                  </Link>
                </div>
                <h3 style={{ marginTop: "-0.75rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.8rem", marginTop: "0.25rem", color: "#302a2a" }}>{item.desc.slice(0, 150)}...</p>
                
                <div className="w-full max-w-[90%]" style={{ display: "flex", justifyContent:"space-between", position:"absolute", bottom: 0 }}>
                  <div className="flex">
                    <AiOutlineCalendar className="icon" />{" "}
                    <p htmlFor="" style={{ fontSize: "0.8rem", color: "black" }}>{item.createdAt.substring(0, 10)}</p>
                  </div>
                  <div className="flex">
                    <AiOutlineClockCircle className="icon" />{" "}
                    <p htmlFor="" style={{ fontSize: "0.8rem", color: "black" }}>{item.createdAt.substring(11, 19)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default MyBlogs

// import React from 'react'

// const MyBlogs = () => {
//   return (
//     <div>MyBlogs</div>
//   )
// }

// export default MyBlogs