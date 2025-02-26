document.addEventListener("DOMContentLoaded", () => {
    // Recuperamos el nombre del usuario activo desde el localStorage
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    // Verificamos si existe un usuario activo
    if (usuarioActivo) {
        // Mostramos un mensaje de bienvenida con el nombre del usuario
        const mensaje = document.getElementById("bienvenidoMensaje");
        mensaje.textContent = `Bienvenido, ${usuarioActivo}!`;
        
        // Configuramos el botón de cerrar sesión
        const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");
        cerrarSesionBtn.addEventListener("click", () => {
            // Eliminamos al usuario activo de localStorage
            localStorage.removeItem("usuarioActivo");

            // Redirigimos al usuario al login
            window.location.href = "../index.html";
        });
    } else {
        // Si no hay un usuario activo, redirigimos al login
        window.location.href = "../index.html";
    }
});
