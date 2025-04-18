"use client";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

type PokemonTypeSelectionProps = {
  selectedType: string;
  selectType: (type: string) => void;
  types: string[];
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  selectedType,
  selectType,
  types,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Type</InputLabel>
      <Select
        value={selectedType}
        label="Type"
        onChange={(e) => selectType(e.target.value)}
      >
        {types.map((type) => (
          <MenuItem key={type} value={type}>
            {type === "all" ? "All" : type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PokemonTypeSelection;
