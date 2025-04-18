"use client";

import { useState } from "react";
import { trpc } from "../../utils/   trpc";
import PokedexTable from "./PokedexTable";

const MultiPokemonSearch = () => {
  const [input, setInput] = useState("");
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    const namesArray = input
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
    setPokemonNames(namesArray);
  };

  return (
    <div>
      <textarea
        rows={4}
        placeholder="Enter Pokemon names separated by commas"
        value={input}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleSearch}>Search</button>

      {pokemonNames.length > 0 && <PokedexTable pokemonNames={pokemonNames} />}
    </div>
  );
};

export default MultiPokemonSearch;
