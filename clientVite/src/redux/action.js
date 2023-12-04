import axios from 'axios';
import { ADD_POKEMON, GET_POKEMONS, PAGINATION, GET_TYPES, FILTER_TYPE, RESET, SEARCH, API_DB, ORDER_NAME, ORDER_ATTACK } from './action_types';
const URL_BASE = 'http://localhost:3001/';

export const  getPokemons = () => {
    return async (dispatch) => {
        try{
            const { data } = await axios('http://localhost:3001/pokemons')
            dispatch({
                type: GET_POKEMONS,
                payload: data,
            });

        }catch(error){
            throw Error(error.message) 
        }
    }
};

export const addPokemon = (name)=>{
    return async (dispatch) => {
        try{
            const { data } = await axios(`http://localhost:3001/pokemons/name?name=${name}`)
            dispatch({
                type: ADD_POKEMON,
                payload: data
            });

        }catch(error){
            alert(`${name} dont't exist`)
        }
    }
};

export function changePage(order){ 
    return async function(dispatch){
        try {
        dispatch({
            type: PAGINATION,
            payload: order
        })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
};

export const  getTypes = () => {
    return async (dispatch) => {
        try{
            const { data } = await axios('http://localhost:3001/types')
            dispatch({
                type: GET_TYPES,
                payload: data,
            });

        }catch(error){
            throw Error(error.message) 
        }
    }
};

export const  filterByType = (order) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: FILTER_TYPE,
                payload: order,
            });

        }catch(error){
            throw Error(error.message) 
        }
    }
};

export function restart(){ 
    return async function(dispatch){
        try {
        dispatch({
            type: RESET
        })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
};

export function search(name){ 
    return async function(dispatch){
        try {
        dispatch({
            type: SEARCH,
            payload: name
        })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
};

export const  filterByApi = (order) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: API_DB,
                payload: order,
            });

        }catch(error){
            throw Error(error.message) 
        }
    }
};

export const  orderByName = (order) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: ORDER_NAME,
                payload: order,
            });

        }catch(error){
            throw Error(error.message) 
        }
    }
};
export const  orderByAttack = (order) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: ORDER_ATTACK,
                payload: order,
            });

        }catch(error){
            throw Error(error.message) 
        }
    }
};
