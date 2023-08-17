document.addEventListener("DOMContentLoaded", function() {
        const newTaskInput = document.getElementById("newTask");
        const addTaskButton = document.getElementById("addTask");
        const taskList = document.getElementById("taskList");
    
        function createTaskElement(taskText) {
            const taskElement = document.createElement("li");
            taskElement.innerHTML = `
                <input type="checkbox">
                <span>${taskText}</span>
                <input type="text" class="edit-task" value="${taskText}">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;
            return taskElement;
        }
    
        function addTask() {
            const taskText = newTaskInput.value.trim();
            if (taskText === "") return;
    
            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);
    
            newTaskInput.value = "";
        }
    
        function editTask(taskElement) {
            const taskTextElement = taskElement.querySelector("span");
            const editInput = taskElement.querySelector(".edit-task");
            const editButton = taskElement.querySelector(".edit-button");
    
            taskTextElement.style.display = "none";
            editInput.style.display = "inline-block";
            editInput.focus();
    
            editButton.textContent = "Save";
        }
    
        function saveTaskEdit(taskElement) {
            const taskTextElement = taskElement.querySelector("span");
            const editInput = taskElement.querySelector(".edit-task");
            const editButton = taskElement.querySelector(".edit-button");
    
            taskTextElement.textContent = editInput.value;
            taskTextElement.style.display = "inline";
            editInput.style.display = "none";
    
            editButton.textContent = "Edit";
        }
    
        function deleteTask(taskElement) {
            taskList.removeChild(taskElement);
        }
    
        function toggleComplete(taskElement) {
            taskElement.classList.toggle("completed");
        }
    
        addTaskButton.addEventListener("click", addTask);
    
        taskList.addEventListener("click", function(event) {
            const target = event.target;
            const taskElement = target.closest("li");
    
            if (!taskElement) return;
    
            if (target.classList.contains("edit-button")) {
                editTask(taskElement);
            } else if (target.classList.contains("delete-button")) {
                deleteTask(taskElement);
            } else if (target.type === "checkbox") {
                toggleComplete(taskElement);
            } else if (target.classList.contains("edit-task")) {
                saveTaskEdit(taskElement);
            }
        });
    
        newTaskInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                addTask();
            }
        });
    });
    