import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import "./blog.css";
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineUser
} from "react-icons/ai";
import { Link } from "react-router-dom";

export const Card = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      await axiosInstance.get(`blog/getAll/`).then((res) => {
        setBlogs(res.data);
        //console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section className="blog">
        <div
          className="card_container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {blogs.map((item) => (
            <div
              className="box boxItems"
              key={item.id}
              style={{
                width: "25rem",
                height: "30.5rem",
                marginBottom: "3rem",
                marginTop: "1rem",
                cursor: "default", border: "2px solid #acb7c4"
              }}
            >
              <div style={{ display: "flex", backgroundColor: "#acb7c4", margin: "-1.25rem", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", padding: "0.25rem", alignItems:"center"}}>
              <img src={item.userId.profile.avatar} alt="" style={{ margin: "0rem 1rem", height:"2rem", width:"2rem", borderRadius:"1rem" }}/>
                <h4>@{item.userId.username}</h4>
              </div>

              <Link to={`/details/${item._id}`}>
                <div className="img">
                  <img src={item.cover} alt="" />
                </div>
              </Link>
              <div className="details" style={{marginTop:"-0.25rem"}}>
                <div className="tag">
                  <AiOutlineTags
                    style={{
                      fontSize: "20px",
                      color: "black",
                    }}
                  />
                  <Link to={`/category/${item.category._id}`}>
                  <h4 style={{ marginTop: "-0.15rem" }}>{item.category.category}</h4>
                  </Link>
                </div>
                <h3 style={{ marginTop: "-0.65rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.8rem", marginTop: "0.3rem", color:"#302a2a" }}>{item.desc.slice(0, 100)}...</p>
                <div className="date" style={{ display: "flex" }}>
                <AiOutlineCalendar className="icon" style={{ marginLeft: "0.25rem" }} />{" "}
                <p htmlFor="" style={{ fontSize: "0.8rem", color: "black" }}>{item.createdAt.substring(0, 10)}</p>
                <AiOutlineClockCircle className="icon" style={{ marginLeft: "10rem" }} />{" "}
                <p htmlFor="" style={{ fontSize: "0.8rem", color: "black" }}>{item.createdAt.substring(11, 19)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
