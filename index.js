class Task{
    #id = "id" + Math.random().toString(16).slice(2);
    #name = "";
    #desc = "";
    #date = "";
    #status = false;

    constructor(name="",desc=""){

        this.#date = this.initdate();
        this.#name = name;
        this.#desc = desc;
        this.#status = false;
    }

    initdate(){
        return Date.now();
    }

    get getName(){
        return this.#name;
    }

    get getDesc(){
        return this.#desc;
    }

    get getId(){
        return this.#id;
    }

    get getStatus(){
        return this.#status;
    }

    get getDate(){
        return this.#date;
    }

    set setName(name){
        this.#name=name;
    }

    set setDate(date){
        this.#date=this.initdate();
    }

    set setDesc(desc){
        this.#desc=desc;
    }

    set setId(id){
        this.#id = id;
    }

    set setStatus(status){
        this.#status=status;
    }

    toPublicObject() {
        return {
            id: this.#id,
            name: this.#name,
            desc: this.#desc,
            date: this.#date,
            status: this.#status
        };
    }


    createTaskElement() {
        const taskElement = document.createElement("div");
        const formattedDate = new Date(this.#date).toLocaleString();
        console.log(this.#name);
        taskElement.innerHTML = `
                    <h2 class="taskName">Name: ${this.#name}</h2>                  
                    <p>Status: ${this.#status ? "Completed" : "Incomplete"}</p>
                    <button class="deleteTaskButton">Delete</button>
                    <button class="updateTaskButton">Update</button>
                    <label for="${this.#id}_status">Change Status:</label>
                    <select id="${this.#id}_status">
                          <option value="incomplete" ${!this.#status ? 'selected' : ''}>Unfinished</option>
                           <option value="completed" ${this.#status ? 'selected' : ''}>Finished</option>
                    </select>
                `;


        const deleteButton = taskElement.querySelector(".deleteTaskButton");
        const updateButton = taskElement.querySelector(".updateTaskButton");
        const statusSelect = taskElement.querySelector(`#${this.#id}_status`);

        deleteButton.addEventListener("click", () => {
            arrTask.deleteTask(this);
            taskElement.remove();
        });

        updateButton.addEventListener("click", () => {
            window.location.href = `/update/update.html?id=${this.#id}`;
            arrTask.updateArr();
        });

        statusSelect.addEventListener("change", () => {
            const newStatus = statusSelect.value === "completed";
            this.setStatus = newStatus;
            arrTask.updateTaskStatus(this,newStatus);
            taskElement.querySelector("p:nth-child(2)").textContent = `Status: ${newStatus ? "Completed" : "Incomplete"}`;
        });

        const taskName = taskElement.querySelector(".taskName");

        taskName.addEventListener("dblclick", () => {
            window.location.href = `/details/details.html`;

        });

        return taskElement;
    }

}

class TaskList{
    #arr = [];

    constructor([]){
        this.#arr =  this.loadfromLocalStorage() ?? [];
    }

    set Arr(arr){
        this.#arr = arr;
    }
    addTask(task = new Task()){
        this.#arr.push(task);
        this.updateHtmlCode();
        this.saveLocalStorage();
    }

    deleteTask(task = new Task()){
        let index = this.#arr.findIndex(e => e.getId === task.getId);
        this.#arr.splice(index,1);
        this.saveLocalStorage();
    }

    updateTask(task){
        let index = this.#arr.findIndex(task.getId);
        this.#arr[index].setName = task.getName;
        this.#arr[index].setDesc = task.getDesc;
        this.#arr[index].setDate = Date.now();
        this.#arr[index].setStatus = task.getStatus;
        this.saveLocalStorage();
    }

    updateTaskStatus(task,status){
        let index = this.#arr.findIndex(e => e.getId === task.getId);
        this.#arr[index].setStatus = status;
        this.saveLocalStorage();
    }

    updateHtmlCode(tasks = this.#arr){
        const taskListContainer = document.getElementById("taskList");
        taskListContainer.innerHTML = "";
        tasks.forEach(task => {
            taskListContainer.appendChild(task.createTaskElement());
        });
    }

    get Arr(){
        return this.#arr;
    }

    updateArr(){
        const arrfromlocalstorage = loadfromLocalStorage()
        this.#arr = arr;
        this.updateHtmlCode();
    }

    loadfromLocalStorage(){
        if(localStorage.getItem("task") === null){
            return;
        }
        const dataToLoad = JSON.parse(localStorage.getItem("task"));
        console.log(dataToLoad);

        const loadedTasks = dataToLoad.map(e => {
            let task = new Task(e.name,e.desc);
            task.setId = e.id;
            task.setStatus = e.status;
            task.setDate = e.date;
            return task;
        });
        console.log(loadedTasks);
        return loadedTasks;
    }
    saveLocalStorage(){
        const arrpublic = [];
        this.#arr.forEach(e => arrpublic.push(e.toPublicObject()));
        localStorage.setItem("task",JSON.stringify(arrpublic));
    }

}

const arrTask = new TaskList([]);

const modal = document.getElementById("modal");
const taskForm = document.getElementById("task-form");
const addButton = document.getElementById("addTaskButton");
const cancel = document.getElementById("cancel");
const name = document.getElementById("name");
const desc = document.getElementById("description");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");


function updateFilteredAndSortedTasks() {
    const filterValue = filter.value;
    const sortValue = sort.value;

    let sortedTasks = [...arrTask.Arr];

    if (sortValue === "date") {
        sortedTasks.sort((a, b) => b.getDate - a.getDate);
    } else if (sortValue === "name") {
        sortedTasks.sort((a, b) => a.getName.localeCompare(b.getName));
    }

    let filteredTasks = sortedTasks;

    if (filterValue === "completed") {
        filteredTasks = filteredTasks.filter(task => task.getStatus);
    } else if (filterValue === "incomplete") {
        filteredTasks = filteredTasks.filter(task => !task.getStatus);
    }

    arrTask.updateHtmlCode(filteredTasks);

}
filter.addEventListener("change",updateFilteredAndSortedTasks)

sort.addEventListener("change",updateFilteredAndSortedTasks)


addButton.addEventListener("click", e => {
    name.value = "";
    desc.value = "";
    modal.style.display = "block";
})

cancel.addEventListener("click", e => {
    name.value = " ";
    desc.value = " ";
    modal.style.display = "none";
})
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    arrTask.addTask(new Task(name.value,desc.value));
});


arrTask.updateHtmlCode();
export default arrTask;
