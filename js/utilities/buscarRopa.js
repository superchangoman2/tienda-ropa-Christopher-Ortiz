import agregarRopaAlCarro from './agregarRopaAlCarro.js';
import contadorRopa from './contadorRopa.js';
import siSeRepite from './siSeRepite.js';
import sumaRopa from './sumaRopa.js'

let ropaStorage = []

const buscarRopa = ( idRopa, buscarRopa ) => {
    // Usamos find metodo que me retorna la primera coincidencia
    let ropaSeleccionada = buscarRopa.find(( element ) => idRopa === element._id);
   // Metemos la prenda seleccionada en un array porque viene como un objeto
    let ultimoSeleccionado = [];
    ultimoSeleccionado.push( ropaSeleccionada );
    //No se encuentra en el carrito
    if( siSeRepite( idRopa, ropaStorage )){
        agregarRopaAlCarro( ropaStorage );
        contadorRopa(ropaStorage.length); 
        sumaRopa(ropaSeleccionada)
    }
    else{
        let ropaDelStorage = JSON.parse(localStorage.getItem("ropa")) || [];
        // Usuamos un spread operator para ir guardano los ya seleccionado y el ultimo seleccionado
        ropaStorage = [...ropaDelStorage, ...ultimoSeleccionado];
        agregarRopaAlCarro( ropaStorage );
        contadorRopa(ropaStorage.length); 
        sumaRopa(ropaStorage)

    }

};
export default buscarRopa;