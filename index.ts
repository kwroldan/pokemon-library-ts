const $pokemonListing = document.querySelector<HTMLUListElement>(".pokemon-listing");
const $spinner = document.querySelector(".spinner");

type Pokemon = {
    name: string,
    sprites: {
        front_default: string
        back_default: string
    },
    abilities: AbilityURLs[]
}

type AbilityURLs = {
    url: string
}

type pokemonResults = {
    name: string,
    url: string
}

function capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

function addPokemonImage(pokemon: Pokemon) {
    const pokeLi = document.createElement("figure");
    pokeLi.innerHTML = `
        <a href="pokemon.html?pokemon=${pokemon.name}"
            <figure>
                <img src="${pokemon.sprites.front_default}" alt="${(capitalizeFirstLetter(pokemon.name))}" />
                <figcaption>${capitalizeFirstLetter(pokemon.name)}</figcaption>
            </figure>
        </a>
    `
    if ($pokemonListing != null) {
        $pokemonListing.append(pokeLi);
    }
}

fetch("https://pokeapi.co/api/v2/pokemon/?limit=50")
    .then(response => response.json())
    .then(parsedResponse => {
        const pokeUrlArray = parsedResponse.results.map((pokeObject: pokemonResults) => pokeObject.url);
        const pokeFetches = pokeUrlArray.map((url: string) => fetch(url).then(response => response.json()))
        return Promise.all(pokeFetches)
    }).then(responses => {
        responses.forEach(response => {
            addPokemonImage(response)
        })
        if ($spinner != null) {
            $spinner.classList.add("hidden")
        } else {
            throw new Error("Spinner is not currently defined")
        }
    })

export default {}