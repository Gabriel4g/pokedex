const buttonSearch = document.querySelector("#search-pokemon");
const imagePokemons = document.querySelector(".image-pokemons");
const pokeInput = document.querySelector("#input-pokemon");
const nextButton = document.querySelector("#next-pokemon");
const prevButton = document.querySelector("#prev-pokemon");
const contentStatsPokemon = document.querySelector(".content-stats");
const namePokemon = document.querySelector(".name-pokemon");

async function getPokemons(pokemon) {
    const pokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (pokeAPI.status === 200) {
        const data = await pokeAPI.json();
        return data;
    }
}

let nextAndPrev = 1

async function renderPokemons(pokemon) {
    const data = await getPokemons(pokemon);
    
    if(data) {
        contentStatsPokemon.innerHTML = "";
        namePokemon.textContent = data.name.toUpperCase();
        const pokemonID = document.createElement("h1");
        contentStatsPokemon.appendChild(pokemonID);
        pokemonID.textContent = `ID: ${data.id}`;
        pokemonID.classList.add("style-powers-pokemon");

        for(let statsPower of data.stats) {
            const powerPokemons = document.createElement("h2");
            powerPokemons.textContent = `${statsPower.stat.name}: ${statsPower.base_stat}`;
            contentStatsPokemon.appendChild(powerPokemons);
            powerPokemons.classList.add("style-powers-pokemon");
        }

        imagePokemons.src = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'];

        nextAndPrev = data.id;
    }

    else {
        contentStatsPokemon.innerHTML = "";
        imagePokemons.style.borderRadius = '10%'
        imagePokemons.src = "https://c.tenor.com/ObbsyW_iyosAAAAC/pokemon-missing.gif"
        namePokemon.textContent = "Not found"
    }
}

buttonSearch.addEventListener("click", (e) => {
    e.preventDefault();

    renderPokemons(pokeInput.value.toLowerCase())
    pokeInput.value = ''

})

nextButton.addEventListener('click', () => {
    nextAndPrev += 1
    renderPokemons(nextAndPrev)
})

prevButton.addEventListener("click", () => {
    if (nextAndPrev > 1) {
        nextAndPrev -= 1
        renderPokemons(nextAndPrev)
    }

})

renderPokemons(nextAndPrev)
