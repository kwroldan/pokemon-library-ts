function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}
module.exports = capitalizeFirstLetter;

function addPokemonImage(object) {
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
function addName(name) {

}

function addImage ( url )
{
}

module.exports = addPokemonImage;