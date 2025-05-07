const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")
const creatureName = document.getElementById("creature-name")
const creatureId = document.getElementById("creature-id")
const weight = document.getElementById("weight")
const height = document.getElementById("height")
const types = document.getElementById("types")
const hp = document.getElementById("hp")
const attack = document.getElementById("attack")
const defense = document.getElementById("defense")
const specialAttack = document.getElementById("special-attack")
const specialDefense = document.getElementById("special-defense")
const speed = document.getElementById("speed")
const specialName = document.getElementById("special-name")
const specialDescription = document.getElementById("special-description")

const typeColors = {
    FIRE: "rgb(255, 99, 71)",        
    WATER: "rgb(100, 149, 237)",     
    ROCK: "rgb(184, 134, 11)",       
    ELECTRIC: "rgb(255, 215, 0)",    
    DRAGON: "rgb(106, 90, 205)",     
    GRASS: "rgb(60, 179, 113)",      
    POISON: "rgb(148, 0, 211)",      
    ICE: "rgb(173, 216, 230)",       
    FAIRY: "rgb(255, 182, 193)",     
    GROUND: "rgb(210, 180, 140)",    
    FLYING: "rgb(135, 206, 235)",    
    BUG: "rgb(154, 205, 50)",        
    DARK: "rgb(47, 79, 79)",         
    PSYCHIC: "rgb(255, 105, 180)",   
    STEEL: "rgb(192, 192, 192)",     
    GHOST: "rgb(123, 104, 238)"      
  };
  

const fetchCreaturesFromAPI = async (url) => {
    try {
        const respose = await fetch(url)
        if (respose.ok) {
            const data = await respose.json()
            return data
        } else {
            throw new Error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

const searchCreature = async () => {
    const input = searchInput.value.trim().toLowerCase()

    let url = "https://rpg-creature-api.freecodecamp.rocks/api/creatures"
    const creatureList = await fetchCreaturesFromAPI(url)
    const isValid = creatureList.some(c => 
        c.name.toLowerCase() === input.toLowerCase() || String(c.id) === input
    )

    if (!isValid) {
        alert("Creature not found");
        return;
    }

    url = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${input}`
    const creature = await fetchCreaturesFromAPI(url)

    creatureName.textContent = creature.name.toUpperCase()
    creatureId.textContent = `#${creature.id}`
    weight.textContent = `Weight: ${creature.weight}`
    height.textContent = `Height: ${creature.height}`
    specialName.textContent = creature.special.name
    specialDescription.textContent = creature.special.description


    const hpStat = creature.stats.find(stat => stat.name === "hp")
    const attackStat = creature.stats.find(stat => stat.name === "attack")
    const defenseStat = creature.stats.find(stat => stat.name === "defense")
    const specialAttackStat = creature.stats.find(stat => stat.name === "special-attack")
    const specialDefenseStat = creature.stats.find(stat => stat.name === "special-defense")
    const speedStat = creature.stats.find(stat => stat.name === "speed")

    hp.textContent = hpStat?hpStat.base_stat:"N/A"
    attack.textContent = attackStat?attackStat.base_stat:"N/A"
    defense.textContent = defenseStat?defenseStat.base_stat:"N/A"
    specialAttack.textContent = specialAttackStat?specialAttackStat.base_stat:"N/A"
    specialDefense.textContent = specialDefenseStat?specialDefenseStat.base_stat:"N/A"
    speed.textContent = speedStat?speedStat.base_stat:"N/A"

    types.innerHTML = ""
    creature.types.forEach(type => {
        const typeElement = document.createElement("div")
        typeElement.style.padding = "5px 3px"
        typeElement.textContent = type.name.toUpperCase()
        typeElement.style.backgroundColor = typeColors[type.name.toUpperCase()]
        types.appendChild(typeElement)
    });

}

searchBtn.addEventListener("click", searchCreature)

searchInput.addEventListener("keydown", (e)=>{
    creatureName.textContent = ""
    creatureId.textContent = ""
    weight.textContent = ""
    height.textContent = ""
    types.textContent = ""
    hp.textContent = ""
    attack.textContent = ""
    defense.textContent = ""
    specialAttack.textContent = ""
    specialDefense.textContent = ""
    speed.textContent = ""
    specialName.textContent = ""
    specialDescription.textContent = ""

    if (e.key === "Enter") {
        searchBtn.click()
    }
})

