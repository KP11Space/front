document.addEventListener('DOMContentLoaded', function(){         
     const imgTaskAdd = document.getElementById("img-post-task")
     imgTaskAdd.addEventListener('click', function(){
        createTask()
     })
     getTasks()
     getTasks()
     //getTasks()
     //createtask("test", date.toISOString())
}, false)

const mockapiURL = "https://678d26c2f067bf9e24e97242.mockapi.io/task"
function getTasks(){
     const container = document.getElementById("task-container")
     
    fetch(mockapiURL, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).then(tasks => {
        container.innerHTML = ''
        tasks.forEach(task => {
          const taskName = task["name"]
         const li = document.createElement("li");
li.classList.add("task-item", "flex", "justify-between", "items-center", "my-5", "px-5", "py-3", "w-full", "text-fuchsia-950", "rounded-lg");
li.style.boxShadow = "inset 4px 4px 13px #C5CAE9";
li.style.fontFamily = "'ADLaM Display'";
li.style.fontWeight = "900";
li.innerHTML = `
    <span>${taskName}</span>
    <div class="flex gap-3">
        <img class="cursor-pointer duration-300 hover:scale-110" src="./Done.svg" alt=""> 
        <img class="cursor-pointer duration-300 hover:scale-110" src="./Edit.svg" alt="">
        <img class="cursor-pointer duration-300 hover:scale-110" src="./Trash.svg" alt="">
    </div>`
             container.appendChild(li)
    });
        
    }).catch(error => {

    })
}
const deleteIcons = document.querySelectorAll('.delete-task');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const taskId = this.getAttribute('data-id');
                deleteTask(taskId);
            });
        });
    }).catch(error => {
        console.error('Ошибка при получении задач:', error);
    })
}
function createTask(){
    const inputTask = document.getElementById("input-post-task")
    var date = new Date();
    const newTask = {
        name: inputTask.value,
        is_completed: false,
        created: date.toISOString()
      };
      
      fetch(mockapiURL, { method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newTask)
      }).then(res => {
        inputTask.value = ""
        if (res.ok) {
            return res.json();
        }
      }).then(task => {
        inputTask.value =  ""
        createElementAndAppendChild(task["name"]) 
      }).catch(error => {
        
      })
}
function deleteTask(taskId) {
    fetch(`${mockapiURL}/${taskId}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            getTasks(); 

