const alerta = () => Swal.fire({
    title: 'Eliminar articulo del carrito',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Si',
    denyButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Tu articulo fue eliminado', '', 'success')
      return true;
    } else if (result.isDenied) {
      Swal.fire('Tu compra continuará', '', 'info')
      return false;
    }
});

export default alerta;