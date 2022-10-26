// Variables globales
let div_ropa = document.querySelector("#div_ropa");
let listaCarrito = document.querySelector("#listaCarrito");
let ropaSeleccionada = [];

// Objeto JSON Base de dato
let ropa = [
    {
        _id: "1",
        nombre: "Vestido Nite White",
        precio: 89.99,
        picture: "vestido1"
    },
    {
        _id: "2",
        nombre: "Vestido Pink Flower",
        precio: 24.99,
        picture: "vestido2",
    },
    {
        _id: "3",
        nombre: "Vestido Blue Desire",
        precio: 39.99,
        picture: "vestido3"
    },
    {
        _id: "4",
        nombre: "Blusa Vermilion Spring",
        precio: 12.99,
        picture: "blusas"
    },
    {
        _id: "5",
        nombre: "Falda Young Lime",
        precio: 9.99,
        picture: "faldas"
    },
    {
        _id: "6",
        nombre: "Vestido Pink Flower",
        precio: 24.99,
        picture: "vestido2"
    },
    
];

// NUEVO: Contenido cargado
document.addEventListener("DOMContentLoaded", () => {
    ropaSeleccionada = JSON.parse(localStorage.getItem("ropa")) || [];
    agregarRopaAlcarro();
});

function sincronizarConLocalStorage(){
    localStorage.setItem("ropa", JSON.stringify(ropaSeleccionada));
};

function printData( object) {
    object.forEach(( element, index ) => {
        div_ropa.innerHTML += `
        <div class="item-tendencia vibrate">
            <img src="img/${element.picture}.JPG" alt="Vestido">
            <p>${element.nombre}</p>
            <p>${element.precio}</p>
            <a href="#" class="btn btn-secondary agregar-carrito" id="${element._id}">Agregar al carrito</a>
        </div>`;
    });
}

function agregarRopaAlcarro() {

    listaCarrito.innerHTML = ``;
    
    ropaSeleccionada.forEach((element,index) => {
      

        listaCarrito.innerHTML += `<tr>
            <td><img class="imgFitMiniatura" src="img/${element.picture}.JPG" alt="${element.nombre}"></td>
            <td>${element.nombre}</td>
            <td class="text-center">${element.precio}$</td>
            <td class="text-center">1</td>
            <td class="text-center"><a href="#" id="${element._id}" class="borrar-ropa" data-id="1">X</a></td>
          </tr>`;
    });

    // Seleccionamos el boton eliminar 
    let buttonDelete = document.querySelectorAll('#listaCarrito tr td a');
    
    // Lo recorremos 
    buttonDelete.forEach(element => {
        element.addEventListener('click',(e)=>{
            e.preventDefault();
            let id = e.target.id
            // Eliminar del arreglo del carrito,Filter retorna un nuevo Array
            // Filter si es distinto lo excluye 
            ropaSeleccionada = ropaSeleccionada.filter( ropa => ropa._id !== id );
            console.log('Salida de ropaSeleccionada', ropaSeleccionada)
            agregarRopaAlcarro()
        })
    })

    sincronizarConLocalStorage();
}

// Buscamos la ropa dentro de nuestro JSON
function buscarCurso ( idCurso, buscarRopa ){

    // Usuamos find metodo que me retorna la primera coincidencia
    let ropaSeleccion = buscarRopa.find((element) => idCurso == element._id);
    
    // Metemos la prenda seleccionado en un array porque viene como un objeto
    let ropa = [];
   
    ropa.push(ropaSeleccion);
    
    // Usuamos un spread operator para ir guardano los ya seleccionado y el ultimo seleccionado
    ropaSeleccionada = [...ropaSeleccionada, ...ropa];

    agregarRopaAlcarro();
};


// Imprimimos la data en el DOM
printData(ropa);

// Seleccionamos los botones del card en un HTML Colection
let buttonCard = document.querySelectorAll("#div_ropa .item-tendencia a");

// Recorremos los botones asocimaos a un escuchador de eventos
buttonCard.forEach((element) => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.target.id;
        buscarCurso(id, ropa);
    });
});
