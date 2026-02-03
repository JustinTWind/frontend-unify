// ========================================
//           MODULO DE USUARIOS
// ========================================

function registrarUsuario(nombre, email, contrasena) {
    let usuarios = obtenerDeLocalStorage("usuarios");

    if (usuarios === null) {
        usuarios = [];
    }

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

    const nuevoUsuario = {
        id: Date.now(), 
        nombre: nombre,
        email: email,
        contrasena: contrasena, 
        fechaRegistro: new Date().toLocaleDateString()
    };
    

    usuarios.push(nuevoUsuario);
    

    guardarEnLocalStorage("usuarios", usuarios);
    
    guardarEnLocalStorage("transacciones_" + nuevoUsuario.id, []);
    
    console.log("Usuario registrado: " + nombre);
    return true;
}

function iniciarSesion(email, contrasena) {
    const usuarios = obtenerDeLocalStorage("usuarios");
    
    if (usuarios === null) {
        alert("No hay usuarios registrados");
        return false;
    }
    
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
    
    guardarSesion(usuarioEncontrado);
    
    console.log("Sesion iniciada para: " + usuarioEncontrado.nombre);
    return true;
}

function obtenerUsuarioActual() {
    const sesion = obtenerSesion();
    return sesion;
}
