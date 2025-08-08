EditingElement = null;

class Task{
    Id;
    Text;
    Status;

    constructor(text, status, id){
        this.Id = id;
        this.Status = status;
        this.Text = text;
    }
}

let Tasks = [];


let modal = document.getElementById("modal");
let modalContent = document.getElementById("modalContent");
let close = document.getElementById("close");

function openModal(task = null){
    modal.style.display = "block";
    let input = document.getElementById("item");
    let select = document.getElementById("select");
    if(task){
        input.value = task.Text;
        select.value = task.Status;
        EditingElement = task;
        document.getElementById("AddButton").textContent = "Изменить";
    }
    else{
        input.value = "";
        select.value = "";
        EditingElement = null;
        document.getElementById("AddButton").textContent = "Добавить";

    }
    
}

function closeModal(){
    modal.style.display = "none";
}


function AddItem(){
    let container = document.getElementById("TodoItemContainer");
    let input = document.getElementById("item");
    let select = document.getElementById("select");
    let AddButton = document.getElementById("AddButton");

    if(input.value.trim() == "" || select.value.trim() == "") return;

    if(AddButton.textContent == "Добавить"){

        let newTask = new Task(input.value, select.value, Tasks.length + 1);
        Tasks.push(newTask);

        let newItemDiv = document.createElement("div");
        newItemDiv.className = "todoItem";
        newItemDiv.setAttribute("dataId", newTask.Id);

        let newElem = document.createElement("p");
        newElem.className = "text";
        newElem.textContent = newTask.Text;

        let status = document.createElement("p");
        status.className = "status";
        status.textContent = newTask.Status;
        if(status.textContent == "Высокий"){
            status.style.backgroundColor = "rgba(238, 74, 74, 1)";
        } else if(status.textContent == "Средний"){
            status.style.backgroundColor = "rgba(247, 241, 74, 1)";
        } else {
            status.style.backgroundColor = "rgb(93, 192, 93)";
        }  
        

        let RedactButton = document.createElement("button");
        RedactButton.textContent = "✏️";
        RedactButton.className = "EditButton";
        RedactButton.onclick = function() {
            openModal(newTask);
        };

        let DeleteButton = document.createElement("button");
        DeleteButton.textContent = "❌";
        DeleteButton.className = "DeleteButton";

        DeleteButton.onclick = function() {
            DeleteItem(newItemDiv, newTask);
        };

        let CheckBox = document.createElement("input");
        CheckBox.type = "checkbox";
        CheckBox.className = "checkbox"
        CheckBox.onchange = function() {
            if(CheckBox.checked){
                newElem.style.textDecoration = "line-through";
            }
            else{
                newElem.style.textDecoration = "none";
            }
        }

        let CheckContainer = document.createElement("div");
        CheckContainer.appendChild(CheckBox);
        CheckContainer.appendChild(newElem);
        CheckContainer.className = "ContainerForFlex";

        let Buttons = document.createElement("div");
        Buttons.appendChild(RedactButton);
        Buttons.appendChild(DeleteButton);
        Buttons.className = "ContainerForFlex";


        newItemDiv.appendChild(CheckContainer);
        newItemDiv.appendChild(status);
        newItemDiv.appendChild(Buttons);

        container.appendChild(newItemDiv);
    }
    else{
        EditingElement.Text = input.value;
        EditingElement.Status = select.value;
        let taskDiv = document.querySelector(`.todoItem[dataId="${EditingElement.Id}"]`);
        if(taskDiv){
            taskDiv.querySelector(".text").textContent = EditingElement.Text;
            taskDiv.querySelector(".status").textContent = EditingElement.Status;
            
            if(taskDiv.querySelector(".status").textContent == "Высокий"){
                taskDiv.querySelector(".status").style.backgroundColor = "rgba(238, 74, 74, 1)";
            } else if(taskDiv.querySelector(".status").textContent == "Средний"){
                taskDiv.querySelector(".status").style.backgroundColor = "rgba(247, 241, 74, 1)";
            } else {
                taskDiv.querySelector(".status").style.backgroundColor = "rgb(93, 192, 93)";
            }  
        

        }
    }

    closeModal();
}


function DeleteItem(ItemDiv, task){
    ItemDiv.remove();
    Tasks = Tasks.filter(t => t.Id != task.Id);
}

document.getElementById("modal").addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        AddItem();
    }
});
