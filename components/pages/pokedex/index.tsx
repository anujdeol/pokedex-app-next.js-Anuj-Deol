import FilterablePokedexTable from "../../../components/pokedox/FilterablePokedexTable";
// src/pages/pokedex/index.tsx
import { Container } from "@mui/material";

const PokedexPage = () => {
  return (
    <Container>
      <h1>Pokedex</h1>
      <FilterablePokedexTable />
    </Container>
  );
};

export default PokedexPage;
