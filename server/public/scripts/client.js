// console.log('client.js TEST');

$(document).ready(onReady);

function onReady(){
    // console.log('f onReady TEST');
    $('#submitBtn').on('click', submitNewTask);
    $('#taskList').on('click', '.delete', deleteIt);
    $('#taskList').on("click", '.complete', completeIt);
    getTasks();
}

let taskIn;

function submitNewTask(){
    // console.log('f submitNewTask TEST');
    taskIn = {
        title: $('#taskTitleIn').val(),
        details: $('#taskDetailsIn').val(),
        completed: 'false'
    };
    console.log('New Task:', taskIn);
    postTask(taskIn);
    $('#taskTitleIn').val('');
    $('#taskDetailsIn').val('');
}

function postTask(taskIn){
    // console.log('f postTask TEST');
    $.ajax({
        method: 'POST',
        url: '/tasks_router',
        data: taskIn
    }).then (function(response){
        console.log("f postTask response:", response);
        getTasks();
    }).catch (function(error){
        console.log(error);
        alert("data not sent");
    });

}

function getTasks(){
    // console.log('f getTasks TEST');
    $.ajax({
        method: 'GET',
        url: '/tasks_router',
    }).then(function (response){
        console.log("f getTasks resonse:", response);
        appendTasks(response);
    }).catch(function(error){
        console.log('GET Error:', error);
    });
}


function appendTasks(allTasks){
    // console.log('f appendTasks TEST');
    // console.log('f appendTasks content:', allTasks);
    $('#taskList').empty();
    for (let i = 0; i < allTasks.length; i++) {
        if(allTasks[i].completed == true){
            $('#taskList').append(`
            <br>
            <div class="taskDiv">
            ✔︎ <span class="titleCompleted">${allTasks[i].title}</span>
            <br>
            <div class="buttonsDiv" data-id=${allTasks[i].id}>
            <button class="delete">Delete</button>
            </div>
            </div>
        `)
        } else {
        $('#taskList').append(`
            <br>
            <div class="taskDiv">
            <span class="title">${allTasks[i].title}</span> - 
            <span class="details">${allTasks[i].details}</span>
            <br>
            <div class="buttonsDiv" data-id=${allTasks[i].id}>
            <button class="complete">Mark Completed</button>
            <button class="delete">Delete</button>
            </div>
            </div>
        `)}
    }
}

// COMPLETE BUTTON PLAN:
// WRITE router.put, WRITE completeIt client function, EDIT append
// Append loop should check for (IF) completion status
// Use PUT update by "this id" with DATA that updates boolean value of completed to TRUE (y)
// If FALSE, append stays as-is
// IF TRUE:
// add a class that different CSS will apply to (greyed out title, no details, checkmark!)
// and include ONLY the delete button

function completeIt(){
    // console.log('f completeIt TEST');
    const id = $(this).parent().data('id');
    console.log('completeIt THIS ID:', id);
    $.ajax({
        type: 'PUT',
        url: `/tasks_router/completed/${id}`,
        data: {completed: 'true'}
    }).then(function() {
        getTasks();
    }).catch(function(error) {
        console.log('completeIt ajax PUT ERROR:', error);
    })
}

function deleteIt(){
    // console.log('f deleteIt TEST');
    const id = $(this).parent().data('id');
    console.log('deleteIt THIS ID:', id);
    $.ajax({
        type: 'DELETE',
        url: `/tasks_router/${id}`
    }).then(function() {
        getTasks();
    }).catch(function(error) {
        console.log('Delete ERROR:', error);
    })
}
