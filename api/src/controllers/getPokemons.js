const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemons = async(req, res) => {
    try {   
        let pokemons = []
        for(let i = 1; i <= 40; i++){
            const {data} = await axios(`${URL}/${i}`);
            const type = data.types?.map((el)=>{return el.type})
            const pokemon = {
                id: data.id,
                name: data.name,
                image: data['sprites']['other']['official-artwork']['front_default'],
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: type,
            };
            pokemons.push(pokemon)
        }
        return res.status(200).json(pokemons)
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

module.exports = {getPokemons};
