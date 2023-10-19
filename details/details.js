
const button = document.getElementById("back");
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');
const arr = JSON.parse(localStorage.getItem("task"));
const taskindex = arr.findIndex(task => task.id === taskId);

button.addEventListener("click", e => {
    window.location.href = '../untitled4/index.html';
})

console.log(taskindex);
console.log(arr);

const taskElement = document.createElement("div");
const formattedDate = new Date(arr[taskindex].date).toLocaleString();
console.log(arr[taskindex].name);
taskElement.innerHTML = `
                   <h2>Name: ${arr[taskindex].name}</h2>
                    <p>Desc: ${arr[taskindex].desc}</p>
                    <p>ID: ${arr[taskindex].id}</p>   
                    <p>Date: ${formattedDate}</p>                
                    <p>Status: ${arr[taskindex].status ? "Completed" : "Incomplete"}</p>                  
                `;

const taskListContainer = document.getElementById("taskList");
taskListContainer.innerHTML = "";
taskListContainer.appendChild(taskElement);
