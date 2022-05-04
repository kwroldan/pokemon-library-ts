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
    abilities: AbilityURLs[],
    types: TypeCategory[]
}

type AbilityURLs = {
    url: string
}

type TypeCategory = {
    type: {
        name: string
    }
}

type Ability = {
    effect_entries: AbilityEffectDescriptions[],
    name: string,
}

type AbilityEffectDescriptions = {
    language: {
        name: string,
    }
    short_effect: string
}

type GeneralAbilityObject = {
    ability: {
        name: string,
        url: string
    }
}

type SingleAbility = {
    name: string,
    url: string,
}

function pleaseCapitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

function changeTitle(pokemon: Pokemon) {
    const title = document.querySelector<HTMLHeadElement>("title")
    if (title != null) {
        title.textContent = pleaseCapitalizeFirstLetter(pokemon.name)
    } else {
        throw new Error("Container is not currently defined")
    }
}

function addPokemonFrontAndBackImage(pokemon: Pokemon) {
    const pokePics = document.querySelector("figure")
    if (pokePics != null) {
        pokePics.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <img src="${pokemon.sprites.back_default}" alt="${pokemon.name} from behind" />
        `
    } else {
        throw new Error("Container is not currently defined")
    }
}

function displayPokemonName(pokemon: Pokemon) {
    if (pokeName != null) {
        pokeName.textContent = pleaseCapitalizeFirstLetter(pokemon.name)
    } else {
        throw new Error("Container is not currently defined")
    }
}

function findEnglishLanguage(arrayOfObjects: AbilityEffectDescriptions[]) {
    const englishObject = arrayOfObjects.find(object => object.language.name === "en")
    if (englishObject != null) {
        return englishObject.short_effect
    } else {
        throw new Error("Container is not currently defined")
    }
}

function createListItem(abilityDetailObject: Ability) {
    const li = document.createElement("li")
    li.innerHTML = `
    <span class="ability-name">
        ${pleaseCapitalizeFirstLetter(abilityDetailObject.name)}
    </span>
    <span class="ability-short-description">
        ${findEnglishLanguage(abilityDetailObject.effect_entries)}
    </span>
    `
    li.classList.add("ability-list-item")
    if (pokeAbilityList != null) {
        pokeAbilityList.append(li)
    } else {
        throw new Error("Container is not currently defined")
    }
}

function changeBackgroundColor(pokemon: Pokemon) {
    const typeBackground = document.querySelector(".type-background")
    if (typeBackground != null) {
        typeBackground.classList.add(`${pokemon.types[0].type.name}`)
    } else {
        throw new Error("Could not find background")
    }
}

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => response.json())
    .then(parsedResponse => {
        changeTitle(parsedResponse)
        displayPokemonName(parsedResponse)
        addPokemonFrontAndBackImage(parsedResponse)
        changeBackgroundColor(parsedResponse)
        // Get Ability Descriptions
        const abilities = parsedResponse.abilities.map((abilityObject: GeneralAbilityObject) => abilityObject.ability)
        const urls = abilities.map((object: SingleAbility) => object.url)
        const fetches = urls.map((url: string) => fetch(url).then(response => response.json()))
        return Promise.all(fetches).then(responses => {
            responses.forEach(response => createListItem(response))
            if ($spinner != null) {
                $spinner.classList.add("hidden")
            } else {
                throw new Error("Spinner is not currently defined")
            }
        })
    })

export default {}