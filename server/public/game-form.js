const container = document.querySelector("#genre-select-container")
const originalSelect = document.querySelector("#genre-select")
const addButton = document.querySelector("#add-genre")

addButton.addEventListener("click", () => {
    const anotherSelect = originalSelect.cloneNode(true);
    container.appendChild(anotherSelect);
})