//Funktionen tar ett datum som string och konverterar till ett date objekt, för att kunna jämföra.
function dateToString(date){
    var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    var year = date.getFullYear();
    return (year + "-" + month + "-" + day);
 }

 //Funktionen skapar en todo genom att lägga till en todo i arrayen med objekt, samt att lägga till en todo i DOMen. (Denna funktion blev lite väl stor tycker jag)
const createItem = function (item, date, category, id, checked) {
    let itemId = id;                    //Dessa två if block är endast här för att ta emot de förinlagda todos, eftersom de förinlagda todos inte får samma input
    if (itemId === undefined) {         //som de användarinlagda todos.
        itemId = Date.now();
    }
    let itemChecked;
    if (checked === undefined){
        itemChecked === false;
    } else itemChecked = checked;
    
    const itemObject = {name: item, id: itemId, date: date, category: category, checked: itemChecked};
    itemArray.push(itemObject);
    
    const list = document.querySelector(".toDoList");
    const newItem = document.createElement("div");
    newItem.classList.add("item", `${date}`, `${category}`);
    newItem.id = Number(itemObject.id);
    const topRow = document.createElement("div");
    topRow.classList.add("topRow");
    const bottomRow = document.createElement("div");
    bottomRow.classList.add("bottomRow");
    const newItemText = document.createElement("span");
    newItemText.classList.add("itemText");
    newItemText.innerHTML = item + compareDate(currentDate, date, item);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.id = Number(itemObject.id);
    checkbox.checked = itemChecked;
    if (checkbox.checked === true){
        newItem.classList.add("finished");
    }
    const lastDay = document.createElement("p")
    lastDay.innerHTML = date;
    lastDay.classList.add("lastDay")
    const itemCategory = document.createElement("p");
    itemCategory.innerHTML = category;
    itemCategory.classList.add ("category");
    const removeButton = document.createElement("button");
    removeButton.classList.add("itemRemoveButton");
    newItem.appendChild(topRow);
    newItem.appendChild(bottomRow);
    topRow.appendChild(newItemText);
    topRow.appendChild(checkbox);
    bottomRow.appendChild(lastDay);
    bottomRow.appendChild(itemCategory);
    bottomRow.appendChild(removeButton);
    list.appendChild(newItem);
}

//Funktionen körs när en checkbox ändras. Den ändrar datan i array objektet och ändrar DOMen för att visa ändringen av checkboxen.
const checkboxToggle = function (key){
    const itemId = Number(key);
    let arrayIndex;
    for (let i = 0; i < itemArray.length; i++){
        if (itemArray[i].id === itemId){
            arrayIndex = i;
        }
    }
    itemArray[arrayIndex].checked = !itemArray[arrayIndex].checked;

    const item = document.getElementById(`${itemId}`);
    if (itemArray[arrayIndex].checked){
        item.classList.add("finished");
    } else item.classList.remove("finished");
}

//Funktionen tar bort en todo ur array objektet och tar bort samma todo ur DOMen.
const deleteItem = function (id) {
    const itemId = Number(id);
    let arrayIndex;
    for (let i = 0; i < itemArray.length; i++){
        if (itemArray[i].id === itemId){
            arrayIndex = i;
        }
    }
    itemArray.splice(arrayIndex, 1);

    const item = document.getElementById(`${itemId}`);
    item.remove();
}

//Funktionen körs när filter textfältet ändras. Den kollar först om någon kategori är vald, och gömmer de todos som inte stämmer överens med kategorin eller textfältet.
const filterToDoText = function(category, filterText){
    const filteredArray = filterToDoCategory(category); 
    for (let i = 0; i < filteredArray.length; i++){
        let itemId = Number(filteredArray[i].id);
        const item = document.getElementById(`${itemId}`);
        let itemName = filteredArray[i].name.toLowerCase();
        if (!itemName.includes(filterText)){
            item.style.display = "none";
        } else item.style.display = "flex";
    }
}

//Funktionen tar en kategori och skapar en ny array med filter(). De todos som inte matchar kategorin göms, och den nya arrayen kan användas av textfältfiltret.
const filterToDoCategory = function(category){
    let itemId;
    if(category === "all"){
        
        for (let i = 0; i < itemArray.length; i++){
            itemId = itemArray[i].id;
            const items = document.getElementById(`${itemId}`);
            items.style.display = "flex";
        }
        return itemArray;
    } else {
        const filteredArray = itemArray.filter(function(items){
            return items.category === category;
        })
        for (let i = 0; i < filteredArray.length; i++){
            itemId = filteredArray[i].id;
            const item = document.getElementById(`${itemId}`);
            item.style.display = "flex";
        }
        
        for (let i = 0; i < itemArray.length; i++){
            itemId = itemArray[i].id;
            const item = document.getElementById(`${itemId}`);
            if (itemArray[i].category !== category){
                item.style.display = "none";
            }
        }
        return filteredArray;
    }
}

//Funktionen tar emot ett date objekt och en string i datum format och konverterar stringen till ett datum och jämför dessa datum. Om datumstringen är äldre än nuvarande datum så läggs en ikon till i DOMen.
const compareDate = function(currentDate, itemDateString) {
    const splitDateString = itemDateString.split("-");
    const convertDateString = new Date(splitDateString[0], splitDateString[1] - 1, splitDateString[2], 23);
    if (currentDate > convertDateString){
        return `&nbsp;<img src="warning.JPG" class="warning" height="25" width="25">`;
    } else return "";
}