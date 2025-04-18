"use client";

import { useState } from "react";
import { trpc } from "@/utils/   trpc";
import { Box, Button, Typography } from "@mui/material";
import PokemonRow from "./PokemonRow";

const PAGE_SIZE = 10;

const PaginatedPokedex = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = trpc.pokemon.getPaginated.useQuery({
    page,
    pageSize: PAGE_SIZE,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading Pokémon.</p>;

  const totalPages = Math.ceil(data.totalCount / PAGE_SIZE);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}></Typography>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {data.pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{
              flex: "1 0 21%",
              minWidth: "200px",
            }}
          >
            <PokemonRow {...pokemon} />
          </div>
        ))}
      </div>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>

        <Typography sx={{ mx: 2 }}>
          Page {page} of {totalPages}
        </Typography>

        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PaginatedPokedex;
