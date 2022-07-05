document.getElementById('issueInputForm').addEventListener('submit', saveTasks);

function saveTasks(e){
    let taskDesc = document.getElementById('issueDescriptionInput').value;
    let taskStatus = document.getElementById('issueStatusInput').value;
    let taskassignedTo = document.getElementById('issueAssignedToInput').value;
    let taskDueDate = document.getElementById('dueDate').value;
    let taskId = chance.guid();
    let tasksStatus = 'Open';

    let task = {
        id: taskId,
        description: taskDesc,
        taskSt: taskStatus,
        assignedTo: taskassignedTo,
        dueDate: taskDueDate,
        status: tasksStatus
    }

    if(localStorage.getItem('tasks') == null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    document.getElementById('issueInputForm').reques();

    fetchTasks();

    e.preventDefault();

}

function setStatusClosed(id){
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < tasks.length; i++){
        if(tasks[i].id ==id) {
            tasks[i].status = 'CLosed';
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    fetchTasks();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < tasks.length; i++){
        if(tasks[i].id ==id) {
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    fetchTasks();
}


function fetchTasks() {
   let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksList = document.getElementById('tasksList');

    tasksList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;
        let desc = tasks[i].description;
        let statusTask = tasks[i].statusTask;
        let assignedTo = tasks[i].assignedTo;
        let dueDate = tasks[i].dueDate;
        let status = tasks[i].status;

        tasksList.innerHTML += '<div class="well">'+
                                '<h6> Tasks Id: ' + id + '</h6>'+ 
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                
                                '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' + 
                                '<a href="#" onclick="setStatusClosed(\'' +id+ '\')" class="btn btn-warning">Close</a>'+
                                '<a href="#" onclick="deleteTask(\'' +id+ '\')" class="btn btn-danger">Delete</a>'+
                                '</div>';



    }
}
