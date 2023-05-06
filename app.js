// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option

let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********

//submit form
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault(); //Evitar que se recargue la pagina
  const groceryValue = grocery.value; //Guarda el valor introducido en input
  const id = new Date().getTime().toString(); //Id

  //Si se inserta
  if (groceryValue && !editFlag) {
    //Crea un elemento nuevo
    const element = document.createElement("article");
    element.classList.add("grocery-item"); //Se agrega la clase
    //Crea el atributo data-id con id unico
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr); //Enlaza el atributo
    //Crea el elemento
    element.innerHTML = `<p class="title">${groceryValue}</p>
          <div class="btn-container">
            <button type="button" class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>`;
    const editBtn = element.querySelector(".edit-btn");
    const deleteBtn = element.querySelector(".delete-btn");
    editBtn.addEventListener("click", editItem);
    deleteBtn.addEventListener("click", deleteItem);

    //Se agrega a la lista
    list.appendChild(element);
    //Muestra alerta de exito
    displayAlert("Item added successfully", "success");
    container.classList.add("show-container"); //Se muestra el contenedor que estaba oculto

    //Agrega a localStorage
    addToLocalStorage(id, groceryValue);
    //Regresa los ajustes a default
    setBackToDefault();
  } else if (groceryValue && editFlag) {
    //Si se edita
    console.log("Editing");
  } else {
    //Si no se ha introducido nada
    displayAlert("No se ha agregado ningun item", "danger");
  }
}

//Edita un elemento
function editItem() {
  console.log("edit");
}

//Elimina un elemento
function deleteItem() {
  console.log("delete");
}

//Elimina todos los elementos de la lista
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("Se ha limpiado la lista", "success");
  setBackToDefault();
  // localStorage.remove(list);
}

//Funcion que muestra una alerta
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  //Elimina la alerta despues de 1 segundo
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//Regresa los parametros a default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  console.log("Added to local storage");
}

// ****** SETUP ITEMS **********
