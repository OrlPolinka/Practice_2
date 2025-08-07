EditingElement = null;

function AddItem(){
    let container = document.getElementById("TodoItemContainer");
    let input = document.getElementById("item")

    if(input.value.trim() == "") return;

    let AddButton = document.getElementById("addButton");

    if(EditingElement == null){

        let newItemDiv = document.createElement("div");
        newItemDiv.className = "todoItem";

        let newElem = document.createElement("span");
        newElem.textContent = input.value;
        

        let RedactButton = document.createElement("button");
        RedactButton.textContent = "✏️";
        RedactButton.onclick = function() {
            RedactItem(newElem);
        };

        let DeleteButton = document.createElement("button");
        DeleteButton.textContent = "❌";
        DeleteButton.onclick = function() {
            DeleteItem(newItemDiv);
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

        newItemDiv.appendChild(CheckBox);
        newItemDiv.appendChild(newElem);
        newItemDiv.appendChild(RedactButton);
        newItemDiv.appendChild(DeleteButton);

        container.appendChild(newItemDiv);
    }

    else{
        EditingElement.textContent = input.value;
        EditingElement = null;
    }


    input.value = "";
}

function RedactItem(Elem){
    let input = document.getElementById("item");
    input.value = Elem.textContent;
    EditingElement = Elem;
}

function DeleteItem(ItemDiv){
    ItemDiv.remove();
    let input = document.getElementById("item");
    input.value = "";

}