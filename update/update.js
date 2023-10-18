
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');
const arr = JSON.parse(localStorage.getItem("task"));
const taskindex = arr.findIndex(task => task.id === taskId);

if(taskindex === -1){
    throw  Error("not");
}
const saveButton = document.getElementById('saveButton');
const nameInput = document.getElementById('editNameInput');
const descInput = document.getElementById('editDescInput');
const statusInput = document.getElementById('editStatusInput');

saveButton.addEventListener('click', () => {

    const updatedName = nameInput.value;
    const updatedDesc = descInput.value;
    const updatedStatus = statusInput.checked;


    arr[taskindex].name = updatedName;
    arr[taskindex].desc = updatedDesc;
    arr[taskindex].status = updatedStatus;

    console.log(arr);
    localStorage.setItem("task",JSON.stringify(arr));
    window.location.href = '../untitled4/index.html';

});