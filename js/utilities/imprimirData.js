import * as UI from './interfaz.js';
import buscarRopa from './buscarRopa.js';
import myJson from '../db/ropa.json' assert {type: 'json'};
import verificarStorage from './verificarStorage.js';

let obtenerDesdeElStorage = JSON.parse(localStorage.getItem("ropa")) || [];
const mx = new Intl.NumberFormat("es-MX", { currency: "MXN", style: "currency" })

const imprimirData = async ( object, limInferior = 0, limSuperior=6) => {
    try{
        object.forEach((element,index) => {
            if(index < limSuperior && index >= limInferior)
            {
                const { _id, nombre, precio, picture } = element
    
                UI.div_ropa.innerHTML += `
                <div class="item-tendencia vibrate mb-2">
                    <img src="img/${picture}.JPG" alt="Vestido">
                    <p>${nombre}</p>
                    <p>${mx.format(precio)}</p>
                    <div class="row">
                        <a href="#" class="btn btn-secondary agregar-carrito" id="${_id}" title="${nombre}">Agregar al carrito</a>
                    <div>
                </div>`;
            }

        })
        // object.forEach(( element ) => {
        //     // DESESTRUCTURACION
        //     const { _id, nombre, precio, picture } = element
    
        //     UI.div_ropa.innerHTML += `
        //     <div class="item-tendencia vibrate mb-2">
        //         <img src="img/${picture}.JPG" alt="Vestido">
        //         <p>${nombre}</p>
        //         <p>${mx.format(precio)}</p>
        //         <div class="row">
        //             <a href="#" class="btn btn-secondary agregar-carrito" id="${_id}" title="${nombre}">Agregar al carrito</a>
        //         <div>
        //     </div>`;
        // });
    
        // Seleccionamos los botones del card en un HTML Colection
        let buttonCard = document.querySelectorAll("#div_ropa .item-tendencia a");
    
        buttonCard.forEach((element) => {
          element.addEventListener("click", (e) => {
              e.preventDefault();
              let id = e.target.id;
              verificarStorage( id, obtenerDesdeElStorage,'addClass')
              buscarRopa( id, myJson );
              
          });
        });
    }
    catch (error){
        UI.mensajeModal(`<p>${error}</p>`)
        $('#mensajeModal').modal('toggle');
        setTimeout(() => {
            $('#mensajeModal').modal('toggle');
        }, 3000);
    }
}

export default imprimirData