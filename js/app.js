// ========================================
// ARCHIVO PRINCIPAL DE LA APLICACION
// Aqui conectamos todo y manejamos los eventos
// ========================================

// esperamos a que cargue la pagina
document.addEventListener("DOMContentLoaded", function() {
    console.log("Aplicacion cargada");
    
    // verificamos si hay sesion activa
    if (haySesionActiva()) {
        mostrarPaginaPrincipal();
    } else {
        mostrarLogin();
    }
    
    // ========================================
    // EVENTOS DEL FORMULARIO DE LOGIN
    // ========================================
    
    const formLogin = document.getElementById("form-login");
    formLogin.addEventListener("submit", function(evento) {
        evento.preventDefault(); // evitamos que se recargue la pagina
        
        const email = document.getElementById("login-email").value;
        const contrasena = document.getElementById("login-password").value;
        
        // intentamos iniciar sesion
        const exito = iniciarSesion(email, contrasena);
        
        if (exito) {
            mostrarPaginaPrincipal();
            formLogin.reset(); // limpiamos el formulario
        }
    });
    
    // ========================================
    // EVENTOS DEL FORMULARIO DE REGISTRO
    // ========================================
    
    const formRegistro = document.getElementById("form-registro");
    formRegistro.addEventListener("submit", function(evento) {
        evento.preventDefault();
        
        const nombre = document.getElementById("registro-nombre").value;
        const email = document.getElementById("registro-email").value;
        const contrasena = document.getElementById("registro-password").value;
        const confirmarContrasena = document.getElementById("registro-confirm-password").value;
        
        // verificamos que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden");
            return;
        }
        
        // verificamos que la contraseña tenga al menos 4 caracteres
        if (contrasena.length < 4) {
            alert("La contraseña debe tener al menos 4 caracteres");
            return;
        }
        
        // intentamos registrar
        const exito = registrarUsuario(nombre, email, contrasena);
        
        if (exito) {
            alert("Registro exitoso! Ahora puedes iniciar sesion");
            mostrarFormularioLogin();
            formRegistro.reset();
        }
    });
    
    // ========================================
    // EVENTOS PARA CAMBIAR ENTRE LOGIN Y REGISTRO
    // ========================================
    
    const btnMostrarRegistro = document.getElementById("btn-mostrar-registro");
    btnMostrarRegistro.addEventListener("click", function(evento) {
        evento.preventDefault();
        mostrarFormularioRegistro();
    });
    
    const btnMostrarLogin = document.getElementById("btn-mostrar-login");
    btnMostrarLogin.addEventListener("click", function(evento) {
        evento.preventDefault();
        mostrarFormularioLogin();
    });
    
    // ========================================
    // EVENTO PARA CERRAR SESION
    // ========================================
    
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
    btnCerrarSesion.addEventListener("click", function() {
        const confirmar = confirm("¿Estas seguro de cerrar sesion?");
        
        if (confirmar) {
            cerrarSesion();
            mostrarLogin();
        }
    });
    
    // ========================================
    // EVENTOS DEL FORMULARIO DE TRANSACCIONES
    // ========================================
    
    const formTransaccion = document.querySelector(".formulario");
    formTransaccion.addEventListener("submit", function(evento) {
        evento.preventDefault();
        
        // obtenemos los valores del formulario
        const descripcion = document.getElementById("input-descripcion").value;
        const valor = document.getElementById("input-valor").value;
        const categoria = document.getElementById("input-categoria").value;
        
        // obtenemos el tipo seleccionado
        const tipoSeleccionado = document.querySelector('input[name="tipo"]:checked');
        
        if (tipoSeleccionado === null) {
            alert("Selecciona el tipo de transaccion (Entrada o Salida)");
            return;
        }
        
        const tipo = tipoSeleccionado.value;
        
        // agregamos la transaccion
        agregarTransaccion(descripcion, valor, categoria, tipo);
        
        // actualizamos la pagina
        actualizarPagina();
        
        // limpiamos el formulario
        formTransaccion.reset();
        
        // cerramos el modal
        document.getElementById("toggle-modal").checked = false;
        
        alert("Transaccion agregada correctamente!");
    });
    
    // ========================================
    // EVENTOS DE BUSQUEDA
    // ========================================
    
    const inputBusqueda = document.querySelector(".busqueda input");
    const botonBuscar = document.querySelector(".boton-buscar");
    
    botonBuscar.addEventListener("click", function() {
        const termino = inputBusqueda.value;
        const resultados = buscarTransacciones(termino);
        mostrarTransacciones(resultados);
        
        if (resultados.length === 0 && termino !== "") {
            alert("No se encontraron transacciones con: " + termino);
        }
    });
    
    // tambien buscamos cuando presionan Enter
    inputBusqueda.addEventListener("keypress", function(evento) {
        if (evento.key === "Enter") {
            const termino = inputBusqueda.value;
            const resultados = buscarTransacciones(termino);
            mostrarTransacciones(resultados);
        }
    });
    
    // cuando el input esta vacio, mostramos todas las transacciones
    inputBusqueda.addEventListener("input", function() {
        if (this.value === "") {
            actualizarPagina();
        }
    });
    
});
