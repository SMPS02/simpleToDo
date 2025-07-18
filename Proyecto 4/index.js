//---------------------------------------------------------------------------------------
//VARIABLES DESDE EL DOM

//variable que representa a los elementos almancenados en el LocalStorage
const variablesDeLocal = obtenerDeLocal();

//Array de objetos (Las tareas)
let tareas = variablesDeLocal || [];

//ul que contiene a las tareas
const ul = document.getElementById("tasksContainer");

//Input  donde se ingresan las tareas
const input = document.getElementById("writeTask");

//Contenedor de las tareas
const contenedor = document.getElementById("main");

const fecha = new Date();

 
//FUCNIONES

//Funcion de buena pratica para agregar elementos al local Storage (Reducir codigo, más legible, etc)
function agregarAlLocal(){

    localStorage.setItem("tareas", JSON.stringify(tareas));
}

//Funcion de buena practica para obtener elementos al local Storage (Reducir codigo, más legible, etc)
function obtenerDeLocal(){


    return JSON.parse(localStorage.getItem("tareas")) || [];

}

//Funcion para crear las tareas y dibujarlas en el HTML.
function agregarAlHTML ({tarea, id, done, desing}){

    ul.innerHTML += 
    `<li class="listItem" id = "${id}">
              
                <div class="normalSpace">
                
                <div class="taskAndButtons">
                    <div class="taskSpace">
                    <h1 class="task ${desing ? "completed" : ""}">
                        ${tarea}
                    </h1>
                    </div> 

                    <div class="doneOrNot">
                        <button class="notDone" id="done">
                            ${done ? "Done" : "Not Done"}
                        </button>

                        <button class="editTask" id="edit">
                            Edit
                        </button>

                        <button class="deleteTask" id="delete">
                            Delete
                        </button>
                    </div>
                    </div>

                    <div class="editContainer hidden-2">
                        <input type="text" class="taskEditor">
                        <button class="gettingtaskEdited">
                         Editar
                        </button>
                    </div>

                </li>`
   
}

function borrarTarea(e){
   const liID = e.target.parentElement.parentElement.parentElement.parentElement.id;
   
   const li = document.getElementById(liID);
  
   tareas = tareas.filter((tarea) => tarea.id != liID);
   
   ul.innerHTML = "";
   
   tareas.forEach(agregarAlHTML);
   
   agregarAlLocal();
}

function mostrarEdicion(e){
    const liID = e.target.parentElement.parentElement.parentElement.parentElement.id;
    const li = document.getElementById(liID);
    const contenedor = li.querySelector(".editContainer");
    li.classList.toggle("extend");
    contenedor.classList.toggle("hidden-2");



}

function cargarContenido(e){
    tareas.forEach(agregarAlHTML);
}

function editarTarea(e){

    const elementosLocalStorage = obtenerDeLocal();
    const liID = e.target.parentElement.parentElement.parentElement.id;
    const inputEdicion = e.target.previousElementSibling;

    elementosLocalStorage.forEach((tarea) =>{
        if(tarea.id === liID){
            tarea.tarea = inputEdicion.value;
        }
    })
    tareas = elementosLocalStorage;
    agregarAlLocal();

    ul.innerHTML = ""

    tareas.forEach(agregarAlHTML);

    inputEdicion.value = "";

}
function mostrarFecha(e){
     
    const liID = e.target.parentElement.parentElement.parentElement.parentElement.id
    const li = document.getElementById(liID);
    const grupoVaribles = obtenerDeLocal();

    //Accediendo al normal Space

    const NormalSpace = li.querySelector(".normalSpace");

        //Creacion del contenedor donde va a recidir la información sobre la creación de la tarea
        const contenedorFecha = document.createElement("div");
        contenedorFecha.className = "mostrarFecha";

        if(e.target.classList.contains("task")){

            grupoVaribles.forEach((tarea)  => {
                if(tarea.id === liID){

                    contenedorFecha.textContent = "Fecha de creación: " + (tarea.fechaCreacion);

                }
               
            })
            
        }  
        li.append(contenedorFecha);
        NormalSpace.style.filter = "blur(2px)"
    
}

//EVENTOS

//Eventos para aplicar las funciones
document.addEventListener("click", (e)=>{

    //Evento para agregar las tareas al HTML y al local Storage.
    if(e.target.classList.contains("getTask")){

        if(input.value===""){
            alert("Debes escribir algo");
            return;
        }else{

           const LaTarea = {
            tarea: input.value,
            id: crypto.randomUUID(),
            done: false,
            desing: false,
            fechaCreacion: fecha.toLocaleString("es-Es")
           }

           tareas = [...tareas, LaTarea];
           agregarAlHTML(LaTarea);
           agregarAlLocal();

        }
        input.value = "";

    }

    //Evento para borrar la tarea
    if(e.target.classList.contains("deleteTask")){
        borrarTarea(e);
    }

    //Evento para ver si la tarea está hecha o no hecha.
    if(e.target.classList.contains("notDone") || e.target.classList.contains("done")){
        const localVariables = obtenerDeLocal();
        const liID = e.target.parentElement.parentElement.parentElement.parentElement.id;
        const li = document.getElementById(liID);

       localVariables.forEach((element) =>{
        if(element.id === li.id){
            element.done = !element.done;
            element.desing = !element.desing;
        }
        tareas = localVariables;
        agregarAlLocal();

        ul.innerHTML = ""
        tareas.forEach(agregarAlHTML);
        // tachar(e);


       })
    }
    //Evento para mostrar el apartado de edición
    if(e.target.classList.contains("editTask")){
        mostrarEdicion(e);
    }

    //Editar tarea
    if(e.target.classList.contains("gettingtaskEdited")){

        editarTarea(e);
    }
    //Borrar todas las tareas
    if(e.target.classList.contains("deleteLocalStorage")){
        
        localStorage.clear();
        window.location.reload();
       
    }

    // if(e.target.classList.contains("task")){
    //     mostrarFecha(e);
    // }

})

window.addEventListener("DOMContentLoaded", (e)=>{
    cargarContenido(e);
})

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.querySelector(".getTask").click();
    }
});
document.addEventListener("keydown", (e) => {
    if (e.target.classList.contains("taskEditor") && e.key === "Enter") {
        const editButton = e.target.nextElementSibling;
        editButton.click();
    }
});

contenedor.addEventListener("mouseover", (e)=>{
    
    if(e.target.classList.contains("task")){
       mostrarFecha(e);
    }
})
contenedor.addEventListener("mouseout", (e)=>{
    
    if(e.target.classList.contains("task")){
       const liID = e.target.parentElement.parentElement.parentElement.parentElement.id;
       const li = document.getElementById(liID);
       const normalSpace = li.querySelector(".normalSpace");
       const yaExiste = li.querySelector(".mostrarFecha");

       if(yaExiste){
        yaExiste.remove();
       }

        normalSpace.style.filter = "blur(0px)"

    }
})


    

//-------------------------------------------------------------------------------------------

//Para mañana, ponerle fecha de creación a las tareas y que aparezcan al hacer hover en la misma tarea.
//Ir pensando en los proximos proyextos y proximos aprendizajes

