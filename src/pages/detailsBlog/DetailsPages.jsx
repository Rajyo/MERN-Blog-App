import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RecommendBlog from "../../components/recommendBlog/RecommendBlog";
import {
  AiOutlineClockCircle,
  AiOutlineCalendar
} from "react-icons/ai";


export const DetailsPages = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0)
    getDetails();
  }, [id]);

  const getDetails = async () => {
    try {
      await axiosInstance.get(`blog/find/${id}`).then((res) => {
        setBlog(res.data);
        //console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "rgba(169, 112, 23, 0.82)",
          color: "white",
          padding: "10px",
          marginBottom: "1rem",
          fontSize: "2rem"
        }}
      >
        Details Page
      </h1>
      {blog ? (
        <>
          <section className="max-w-[95%] min-h-[50vh] mx-auto flex flex-col gap-y-10 lg:flex-row py-5 bg-slate-50">

            <div className="lg:basis-1/2 shadow-xl shadow-slate-400">
              <img src={blog.cover} alt="" className="w-full max-w-[80vw] lg:max-w-[50vw] h-full object-cover" />
            </div>

            <div className="lg:basis-1/2 px-2 flex flex-col gap-5 lg:px-6 w-full">
              <div style={{ display: "flex", gap: "1rem", alignSelf:"flex-start" }}>
                <h2 className="text-lg">Title:</h2>
                <p className="font-bold text-lg">{blog.title}</p>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignSelf:"flex-start" }}>
                <h3 className="text-lg">Author:</h3>
                <p className="font-bold text-lg">
                  {blog.userId.email}
                </p>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignSelf:"flex-start" }}>
                <h3 className="text-lg">Category:</h3>
                <Link
                  to={`/category/${blog.category._id}`}
                  style={{ fontSize: "large",}}
                >
                  <p className="font-bold text-lg">
                    {blog.category.category}
                  </p>
                </Link>
              </div>

              <p className="start" style={{ alignSelf:"flex-start"}}>
                <h3
                  style={{
                    fontSize: "large",
                    textAlign: "start",
                    color: "black",
                  }}
                >
                  Description:
                </h3>
                <p className="desc text-sm">{blog.desc.slice(0, 650)}</p>
              </p>
              <div className="w-full justify-between lg:pr-6 mt-4" style={{ display: "flex", color: "black", alignSelf: "flex-start" }}>
                <div className="flex gap-2">
                <AiOutlineCalendar className="text-lg" />
                <p className="text-sm text-black" htmlFor="">{blog.createdAt.substring(0, 10)}</p >
                </div>
                <div className="flex gap-2">
                <AiOutlineClockCircle className="text-lg" />
                <p className="text-sm text-black" htmlFor="">{blog.createdAt.substring(11, 19)}</p >
                </div>
              </div>
            </div>

          </section>
          <RecommendBlog cat={blog.category._id} cate={blog.category.category} />
        </>
      ) : null}
    </>
  );
};
