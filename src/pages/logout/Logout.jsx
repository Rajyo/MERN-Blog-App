import { useEffect } from "react";


export const Logout = () => {
  useEffect(() => {
    try {
      localStorage.clear();
      window.location.href = "/login";
    } catch (e) {
      console.log("logout not working");
      localStorage.clear();
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <h2>Logging Out</h2>
    </div>
  );
};

export default Logout;
