const $pokemonListing = document.querySelector<HTMLUListElement>(".pokemon-listing");

type Pokemon = {
    name: string,
    sprites: {
        front_default: string
    }
}

function capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

function addPokemonImage(object: Pokemon) {
    const pokeLi = document.createElement("li");
    pokeLi.innerHTML = `
        <a href="pokemon.html?pokemon=${object.name}"
            <figure>
                <img src="${object.sprites.front_default}" alt="${capitalizeFirstLetter(object.name)}" />
                <figcaption>${capitalizeFirstLetter(object.name)}</figcaption>
            </figure>
        </a>
    `
    $pokemonListing.append(pokeLi);
}

fetch("https://pokeapi.co/api/v2/pokemon/?limit=50")
    .then(response => response.json())
    .then(parsedResponse => {
        const pokeUrlArray = parsedResponse.results.map(pokeObject => pokeObject.url);
        const pokeFetches = pokeUrlArray.map(url => fetch(url).then(response => response.json()))
        return Promise.all(pokeFetches)
    }).then(responses => {
        responses.forEach(response => {
            addPokemonImage(response)
        })
    })
