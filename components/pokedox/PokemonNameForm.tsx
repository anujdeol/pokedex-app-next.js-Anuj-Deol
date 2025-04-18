"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface PokemonNameFormProps {
  onSubmit: (names: string[]) => void;
}

const PokemonNameForm: React.FC<PokemonNameFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>("");
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);

  const handleAddPokemon = () => {
    if (input && !pokemonNames.includes(input)) {
      setPokemonNames((prev) => [...prev, input]);
      setInput("");
    }
  };

  const handleSubmit = () => {
    if (pokemonNames.length > 0) {
      onSubmit(pokemonNames);
    }
  };

  return (
    <Box>
      <TextField
        label="Enter Pokemon Name"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ marginRight: 2 }}
      />
      <Button onClick={handleAddPokemon} variant="contained">
        Add Pokemon
      </Button>

      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Added Pokemon:</Typography>
        <Typography>{pokemonNames.join(", ")}</Typography>
      </Box>

      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Fetch Pokemon
      </Button>
    </Box>
  );
};

export default PokemonNameForm;
