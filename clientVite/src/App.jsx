import './App.css'
import axios from 'axios';
import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Card from './components/Card/Card';
import Cards from './components/Cards/Cards';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const onSearch = async (name) => {
    try{
      const { data } = await axios(`http://localhost:3001/pokemons/?name=${name}`)
      console.log(data)
      if (data.id) {
        if (!pokemons.some((pokemon) => pokemon.name == data.name)) {
          setPokemons((oldPokes) => [data,...oldPokes]);
        } else {
          window.alert('¡Ya existe un Pokemon con este nombre!');
        }
      }  
    }catch(error){
      window.alert('¡No hay pokemons con ese nombre!')
    }
  }

  const pokemonsArray = async() => {
    try {
      const { data } = await axios('http://localhost:3001/pokemons')
      setPokemons(data)
    } catch (error) {
      window.alert('error al cargar pokemons')
    }
  }


  return (
    <div>
      {location.pathname !== "/" && <SearchBar onSearch={onSearch}/>}
      <Routes>
        <Route path='/home' element={<Cards pokemons={pokemons} pokemonsArray={pokemonsArray}/>}/>
      </Routes> 
    </div>
  )
}

export default App;
