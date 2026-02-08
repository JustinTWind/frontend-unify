function guardarEnLocalStorage(clave, datos) {
    const datosTexto = JSON.stringify(datos);
    localStorage.setItem(clave, datosTexto);
    console.log("Datos guardados en localStorage: " + clave);
}

function obtenerDeLocalStorage(clave) {
    const datosTexto = localStorage.getItem(clave);
    
    if (datosTexto === null) {
        console.log("No se encontraron datos para: " + clave);
        return null;
    }
    
    const datos = JSON.parse(datosTexto);
    return datos;
}

function eliminarDeLocalStorage(clave) {
    localStorage.removeItem(clave);
    console.log("Datos eliminados de localStorage: " + clave);
}

function guardarSesion(usuario) {
    const usuarioTexto = JSON.stringify(usuario);
    sessionStorage.setItem("sesionActual", usuarioTexto);
    console.log("Sesion guardada para: " + usuario.nombre);
}

function obtenerSesion() {
    const sesionTexto = sessionStorage.getItem("sesionActual");
    
    if (sesionTexto === null) {
        return null;
    }
    
    const sesion = JSON.parse(sesionTexto);
    return sesion;
}

function cerrarSesion() {
    sessionStorage.removeItem("sesionActual");
    console.log("Sesion cerrada");
}

function haySesionActiva() {
    const sesion = obtenerSesion();
    
    if (sesion !== null) {
        return true;
    } else {
        return false;
    }
}
