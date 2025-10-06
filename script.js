const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

let tasks = [];

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    showTasks();
}

function showTasks() {
    taskList.innerHTML = '';
    
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="edit" onclick="editTask(${task.id})">Edit</button>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        taskList.appendChild(taskItem);
    }
}

function toggleTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }
    showTasks();
}

function editTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            const newText = prompt('Edit task:', tasks[i].text);
            if (newText && newText.trim() !== '') {
                tasks[i].text = newText.trim();
            }
            break;
        }
    }
    showTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    showTasks();
}

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});