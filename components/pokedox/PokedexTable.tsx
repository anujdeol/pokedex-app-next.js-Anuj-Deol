"use client";

import { trpc } from "../../utils/   trpc";
import { Grid } from "@mui/material";
import PokemonRow from "./PokemonRow";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

interface PokedexTableProps {
  selectedType?: string;
  pokemonNames?: string[];
}

const PokedexTable: React.FC<PokedexTableProps> = ({
  selectedType,
  pokemonNames,
}) => {
  let query = trpc.pokemon.getByType.useQuery<Pokemon[]>(
    selectedType || "all",
    {
      enabled: !!selectedType,
    }
  );

  if (pokemonNames && pokemonNames.length > 0) {
    query = trpc.pokemon.getMany.useQuery(pokemonNames, {
      enabled: pokemonNames.length > 0,
    });
  }

  const { data, isLoading, error } = query;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  if (!data || data.length === 0) {
    return <p>No Pokemon found for the selected type or names.</p>;
  }

  return (
    <Grid container spacing={2}>
      {data.map((pokemon: Pokemon) => (
        <PokemonRow
          key={pokemon.id}
          name={pokemon.name}
          sprite={pokemon.sprite}
          types={pokemon.types}
          id={pokemon.id}
        />
      ))}
    </Grid>
  );
};

export default PokedexTable;
