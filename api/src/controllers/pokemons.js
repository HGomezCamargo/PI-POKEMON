const {Pokemon, Type} = require('../db')

const createPokemon = async (req, res) =>{
    const {name, image, hp, attack, defense, speed, height, weight, typesId} = req.body;
    console.log(typesId);
    try {
        const pokemon = await Pokemon.create(
            {
                name,
                image,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
            });
            // console.log(typeArray)
            // await pokemon.setTypes(typeArray)    
        typesId.forEach(async(el)=>{
            const type = await Type.findByPk(el)
            await pokemon.setTypes(type)
            })
        return res.status(200).json(pokemon)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
};

module.exports = {createPokemon};