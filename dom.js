export function addNameAndImage(name, url){
    const pokeFigure = document.createElement("figure");
    pokeFigure.innerHTML = `
        <img src="${url}" alt = "${name}" />
        <figcaption>${name}</figcaption>
    `
    pokeListing.append(pokeFigure)
}