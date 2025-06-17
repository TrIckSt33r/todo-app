// selezione elementi DOM necessari

const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');


console.log('Elementi DOM selezionati:', {todoInput, addTodoBtn, todoList});

const LOCAL_STORAGE_KEY = 'Task';

const MAX_TASK_LENGTH = 100;

let tasks = [];

//caricamento localStorage nel array
function loadTasks() {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    } else {
        tasks = [];
    }
}


//salvataggio dell'array nel local storage
function savetask() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))

    console.log(localStorage.getItem(LOCAL_STORAGE_KEY));
}

// Funzione per disegnare le task sulla pagina
function renderTasks() {
    todoList.innerHTML = '';


    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        const textContainer = document.createElement('div');
        
        textContainer.classList.add('text-container');

        listItem.appendChild(textContainer);

        
        const taskText = document.createElement('p');

        taskText.classList.add('task-text');

        textContainer.appendChild(taskText);

        taskText.innerHTML = task.text;



        const completedButton = document.createElement('button');
        completedButton.classList.add('completed-button');
        completedButton.dataset.index = index;
        


        if (task.completed) {
            completedButton.classList.add('completed');
        }

        completedButton.addEventListener('click', completeTask);

        const actionDiv = document.createElement('div');
        actionDiv.classList.add('action-div')
        
        


        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
        deleteButton.classList = 'button-delete';
        deleteButton.dataset.index = index;
        deleteButton.addEventListener('click', removeTask);


        const editButton = document.createElement('button');
        editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>';
        editButton.classList = 'button-edit';
        editButton.dataset.index = index;
        editButton.addEventListener('click', editTask);
        






        listItem.appendChild(actionDiv);
        actionDiv.appendChild(completedButton);
        actionDiv.appendChild(editButton);
        actionDiv.appendChild(deleteButton);
        todoList.appendChild(listItem);
    } )
}


//funzione per modificare lo stato della task
function completeTask(event) {
    const index = parseInt(event.currentTarget.dataset.index);
    tasks[index].completed = !tasks[index].completed;

    savetask();
    renderTasks(); // Aggiorna la visualizzazione
}


// funzione per rimuovere la task
function removeTask(event) {
    const indexToRemove = parseInt(event.currentTarget.dataset.index);
    tasks.splice(indexToRemove, 1);
    savetask();
    renderTasks();
}



//funzione per modificare la task
function editTask(event) {
    const indexToEdit = parseInt(event.currentTarget.dataset.index);
    const oldText = tasks[indexToEdit].text;

    const newText = prompt('inserisci la nuova task', oldText);

    if(newText === "") {
        alert("il testo non puo essere vuoto");
        return;
    }

    tasks[indexToEdit].text = newText;

    savetask();
    renderTasks();
    
    
}






// funzione per aggiungere la task all' array
function addTask () {
    
    const taskText = todoInput.value.trim();

     if (taskText === '') {
        alert("Il testo della task non può essere vuoto.");
        return; 
    }

    if (taskText.length > MAX_TASK_LENGTH) {
        alert(`Il testo della task è troppo lungo! Massimo ${MAX_TASK_LENGTH} caratteri.`);
        return; 
    }

    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
    } ;

    savetask();
    renderTasks();
    console.log(tasks);

    todoInput.value = '';

}

todoInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        addTask();
    }
})




document.addEventListener('DOMContentLoaded', loadTasks);
document.addEventListener('DOMContentLoaded', renderTasks);

