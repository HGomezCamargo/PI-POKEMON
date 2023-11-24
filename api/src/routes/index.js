const { Router } = require('express');
const { getPokemonById } = require('../controllers/getPokemonById')
const { getPokemons } = require('../controllers/getPokemons')
const { createPokemon } = require('../controllers/pokemons');
const { getTypes } = require('../controllers/getTypes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons/', getPokemons);
router.post('/pokemons', createPokemon)
router.get('/pokemons/:id', getPokemonById);
router.get('/types', getTypes)
module.exports = router;
