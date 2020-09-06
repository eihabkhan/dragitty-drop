const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

let fastestCars = [
    "BUGATTI CHIRON SUPER SPORT 300+",
    "KOENIGSEGG AGERA RS",
    "HENNESSEY VENOM GT",
    "BUGATTI VEYRON SUPER SPORT",
    "BUGATTI CHIRON",
    "KOENIGSEGG AGERA R",
    "SSC ULTIMATE AERO",
    "BUGATTI VEYRON",
    "MCLAREN SPEEDTAIL",
    "SALEEN S7"
]

const listItems = [];

let dragStartIndex;



function createList() {
    // Insert List Items into DOM
    [...fastestCars]
        .map(a => ({value: a, sort: Math.random()}))
        .sort((a,b) => a.sort - b.sort)
        .map( a => a.value)
        .forEach((car, index) => {

            const listItem = document.createElement("li")
            listItem.setAttribute("data-index", index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="car-name">${car}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `

            listItems.push(listItem);
            draggableList.appendChild(listItem)
        });

}


createList();