console.log('client.js TEST');

$(document).ready(onReady);

function onReady(){
    console.log('f onReady TEST');
    $('#submitBtn').on('click', submitNewTask);
}

// console.log('Checkmarks: ✓✔︎✅☑︎');
let newTask;

function submitNewTask(){
    console.log('f submitNewTask TEST');
    newTask = $('#taskInput').val();
    console.log('New Task:', newTask);
}