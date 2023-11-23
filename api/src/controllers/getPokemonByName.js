const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemonByName = async(req, res) => {
    try {
        const {name} = req.query;
        const {data} = await axios(`${URL}/${name.toLowerCase()}`);
        
        if(data.id){

            const pokemon = {
                id: data.id,
                name: data.name,
                image: data['sprites']['other']['official-artwork'],
                hp: data.stats.find((el) => el.stat.name === 'hp').base_stat,
                attack: data.stats.find((el) => el.stat.name === 'attack').base_stat,
                defense: data.stats.find((el) => el.stat.name === 'defense').base_stat,
                speed: data.stats.find((el) => el.stat.name == 'speed').base_stat,
                height: data.height,
                weight: data.weight,

            };
            return res.status(200).json(pokemon)
        }
        return res.status(404).send("not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

module.exports = {getPokemonByName};
