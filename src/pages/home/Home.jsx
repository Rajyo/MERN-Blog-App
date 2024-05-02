import React, { useEffect, useState } from "react";
import { Category } from "../../components/category/Category";
import { CardHome } from "../../components/blog/CardHome";
import Banner from "../../components/banner/Banner";
import axiosInstance from "../../axios";
import "./home.css"

export const Home = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      await axiosInstance.get(`category`).then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        {category.length === 0 &&

          <div style={{ position: "absolute", zIndex: 10, width: "100%", height: "85vh", display: "flex", alignItems: "center" }}>
            <section id="categoryWidth" style={{ backgroundColor: "black", color: "white", display: "flex", flexDirection: "column", gap: 20, borderRadius: 15, margin: "auto", justifyContent: "center", alignItems: "center", placeItems: "center" }} >

              <h1 style={{ color: "red" }}>IMPORTANT!</h1>
              <h3>You are seeing this message because the Backend Server is hosted on RENDER's FREE Tier Web Service and
                it spin down after 15 minutes of inactivity.</h3>
              <h3>Since there are no active users and I am using a Free Service, the first request might take longer to
                respond.</h3>
              <h2 style={{ color: "blue", marginTop: 10 }}>So please refresh the page and wait for 20-30 seconds.</h2>

            </section>
          </div>
        }
      </div>
      <div style={{opacity: category.length === 0 ? "10%" : "100%"}}>
        <Banner />
        <Category category={category} />
        <CardHome />
      </div>
    </>
  );
};
