import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Button, Box } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      const initalRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1`
      );
      const initialData = await initalRes.json();
      const totalCount = initialData.count;

      const fullRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${totalCount}`
      );
      const fullData = await fullRes.json();
      const names = fullData.results.map(
        (pokemon) =>
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      );
      setOptions(names);
    };

    fetchAllPokemonNames();
  }, []);

  const handleSubmit = () => {
    if (searchText.trim()) {
      onSearch(searchText.trim().toLowerCase());
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <Autocomplete
        freeSolo
        options={options}
        inputValue={searchText}
        onInputChange={(event, newInputValue) => setSearchText(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Pokemon"
            variant="outlined"
            sx={{ width: "250px", "& .MuiInputBase-root": { height: "56px" } }}
          ></TextField>
        )}
      ></Autocomplete>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ height: "56px" }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
