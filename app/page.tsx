"use client";

import { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import PaginatedPokedex from "@/components/pokedox/PaginatedPokedex";
import SinglePokemonSearch from "@/components/pokedox/SinglePokemonSearch";
import FilterablePokedexTable from "../components/pokedox/FilterablePokedexTable";
import PokemonNameForm from "../components/pokedox/PokemonNameForm";
import PokedexTable from "@/components/pokedox/PokedexTable";

export default function Home() {
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);

  const handleSubmitPokemonNames = (names: string[]) => {
    setPokemonNames(names);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: "background.default", minHeight: "100vh" }}
    >
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h3">Pokédex</Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          Search for Pokemon by type or name!
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Search by Pokemon Name:
        </Typography>
        <SinglePokemonSearch />
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Search by Multiple Pokemon Names:
        </Typography>
        <PokemonNameForm onSubmit={handleSubmitPokemonNames} />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Selected Pokemon:</Typography>
        <Typography>{pokemonNames.join(", ")}</Typography>
      </Box>

      {pokemonNames.length > 0 && (
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Pokemon List:
          </Typography>
          <PokedexTable pokemonNames={pokemonNames} />
        </Box>
      )}

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Filter by Pokemon Type:
        </Typography>
        <FilterablePokedexTable />
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Browse All Pokémon (Paginated)
        </Typography>
        <PaginatedPokedex />
      </Box>
    </Container>
  );
}
