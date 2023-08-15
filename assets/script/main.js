let taskInp = document.getElementById("taskInp")
let dateInp = document.getElementById("dateInp")
const form = document.getElementById("form")
const taskList = document.getElementById("taskList")
let taskIds ;
let taskEntries ;
function idEntries() {
    taskIds = parseInt(localStorage.getItem("taskId")) || 0;
    taskEntries = JSON.parse(localStorage.getItem("entries")) || [];
    if(taskEntries == '') {
        console.log('1')
        taskList.innerHTML = `<h1>No task yet</h1>`
    }else {
        console.log('2')
        let tasks = ''
        taskEntries.forEach(task => {
            tasks+= `
            <div class="wrapper">
            <div>
            <input data-id="${task.id}" type="checkbox" onchange="markDone(event,'${task.id}')" name="" id="" ${task.isDone ? "checked": ''} class="${task.isDone ? "disabled": ''}">
            </div>
            <div>
            <h2 class="${task.isDone ? "done": ''}">${task.taskTitle}</h2>
            <p class="${task.isDone ? "done": ''}">Date: ${task.taskDate}</p>
            </div>
            <div>
            <button data-id="${task.id}" onclick="deleteTask('${task.id}')"><span class="material-symbols-outlined">
            delete
            </span></button>
            </div>
            </div>
            `
        });
        taskList.innerHTML = tasks

    }
}
idEntries() 

form.addEventListener("submit",(e) => {
   
    e.preventDefault()
    if( taskInp.value == "" || dateInp.value == "") return;
    let taskObject = {
        taskTitle: taskInp.value,
        taskDate: dateInp.value,
        isDone: false,
        id: taskIds,
    }
    taskEntries.push(taskObject)
    localStorage.setItem("taskId",taskIds + 1)
    localStorage.setItem("entries",JSON.stringify(taskEntries))
    idEntries() 
    taskInp.value =''
    dateInp.value =''

})

function deleteTask(taskId) {
    taskEntries = JSON.parse(localStorage.getItem("entries"))
    let newTask = taskEntries.filter(task => {
        return parseInt(task.id) !== parseInt(taskId)
    })
    localStorage.setItem("entries",JSON.stringify(newTask))
    idEntries() 
}

function markDone(e , taskId) {
    const {checked} = e.target
    console.log(checked)
    taskEntries = JSON.parse(localStorage.getItem("entries"))

    let taskIndex = taskEntries.findIndex(task => {
        return parseInt(task.id) == parseInt(taskId)
    })
    taskEntries[taskIndex].isDone = checked

    localStorage.setItem("entries",JSON.stringify(taskEntries))
    idEntries()

}