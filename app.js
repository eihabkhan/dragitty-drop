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

        addListeners();

}

function addListeners() {
    const draggables = document.querySelectorAll(".draggable")
    const draggableItems = document.querySelectorAll(".draggable-list li")

    draggables.forEach(draggable => draggable.addEventListener("dragstart", dragStart))
    draggableItems.forEach(item => {
        item.addEventListener("dragover", dragOver)
        item.addEventListener("drop", dragDrop)
        item.addEventListener("dragenter", dragEnter)
        item.addEventListener("dragleave", dragLeave)
    })
}


function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index")
    console.log(dragStartIndex);
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute("data-index")
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove("over")
}

function dragEnter() {
    this.classList.add("over")
}

function dragLeave() {
    this.classList.remove("over")
}

function swapItems(startIndex, endIndex) {
    const item1 = listItems[endIndex].querySelector(".draggable");
    const item2 = listItems[startIndex].querySelector(".draggable");

    listItems[startIndex].appendChild(item1)
    listItems[endIndex].appendChild(item2)

}

function checkOrder() {
    listItems.forEach((item, index) => {
        const personName = item.querySelector(".draggable").innerText.trim();

        if(personName != fastestCars[index]) {
            item.classList.add("wrong")
        } else {
            item.classList.remove("wrong")
            item.classList.add("right")
        }
    });
}

createList();

checkBtn.addEventListener("click", checkOrder);