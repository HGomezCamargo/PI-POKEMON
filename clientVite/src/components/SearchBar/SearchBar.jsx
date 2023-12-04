import { useState } from "react";
import { addPokemon, search } from "../../redux/action";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <button
        onClick={() => {
          dispatch(addPokemon(name));
          setName("");
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          dispatch(search(name));
          setName("");
        }}
      >
        Search
      </button>
    </div>
  );
};
export default SearchBar;
