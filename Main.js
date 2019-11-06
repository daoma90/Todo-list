let itemArray = [];

const currentDate = new Date();
let currentDateString = dateToString(currentDate);

//Kallar funktionen för att skapa todos, för att lägga till 4 st förinlagda todos.
createItem("Win the lottery", "2019-01-24", "other", 0, false);
createItem("Finish todo-assignment", "2019-11-07", "school", 1, true);
createItem("Have some fun", "2019-11-16", "home", 2, false);
createItem("Go to the moon", "2090-06-15", "other", 3, false);

document.querySelector(".toDoDate").value = currentDateString;

//Lyssnar efter klick på submit knappen, och lägger till en todo med informationen som skrivits in av användaren.
let newToDoButton = document.querySelector(".inputForm");
newToDoButton.addEventListener("submit", function(event){
    event.preventDefault();
    const inputItem = document.querySelector(".toDo");
    const item = inputItem.value.trim();
    const inputDate = document.querySelector(".toDoDate");
    const date = inputDate.value.trim();
    const inputCategory = document.querySelector(".toDoCategory");
    const category = inputCategory.value.trim();
    if (item !== "" && date !== ""){
        createItem(item, date, category);
        inputItem.value = "";
        inputDate.value = currentDateString;
        inputItem.focus();
    }
})

//Lyssnar efter klick i todo-listan. Om ett klick görs på en checkbox så körs funktionen som ändrar checkbox. Om klicket görs på någon ta bort-knapp så kallar den ta bort funktionen istället.
const list = document.querySelector(".toDoList");
list.addEventListener("click", function(event){
    if (event.target.classList.contains("checkbox")){
        const itemKey = event.target.parentElement.parentElement.id;
        checkboxToggle(itemKey);
    }

    if (event.target.classList.contains("itemRemoveButton")){
        const itemKey = event.target.parentElement.parentElement.id;
        deleteItem(itemKey);
    }
})

//Lyssnar efter keyups, och kör filter funktionen varje gång en tangent trycks så att filtrering sker redan vid första bokstaven.
const filterText = document.querySelector(".filterText");
const filterRadioButtons = document.querySelectorAll(".radioButton");
filterText.addEventListener("keyup", function(event){
    event.preventDefault();
    let category;
    for (let i = 0; i < filterRadioButtons.length; i++){
        if (filterRadioButtons[i].checked === true){
            category = filterRadioButtons[i].value;
            break;
        }
    }
    const filterText = event.target.value.toLowerCase();
    filterToDoText(category, filterText);
})

//Lyssnar efter ändring i en checkbox. Om en checkbox ändras så körs funktionen som filtrerar på kategori.
const filterRadioForm = document.querySelector(".filterCategoryForm");
filterRadioForm.addEventListener("change", function(event){
    const category = event.target.value;
    filterToDoCategory(category);
    filterText.value = "";
})





