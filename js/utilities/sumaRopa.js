import * as UI from './interfaz.js';

const sumaRopa = ( dataStorage ) => {

    let precio = [] 
    dataStorage.forEach(element => {
        precio.push(parseInt(element.precio))
    });
 
    let resultado 
    const mx = new Intl.NumberFormat("es-MX", { currency: "MXN", style: "currency" })
    precio.length >= 1 ? resultado = precio.reduce( ( valorAnterior, valorActual ) => valorAnterior+valorActual,0) : resultado = 0
    UI.sumaRopa.innerText = `${mx.format(resultado)} MXN`
}
export default sumaRopa