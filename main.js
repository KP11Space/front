document.addEventlistener('DOMContentLoaded', function(){         
     const imgTaskAdd = document.getElementById("img-post-task")
     imgTaskAdd.addEventlistener('click', function(){
        createTask
     })
     getTasks()
     getTasks()
     //getTasks()
     //createtask("test", date.toISOString())
}, false)

const mockapiURL = "https://678d26c2f067bf9e24e97242.mockapi.io/task"
function getTasks(){
    fetch(mockapiURL, {
        method: 'GET',
        headers: {'content - type':'application/json'},
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).then(tasks => {
        conatainer.innerHTML = ''
        tasks.forEach(task => {
          const li = createElement(task["name"])
           container.appendChild(li)   
            
        });
        
    }).catch(error => {

    })
}
function createTask(){
    const inputTask = document.getElementById("input-post-task")
    var date = new Date();
    const newTask = {
        name: inputTask.value,
        is_complated: false,
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
        createElementAndApppendChild(task["name"]) 
      }).catch(error => {
        
      })
}


