import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { AiOutlineSolution } from "react-icons/ai";

const User = () => {
  var [profile, setProfile] = useState(null);
  var [userProfile, setUserProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const getUserProfile = () => {
    axiosInstance(`userProfile/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setUserProfile(res.data[0]);
        //console.log(res.data[0]);
      }).catch((err) => {
        console.log("Error", err);
      });
  };

  const getUserBlogProfile = () => {
    axiosInstance(`blog/getUserBlogs/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setProfile(res.data);
        //console.log(res.data);
      }).catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getUserProfile();
    getUserBlogProfile();
  }, []);

  return (
    <>
      <div className="profile">
        {profile ? (
          <>
            <button
              className="img"
              onClick={() => {
                setProfileOpen(!profileOpen);
              }}
            >
              <div style={{
                  width: "3rem",
                  height: "3rem",
                  marginTop: "0.3rem",
                  marginRight: "0.5rem",
                }}>
              <img
                src={userProfile?.profile?.avatar}
                alt="avatar"
              />
              </div>
            </button>
            {profileOpen && (
              <div
                className="openProfile boxItems"
                onClick={() => {
                  setProfileOpen(false);
                }}
              >
                <Link to="/account" state={{ profile: userProfile }}>
                  <div className="image" >
                    <div className="img" style={{marginTop:"0.25rem", marginLeft:"-0.35rem"}}>
                      <img src={userProfile?.profile?.avatar} alt="" />
                    </div>
                    <div className="text" style={{marginLeft:"-0.35rem"}}>
                      <h4 style={{ textTransform: "capitalize", fontSize:"1rem" }}>
                        {userProfile?.profile?.name}
                      </h4>
                      <label>@{userProfile?.username}</label>
                    </div>
                  </div>
                </Link>
                <hr style={{ marginBottom: "1.5rem" }}></hr>

                <Link to="/account" state={{ profile: userProfile }}>
                  <button className="box" style={{marginTop:"-0.25rem"}}>
                    <IoSettingsOutline className="icon" />
                    <h4>My Account</h4>
                  </button>
                </Link>

                <Link to="/createBlog" state={{ profile: profile }}>
                  <button className="box">
                    <RiImageAddLine className="icon" />
                    <h4>Create Blog</h4>
                  </button>
                </Link>

                <Link to="/myBlogs" state={{ profile: profile }}>
                  <button className="box">
                    <AiOutlineSolution size="1.35rem" className="icon" />
                    <h4>My Blogs</h4>
                  </button>
                </Link>

                <Link to="/logout">
                  <button className="box">
                    <BiLogOut className="icon" />
                    <h4>Log Out</h4>
                  </button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <button>My Account</button>
        )}
      </div>
    </>
  );
};

export default User;
