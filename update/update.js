import validateName from "../name_regexp.js";
import validateDescription from "../desc_regexp.js";

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

    if(validateName(updatedName) === false){
        window.location.href = '../index.html';
         return false;
     }
     if(validateDescription(updatedDesc) === false){
         window.location.href = '../index.html';
         return false;
     }

    arr[taskindex].name = updatedName;
    arr[taskindex].desc = updatedDesc;
    arr[taskindex].status = updatedStatus;

    console.log(arr);
    localStorage.setItem("task",JSON.stringify(arr));
    window.location.href = '../index.html';

});

const useOldValuesButton = document.getElementById('useOldValuesButton');

useOldValuesButton.addEventListener('click', () => {
    
    nameInput.value = arr[taskindex].name;
    descInput.value = arr[taskindex].desc;
    statusInput.checked = arr[taskindex].status;
});