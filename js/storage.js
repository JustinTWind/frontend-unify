// ========================================
// MODULO DE ALMACENAMIENTO
// Este modulo maneja localStorage y sessionStorage
// ========================================

// funcion para guardar datos en localStorage
function guardarEnLocalStorage(clave, datos) {
    // convertimos los datos a texto JSON para poder guardarlos
    const datosTexto = JSON.stringify(datos);
    localStorage.setItem(clave, datosTexto);
    console.log("Datos guardados en localStorage: " + clave);
}

// funcion para obtener datos de localStorage
function obtenerDeLocalStorage(clave) {
    const datosTexto = localStorage.getItem(clave);
    
    // si no hay datos, retornamos null
    if (datosTexto === null) {
        console.log("No se encontraron datos para: " + clave);
        return null;
    }
    
    // convertimos el texto JSON a objeto
    const datos = JSON.parse(datosTexto);
    return datos;
}

// funcion para eliminar datos de localStorage
function eliminarDeLocalStorage(clave) {
    localStorage.removeItem(clave);
    console.log("Datos eliminados de localStorage: " + clave);
}

// funcion para guardar la sesion del usuario en sessionStorage
// sessionStorage se borra cuando cierras el navegador
function guardarSesion(usuario) {
    const usuarioTexto = JSON.stringify(usuario);
    sessionStorage.setItem("sesionActual", usuarioTexto);
    console.log("Sesion guardada para: " + usuario.nombre);
}

// funcion para obtener la sesion actual
function obtenerSesion() {
    const sesionTexto = sessionStorage.getItem("sesionActual");
    
    if (sesionTexto === null) {
        return null;
    }
    
    const sesion = JSON.parse(sesionTexto);
    return sesion;
}

// funcion para cerrar sesion
function cerrarSesion() {
    sessionStorage.removeItem("sesionActual");
    console.log("Sesion cerrada");
}

// funcion para verificar si hay sesion activa
function haySesionActiva() {
    const sesion = obtenerSesion();
    
    if (sesion !== null) {
        return true;
    } else {
        return false;
    }
}
