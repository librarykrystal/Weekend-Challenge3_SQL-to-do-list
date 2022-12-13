// console.log('client.js TEST');

$(document).ready(onReady);

function onReady(){
    // console.log('f onReady TEST');
    $('#submitBtn').on('click', submitNewTask);
    // descentant selector for future buttons?  Each task should have COMPLETE and DELETE btn
    getTasks();
}

// console.log('Checkmarks: ✓✔︎✅☑︎');
let newTask;

function submitNewTask(){
    console.log('f submitNewTask TEST');
    newTask = $('#taskInput').val();
    console.log('New Task:', newTask);
    postTask();
}

function postTask(){
    console.log('f postTask TEST');
    getTasks();
}

function getTasks(){
    console.log('f getTasks TEST');
    appendTasks();
}

function appendTasks(){
    console.log('f appendTasks TEST');
}