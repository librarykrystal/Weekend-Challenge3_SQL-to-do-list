// console.log('client.js TEST');

$(document).ready(onReady);

function onReady(){
    console.log('f onReady TEST');
    $('#submitBtn').on('click', submitNewTask);
    $('#taskList').on('click', '.delete', deleteIt);
    $('#taskList').on("click", '.complete', completeIt);
    getTasks();
}

// console.log('Checkmarks: ✓✔︎✅☑︎');
let taskIn;

function submitNewTask(){
    console.log('f submitNewTask TEST');
    taskIn = {
        title: $('#taskTitleIn').val(),
        details: $('#taskDetailsIn').val(),
        completed: 'n'
    };
    console.log('New Task:', taskIn);
    postTask(taskIn);
}

function postTask(taskIn){
    console.log('f postTask TEST');
    $.ajax({
        method: 'POST',
        url: '/tasks',
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
    console.log('f getTasks TEST');
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
    console.log('f appendTasks content:', allTasks);
    $('#taskList').empty();
    for (let i = 0; i < allTasks.length; i++) {
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
        `)
    }
}

function completeIt(){
    console.log('f completeIt TEST');
    const id = $(this).parent().data('id');
    console.log('completeIt THIS ID:', id);
    // make visual representation on DOM change to reflect completion (CSS color or similar)
    // must also POST to database new value y for completed in table
    // then must trigger a new GET, which triggers a new APPEND
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