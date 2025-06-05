import React from "react";
import { typeIcons, typeColor } from "../constants/typeMaps";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const getTypeGradient = () => {
    const colors = pokemon.type.map((t) => typeColor[t]);
    if (colors.length === 1) {
      return `linear-gradient(135deg, ${colors[0]}33, #ffffff)`;
    } else {
      return `linear-gradient(135deg, ${colors[0]}33, ${colors[1]}33, #ffffff)`;
    }
  };

  return (
    <Card
      sx={{ width: 200, m: 2, background: getTypeGradient }}
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      style={{ cursor: "pointer" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={140}
          image={pokemon.image}
          alt={pokemon.name}
          sx={{
            padding: "10px",
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>
          <Box mt={1}>
            {pokemon.type.map((type) => (
              <Chip
                key={type}
                icon={typeIcons[type]}
                label={type.charAt(0).toUpperCase() + type.slice(1)}
                size="small"
                sx={{ mr: 0.5 }}
              ></Chip>
            ))}
          </Box>
        </CardContent>{" "}
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
