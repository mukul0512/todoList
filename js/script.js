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
        completed: false
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
            const updated = { ...todo, completed: !todo.completed };
            console.log();
            return updated;
        }
        return todo;
    });
    renderData();
    console.log(data);
}

function renderData() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";
    console.log(data);

    data.forEach(todo => {
        console.log(todo);
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleComplete(todo.id));
        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}
