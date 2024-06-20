import axiosInstance from "../../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineTags,
} from "react-icons/ai";
import BlogSkeleton from "../skeleton/BlogSkeleton";


const RecommendBlog = ({ cat, cate }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 3000))
      await axiosInstance.get(`category/${cat}`).then((res) => {
        setCategory(res.data);
        //console.log(res.data);
      });
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <>
      <section className="blog py-5">
        <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>Blog Recommendation</h2>
        {
          (category === "" || category == null) ? <BlogSkeleton /> : <div className="sm:px-1 md:px-0 max-[640px]:w-[90%] sm:w-[100%] md:w-[95%] mx-auto flex py-4 flex-wrap gap-y-4 justify-around">
            {category?.blog?.slice(0, 4).map((item) => (
              <div
                className="box boxItems w-full h-auto sm:w-[19rem] md:w-[21rem] sm:h-[29.5rem]"
                key={item.id}
                style={{ cursor: "default", border: "2px solid #acb7c4", position: "relative" }} >

                <div style={{ display: "flex", backgroundColor: "#acb7c4", margin: "-1.25rem", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", padding: "0.25rem", alignItems: "center" }}>
                  <img src={item.userId.profile.avatar} alt="" style={{ margin: "0rem 1rem", height: "2rem", width: "2rem", borderRadius: "1rem" }} />
                  <h4>@{item.userId.username}</h4>
                </div>

                <div className="image_cover">
                  <Link to={`/details/${item._id}`} className="link">
                    <img
                      src={item.cover}
                      alt=""
                      style={{
                        width: "100%",
                        height: "15rem",
                        marginBottom: "1rem",
                        objectFit: "contain",
                      }}
                    />
                  </Link>
                </div>
                <div className="details">
                  <div className="tag">
                    <AiOutlineTags className="icon" />
                    <Link to={`/category/${item?.category?._id}`}>
                      <h4 style={{ marginTop: "-0.15rem", marginLeft: "-0.25rem" }}>{cate}</h4>
                    </Link>
                  </div>
                  <h3 style={{ marginTop: "-0.65rem" }}>{item.title}</h3>
                  <p className="footer_card" style={{ fontSize: "0.8rem", marginTop: "0.25rem", color: "#302a2a" }}>{item.desc.slice(0, 75)}...</p>
                </div>

                <div className="flex justify-between sm:absolute sm:bottom-0 sm:left-[1rem] sm:w-[90%]" >
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
            ))}
          </div>
        }

      </section>

    </>
  );
};
export default RecommendBlog;
