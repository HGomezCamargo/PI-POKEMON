import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./nav.module.css"
const Nav = () => {
  return (
    <div className={style.nav}>
      <Link to={"/home"}><button>Home</button></Link>
      <Link to={"/create"}><button>Form</button></Link>
      <SearchBar />
    </div>
  );
};

export default Nav;
