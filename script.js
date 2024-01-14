// Clock function
function updateClock() {
    const now = new Date();
    const clockDisplay = document.getElementById('clock-display');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Calculator functions
function setupCalculator() {
    const calculatorDisplay = document.getElementById('calculator-display');
    const calculatorButtons = document.querySelectorAll('.btn-calc');
    const btnEqual = document.getElementById('btn-equal');
    const btnClear = document.getElementById('btn-clear');

    let currentInput = '';
    let currentOperator = '';
    let shouldClearDisplay = false;

    function updateDisplay() {
        calculatorDisplay.value = currentInput || '0';
    }

    function handleButtonClick(value) {
        if (value === 'C') {
            currentInput = '';
            currentOperator = '';
        } else if (value === '=') {
            currentInput = eval(currentInput);
            currentOperator = '';
            shouldClearDisplay = true;
        } else {
            if (shouldClearDisplay) {
                currentInput = '';
                shouldClearDisplay = false;
            }
            currentInput += value;
        }
        updateDisplay();
    }

    calculatorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            handleButtonClick(btn.value);
        });
    });

    btnEqual.addEventListener('click', function() {
        handleButtonClick('=');
    });

    btnClear.addEventListener('click', function() {
        handleButtonClick('C');
    });

    updateDisplay();
}

// Calendar function
function updateCalendar() {
    const now = new Date();
    const calendarDisplay = document.getElementById('calendar-display');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    calendarDisplay.textContent = now.toLocaleDateString('en-US', options);
}

// To-Do List functions
function setupTodoList() {
    const taskList = document.getElementById('tasks');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = document.createElement('li');
            newTask.textContent = taskText;

            // Add a "Remove Task" button
            const removeTaskBtn = document.createElement('button');
            removeTaskBtn.textContent = 'Remove Task';
            removeTaskBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
            removeTaskBtn.addEventListener('click', function() {
                taskList.removeChild(newTask);
            });

            // Append the new task and the remove button to the task list
            newTask.appendChild(removeTaskBtn);
            taskList.appendChild(newTask);

            taskInput.value = '';
        }
    });
}

// Set up event listeners for tab changes
document.getElementById('todo-tab').addEventListener('click', function() {
    // Add functionality to load or initialize the to-do list
    setupTodoList();
});

document.getElementById('calculator-tab').addEventListener('click', function() {
    // Add functionality for the calculator tab
    setupCalculator();
});

document.getElementById('clock-tab').addEventListener('click', function() {
    updateClock(); // Initial clock update
    setInterval(updateClock, 1000); // Update clock every second
});

document.getElementById('calendar-tab').addEventListener('click', function() {
    updateCalendar(); // Initial calendar update
});

// Initial calendar update
updateCalendar();
// Initial clock update
updateClock();
setInterval(updateClock, 1000); // Update clock every second
