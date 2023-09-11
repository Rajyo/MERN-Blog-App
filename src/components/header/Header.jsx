import "./header.css";
import User from "./User";
import { nav } from "../../assets/data/data";
import { Link } from "react-router-dom";

export const Header = () => {
  const token = localStorage.getItem("access_token");

  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header");
    header.classList.toggle("active", this.window.scrollY > 100);
  });

  var padding = 0;
  token ? (padding = "0.5rem") : (padding = "1.4rem");

  var margleft = 0;
  token ? (margleft = "3.8rem") : (margleft = "8rem");

  return (
    <>
      <header className="header" style={{ padding: padding }}>
        <div className="scontainer flex header_next">
          <div className="logo">
            <Link to={`/`}>
              <h3>Unicorn Blog</h3>
            </Link>
          </div>
          <nav>
            <ul style={{ marginLeft: margleft }}>
              {nav.map((link) => (
                <li key={link.id}>
                  <Link to={link.url} className="header_link">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="account flexCenter">
            {token ? (
              <User />
            ) : (
              <>
                <Link
                  to="/login"
                  className="login_header"
                  style={{
                    color: "black",
                    fontWeight: "500",
                    fontSize: "1.1rem",
                    marginRight: "1.5rem",
                  }}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="login_header"
                  style={{
                    color: "black",
                    fontWeight: "500",
                    fontSize: "1.1rem",
                    marginRight: "0.5rem",
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
