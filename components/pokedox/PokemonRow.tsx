"use client";

import { Box, Typography, Paper } from "@mui/material";

type PokemonRowProps = {
  name: string;
  sprite: string;
  types: string[];
  id: number;
};

const PokemonRow: React.FC<PokemonRowProps> = ({ name, sprite, types, id }) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}
    >
      <Box>
        <img src={sprite} alt={name} width={100} height={100} />
      </Box>
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">ID: {id}</Typography>
        <Typography variant="body2">Types: {types.join(", ")}</Typography>
      </Box>
    </Paper>
  );
};

export default PokemonRow;
