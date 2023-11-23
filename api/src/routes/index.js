const { Router } = require('express');
const {getPokemons} = require('../controllers/getPokemons')
const {getPokemonById} = require('../controllers/getPokemonById')
const {getPokemonByName} = require('../controllers/getPokemonByName')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons/name', getPokemonByName)
router.get('/pokemons/:id', getPokemonById);
router.get('/pokemons', getPokemons);

module.exports = router;
