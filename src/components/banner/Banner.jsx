import "./banner.css";
import logo from "../../assets/images/top-view-arrangement-natural-material-stationery.jpg";


const Banner = () => {
  return (
    <div>
      <div className="center_banner">BLOG</div>
      <img src={logo} alt="cover" className="banner" />
    </div>
  );
};
export default Banner;
