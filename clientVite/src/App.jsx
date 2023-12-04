import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { addPokemon } from './redux/action';

import Landing from './views/Landing/landingPage';
import Home from './views/Home/Home';
import Details from './views/Detail/Detail';
import Create from './views/Form/create';

function App() {
  //const {allPokemons} = useSelector((state)=>state)


  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path="/" element={<Landing/>}/>
        <Route path='/detail/:name' element={<Details/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes> 
    </div>
  )
}

export default App;
