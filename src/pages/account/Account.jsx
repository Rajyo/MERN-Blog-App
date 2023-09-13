import React, { useRef, useState } from "react";
import "./account.css";
import { useLocation } from "react-router";
import axios from "axios";
import load from "../../assets/images/loading-7528.gif"

const Account = () => {
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  //console.log(location)
  const fileInput = useRef(null);
  const [username, setUsername] = useState(location.state.profile?.username)
  const [email, setEmail] = useState(location.state.profile?.email)
  const [name, setName] = useState(location.state.profile?.profile?.name);
  const [bio, setBio] = useState(location.state.profile?.profile?.bio);
  const [address, setAddress] = useState(location.state.profile?.profile?.address);
  const [avatar, setAvatar] = useState(location.state.profile?.profile?.avatar);
  const [selectedFile, setSelectedFile] = useState(null);
  const [click, setClick] = useState(false)
  const [select, setSelect] = useState(false)

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
    formData.append("username", username);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("address", address);
    click && formData.append("avatar", selectedFile);

    axios
      .put(`${process.env.REACT_APP_BASE_URL}userProfile/${location.state.profile._id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
          'Content-Type': 'multipart/form-data',
          "Content-Type": "application/json",
          accept: "application/json",
        }
      })
      .then((res) => {
        setLoading(false)
        //console.log("Success", res);
        window.location.href = "/";
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <>
      {loading ? <img src={load} alt="" style={{ width: "25rem", height: "25rem", display: "block", margin: "10rem auto" }}></img> : <>
        <h1
          style={{
            textAlign: "center",
            backgroundColor: "rgba(169, 112, 23, 0.82)",
            color: "white",
            padding: "10px",
          }}
        >
          Account
        </h1>
        <section className="accountInfo">
          <div className="content" style={{ display: "flex", justifyContent: "center" }}>
            <div className="left">
              <div className="image">
                <img
                  src={avatar}
                  alt="image1"
                  class="image-preview"
                />
                <button
                  className="cover"
                  style={{
                    marginTop: "20rem",
                    marginLeft: "6.8rem",
                    color: "blue",
                    fontSize: "1.1rem",
                  }}
                  onClick={() => (
                    setSelect(true)
                  )}
                >
                  Change Photo
                </button>
              </div>
            </div>

            <div className="right" style={{ borderColor: "white" }}>
              <form action="" style={{ marginTop: "0rem", width: "100%", borderColor: "white" }}>
                <label htmlFor="">Name:</label>
                <input
                  type="text"
                  placeholder={name}
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                />

                <label htmlFor="" style={{ marginTop: "-0.2rem" }}>Bio:</label>
                <textarea type="text" placeholder={bio} value={bio} style={{ paddingTop: "0.5rem" }} onChange={(e) => { setBio(e.target.value) }} />

                <label htmlFor="">Address:</label>
                <textarea type="text" placeholder={address} value={address} style={{ paddingTop: "0.5rem" }} onChange={(e) => { setAddress(e.target.value) }} />

                {
                  select && <>
                    <label>Image:</label>
                    <input
                      type="file"
                      className="image_form"
                      style={{ paddingTop: "0.5rem" }}
                      onChange={uploadImg}
                    />
                    <button
                      onClick={(e) => fileInput.current && fileInput.current.click()}
                      className="btn btn-primary"
                    />
                  </>
                }

                {
                  name?.length === 0 && bio?.length === 0 && address?.length === 0 && avatar === null ? <>
                    <button className="button" style={{ marginTop: "0.25rem" }} onClick={sendPost}>
                      <h3>Create</h3>
                    </button></> : <>
                    <button className="button" style={{ marginTop: "0.25rem" }} onClick={sendPost}>
                      <h3>Update</h3>
                    </button></>
                }
              </form>

            </div>
          </div>
        </section>
      </>}
    </>
  );
};

export default Account;
