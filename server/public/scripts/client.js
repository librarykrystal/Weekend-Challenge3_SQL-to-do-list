// console.log('client.js TEST');

$(document).ready(onReady);

function onReady(){
    console.log('f onReady TEST');
    $('#submitBtn').on('click', submitNewTask);
    $('#taskList').on('click', '.delete', deleteIt);
    // $('#').on("click", '.complete', completeIt);
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
        url: '/tasks',
    }).then(function (response){
        console.log("f getTasks resonse:", response);
        appendTasks(response);
    }).catch(function(error){
        console.log('GET Error:', error);
    });
    // At first, had call of append here, was causing CONSOLE ERRORS ('response is not defined')
    // Because 'response' is not global - is inside ajax, needed to call append within .then
}

function appendTasks(allTasks){
    console.log('f appendTasks TEST');
    console.log('f appendTasks content:', allTasks);
    $('#taskList').empty();
    // write append loop
    for(let item of allTasks){
        $('#taskList').append(`
            <br>
            <div class="taskDiv">
            <span class="title">${item.title}</span> - <span class="details">${item.details}</span>
            <br>
            <div class="buttonsDiv">
            <button class="complete">Mark Completed</button>
            <button class="delete">Delete</button>
            </div>
            </div>
        `)
    }
    // append must include new COMPLETE and DELETE buttons with IDs (within a new div? or just change text colo)
    // figure out what to append into that will be targeted in onReady handlers (HTML section with class?)
}

function completeIt(){
    console.log('f completeIt TEST');
    // make visual representation on DOM change to reflect completion (CSS color or similar)
    // must also POST to database new value y for completed in table
    // then must trigger a new GET, which triggers a new APPEND
}

function deleteIt(){
    console.log('f deleteIt TEST');
    // below is COPIED FROM CLASS NOTES:
    const id = $(this).parent().parent().data('id');
    $.ajax({
        type: 'DELETE',
        url: `/musicLibrary/${id}`
    }).then(function() {
        getSongs();
    }).catch(function(error) {
        console.log('Delete ERROR:', error);
    })
}