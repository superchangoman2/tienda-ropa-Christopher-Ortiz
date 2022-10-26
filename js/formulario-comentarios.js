
if( typeof window === 'object' ){

	// INICIO DEL DOMContentLoaded
	window.addEventListener('DOMContentLoaded', function(){

		// Formulario de comentarios
		let formulario = document.querySelector('#form-comentarios')
		// Inputs de error
		let error_comentario = document.querySelector('#error_comentario')
		let error_nombre = document.querySelector('#error_nombre')
		let error_correo = document.querySelector('#error_correo')
        // Manejo del modal
        let modal_alerta = document.querySelector('#modal_alerta')
        let modal_cerrar = document.querySelector('#modal_cerrar')
        let modal_titulo = document.querySelector('#modal_titulo')
        let modal_body = document.querySelector('#modal_body')

		error_comentario.style.display='none'
		error_nombre.style.display='none'
		error_correo.style.display='none'

		const letrasEspacio = ( val )=>{
			console.log( val.length >= 1 )
			if( /^[a-zA-Z ]*$/.test(val) && val.length >= 1  ){
				return true;
			}
			return false;
		}

        const soloCorreo = ( val )=>{
			if( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val) && val.length >= 3  ){
				return true;
			}
			return false;
		}

		// Validacion input comentario
		comentario.addEventListener('input', (e)=>{
			let validaComentario = letrasEspacio( e.target.value )
			console.log(e.target.value)
			if( validaComentario ){
				error_comentario.style.display = "none";
				error_comentario.innerHTML = `` 
			}else{
				error_comentario.style.display = "block";
				error_comentario.innerHTML = `Debe ingresar sólo letras`   
			}
		})

		// Validacion input nombre
		nombre.addEventListener('input', (e)=>{
			let validaNombre = letrasEspacio( e.target.value )
			if(validaNombre){
				error_nombre.style.display = "none";
				error_nombre.innerHTML = `` 
			}else{
				error_nombre.style.display = "block";
				error_nombre.innerHTML = `Debe ingresar sólo letras.`   
			}
		})

		// Validacion input correo
		correo.addEventListener('input', (e)=>{
			let validaCorreo = soloCorreo( e.target.value )
			if(validaCorreo){
				error_correo.style.display = "none";
				error_correo.innerHTML = `` 
			}else{
				error_correo.style.display = "block";
				error_correo.innerHTML = `Debe ingresar un correo electronico valido.`   
			}
		})

        modal_cerrar.addEventListener('click', (e)=>{
            modal_alerta.style.display = "none"
            modal_alerta.classList.remove("show")
        })

		// INICIO DEL ENVIO
		formulario.addEventListener('submit', function(e){

			e.preventDefault()
			
			let comentario = document.querySelector('#comentario').value
			let nombre = document.querySelector('#nombre').value
			let correo = document.querySelector('#correo').value

            modal_alerta.style.display = "block"
            modal_alerta.classList.add("show")

			if( comentario && nombre && correo ){
                modal_titulo.classList.remove("text-danger")
                modal_titulo.classList.add("text-success")
                modal_titulo.innerHTML = `<h3>Comentario Enviado</h3>`
                modal_body.innerHTML = `<p>Gracias por tu comentarios.</p>`
			} else {
                modal_titulo.classList.remove("text-success")
                modal_titulo.classList.add("text-danger")
				modal_titulo.innerHTML = `<h3>Error en el formulario</h3>`
                modal_body.innerHTML = `<p>Porfavor ingresa los datos solicitados en el formulario.</p>`
			}
			
		})

	})


}