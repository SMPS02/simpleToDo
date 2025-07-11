//---------------------------------------------------------------
//VARIABLES GLOBALES
const taskContainer = document.getElementById("tasksContainer")
const taskCollector = document.getElementById("getTask")
const inputTask = document.getElementById("writeTask");
const container = document.getElementById("tasksContainerDiv")
const deleteLocalStorage = document.getElementById("deleteLocalStorage");

//Menu desplegable
const buttonMenu = document.getElementById("buttonMenu");
const menu = document.getElementById("menu")

 const buttonClose = document.getElementById("closeNav");
 const buttonOpen = document.getElementById("openNav");


//FUNCIONES
function taskCreator (task){

    
    taskContainer.innerHTML += 
    `<li class="listItem">
              
                <div class="normalSpace">
                    <div class="taskSpace">
                    <h2 class="task">
                        ${task}
                    </h2>
                    </div> 
                    <div class="doneOrNot">
                        <button class="notDone" id="done">
                            Not Done
                        </button>

                        <button class="editTask" id="edit">
                            Edit
                        </button>

                        <button class="deleteTask" id="delete">
                            Delete
                        </button>
                    </div>
                    </div>

                </li>`

}

function isThisKeyHere (key){

    for(let i = 0; i<localStorage.length; i++){

        if(key === localStorage.key(i)){
            return true;
        }
    }
    return false;
    
}

function getKey (key){

    for(let i = 0; i<localStorage.length; i++){

        if(key === localStorage.key(i)){
            return key;
        }
    }
    return "No se ha encontrado esta llave";
    
}

//EVENTOS
//Event to sweep the buttons done and not done
container.addEventListener("click", (e) =>{

    const li = e.target.closest("li")
     //--------------------------------------------------------------------------------       
    //Crear el elemento
    const taskEditor = document.createElement("input");
    taskEditor.className = "taskEditor"

     const saveButton = document.createElement("button");
    saveButton.textContent = "Editar"
    saveButton.className = "gettingtaskEdited"
    //--------------------------------------------------------------------------------


    //--------------------------------------------------------------------------------
    //Delete the task
    if(e.target.classList.contains("deleteTask")){
        let confirmation = false;
        let key = prompt("Ingresa la clave de este valor para eliminar");
        
        while (confirmation === false){
            if(isThisKeyHere(key)=== true){
            localStorage.removeItem(key);
            li.remove();
            confirmation = true;
            }else{

                key = prompt("Ingresa la clave de este valor para eliminar");

            }
        }
                
    }
    //--------------------------------------------------------------------------------



    //--------------------------------------------------------------------------------
    //Sweep through "done" and "not done" buttons
    if(e.target.classList.contains("notDone")){
        
        e.target.classList.toggle("done");
        e.target.classList.toggle("notDone");
    }else if(e.target.classList.contains("done")){

        e.target.classList.toggle("done");
        e.target.classList.toggle("notDone");
    }
    if(e.target.classList.contains("notDone")){
        
        e.target.textContent = "Not done"
    }else if(e.target.classList.contains("done")){

        e.target.textContent = "Done"
    }
    //--------------------------------------------------------------------------------



    //--------------------------------------------------------------------------------
    //Create Editon elements
    if(e.target.classList.contains("editTask")){

        const eButton = li.querySelector(".gettingtaskEdited")
        const eInput = li.querySelector(".taskEditor")
        const task = li.querySelector(".task");
      
        if(eButton && eInput){
            eButton.remove();
            eInput.remove();
            li.style.height = ""
        }else{

            const taskEditor = document.createElement("input");
            taskEditor.className = "taskEditor"
            taskEditor.value = task.textContent.trim();

            const saveButton = document.createElement("button");
            saveButton.textContent = "Editar"
            saveButton.className = "gettingtaskEdited"

            li.append(taskEditor);
            li.append(saveButton);
            li.style.height = "150px"
            taskEditor.style.height = "100px"
        
        }
     
        

       
    }
    //--------------------------------------------------------------------------------
    //Save task and delete Edition Elements
    if(e.target.classList.contains("gettingtaskEdited")){

        let confirmation = false;
        let key = prompt("Ingrese la llave de esta tarea");

        while(confirmation === false){
        if(isThisKeyHere(key)===true){
        const taskText = li.querySelector(".task");
        const editedTask = li.querySelector(".taskEditor");
        const saveButton = li.querySelector(".gettingtaskEdited");

        const claveAnterior = prompt("Ingrese la clave de esta tarea");
        localStorage.removeItem(claveAnterior);
        const claveNueva = prompt("Ingrese una nueva clave para este nuevo elemento");
        if(taskText && editedTask.value != ""){
            taskText.textContent = editedTask.value;
        }
        localStorage.setItem(taskText.textContent, claveNueva);
        saveButton.remove();
        editedTask.remove();
        li.style.height = "";
        confirmation = true;
        }else{
            key = prompt("Ingrese la llave de esta tarea");
            }
        }
        
    }
    //--------------------------------------------------------------------------------
    
})

