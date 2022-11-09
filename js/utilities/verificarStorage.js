const verificarStorage = ( id, obtenerDesdeElStorage, type ) => {
    
    if( type === 'DOMContentLoaded'){
        id.forEach( (element) => {
            document.getElementById(element).innerText = 'Agregado al Carrito'
            document.getElementById(element).classList.add('ropaSeleccionada')
            document.getElementById(element).classList.add('disabled')
        });  
    }
    else{
        let buttonCard = document.querySelectorAll('#div_ropa .item-tendencia a');
        let arr = [];

        if( type === 'addClass' ){
            
            if(localStorage.length !== 1){
    
                obtenerDesdeElStorage.forEach( (element) => {
                    arr.push(element._id)
                })
              
            }else{
                document.getElementById(id).innerText = 'Agregado al Carrito'
                document.getElementById(id).classList.add('ropaSeleccionada')
                let cardPadre = document.getElementById(id).parentElement
                cardPadre.classList.add('activo')
            }
               
            buttonCard.forEach( ( element, index ) => {      
                // Recorrido de todos los botones de agregar carrito y busqueda mediante id 
                if( element.getAttribute('id') ===  arr[index] ){
                    let cardAdd = document.getElementById(arr[index])
                    cardAdd.classList.add('ropaSeleccionada')
                    cardAdd.innerText =  "Agregado al Carrito"    
                    // cardAdd.a.classList.add('disabled')
                }
            }) 
        }
    
        if( type === 'removeClass' ){
             
            obtenerDesdeElStorage.forEach( (element) => {
                arr.push(element.nombre)
            })

    
            buttonCard.forEach( ( element, index ) => {
                if( element.getAttribute('title') ===  arr[index]){
                    document.querySelector(`[title='${arr[index]}']`).classList.remove('ropaSeleccionada')
                }else{
                    let removeClass = document.querySelector(`[title='${arr[arr.length-1]}']`)
                    let removeClassParent = document.querySelector(`[title='${arr[arr.length-1]}']`).parentElement.parentElement.parentElement.parentElement
                    removeClass.classList.remove('ropaSeleccionada')
                    removeClassParent.classList.remove('activo')
                    removeClass.classList.add('enabled')
                    
                }
            }) 
        }
    }


}

export default verificarStorage