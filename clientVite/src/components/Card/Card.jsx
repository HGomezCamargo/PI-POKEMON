const Card = ({
    id,name,image,type
}) => {
    let strTypes = ""
    type.forEach((type)=>{strTypes += type.name + " "})

    return(
        <button>
            <div className="card">
                <img src= {image} alt={name} />
                <h3>{name}</h3>
                <h3>{strTypes}</h3>
            </div>
        </button>
    );
};

export default Card;