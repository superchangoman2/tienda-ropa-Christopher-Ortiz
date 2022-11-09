// Metodo que identifica si la prenda que se quiere agregar al carrito, ya existe en el.
const siSeRepite = ( idRopa, ropaSeleccionada ) => {

    const existe = ropaSeleccionada.some( ropa => ropa._id === idRopa )
    let siExiste = existe ? true : false
    return siExiste
}
export default siSeRepite