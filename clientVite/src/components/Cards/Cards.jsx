import Card from "../Card/Card";
import { useEffect } from "react";

const Cards = ({pokemons, pokemonsArray}) => {
    useEffect(()=>{pokemonsArray()}, [])
    
  return (
    <div>
      {pokemons.map((pokemon) => {
        return (
          <Card
            id={pokemon.id}
            key={pokemon.id}
            name={pokemon.name}
            type={isNaN(pokemon.id)?pokemon.types:pokemon.type}
            image={pokemon.image}
          />
        );
      })}
    </div>
  );
};

export default Cards;
