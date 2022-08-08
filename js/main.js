const buttonSearch = document.querySelector("#search");
const PokemonID = document.querySelector(".id");
const pokemonHP = document.querySelector(".hp");
const pokemonName = document.querySelector(".name");
const imagePokemons = document.querySelector(".pokemons");
const pokeInput = document.querySelector("#input");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const pokemonXP = document.querySelector(".xp");
const pokemonHeight = document.querySelector(".height");
const pokemonWeight = document.querySelector(".weight");
const statsPoke = document.querySelectorAll("h2");
const pokemonSpeed = document.querySelector(".speed");

async function getPokemons(pokemon) {
    const pokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (pokeAPI.status == 200) {
        const dados = await pokeAPI.json();
        return dados;
    }
}

let nextAndPrev = 1

async function renderPokemons(pokemon) {
    const dados = await getPokemons(pokemon);

    if (dados) {
        dados.stats.forEach((el) => {

            pokemonName.innerHTML = dados.name.toUpperCase();
            pokemonXP.innerHTML = dados.base_experience;

            pokemonHP.innerHTML = el.base_stat
            PokemonID.innerHTML = dados.id;
            pokemonHeight.innerHTML = dados.height + " dm";
            pokemonWeight.innerHTML = dados.weight + " hg";

            console.log(el)
        })

        imagePokemons.src = dados['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'];

        nextAndPrev = dados.id;
    }

    else {
        statsPoke.forEach((el) => {
            el.innerHTML = "0"
        })
        imagePokemons.style.borderRadius = '10%'
        imagePokemons.src = "https://c.tenor.com/ObbsyW_iyosAAAAC/pokemon-missing.gif"
        pokemonName.innerHTML = "Not found"
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
