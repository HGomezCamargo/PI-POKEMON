import {
  ADD_POKEMON,
  GET_POKEMONS,
  PAGINATION,
  GET_TYPES,
  FILTER_TYPE,
  RESET,
  SEARCH,
  API_DB,
  ORDER_NAME,
  ORDER_ATTACK,
} from "./action_types";

const initialState = {
  allPokemons: [],
  allPokemonsBackUp: [],
  types: [],
  pokemonsFiltered: [],
  sortedPokemons: [],
  currentPage: 0,
  filtered: false,
  sorted: false,
};

function reducer(state = initialState, action) {
  const ITEMS_PER_PAGE = 12;
  const NEXT = "next";
  const PREV = "prev";
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: [...action.payload].splice(0, ITEMS_PER_PAGE),
        allPokemonsBackUp: action.payload,
      };
    case ADD_POKEMON:
      if (
        state.allPokemonsBackUp.some(
          (pokemon) => pokemon.name === action.payload.name
        )
      ) {
        window.alert(`${action.payload.name} already exist`);
        return state;
      }
      return {
        ...state,
        allPokemonsBackUp: [...state.allPokemonsBackUp, action.payload],
        allPokemons:
          state.allPokemons.length < ITEMS_PER_PAGE
            ? [...state.allPokemons, action.payload]
            : state.allPokemons,
      };
    case PAGINATION:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const first_index =
        action.payload === NEXT
          ? next_page * ITEMS_PER_PAGE
          : prev_page * ITEMS_PER_PAGE;

      if (state.filtered) {
        if (
          action.payload === NEXT &&
          first_index >= state.pokemonsFiltered.length
        )
          return state;
        if (action.payload === PREV && prev_page < 0) return state;

        return {
          ...state,
          allPokemons: [...state.pokemonsFiltered].splice(
            first_index,
            ITEMS_PER_PAGE
          ),
          currentPage: action.payload === NEXT ? next_page : prev_page,
        };
      }

      if (state.sorted) {
        if (
          action.payload === NEXT &&
          first_index >= state.sortedPokemons.length
        )
          return state;
        if (action.payload === PREV && prev_page < 0) return state;

        return {
          ...state,
          allPokemons: [...state.sortedPokemons].splice(
            first_index,
            ITEMS_PER_PAGE
          ),
          currentPage: action.payload === NEXT ? next_page : prev_page,
        };
      }

      if (
        action.payload === NEXT &&
        first_index >= state.allPokemonsBackUp.length
      )
        return state;
      if (action.payload === PREV && prev_page < 0) return state;

      return {
        ...state,
        allPokemons: [...state.allPokemonsBackUp].splice(
          first_index,
          ITEMS_PER_PAGE
        ),
        currentPage: action.payload === NEXT ? next_page : prev_page,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case FILTER_TYPE:
      if (action.payload === "default") {
        return {
          ...state,
          filtered: false,
          allPokemons: [...state.allPokemonsBackUp].splice(0, ITEMS_PER_PAGE),
        };
      }
      return {
        ...state,
        allPokemons: state.sorted
          ? [...state.sortedPokemons]
              .filter((pokemon) =>
                pokemon.types.some((tipo) => tipo.name == action.payload)
              )
              .splice(0, ITEMS_PER_PAGE)
          : [...state.allPokemonsBackUp]
              .filter((pokemon) =>
                pokemon.types.some((tipo) => tipo.name == action.payload)
              )
              .splice(0, ITEMS_PER_PAGE),
        pokemonsFiltered: state.sorted
          ? [...state.sortedPokemons].filter((pokemon) =>
              pokemon.types.some((tipo) => tipo.name == action.payload)
            )
          : [...state.allPokemonsBackUp].filter((pokemon) =>
              pokemon.types.some((tipo) => tipo.name == action.payload)
            ),
        filtered: true,
        currentPage: 0,
      };
    case RESET:
      return {
        ...state,
        allPokemons: [...state.allPokemonsBackUp].splice(0, ITEMS_PER_PAGE),
        filtered: false,
        sorted: false,
        currentPage: 0,
      };
    case SEARCH:
      return {
        ...state,
        allPokemons: [...state.allPokemonsBackUp].filter(
          (pokemon) => pokemon.name === action.payload
        ),
      };
    case API_DB:
      if (action.payload === "default") {
        return {
          ...state,
          filtered: false,
          allPokemons: [...state.allPokemonsBackUp].splice(0, ITEMS_PER_PAGE),
        };
      }
      if (action.payload === "id") {
        return {
          ...state,
          allPokemons: [...state.allPokemonsBackUp]
            .filter((pokemon) => !isNaN(pokemon.id))
            .splice(0, ITEMS_PER_PAGE),
          pokemonsFiltered: [...state.allPokemonsBackUp].filter(
            (pokemon) => !isNaN(pokemon.id)
          ),
          filtered: true,
        };
      }
      if (action.payload === "uuid") {
        return {
          ...state,
          allPokemons: [...state.allPokemonsBackUp]
            .filter((pokemon) => isNaN(pokemon.id))
            .splice(0, ITEMS_PER_PAGE),
          pokemonsFiltered: [...state.allPokemonsBackUp].filter((pokemon) =>
            isNaN(pokemon.id)
          ),
          filtered: true,
        };
      }
    //------------------------------------------ORDENAMIENTOS POR NOMBRE Y ATAQUE --------------------------------------
    case ORDER_NAME:
      if (action.payload === "default") {
        return {
          ...state,
          currentPage: 0,
          allPokemons: [...state.allPokemonsBackUp].splice(0, ITEMS_PER_PAGE),
          sorted: false,
        };
      }
      if (action.payload === "A-Z") {
        return {
          ...state,
          sorted: true,
          currentPage: 0,
          allPokemons: [...state.allPokemonsBackUp]
            .sort((a, b) => {
              const nameA = a.name;
              const nameB = b.name;
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
            .splice(0, ITEMS_PER_PAGE),
          sortedPokemons: [...state.allPokemonsBackUp].sort((a, b) => {
            const nameA = a.name;
            const nameB = b.name;
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "Z-A") {
        return {
          ...state,
          currentPage: 0,
          sorted: true,
          allPokemons: [...state.allPokemonsBackUp]
            .sort((a, b) => {
              const nameA = a.name;
              const nameB = b.name;
              if (nameA > nameB) {
                return -1;
              }
              if (nameA < nameB) {
                return 1;
              }
              return 0;
            })
            .splice(0, ITEMS_PER_PAGE),
          sortedPokemons: [...state.allPokemonsBackUp].sort((a, b) => {
            const nameA = a.name;
            const nameB = b.name;
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            return 0;
          }),
        };
      }
    case ORDER_ATTACK:
      if (action.payload === "default") {
        return {
          ...state,
          currentPage: 0,
          allPokemons: [...state.allPokemonsBackUp].splice(0, ITEMS_PER_PAGE),
          sorted: false,
        };
      }
      if (action.payload === "min") {
        return {
          ...state,
          currentPage: 0,
          sorted: true,
          allPokemons: [...state.allPokemonsBackUp]
            .sort((a, b) => a.attack - b.attack)
            .splice(0, ITEMS_PER_PAGE),
          sortedPokemons: [...state.allPokemonsBackUp].sort(
            (a, b) => a.attack - b.attack
          ),
        };
      }
      if (action.payload === "may") {
        return {
          ...state,
          currentPage: 0,
          sorted: true,
          allPokemons: [...state.allPokemonsBackUp]
            .sort((a, b) => - a.attack + b.attack)
            .splice(0, ITEMS_PER_PAGE),
          sortedPokemons: [...state.allPokemonsBackUp].sort(
            (a, b) => - a.attack + b.attack
          ),
        };
      }
    default:
      return state;
      break;
  }
}
export default reducer;
