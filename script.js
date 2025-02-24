let tasks = [];
let deletedTask = null;

// Load Sound Effect
const completeSound = new Audio("sounds.mp3");

// Event Listeners
document.getElementById("ADD").addEventListener("click", addTask);
document.getElementById("undobtn").addEventListener("click", undoDelete);
document.addEventListener("keydown", handleShortcuts);

function addTask() {
    const inputField = document.getElementById("inputid");
    const priority = document.getElementById("order").value;
    const taskText = inputField.value.trim();

    if (taskText === "") return;

    const task = { text: taskText, priority: priority, completed: false };
    tasks.push(task);
    renderTasks();
    inputField.value = "";
}

// Render Tasks Sorted by Priority
function renderTasks() {
    const taskList = document.getElementById("list");
    taskList.innerHTML = "";

    // Sort tasks (High > Medium > Low)
    tasks.sort((a, b) => ["High", "Medium", "Low"].indexOf(a.priority) - ["High", "Medium", "Low"].indexOf(b.priority));

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        
        // Add strikethrough for completed tasks
        li.style.textDecoration = task.completed ? "line-through" : "none";

        li.innerHTML = `${task.text} <span>[${task.priority}]</span> 
            <button class="complete-btn" onclick="markComplete(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>`;
        
        taskList.appendChild(li);
    });
}

// Mark Task as Completed
function markComplete(index) {
    tasks[index].completed = !tasks[index].completed; // Toggle completion
    completeSound.play(); // Play sound effect
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    deletedTask = tasks.splice(index, 1)[0]; // Save last deleted task
    renderTasks();
}

// Undo Last Deleted Task
function undoDelete() {
    if (deletedTask) {
        tasks.push(deletedTask);
        deletedTask = null;
        renderTasks();
    }
}

// Keyboard Shortcuts
function handleShortcuts(event) {
    if (event.ctrlKey && event.key === "n") { // Ctrl + N for New Task
        document.getElementById("inputid").focus();
        event.preventDefault();
    }
    if (event.ctrlKey && event.key === "d") { // Ctrl + D for Delete Last Task
        if (tasks.length > 0) {
            deleteTask(tasks.length - 1);
        }
        event.preventDefault();
    }
}
