import { useState } from "react";
import axiosInstance from "../../axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password should be more than 6 letters")
      return
    }

    const user = {
      username: username,
      email: email,
      password: password,
    };

    await axiosInstance
      .post(
        `userProfile/register/`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.clear();
        console.log("Registration successful", res);
        alert("Success");
        window.location.href = "/login";
      })
      .catch((e) => {
        console.log("Error");
        alert("Error", e);
        return Promise.reject(e);
      });
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
        Register
      </h1>

      <form className="max-[450px]:p-3 w-[95%] min-[450px]:w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[35%] min-[450px]:mt-12" onSubmit={submit} style={{ backgroundColor: "rgb(228, 228, 228)", color: "black" }}>
        <div className="">
          <label style={{ fontWeight: "bold" }}>Username:</label>
          <input
            className="form-control mt-1"
            placeholder="Enter Username"
            name="Username"
            type="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            style={{ backgroundColor: "white", marginTop: "0.25rem" }}
          />
        </div>
        <div className="" style={{ marginBottom: "0.2rem" }}>
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
        <div className="">
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

export default Register;
