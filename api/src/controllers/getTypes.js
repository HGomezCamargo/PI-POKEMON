const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/type';
const {Type} = require('../db');

const getTypes = async (req, res) =>{
    try {
        const {data} = await axios(URL)
        
        const types = data.results
        
        types.forEach(async(el) => {
            await Type.findOrCreate({where:{name: el.name}})
        })
        
        return res.status(200).json(types);
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
};
module.exports = {getTypes};