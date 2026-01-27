// ========================================
// MODULO DE USUARIOS
// Este modulo maneja el registro y login de usuarios
// ========================================

// funcion para registrar un nuevo usuario
function registrarUsuario(nombre, email, contrasena) {
    // primero obtenemos los usuarios existentes
    let usuarios = obtenerDeLocalStorage("usuarios");
    
    // si no hay usuarios, creamos un array vacio
    if (usuarios === null) {
        usuarios = [];
    }
    
    // verificamos que el email no este registrado
    let emailExiste = false;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            emailExiste = true;
            break;
        }
    }
    
    if (emailExiste) {
        alert("Este correo ya esta registrado");
        return false;
    }
    
    // creamos el nuevo usuario
    const nuevoUsuario = {
        id: Date.now(), // usamos la fecha como id unico
        nombre: nombre,
        email: email,
        contrasena: contrasena, // en un proyecto real esto deberia estar encriptado
        fechaRegistro: new Date().toLocaleDateString()
    };
    
    // agregamos el usuario al array
    usuarios.push(nuevoUsuario);
    
    // guardamos en localStorage
    guardarEnLocalStorage("usuarios", usuarios);
    
    // tambien creamos un array vacio de transacciones para este usuario
    guardarEnLocalStorage("transacciones_" + nuevoUsuario.id, []);
    
    console.log("Usuario registrado: " + nombre);
    return true;
}

// funcion para iniciar sesion
function iniciarSesion(email, contrasena) {
    // obtenemos los usuarios
    const usuarios = obtenerDeLocalStorage("usuarios");
    
    if (usuarios === null) {
        alert("No hay usuarios registrados");
        return false;
    }
    
    // buscamos el usuario con ese email y contrasena
    let usuarioEncontrado = null;
    
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email && usuarios[i].contrasena === contrasena) {
            usuarioEncontrado = usuarios[i];
            break;
        }
    }
    
    if (usuarioEncontrado === null) {
        alert("Email o contraseña incorrectos");
        return false;
    }
    
    // guardamos la sesion en sessionStorage
    guardarSesion(usuarioEncontrado);
    
    console.log("Sesion iniciada para: " + usuarioEncontrado.nombre);
    return true;
}

// funcion para obtener el usuario actual
function obtenerUsuarioActual() {
    const sesion = obtenerSesion();
    return sesion;
}
