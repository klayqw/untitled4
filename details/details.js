const button = document.getElementById("back");
button.addEventListener("click", e => {
    window.location.href = '../untitled4/index.html';
})
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
                   <h2>Name: ${this.#name}</h2>
                    <p>Desc: ${this.#desc}</p>
                    <p>ID: ${this.#id}</p>   
                    <p>Date: ${formattedDate}</p>                
                    <p>Status: ${this.#status ? "Completed" : "Incomplete"}</p>                  
                `;

        return taskElement;
    }

}


const dataToLoad = JSON.parse(localStorage.getItem("task"));

const loadedTasks = dataToLoad.map(e => {
    let task = new Task(e.name,e.desc);
    task.setId = e.id;
    task.setStatus = e.status;
    task.setDate = e.date;
    return task;
});

const taskListContainer = document.getElementById("taskList");
taskListContainer.innerHTML = "";
loadedTasks.forEach(task => {
    taskListContainer.appendChild(task.createTaskElement());
});

