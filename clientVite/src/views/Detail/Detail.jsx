import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./detail.module.css"
import Nav from "../../components/Nav/nav";

const Details = () => {
  const allPokemons = useSelector((state) => state.allPokemons);
  const {name} = useParams()
  const [pokemon, setPokemon] = useState({})
  let strTypes = ""
  
  useEffect(()=>{
    let result = allPokemons.filter((pokemon)=>{return pokemon.name === name})
    setPokemon(result[0])
  }, [name])

  if(!pokemon.id){
    return(
      <div> cargando </div>
    )
  }
  
  if(isNaN(pokemon.id)){
    pokemon.types.forEach((type)=>{strTypes += type.name + " "})
  }else{
    pokemon.types.forEach((type)=>{strTypes += type.name + " "})
  }
  
  return (
  <div className={style.detail}>
    <Nav/>
    <div className={style.pokemon}>
      <img src={pokemon.image} alt={pokemon.name}/>
      <div className={style.stadistic}>
        <h3>id: {pokemon.id}</h3>
        <h3>Name: {pokemon.name}</h3>
        <h3>Attack: {pokemon.attack}</h3>
        <h3>Defense: {pokemon.defense}</h3>
        <h3>Hp: {pokemon.hp}</h3>
        {!pokemon.speed == 0 && <h3>speed: {pokemon.speed}</h3>}
        {!pokemon.height == 0 && <h3>Height: {pokemon.height}</h3>}
        {!pokemon.weight == 0 && <h3>Weight: {pokemon.weight}</h3>}
        <h3>{strTypes}</h3>
        </div>
    </div>
  </div>
  );
};

export default Details;
