import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, changePage, getTypes, filterByType, restart, filterByApi, orderByName, orderByAttack } from "../../redux/action";

import Cards from "../../components/Cards/Cards";
import Nav from "../../components/Nav/nav";
import style from "./home.module.css"

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const currentPage = useSelector(state => state.currentPage);
  const types = useSelector(state => state.types);

  useEffect(() => {
    if(!allPokemons.length){
      dispatch(getPokemons(allPokemons));
    }
    if(!types.length){
      dispatch(getTypes())
    }
  }, []);

  const pagination = (event) => {
    dispatch(changePage(event.target.name))
  }

  const filterByPower = (event)=>{
    dispatch(filterByType(event.target.value))
  }
  const filterById = (event)=>{
    dispatch(filterByApi(event.target.value))
  }
  const sortByName = (event)=>{
    dispatch(orderByName(event.target.value))
  }
  const sortByAttack = (event)=>{
    dispatch(orderByAttack(event.target.value))
  }
  const reset = ()=>{
    dispatch(restart())  
  }
  console.log(allPokemons)
  return (
    <div className={style.home}>
      <Nav/>
      <div className={style.filters}>
        <button onClick={reset}>restart filters</button>
        <h4>Filters</h4>
        <div>
          <select name="filterByType" onChange={filterByPower}>
            <option value="default" key="default">default</option>
            {types.map(type => <option key={type.name} value={type.name}>{type.name}</option>)}
          </select>

          <select name="filterByApi" onChange={filterById}>
            <option value="default" key="default">default</option>
            <option value="id" key="Api">Api</option>
            <option value="uuid" key="Data_Base">Data Base</option>
          </select>
          
          <select name="sortByName" onChange={sortByName}>
            <option value="default" key="default">default</option>
            <option value="A-Z" key="A-Z">A-Z</option>
            <option value="Z-A" key="Z-A">Z-A</option>
          </select>

          <select name="sortByAttack" onChange={sortByAttack}>
            <option value="default" key="default">default</option>
            <option value="may" key="may">may first</option>
            <option value="min" key="min">min first</option>
          </select>
        </div>
      
      </div>
      <Cards allPokemons={allPokemons} />
      <div className={style.pagination}>
        <button onClick={pagination} name='prev'>{"<<"}</button>
        <p>{currentPage}</p>
        <button onClick={pagination} name='next'>{">>"}</button>
      </div>
    </div>
  );
};
export default Home;
