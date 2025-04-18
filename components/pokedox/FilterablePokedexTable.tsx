"use client";

import { useState } from "react";
import { trpc } from "../../utils/   trpc";
import PokemonTypeSelection from "./PokemonTypeSelection";
import PokedexTable from "./PokedexTable";

const FilterablePokedexTable = () => {
  const [selectedType, setSelectedType] = useState<string>("all");

  const {
    data: typesData,
    isLoading: isTypesLoading,
    error: typesError,
  } = trpc.pokemon.getTypes.useQuery();

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  if (isTypesLoading) return <p>Loading Pokemon types...</p>;
  if (typesError) return <p>Error fetching Pokemon types</p>;

  const allTypes = ["all", ...(typesData || [])];

  return (
    <div>
      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={handleTypeChange}
        types={allTypes}
      />
      <PokedexTable selectedType={selectedType} />
    </div>
  );
};

export default FilterablePokedexTable;
