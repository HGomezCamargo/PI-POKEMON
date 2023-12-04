import Card from "../Card/Card";
import style from "./cards.module.css"

const Cards = ({allPokemons}) => {
  if (!allPokemons.length) {
    return <div className='cargando'><h1>Cargando...</h1></div>;
  }
  return (

    <div className={style.cards}>
      {allPokemons.map((pokemon) => {
        return (
          <Card
            id={pokemon.id}
            key={pokemon.id}
            name={pokemon.name}
            type={pokemon.types}
            image={pokemon.image}
          />
        )
      })}
    </div>
  );
};

export default Cards;
