// import * as React from 'react';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { typeIcons, typeColor } from "../constants/typeMaps";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Chip,
  List,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Zoom from "@mui/material/Zoom";
import { InView, useInView } from "react-intersection-observer";

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [evolutionImage, setEvolutionImage] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const data1 = await res1.json();
        setPokemon(data1);

        const res2 = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${name}/`
        );
        const data2 = await res2.json();
        setSpecies(data2);

        const res3 = await fetch(data2.evolution_chain.url);
        const data3 = await res3.json();
        setEvolutionChain(data3);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon", error);
      }
    };

    fetchPokemon();
  }, [name]);

  useEffect(() => {
    const fetchEvolutionSpecies = async () => {
      const sequence = [];
      let current = evolutionChain?.chain;

      while (current) {
        try {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${current.species.name}`
          );
          const data = await res.json();
          sequence.push({
            img: data.sprites.other.dream_world.front_default,
            name: current.species.name,
          });
        } catch (error) {
          console.error("Couldn't fetch the image of the pokemon");
        }
        current = current.evolves_to?.[0];
      }
      setEvolutionImage(sequence);
    };

    if (evolutionChain?.chain) {
      fetchEvolutionSpecies();
      console.log("Evolution images of pokemons", evolutionImage);
    }
  }, [evolutionChain]);

  const navigate = useNavigate();

  if (loading || !pokemon || !species || !evolutionChain) {
    return <CircularProgress />;
  }

  const descriptionEntry = species.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );

  const getTypeGradient = () => {
    const colors = pokemon.types.map((t) => typeColor[t.type.name]);

    if (colors.length === 1) {
      return `linear-gradient(135deg, ${colors[0]}33, #ffffff)`;
    } else {
      return `linear-gradient(135deg, ${colors[0]}33, ${colors[1]}33, #ffffff)`;
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          paddingY: 4,
        }}
      >
        <Card
          sx={{
            padding: 3,
            borderRadius: 4,
            boxShadow: 6,
            background: getTypeGradient,
            width: "100%",
          }}
        >
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                {/* Left Column */}
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Typography>
                <img
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                  style={{ objectFit: "contain", maxWidth: "200px" }}
                ></img>
                <Box mt={2}>
                  {pokemon.types.map((t) => {
                    const type = t.type.name;
                    return (
                      <Chip
                        key={t.type.name}
                        icon={typeIcons[type]}
                        label={
                          t.type.name.charAt(0).toUpperCase() +
                          t.type.name.slice(1)
                        }
                        sx={{ m: 0.5, fontSize: "17px" }}
                      ></Chip>
                    );
                  })}
                </Box>
                <Typography>Height: {pokemon.height}</Typography>
                <Typography>Weight: {pokemon.weight}</Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                {/* Right Column */}
                <Typography variant="h6" mb={1}>
                  About
                </Typography>
                <Paper
                  elevation={1}
                  square={false}
                  sx={{
                    padding: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="body1">
                    {descriptionEntry?.flavor_text.replace(/\f/g, " ") ||
                      "No description available"}
                  </Typography>
                </Paper>
                <Typography variant="h6" mb={1}>
                  Ability
                </Typography>
                <Paper
                  elevation={1}
                  square={false}
                  sx={{
                    padding: "7px",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="body1" sx={{}}>
                    <ul>
                      {pokemon.abilities.map((a) => (
                        <li>
                          {a.ability.name.charAt(0).toUpperCase() +
                            a.ability.name.slice(1)}
                        </li>
                      ))}
                    </ul>
                  </Typography>
                </Paper>
                <Typography variant="h6" mb={1}>
                  Base Stats
                </Typography>
                <Paper
                  elevation={1}
                  square={false}
                  sx={{
                    padding: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Grid container spacing={2}>
                    {pokemon.stats.map((s) => (
                      <Grid item xs={4}>
                        <Typography variant="body1">
                          {s.stat.name.toUpperCase()}: {s.base_stat}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
                <Typography variant="h6" mb={1}>
                  Evolution
                </Typography>
                <Paper
                  elevation={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    padding: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {evolutionImage.map((evo, index) => (
                    <Zoom
                      in={InView}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <Box key={index} textAlign="center">
                        <img
                          src={evo.img}
                          alt={evo.name}
                          onClick={() => navigate(`/pokemon/${evo.name}`)}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "contain",
                            cursor: "pointer",
                          }}
                        ></img>
                      </Box>
                    </Zoom>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default PokemonDetail;
