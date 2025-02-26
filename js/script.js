function validadorUsuarioContrasena(tipo, valor) {
    if (tipo === "nombre") {
        // Verifica que el nombre tenga al menos 5 caracteres
        if (valor.length < 5) {
            return "El nombre de usuario debe tener al menos 5 caracteres.";
        }

        // Verifica que el nombre no sea solo números
        if (/^\d+$/.test(valor)) {
            return "El nombre de usuario no puede ser solo números.";
        }

        // Verifica que el nombre no esté ya registrado
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioExistente = usuariosGuardados.find(usuario => usuario.nombre === valor);
        if (usuarioExistente) {
            return "El nombre de usuario ya está registrado.";
        }

        // Verifica que no haya espacios en el nombre
        if (/\s/.test(valor)) {
            return "El nombre de usuario no puede contener espacios.";
        }

        return null; // Retorna null si la validación pasa
    }

    if (tipo === "contrasena") {
        // Verifica que la contraseña tenga al menos 6 caracteres
        if (valor.length < 6) {
            return "La contraseña debe tener al menos 6 caracteres.";
        }

        // Verifica que la contraseña contenga al menos una letra mayúscula, un número y un carácter especial
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        if (!regex.test(valor)) {
            return "La contraseña debe contener al menos una mayúscula, un número y un carácter especial.";
        }

         // Verifica que no haya espacios en la contraseña
         if (/\s/.test(valor)) {
            return "La contraseña no puede contener espacios.";
        }

        return null; // Retorna null si la validación pasa
    }

    return "Tipo de validación no reconocido."; // Si el tipo no es "nombre" ni "contrasena"
}


// Espera a que el contenido del DOM se cargue completamente antes de ejecutar el codigo.
document.addEventListener("DOMContentLoaded", () => {

    
    // Seleccionamos el formulario del login por su ID
    const loginForm = document.getElementById("loginForm");

    if(loginForm) {
        // Agregamos un evento que escucha cuando el usuario intenta enviar el formulario.
        loginForm.addEventListener("submit", (event) => {

            // Previene que el formulario recargue la pagina automaticamente
            event.preventDefault();

            //Obtenemos los valores ingresados en los campos de usuario y contraseña.
            const usuario = document.getElementById("usuario").value;
            const contrasena = document.getElementById("contrasena").value;

            // Recuperamos los usuarios guardados en localStorge y los convertimos de JSON a un array de objetos
            // Si no hay usuarios guardados, asignamos un array vacio como valor predeterminado.
            const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Buscamos un usuario en el que array que coincida con el nombre y la contraseña ingresados.
            const usuarioEncontrado = usuariosGuardados.find(user => user.nombre === usuario && user.contrasena === contrasena);
            
            // Verificamos si ya existe un mensaje en el formulario, y si es asi, lo eliminamos.
            const mensajeExistente = loginForm.querySelector("p");
            if (mensajeExistente) {
                loginForm.removeChild(mensajeExistente); // Eliminamos el mensaje previo
            }

            // Creamos un elemento <p> para mostrar mensajes al usuario
            const mensaje = document.createElement("p");
            mensaje.style.fontWeight = "bold" // Aplicamos estilo para que el mensaje sea en negrita

            // Si el usuario se encuentra en la base de datos (localStorage), mostramos un mensaje de bienvenida.
            if (usuarioEncontrado) {
                // Guardamos el nombre del usuario en localStorage para usarlo en la página de bienvenida
                localStorage.setItem("usuarioActivo", usuario);
                mensaje.textContent = `Bienvenido, ${usuario}! Redireccionando...`; 
                mensaje.style.color = "green";
            } else {
                mensaje.textContent = "Usuario o contraseña incorrectos.";
                mensaje.style.color = "red";
            }

            // Agregamos el mensaje al formulario para que el usuario lo vea.
            loginForm.appendChild(mensaje);

            // Redirige a la pagina de login despues de un breve mensaje de exito
            setTimeout(() => {
                window.location.href = "../html/bienvenido.html"; // Redirige a la pagina de login
            }, 2000);
        })
    }

    // Codigo de registro
    const registroForm = document.getElementById("registroForm");

    // Verifica si el formulario de registro existe en la pagina
    if (registroForm) {
        registroForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Evita que la pagina se recargue al enviar el formulario

            // Recupera los valores del nuevo nombre de usuario y contrasena ingresados
            const nuevoUsuario = document.getElementById("nuevoUsuario").value;
            const nuevaContrasena = document.getElementById("nuevaContrasena").value;

            // Verificamos si ya existe un mensaje en el formulario, y si es asi, lo eliminamos.
            const mensajeExistente = registroForm.querySelector("p");
            if (mensajeExistente) {
                registroForm.removeChild(mensajeExistente); // Eliminamos el mensaje previo
            }

            // Crea un mensaje que aparecera en el formulario dependiendo si el registro fue existoso o no
            const mensaje = document.createElement("p");
            mensaje.style.fontWeight = "bold";

            // Validar el nombre de usuario
            const errorNombre = validadorUsuarioContrasena("nombre", nuevoUsuario);
            if (errorNombre) {
                mensaje.textContent = errorNombre;
                mensaje.style.color = "red"; //Mostrar mensaje de error en rojo
                registroForm.appendChild(mensaje);
                return; // Detener ejecucion
            }
    
            // Validar la contraseña
            const errorContrasena = validadorUsuarioContrasena("contrasena", nuevaContrasena);
            if (errorContrasena) {
                mensaje.textContent = errorContrasena;
                mensaje.style.color = "red"; //Mostrar mensaje de error en rojo
                registroForm.appendChild(mensaje);
                return; // Detener ejecucion
            }

            // Obtiene los usuarios guardados en localStorage o un array vacio si no hay datos
            const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Si el usuario no existe, lo creamos y lo guardamos en el localStorage
            const nuevoUsuarioObj = {
                nombre: nuevoUsuario,
                contrasena: nuevaContrasena
            };
            
            // Agregamos el nuevo usuario al array de usuarios
            usuariosGuardados.push(nuevoUsuarioObj);

            // Guarda el array de usuarios actualizado en el localStorage
            localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

            // Mensaje de exito
            mensaje.textContent = "¡Registro exitoso! Ahora puedes iniciar sesion. Redireccionando...";
            mensaje.style.color = "green"; // Mensaje en color verde

            // Añade el mensaje al formulario de registro para que el usuario lo vea
            registroForm.appendChild(mensaje);

            // Redirige a la pagina de login despues de un breve mensaje de exito
            setTimeout(() => {
                window.location.href = "../index.html"; // Redirige a la pagina de login
            }, 2000);
        });
    }

});