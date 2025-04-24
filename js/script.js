let data = [];
let editId = null;

function addData() {
    const inputBox = document.getElementById("input-box");
    const todoText = inputBox.value.trim();

    if (todoText === "") {
        alert("Enter your todo");
        return;
    }

    const newData = {
        id: Date.now(),
        text: todoText,
        isSelected: false
    };

    data.push(newData);
    renderData();
    inputBox.value = "";
}

function toggleComplete(id) {
    data = data.map(todo => {
        if (todo.id === id) {
            return { ...todo, isSelected: !todo.isSelected };
        }
        return todo;
    });
    renderData();
}

function editToDo(id) {
    editId = id;
    const todo = data.find(item => item.id === id);
    const promptInput = document.getElementById("prompt-input");
    promptInput.value = todo.text;
    document.getElementById("custom-prompt").style.display = "flex";
}

function saveData() {
    const inputBox = document.getElementById("input-box");
    const newText = inputBox.value.trim();

    if (newText === "" || editId === null) return;

    data = data.map(todo => {
        if (todo.id === editId) {
            return { ...todo, text: newText };
        }
        return todo;
    });

    renderData();
    inputBox.value = "";
    editId = null;

    document.getElementById("save-button").style.display = "none";
    document.getElementById("input-button").style.display = "inline-block";
}

function deleteToDo(id) {
    data = data.filter(todo => todo.id !== id);
    renderData();
}

function renderData() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    data.forEach(todo => {
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

document.getElementById("apply-btn").addEventListener("click", () => {
    const newText = document.getElementById("prompt-input").value.trim();
    if (newText !== "") {
        const inputBox = document.getElementById("input-box");
        inputBox.value = newText;
        document.getElementById("save-button").style.display = "inline-block";
        document.getElementById("input-button").style.display = "none";
    }
    document.getElementById("custom-prompt").style.display = "none";
});

document.getElementById("cancel-btn").addEventListener("click", () => {
    document.getElementById("custom-prompt").style.display = "none";
    editId = null;
});
