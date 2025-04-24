// let data = [];
let data = JSON.parse(localStorage.getItem("todos")) || [];
console.log(data);
let editId = null;

function addData() {
    const inputBox = document.getElementById("input-box");
    const todoText = inputBox.value.trim();
    console.log(todoText);

    if (todoText === "") {
        alert("Enter your todo");
        return;
    }

    const newData = {
        id: Date.now(),
        text: todoText,
        isSelected: false
    };
    console.log(newData);

    data.push(newData);
    updateStorage();
    renderData();
    inputBox.value = "";
}

function toggleComplete(id) {
    console.log(id);
    data = data.map(todo =>
        todo.id === id ? { ...todo, isSelected: !todo.isSelected } : todo
    );
    updateStorage();
    renderData();
}

function editToDo(id) {
    const todo = data.find(item => item.id === id);
    console.log(todo);
    document.getElementById("input-box").value = todo.text;
    document.getElementById("input-button").style.display = "none";
    document.getElementById("edit-button").style.display = "inline-block";
    editId = id;
}

function saveData() {
    const inputBox = document.getElementById("input-box");
    const newText = inputBox.value.trim();
    console.log(newText);
    if (newText === "" || editId === null) {
        return;
    }

    data = data.map(todo =>
        todo.id === editId ? { ...todo, text: newText } : todo
    );
    updateStorage();
    renderData();
    inputBox.value = "";
    document.getElementById("edit-button").style.display = "none";
    document.getElementById("input-button").style.display = "inline-block";
    editId = null;
}

let deleteId = null;
function deleteToDo(id) {
    console.log(id);
    deleteId = id;
    document.getElementById("confirm-popup").style.display = "flex";
}

document.getElementById("confirm-delete").addEventListener("click", () => {
    console.log(deleteId);
    data = data.filter(todo => todo.id !== deleteId);
    updateStorage();
    renderData();
    document.getElementById("confirm-popup").style.display = "none";
});

document.getElementById("cancel-delete").addEventListener("click", () => {

    deleteId = null;
    document.getElementById("confirm-popup").style.display = "none";
});

function updateStorage() {
    localStorage.setItem("todos", JSON.stringify(data));
    console.log(data);
}

function renderData() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";
    if (data.length === 0) {
        listContainer.innerHTML = `<img src="../golfMan.png" alt="Empty" /> <h1>Empty ...</h1>`;
        return;
    }

    data.forEach(todo => {
        console.log(todo);
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isSelected;
        checkbox.addEventListener("change", () => toggleComplete(todo.id));
        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.isSelected) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => editToDo(todo.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => deleteToDo(todo.id));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
    });
}

renderData();