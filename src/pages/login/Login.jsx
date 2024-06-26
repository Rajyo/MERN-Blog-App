import { useState } from "react";
import axiosInstance from "../../axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    await axiosInstance.post(
      `userProfile/login`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    ).then((res) => {
      console.log(res)
      localStorage.clear();
      localStorage.setItem("access_token", res.data.token);

      axiosInstance.defaults.headers["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");
      window.location.href = "/";
    }).catch(() => {
      alert("Invalid email or password")
    })

  };

  return (
    <div className="h-[83.5vh]">
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "rgba(169, 112, 23, 0.82)",
          color: "white",
          padding: "10px",
          fontSize: "2rem"
        }}
      >
        Login
      </h1>

      <form className="max-[450px]:p-5 w-[95%] min-[450px]:w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[35%]" onSubmit={submit} style={{ backgroundColor: "rgb(228, 228, 228)", color: "black" }}>

          <div className="form-group mt-3" style={{ marginBottom: "0.5rem" }}>
            <label style={{ fontWeight: "bold" }}>Email:</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Email"
              name="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: "white", marginTop: "0.25rem" }}
            />
          </div>
          <div className="form-group mt-3">
            <label style={{ fontWeight: "bold" }}>Password:</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{ backgroundColor: "white", marginTop: "0.25rem" }}
            />
          </div>
          <div className="d-grid gap-2 sm:mt-3">
            <button
              type="submit"
              style={{
                color: "white",
                fontSize: "medium",
                backgroundColor: "black",
                width: "100% ",
                padding: "0.7rem",
                borderRadius: "0.5rem",
                marginTop: "2rem",
              }}
            >
              Submit
            </button>
          </div>

      </form>

    </div>
  );
};

export default Login;
