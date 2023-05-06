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

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault(); //Evitar que se recargue la pagina
  const groceryValue = grocery.value; //Guarda el valor introducido en input
  const id = new Date().getTime().toString(); //Id
  if (groceryValue !== "" && editFlag == false) {
    //Si se inserta
    console.log("Adding element to the list");
  } else if (groceryValue !== "" && editFlag == true) {
    //Si se edita
    console.log("Editing");
  } else {
    //Si no se ha introducido nada
    console.log("Null");
  }
}

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
