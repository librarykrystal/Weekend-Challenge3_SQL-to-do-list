// console.log('client.js TEST');

$(document).ready(onReady);

function onReady(){
    // console.log('f onReady TEST');
    $('#submitBtn').on('click', submitNewTask);
    // descentant selector for future buttons?  Each task should have COMPLETE and DELETE btn
    getTasks();
}

// console.log('Checkmarks: ✓✔︎✅☑︎');
let taskIn;

function submitNewTask(){
    // console.log('f submitNewTask TEST');
    taskIn = {
        title: $('#taskTitleIn').val(),
        details: $('#taskDetailsIn').val(),
        completed: 'n'
    };
    console.log('New Task:', taskIn);
    postTask(taskIn);
}

function postTask(taskIn){
    // console.log('f postTask TEST');
    $.ajax({
        method: "POST",
        url: "/tasks",
        data: taskIn
    }).then (function(response){
        console.log("f postTask response:", response);
    }).catch (function(error){
        console.log(error);
        alert("data not sent");
    });
    getTasks();
}


function getTasks(){
    console.log('f getTasks TEST');
    $.ajax({
        method: "GET",
        url: "/tasks",
    }).then(function (response){
        console.log("f getTasks resonse:", response);
    }).catch(function(error){
        alert(error);
    });
    appendTasks(response);
}

function appendTasks(allTasks){
    console.log('f appendTasks TEST');
    console.log('f appendTasks content:', allTasks);
    // write append loop
}