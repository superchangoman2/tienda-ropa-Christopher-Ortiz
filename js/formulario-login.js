
if( typeof window === 'object' ){

	// INICIO DEL DOMContentLoaded
	window.addEventListener('DOMContentLoaded', function(){

		// Formulario de comentarios
		let formulario = document.querySelector('#form-login')
		// Inputs de error

		let error_correo = document.querySelector('#error_correo')
		let error_password = document.querySelector('#error_password')
        // Manejo del modal
        let modal_alerta = document.querySelector('#modal_alerta')
        let modal_cerrar = document.querySelector('#modal_cerrar')
        let modal_titulo = document.querySelector('#modal_titulo')
        let modal_body = document.querySelector('#modal_body')

		error_correo.style.display='none'
		error_password.style.display='none'

		const letrasEspacio = ( val )=>{
			if( val.length >= 6 ){
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


		// Validacion input correo
		function validarPassword(e){
			let validapassword = letrasEspacio( e.target.value )
			if(validapassword){
				error_password.style.display = "none";
				error_password.innerHTML = `` 
			}else{
				error_password.style.display = "block";
				error_password.innerHTML = `Tu contraseña debe tener minimo 6 caracteres.`   
			}
		}

		// Validacion input correo
		function validarCorreo(e){
			let validaCorreo = soloCorreo( e.target.value )
			if(validaCorreo){
				error_correo.style.display = "none";
				error_correo.innerHTML = `` 
			}else{
				error_correo.style.display = "block";
				error_correo.innerHTML = `Debe ingresar un correo electronico valido.`   
			}
			
		}

		//Asignación de listeners en inputs
		password.addEventListener('input', validarPassword)
		correo.addEventListener('input', validarCorreo)

        modal_cerrar.addEventListener('click', (e)=>{
            modal_alerta.style.display = "none"
            modal_alerta.classList.remove("show")
        })

		// INICIO DEL ENVIO
		formulario.addEventListener('submit', function(e){

			e.preventDefault()
			
			let password = document.querySelector('#password').value
			let correo = document.querySelector('#correo').value

            modal_alerta.style.display = "block"
            modal_alerta.classList.add("show")

			if( error_password.style.display == "none" && error_correo.style.display == "none" ){
                modal_titulo.classList.remove("text-danger")
                modal_titulo.classList.add("text-success")
                modal_titulo.innerHTML = `<h3>Datos correctos</h3>`
                modal_body.innerHTML = `<p>Disculpa los incovenientes por el momentos no contamos con base de datos.</p>`
			} else {
                modal_titulo.classList.remove("text-success")
                modal_titulo.classList.add("text-danger")
				modal_titulo.innerHTML = `<h3>Error en el formulario</h3>`
                modal_body.innerHTML = `<p>Porfavor ingresa los datos solicitados en el formulario.</p>`
			}
			
		})

	})


}