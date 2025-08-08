function addItem() {
    const inputElement = document.getElementById("itemInput");
    const item = inputElement.value.trim();

    if (item === "") {
        alert("Digite um item!");
        return;
    }

    let items = JSON.parse(localStorage.getItem("items")) || [];

    items.push(item);

    localStorage.setItem("items", JSON.stringify(items));

    inputElement.value = "";

    displayItems();
}

function displayItems() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const itemList = document.getElementById("itemList");

    itemList.innerHTML = "";

    items.forEach((item, index) => {
    const li = document.createElement("li");

    const textNode = document.createTextNode(item);
    li.appendChild(textNode);

    const actionsDiv = document.createElement("div");
    actionsDiv.style.display = 'flex';
    actionsDiv.style.alignItems = 'center';

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.onclick = () => editItem(index);

    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit");
    editButton.appendChild(editIcon);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.onclick = () => deleteItem(index);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt");
    deleteButton.appendChild(deleteIcon);

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    li.appendChild(actionsDiv);
    itemList.appendChild(li);
    });
}

function editItem(index) {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const newItem = prompt("Editar o item", items[index]);

    if (newItem !== null && newItem.trim() !== "") {
        items[index] = newItem.trim();
        localStorage.setItem("items", JSON.stringify(items));
        displayItems();
    }
}

function deleteItem(index) {
    if (confirm("Tem certeza que deseja excluir este item?")) {
        let items = JSON.parse(localStorage.getItem("items")) || [];
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
        displayItems();
    }
}

window.onload = displayItems;
