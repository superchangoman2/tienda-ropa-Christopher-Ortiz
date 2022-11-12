
import imprimirData from './utilities/imprimirData.js';
import agregarRopaAlCarro from './utilities/agregarRopaAlCarro.js'
import sincronizarConLocalStorage from './utilities/sincronizarConLocalStorage.js';
import myJson from './db/ropa.json' assert {type: 'json'};
import * as UI from './utilities/interfaz.js';
import contadorRopa from './utilities/contadorRopa.js';
import verificarStorage from './utilities/verificarStorage.js';
import sumaRopa from './utilities/sumaRopa.js';

UI.cantidad.style.display = 'none';
UI.contentSpinnerLoading.style.display = 'none';

let imgCarrito = document.querySelector('#img-carrito');

imgCarrito.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log('Salida')
    let carrito = document.querySelector('#carrito')
    let table = document.querySelector('#carrito table.table')
    let botonCarrito = document.querySelector('#vaciarCarrito')
    console.log('Salidaaaa',  typeof carrito.classList[1])

    if(carrito.classList[1] === 'hidde'){

        carrito.classList.remove('hidde')
        carrito.classList.add('show')

        table.classList.remove('hidde')
        table.classList.add('show')

        botonCarrito.classList.remove('hidde')
        botonCarrito.classList.add('show')
        
    }else{
        carrito.classList.remove('show')
        carrito.classList.add('hidde')

        table.classList.remove('show')
        table.classList.add('hidde')

        botonCarrito.classList.remove('show')
        botonCarrito.classList.add('hidde')
    }
   
})

UI.loadingMore.addEventListener('click', function(e){
    e.preventDefault();
    let ropaStorage = JSON.parse(localStorage.getItem("ropa")) || [];
    let id = []
    ropaStorage.forEach(element => {
        id.push(element._id)
    });
    sumaRopa(ropaStorage)
    agregarRopaAlCarro( ropaStorage );
    sincronizarConLocalStorage( ropaStorage )
    contadorRopa( ropaStorage.length )
    imprimirData(myJson, 6 , 12);
    verificarStorage(id, ropaStorage, 'DOMContentLoaded')
    UI.loadingMore.style.display = 'none';
});

// Cargar desde el localStorage
document.addEventListener("DOMContentLoaded", () => {

    let ropaStorage = JSON.parse(localStorage.getItem("ropa")) || [];
    let id = []

    ropaStorage.forEach(element => {
        id.push(element._id)
    });

    sumaRopa(ropaStorage)
    agregarRopaAlCarro( ropaStorage );
    sincronizarConLocalStorage( ropaStorage )
    contadorRopa( ropaStorage.length )
    imprimirData( myJson );
    verificarStorage(id, ropaStorage, 'DOMContentLoaded')
});

