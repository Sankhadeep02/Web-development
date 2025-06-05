import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonGrid from "./components/PokemonGrid";
import {
  Box,
  Button,
  Container,
  getFormControlLabelUtilityClasses,
  Typography,
} from "@mui/material";
import PokemonDetail from "./components/PokemonDetail";
import SearchBar from "../src/components/SearchBar";
import SearchResult from "./components/SearchResult";
import pokeDexLogo from "../src/assets/header_img_1.png";

function App() {
  const [searchPokemon, setSearchPokemon] = useState(null);
  // const [searchText, setSearchText] = useState("");

  const handleSearch = async (name) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) {
        throw new Error("Not found");
      }
      const data = await res.json();
      setSearchPokemon({
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        type: data.types.map((t) => t.type.name),
      });
    } catch (error) {
      console.error("Pokemon not Found: ", error);
      setSearchPokemon(null);
    }
    console.log(searchPokemon);
  };

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/type/");
      const data = await res.json();
      // console.log(
      //   "All pokemon types are: ",
      //   data.results.map((t) => t.name)
      // );
    };
    fetchTypes();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              
              <Box display="flex" justifyContent="center" my={2}>
                <img
                  src={pokeDexLogo}
                  alt="Pokedex Logo"
                  style={{ height: 80, cursor: "pointer" }}
                  onClick={() => setSearchPokemon(null)}
                ></img>
              </Box>
              
              <SearchBar onSearch={handleSearch}></SearchBar>
              {searchPokemon ? (
                <>
                  <Box display="flex" justifyContent="center" my={2}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSearchPokemon(null);
                      }}
                    >
                      Back to all Pokemons
                    </Button>
                  </Box>
                  <SearchResult pokemon={searchPokemon}></SearchResult>
                </>
              ) : (
                <PokemonGrid></PokemonGrid>
              )}
              {/* <SearchBar searchText={searchText} setSearchText={setSearchText}></SearchBar>
              <PokemonGrid searchText={searchText}></PokemonGrid> */}
            </Container>
          }
        ></Route>

        <Route
          path="/pokemon/:name"
          element={<PokemonDetail></PokemonDetail>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
