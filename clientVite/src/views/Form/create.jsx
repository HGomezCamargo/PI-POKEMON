import style from "./create.module.css"
import Nav from "../../components/Nav/nav"
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getTypes, postPokemon, addPokemon } from "../../redux/action"


const validate = (pokemon) => {
  const errors = {};
  const regex = /^(https:\/\/www\.)?[^.]+(?:\.[^.]+)*(?:\.jpg|\.png)$/;
  console.log(pokemon)
  if(pokemon.name.length < 4) errors.name = "The name must be at least four characters long";
  if(pokemon.hp < 0) errors.hp = "Hp can't be negative"
  if(pokemon.hp == 0) errors.hp = "Hp can't be zero"
  if(pokemon.attack < 0) errors.attack = "Attack can't be negative"
  if(pokemon.attack == 0) errors.attack = "Attack can't be zero"
  if(pokemon.defense < 0) errors.defense = "Defense can't be negative"
  if(pokemon.defense == 0) errors.defense = "Defense can't be zero"
  if(!regex.test(pokemon.image)) errors.image = "The URL must end in .jpg or .png"
  if(!pokemon.typesId.length) errors.typesId = "You must choose at least one type"

  return errors;
};

let strTypes = ""
const Create = () => {
  
  const dispatch = useDispatch();
  const {types} = useSelector(state => state);
  
  useEffect(() => {
    if(!types.length){
      dispatch(getTypes())
    }
    
  }, []);
  const [errors, setErrors] = useState({});
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    typesId: [],
  })

  const handleChange = (event)=>{

    if(event.target.value === "---") return setPokemon({...pokemon})
    
    if(event.target.name === "name" || event.target.name === "image"){
      setPokemon({
        ...pokemon,
        [event.target.name]: event.target.value
      })
    }else{
      if(event.target.name === "typesId"){
        strTypes += types[parseInt(event.target.value) - 1].name + " "
        setPokemon({
          ...pokemon,
          typesId: [...pokemon.typesId, parseInt(event.target.value)]
        })
      }else{
        setPokemon({
          ...pokemon,
          [event.target.name]: parseInt(event.target.value)
        })
      }
    }
    
  };
  
  const handleSubmit = (event)=>{
    event.preventDefault();
    dispatch(postPokemon(pokemon)); 
    strTypes = ""
  };

  useEffect(() => {
    if(pokemon.name !== "" || pokemon !== ""){
      const pokemonValidated = validate(pokemon)
      setErrors(pokemonValidated)
    }
  }, [pokemon]);

  return (

    <div className={style.create}>
      {console.log(errors)}
      
      <Nav/>
      <div className={style.create_preview}>
        <div className={style.contain}>
          <h2>Create a Pokemon</h2>
          <div>
            <form className={style.form} onSubmit={handleSubmit}>
              <label htmlFor="">URL Image: </label>
              <input onChange={handleChange} name="image" type="text" />
              {errors.image && <p>{errors.image}</p>}
              
              <label htmlFor="">Name: </label>
              <input onChange={handleChange} name="name" type="text" />
              {errors.name && <p>{errors.name}</p>}

              <label htmlFor="">HP:</label>
              <input onChange={handleChange} name="hp" type="number" />
              {errors.hp && <p>{errors.hp}</p>}

              <label htmlFor="">Attack:</label>
              <input onChange={handleChange} name="attack" type="number" />
              {errors.attack && <p>{errors.attack}</p>}

              <label htmlFor="">Defense:</label>
              <input onChange={handleChange} name="defense" type="number" />
              {errors.defense && <p>{errors.defense}</p>}

              <label htmlFor="">Speed:</label>
              <input onChange={handleChange} name="speed" type="number" />
              {errors.speed && <p>{errors.speed}</p>}

              <label htmlFor="">Height:</label>
              <input onChange={handleChange} name="height" type="number" />
              {errors.height && <p>{errors.height}</p>}

              <label htmlFor="">Weight:</label>
              <input onChange={handleChange} name="weight" type="number" />
              {errors.weight && <p>{errors.weight}</p>}

              
              <label htmlFor="">Types: </label>             
              <select onChange={handleChange} name="typesId" id="">
                <option value={"---"}> --- </option>             
                {types.map((type, index) => <option key={type.name} value={index + 1}>{type.name}</option>)}
              </select>
              {errors.typesId && <p>{errors.typesId}</p>}

              <input type="submit" />
            </form>
          </div>
        </div>
          <div className={style.pokemon}>
            <img src={pokemon.image} alt={pokemon.name}/>
            <div className={style.stadistic}>
              <h3>Name: {pokemon.name}</h3>
              <h3>Hp: {pokemon.hp}</h3>
              <h3>Attack: {pokemon.attack}</h3>
              <h3>Defanse: {pokemon.defense}</h3>
              <h3>speed: {pokemon.speed}</h3>
              <h3>Height: {pokemon.height}</h3>
              <h3>Weight: {pokemon.weight}</h3>
              <h3>types: {strTypes}</h3>
          </div>
        </div>
      </div>
    </div>
    )
}
  
  export default Create