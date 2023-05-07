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
window.addEventListener("DOMContentLoaded", setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault(); //Evitar que se recargue la pagina
  const groceryValue = grocery.value; //Guarda el valor introducido en input
  const id = new Date().getTime().toString(); //Id

  //Si se inserta
  if (groceryValue && !editFlag) {
    createListItem(id, groceryValue);
    //Muestra alerta de exito
    displayAlert("Se ha guardado el item", "success");
    container.classList.add("show-container"); //Se muestra el contenedor que estaba oculto

    //Agrega a localStorage
    addToLocalStorage(id, groceryValue);
    //Regresa los ajustes a default
    setBackToDefault();
  } else if (groceryValue && editFlag) {
    //Si se edita
    editElement.textContent = groceryValue;
    displayAlert("Se ha editado el item", "success");
    editLocalStorage(editID, groceryValue);
    setBackToDefault();
  } else {
    //Si no se ha introducido nada
    displayAlert("No se ha agregado ningun item", "danger");
  }
}

//Edita un elemento
function editItem(e) {
  const element = e.currentTarget.parentNode.parentNode;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.textContent;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "Editar";
}

//Elimina un elemento
function deleteItem(e) {
  const element = e.currentTarget.parentNode.parentNode;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("Item borrado de la lista", "danger");
  setBackToDefault();
  removeFromStorage(id);
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
  // Elimina de localStorage
  localStorage.removeItem("list");
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
  submitBtn.textContent = "Guardar";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  //Objeto a guardar
  const grocery = { id, value };
  //Si hay elementos en lista los extrae, si no se guarda como un arreglo vacio provisional
  let items = getLocalStorage();
  //Lo inserta en items
  items.push(grocery);
  //Lo guarda en locaStorage
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  //Obtiene los elementos del localStorage
  let items = getLocalStorage();
  //Cambia el valor al elemento usando el id para buscarlo
  const item = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  //Lo guarda en locaStorage
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container"); //Se muestra el contenedor que estaba oculto
  }
}

function createListItem(id, groceryValue) {
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
}
