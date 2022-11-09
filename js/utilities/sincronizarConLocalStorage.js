const sincronizarConLocalStorage = ( ropaSeleccionada ) => {
    localStorage.setItem("ropa", JSON.stringify(ropaSeleccionada));
};

export default sincronizarConLocalStorage