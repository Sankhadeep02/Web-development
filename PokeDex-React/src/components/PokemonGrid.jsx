import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  Fab,
  Zoom,
  useScrollTrigger,
  Box,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "./PokemonCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const PAGE_LIMIT = 20;

const PokemonGrid = ({}) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);
  const [showScroll, setShowScroll] = useState(false);

  const fetchPokemonList = async () => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_LIMIT}&offset=${offset}`
    );
    const pokemonListData = await res.json();

    const detailedPromises = pokemonListData.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const pokemonDetails = await res.json();

      return {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        image: pokemonDetails.sprites.other.dream_world.front_default,
        type: pokemonDetails.types.map((t) => t.type.name),
      };
    });

    const newPokemonData = await Promise.all(detailedPromises);
    setPokemonList((prev) => [...prev, ...newPokemonData]);
    setOffset((prev) => prev + PAGE_LIMIT);

    if (!pokemonListData.next) {
      setHasMore(false);
    }
    isFetchingRef.current = false;
  };

  useEffect(() => {
    fetchPokemonList();

    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const filteredPokemonList = pokemonList.filter((pokemon) =>
  //   pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  // );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={pokemonList.length}
        next={fetchPokemonList}
        hasMore={hasMore}
        loader={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100px"
            width="100%"
          >
            <CircularProgress></CircularProgress>
          </Box>
        }
        endMessage={
          <Typography textAlign="center">🎉 All Pokémon loaded!</Typography>
        }
      >
        <Grid container justifyContent="center">
          {pokemonList.map((pokemon) => {
            // console.log(pokemon)
            return (
              <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
            );
          })}
        </Grid>
      </InfiniteScroll>

      <Zoom in={showScroll}>
        <Fab
          color="primary"
          size="small"
          onClick={handleScrollToTop}
          sx={{ position: "fixed", bottom: 40, right: 40, zIndex: 1000 }}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Zoom>
    </>
  );
};

export default PokemonGrid;
