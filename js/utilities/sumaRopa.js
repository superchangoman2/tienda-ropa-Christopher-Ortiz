import * as UI from './interfaz.js';

const sumaRopa = ( dataStorage ) => {

    let precio = [];
        setTimeout(()=>{
            UI.contentSpinnerLoading.style.display = 'flex';
            dataStorage.forEach(element => {
                let inputCantidad = document.querySelector(`input[title='${element.nombre}']`)
                precio.push(parseInt(element.precio)*parseInt(inputCantidad.value))
            });
        
            let resultado 
            const mx = new Intl.NumberFormat("es-MX", { currency: "MXN", style: "currency" })
            precio.length >= 1 ? resultado = precio.reduce( ( valorAnterior, valorActual ) => valorAnterior+valorActual,0) : resultado = 0
            UI.sumaRopa.innerText = `${mx.format(resultado)} MXN`
            UI.contentSpinnerLoading.style.display = 'none';
        }, 1000);
}
export default sumaRopa