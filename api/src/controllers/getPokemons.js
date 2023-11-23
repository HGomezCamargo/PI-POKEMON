const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemons = async(req, res)=>{
    try{
        const {data} = await axios(URL);
        if(data.results.length){
            const pokemons = data.results
            return res.status(200).json(pokemons)
        };
    }
    catch(error){
        return res.status(500).send(error.message)
    };
};

module.exports = {getPokemons}