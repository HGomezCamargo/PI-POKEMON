import "./card.css"
import { Link } from "react-router-dom";
import style from "./card.module.css"
const Card = ({
    id,name,image,type
}) => {
    let strTypes = ""
    type.forEach((type)=>{strTypes += type.name + " "})

    return(
        <Link to = {`/detail/${name}`} className={style.link}>
            <button>
                <div className={style.card}>
                    <img src= {image} alt={name} />
                    <h3>{name}</h3>
                    <h3>{strTypes}</h3>
                </div>
            </button>
        </Link>
    );
};

export default Card;