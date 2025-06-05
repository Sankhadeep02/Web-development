import { MdOutlineCatchingPokemon } from "react-icons/md";
import { MdHdrStrong } from "react-icons/md";
import { GiButterfly } from "react-icons/gi";
import { GiPoisonBottle } from "react-icons/gi";
import { FaCampground } from "react-icons/fa";
import { GiStoneBlock } from "react-icons/gi";
import { FaBug } from "react-icons/fa";
import { FaGhost } from "react-icons/fa";
import { FaDrumSteelpan } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { MdGrass } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { GiPsychicWaves } from "react-icons/gi";
import { MdOutlineSevereCold } from "react-icons/md";
import { FaDragon } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { GiFairyWings } from "react-icons/gi";
import { SiStellar } from "react-icons/si";

export const typeColor = {
    grass: "#78C850",
    poison: "#A040A0",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0"
}

export const typeIcons = {
    "normal": <MdOutlineCatchingPokemon />,
    "fighting": <MdHdrStrong />, 
    "flying": <GiButterfly />, 
    "poison": <GiPoisonBottle />, 
    "ground": <FaCampground />, 
    "rock": <GiStoneBlock />, 
    "bug": <FaBug />, 
    "ghost": <FaGhost />, 
    "steel": <FaDrumSteelpan />, 
    "fire": <FaFire />, 
    "water": <IoWater />, 
    "grass": <MdGrass />, 
    "electric": <MdElectricBolt />, 
    "psychic": <GiPsychicWaves  />, 
    "ice": <MdOutlineSevereCold />, 
    "dragon": <FaDragon />, 
    "dark": <MdDarkMode />, 
    "fairy": <GiFairyWings />, 
    "stellar": <SiStellar />
}