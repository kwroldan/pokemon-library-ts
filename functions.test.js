const { capitalizeFirstLetter } = require("./functions")

test("capitalizes the first letter of bulbasaur to return Bulbasaur", () => {
    expect(capitalizeFirstLetter("bulbasaur")).toBe("Bulbasaur")
})