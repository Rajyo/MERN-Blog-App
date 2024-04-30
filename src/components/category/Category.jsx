import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import "./category.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <MdNavigateNext className="icon" />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <GrFormPrevious className="icon" />
      </button>
    </div>
  );
};
export const Category = () => {
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="relative">

      {category.length == 0 &&
        <div className="absolute z-10 w-full max-h-screen">
          <section
            className="bg-black w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%] m-auto flex flex-col gap-6 p-4 sm:p-8 md:p-10 lg:p-16 rounded-md text-white">

            <h1 className="text-center font-bold text-3xl text-red-600">IMPORTANT!</h1>
            <h1>You are seeing this message because the Backend Server is hosted on RENDER's FREE Tier Web Service and
              it spin down after 15 minutes of inactivity.</h1>
            <h1>Since there are no active users and I am using a Free Service, the first request might take longer to
              respond.</h1>
            <h1 className="uppercase text-center text-xl font-bold sm:mt-10 text-blue-500">So please refresh the page and
              try again.</h1>

          </section>
        </div>}

      <section className="category" >
        <div className="content" >
          <Slider {...settings}>
            {category.map((item) => (
              <div className="boxs">
                <div className="box" key={item.id} >
                  <img src={item.cover} alt="cover" />
                  <div className="overlay">
                    <Link to={`/category/${item._id}`}>
                      <h3>{item.category}</h3>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};
