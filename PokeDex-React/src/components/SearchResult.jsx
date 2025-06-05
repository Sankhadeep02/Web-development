import React from "react";
import { Grid } from "@mui/material";
import PokemonCard from "./PokemonCard";

const SearchResult = ({ pokemon }) => {
  return (
    <Grid container justifyContent="center">
      <PokemonCard pokemon={pokemon}></PokemonCard>
    </Grid>
  );
};

export default SearchResult;
