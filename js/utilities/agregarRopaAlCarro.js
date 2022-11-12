import * as UI from './interfaz.js'
import sumaRopa from './sumaRopa.js'
import contadorRopa from './contadorRopa.js'
import verificarStorage from './verificarStorage.js'
import sincronizarConLocalStorage from './sincronizarConLocalStorage.js';

const mx = new Intl.NumberFormat("es-MX", { currency: "MXN", style: "currency" })

const agregarRopaAlCarro = (ropaSeleccionada) => {
    
    let div = document.createElement('div')
    div.setAttribute('id','tableHeight')
    UI.listaCarrito.after(div)
    UI.listaCarrito.innerHTML = ``;
    
    ropaSeleccionada.forEach((element) => {
      
          UI.listaCarrito.innerHTML += `<tr>
          <td><img class="imgFitMiniatura" src="img/${element.picture}.JPG" alt="${element.nombre}"></td>
          <td>${element.nombre}</td>
          <td class="text-center">${mx.format(element.precio)} MXN$</td>
          <td class="text-center">
          <div class="product-count">
          <button type="button" title="${element.nombre}" class="decrement">-</button>
          <input type="number" title="${element.nombre}" class="product-count-value" value="1" readonly>
          <button type="button" title="${element.nombre}" class="increment">+</button>
        </div>
          </td>
          <td class="text-center"><a href="#" title="${element.nombre}" class="borrar-prenda" data-id="1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
          </a></td>
        </tr>`;
    });

    // Seleccionamos el boton eliminar 
    let buttonDelete = document.querySelectorAll('#listaCarrito tr td a');
    let buttonDeleteAll = document.querySelector('#vaciarCarrito');
    let botonCantidadProducto = document.querySelectorAll(".product-count button");

    // Agregar listener a todos los botones de eliminar del carrito 
    buttonDelete.forEach(element => {
        element.addEventListener('click',(e)=>{
            e.preventDefault();
            let nombre = e.target.title;
            let id = e.target.id;

            Swal.fire({
                title: 'Eliminar articulo del carrito',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Si',
                denyButtonText: 'No'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('Tu articulo fue eliminado', '', 'success')
                    // Eliminar del arreglo del carrito,Filter retorna un nuevo Array
                    // Filter si es distinto lo excluye 
                  ropaSeleccionada = ropaSeleccionada.filter( ropa => ropa.nombre !== nombre );
                  let ropaStorage = JSON.parse(localStorage.getItem("ropa")) || [];
                  
                  agregarRopaAlCarro(ropaSeleccionada);
                  sumaRopa(ropaSeleccionada);
                  verificarStorage( id , ropaStorage, 'removeClass' );
                  contadorRopa( ropaStorage.length - 1 )
                } else if (result.isDenied) {
                  Swal.fire('Tu compra continuará', '', 'info')
                }
            });

        })
    })

    botonCantidadProducto.forEach(element => {
        return new Promise((resolve, reject) => {
            element.addEventListener('click',(e)=>{
                e.preventDefault();
                let ropaStorage = JSON.parse(localStorage.getItem("ropa")) || [];
                let nombre = e.target.title;
                let claseBoton = e.target.classList.value
                let inputCantidad = document.querySelector(`input[title='${nombre}']`);
    
                if(claseBoton == "increment"){
                    inputCantidad.value++;
                    sumaRopa(ropaStorage);
                    resolve(Swal.fire('Nuevo Producto Agregado', '', 'success'))
                }
    
                if(claseBoton == "decrement" && inputCantidad.value > 1){
                    inputCantidad.value--;
                    sumaRopa(ropaStorage);
                    resolve(Swal.fire('Un producto menos', '', 'info'))
                }
                // Reseteo de valor de input
                if(inputCantidad.value < 1)
                {
                    reject(Swal.fire('Ups!','Algo salió mal', 'error'))
                    inputCantidad.value = 1;
                }
    
            })
        });

    })

    // Limpiar storage
    buttonDeleteAll.addEventListener('click', (e)=>{
        e.preventDefault();
        localStorage.clear();
        location.reload();
    })

    sincronizarConLocalStorage(ropaSeleccionada);
}

export default agregarRopaAlCarro;