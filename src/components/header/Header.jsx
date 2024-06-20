import "./header.css";
import User from "./User";
import { nav } from "../../assets/data/data";
import { Link } from "react-router-dom";

export const Header = () => {
  const token = localStorage.getItem("access_token");

  return (
    <>
      <header className="px-4 py-1 flex sticky top-0">
        <div className="logo">
          <Link to={`/`}>
            <h3>Unicorn Blog</h3>
          </Link>
        </div>
        <nav>
          <ul>
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
                className="p-3"
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="p-3"
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};
