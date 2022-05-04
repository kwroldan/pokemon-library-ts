import { array } from "yargs";

const queryString = new URLSearchParams(window.location.search)
const $pokemon = document.querySelector<HTMLDivElement>("#pokemon-detail");
const $spinner = document.querySelector<HTMLImageElement>(".spinner")
const pokeName = document.querySelector<HTMLHeadingElement>(".pokeName");
const pokeAbilityList = document.querySelector<HTMLUListElement>(".abilities-list");
type Pokemon = {
    name: string,
    sprites: {
      front_default: string
      back_default: string
    },
    abilities: AbilityURLs[]

}

type AbilityURLs = {
 url:string
}

type Ability = {
 effect_entries:AbilityEffectDescriptions[]
}

type AbilityEffectDescriptions = {
  language: {
   name: string,
  }
  short_effect: string
}

function changeTitle(pokemon:Pokemon){
    const title = document.querySelector<HTMLHeadElement>("title")
    title.textContent = capitalizeFirstLetter(pokemon.name)
}

function addPokemonImage(pokemon:Pokemon){
    const pokePics = document.querySelector("figure")
    pokePics.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <img src="${pokemon.sprites.back_default}" alt="${pokemon.name} from behind" />
    `
}

function displayPokemonName(pokemon:Pokemon){
    pokeName.textContent = capitalizeFirstLetter(pokemon.name)
}

function findEnglishLanguage(arrayOfObjects){
    const englishObject = arrayOfObjects.find(object => object.language.name === "en")
    return englishObject.short_effect
}

function createListItem(abilityDetailObject){
    const li = document.createElement("li")
    li.innerHTML = `
    <span class="ability-name">
        ${capitalizeFirstLetter(abilityDetailObject.name)}
    </span>
    <span class="ability-short-description">
        ${findEnglishLanguage(abilityDetailObject.effect_entries)}
    </span>
    `
    li.classList.add("ability-list-item")
    pokeAbilityList.append(li)
}

function changeBackgroundColor(pokemon){
    const typeBackground = document.querySelector(".type-background")
    typeBackground.classList.add(`${pokemon.types[0].type.name}`)
}

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => response.json())
    .then(parsedResponse => {
        changeTitle(parsedResponse)
        displayPokemonName(parsedResponse)
        addPokemonImage(parsedResponse)
        changeBackgroundColor(parsedResponse)
        // Get Ability Descriptions
        const abilities = parsedResponse.abilities.map(result => result.ability)
        const urls = abilities.map(object => object.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches).then(responses => {
            responses.forEach(response => createListItem(response))
            $spinner.classList.add("hidden")
        })
    })