//Event to draw the task on the HTML document
taskCollector.addEventListener("click", (e) => {

    if(inputTask.value === ""){

        alert("You must write someting");
    }
    else{

    let confirmation = false;
    const task = inputTask.value;
    
    let clave = prompt("Ingrese una llave para este valor");
    while(confirmation===false){
        if(isThisKeyHere(clave) === true){
            confirmation = false
            clave = prompt("Esta llave ya está en uso, utilce otra")
        }
            confirmation = true
        
    }
    taskCreator(task);
    localStorage.setItem(clave, JSON.stringify(task));
    inputTask.value = ""
    
}

    
})

//Save the current information that are on the local Storage

window.addEventListener("DOMContentLoaded", ()=>{
    for(let i = 0; i<localStorage.length; i++){

        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        taskCreator(value);
    }
})
//Event to hover the task Key
container.addEventListener("mouseover", (e)=> {

    const li = e.target.closest("li");
    if(!li) return;
    const task = li.querySelector(".task");

    if(e.target.classList.contains("task")){

        //Creation of the div
       const keyDiv = document.createElement("div");
       keyDiv.className = "keyDiv";

       //Creation of the div that will be an arrow
       const arrowDiv = document.createElement("div");
       arrowDiv.className = "arrowDiv";

       //Save the key in the div
       keyDiv.textContent = "Proximante...";
       

       li.append(keyDiv);
       li.append(arrowDiv);
    }
})

//Event to quit the hover 
container.addEventListener("mouseout", (e)=> {

    const li = e.target.closest("li");
    if(!li) return;
    const existKey = li.querySelector(".keyDiv");
    const existArrow = li.querySelector(".arrowDiv");

    if(e.target.classList.contains("task")){
       
        if(existKey && existArrow){

            existKey.remove()
            existArrow.remove();
        }
    }
})
deleteLocalStorage.addEventListener("click", (e)=>{

    const  liS = taskContainer.querySelectorAll(".listItem");
    localStorage.clear();
    liS.forEach(element=>element.remove());
})

//Event to show and hide the dynamic menu
buttonMenu.addEventListener("click", (e)=>{

    
    if(e.target.classList.contains("openNav")){
        menu.classList.toggle("hidden")
        buttonClose.classList.toggle("hidden-2");
        buttonOpen.classList.toggle("hidden-2");
    } 
    
    if(e.target.classList.contains("closeNav")){
        menu.classList.toggle("hidden")
        buttonClose.classList.toggle("hidden-2");
        buttonOpen.classList.toggle("hidden-2");
    }

        
    
})

//Cosas para hacer para este proyecto (Se irán borrando mientras se vayan completando)------------------------------

// - Arreglar lo de que las tareas se borren cuando se acualice la pagina, aunque estén guardadas en el localStorage

// - Ver el como se podría guardar la variable taskNumber junto al evento de mouseOver para que si se borra la tarea, se borre el numero y se edite y todo lo demás.

// - Completar la parte de los apartados para poder entender la pagina y todo lo demás

// - 





