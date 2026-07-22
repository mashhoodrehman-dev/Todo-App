function handleSubmit(e) {
    e.preventDefault()

    const taskInput = e.target.elements.taskInput
    const task = taskInput.value

    let taskList = JSON.parse(localStorage.getItem("tasks")) || []

    if (editIndex !== null) {
        taskList[editIndex].task = task

        editIndex = null
    } else {
        const payload = {
            task,
            status: "Active",
        }

        taskList.push(payload)
    }

    localStorage.setItem("tasks", JSON.stringify(taskList))

    taskInput.value = ""

    showInTable()
}

const form = document.getElementById("todoForm")
form.addEventListener("submit", handleSubmit)

function showInTable() {

    const taskList = JSON.parse(localStorage.getItem("tasks"))
    const tableBody = document.querySelector("tbody")
    tableBody.innerHTML = ""
    taskList.forEach((item, index) => {
            const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.task}</td>
                <td>${item.status}</td>
                <td>
                    <button data-index="${index}" onclick="editTask(event)" class="btn btn-edit">Edit</button>
                    <button data-index="${index}" onclick="updateTask(event, 'Active')"  class="btn btn-process">Active</button>
                    <button data-index="${index}" onclick="updateTask(event, 'Completed')"  class="btn btn-complete">Complete</button>
                    <button data-index="${index}" onclick="updateTask(event, 'Delete')"  class="btn btn-delete">Delete</button>

                </td>
            </tr>
        `
        tableBody.innerHTML +=row
    });
}

showInTable()

function updateTask(e, status) {
    const index = e.target.dataset.index

    const taskList = JSON.parse(localStorage.getItem("tasks")) || []

    if(status === "Delete") {
        taskList.splice(index, 1)

    } else{
        taskList[index].status = status
    }

    localStorage.setItem("tasks", JSON.stringify(taskList))

    showInTable()
}

function editTask(e) {
    const index = e.target.dataset.index

    const taskList = JSON.parse(localStorage.getItem("tasks")) || []

    const taskInput = document.getElementById("taskInput")

    taskInput.value = taskList[index].task

    editIndex = index

    taskInput.focus()
}