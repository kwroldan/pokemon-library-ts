const capitalize = require("./functions")

test("capitalizes the first letter of bulbasaur to return Bulbasaur", () => {
    expect(capitalize("bulbasaur")).toBe("Bulbasaur")
})

test("addImage add figure with image and name of Pokemon to index.html", () => {
    document.body.innerHTML = `
        <main>
            <ul class="pokemon-listing"></ul>
        </main>
    `
    const addImage = require("./functions")

    const $pokemonListing = document.querySelector(".pokemon-listing");

    expect($pokemonListing).toHaveProperty()
})