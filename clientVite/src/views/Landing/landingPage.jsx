
import { Link } from "react-router-dom";
import style from "./landing.module.css"

const Landing = ()=>{
    
    return(
        <div className={style.landing}>
            <Link to="/home">
                <button className={style.landing_buttom}>Home</button>
            </Link>
            <h1 className={style.landing_text}>
                hola soy la landing no me molestes mostro
            </h1>
        </div>
    )
}

export default Landing;