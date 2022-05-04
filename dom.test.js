
test( "addImage add figure with image and name of Pokemon to index.html", () =>
{
    document.body.innerHTML = `
        <main>
            <ul class="pokemon-listing"></ul>
        </main>
        `
require("./dom")

  const $pokemonListing = document.querySelector( ".pokemon-listing" );


    expect($pokemonListing).toHaveProperty()
} )



