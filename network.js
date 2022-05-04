import { addNameAndImage } from "./dom"

fetch("https://pokeapi.co/api/v2/pokemon")
    .then(response => response.json())
    .then(response => {
        addNameAndImage(response.name, response.sprites.front_default)
    })