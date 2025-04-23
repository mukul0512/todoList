let data = [];

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
    renderData();
    inputBox.value = "";
    console.log(data);
}

function toggleComplete(id) {
    console.log(id);
    data = data.map(todo => {
        if (todo.id === id) {
            console.log(todo);
            const updated = { ...todo, isSelected: !todo.isSelected };
            console.log(updated);
            return updated;
        }
        return todo;
    });
    renderData();
    console.log(data);
}

function editToDo(id) {
    const todoToEdit = data.find(todo => todo.id === id);
    const newText = prompt("Edit your todo: ", todoToEdit.text);
    if (newText !== null) {
        const trimmed = newText.trim();
        if (trimmed !== "") {
            data = data.map(todo => {
                if (todo.id === id) {
                    return { ...todo, text: trimmed };
                }
                return todo;
            });
            renderData();
        }
    }
}

function renderData() {
    const listContainer = document.getElementById("list-container"); // ul k andar id diya hai
    listContainer.innerHTML = "";
    console.log(data);
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
        li.appendChild(checkbox);
        li.appendChild(span);
        listContainer.appendChild(li);
        li.appendChild(editBtn);
    });
}
