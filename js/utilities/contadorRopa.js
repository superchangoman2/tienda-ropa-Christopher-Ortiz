import * as UI from './interfaz.js';

// Método de control de conteo de ropa en carrito, se oculta en caso de que no exista ropa
const contadorRopa = ( numRopa )=>{
    numRopa >= 1 ? ( UI.cantidad.style.display = 'flex',  UI.cantidad.innerText = numRopa ) : ( UI.cantidad.style.display = 'none',  UI.cantidad.innerText = 0 )
}
export default contadorRopa