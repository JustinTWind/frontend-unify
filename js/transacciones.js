// ========================================
// MODULO DE TRANSACCIONES
// Este modulo maneja las transacciones (gastos e ingresos)
// ========================================

// funcion para obtener las transacciones del usuario actual
function obtenerTransacciones() {
    const usuario = obtenerUsuarioActual();
    
    if (usuario === null) {
        console.log("No hay usuario logueado");
        return [];
    }
    
    const transacciones = obtenerDeLocalStorage("transacciones_" + usuario.id);
    
    if (transacciones === null) {
        return [];
    }
    
    return transacciones;
}

// funcion para guardar las transacciones
function guardarTransacciones(transacciones) {
    const usuario = obtenerUsuarioActual();
    
    if (usuario === null) {
        console.log("No hay usuario logueado");
        return;
    }
    
    guardarEnLocalStorage("transacciones_" + usuario.id, transacciones);
}

// funcion para agregar una nueva transaccion
function agregarTransaccion(descripcion, valor, categoria, tipo) {
    // obtenemos las transacciones actuales
    const transacciones = obtenerTransacciones();
    
    // creamos la nueva transaccion
    const nuevaTransaccion = {
        id: Date.now(),
        descripcion: descripcion,
        valor: parseFloat(valor),
        categoria: categoria,
        tipo: tipo, // "entrada" o "salida"
        fecha: new Date().toLocaleDateString()
    };
    
    // agregamos al inicio del array para que aparezca primero
    transacciones.unshift(nuevaTransaccion);
    
    // guardamos
    guardarTransacciones(transacciones);
    
    console.log("Transaccion agregada: " + descripcion);
    return nuevaTransaccion;
}

// funcion para eliminar una transaccion
function eliminarTransaccion(id) {
    const transacciones = obtenerTransacciones();
    
    // buscamos la transaccion y la eliminamos
    const nuevasTransacciones = [];
    
    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].id !== id) {
            nuevasTransacciones.push(transacciones[i]);
        }
    }
    
    // guardamos las transacciones sin la eliminada
    guardarTransacciones(nuevasTransacciones);
    
    console.log("Transaccion eliminada con id: " + id);
}

// funcion para editar una transaccion existente
function editarTransaccion(id, descripcion, valor, categoria, tipo) {
    const transacciones = obtenerTransacciones();
    
    // buscamos la transaccion por id y actualizamos sus datos
    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].id === id) {
            transacciones[i].descripcion = descripcion;
            transacciones[i].valor = parseFloat(valor);
            transacciones[i].categoria = categoria;
            transacciones[i].tipo = tipo;
            break;
        }
    }
    
    // guardamos las transacciones actualizadas
    guardarTransacciones(transacciones);
    
    console.log("Transaccion editada: " + descripcion);
}

// funcion para obtener una transaccion por su id
function obtenerTransaccionPorId(id) {
    const transacciones = obtenerTransacciones();
    
    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].id === id) {
            return transacciones[i];
        }
    }
    
    return null;
}

// funcion para buscar transacciones
function buscarTransacciones(termino) {
    const transacciones = obtenerTransacciones();
    
    if (termino === "" || termino === null) {
        return transacciones;
    }
    
    // convertimos a minusculas para buscar sin importar mayusculas
    const terminoMinuscula = termino.toLowerCase();
    
    const resultados = [];
    
    for (let i = 0; i < transacciones.length; i++) {
        const descripcion = transacciones[i].descripcion.toLowerCase();
        const categoria = transacciones[i].categoria.toLowerCase();
        
        // buscamos en descripcion y categoria
        if (descripcion.indexOf(terminoMinuscula) !== -1 || categoria.indexOf(terminoMinuscula) !== -1) {
            resultados.push(transacciones[i]);
        }
    }
    
    return resultados;
}

// funcion para calcular el total de entradas
function calcularEntradas() {
    const transacciones = obtenerTransacciones();
    let total = 0;
    
    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].tipo === "entrada") {
            total = total + transacciones[i].valor;
        }
    }
    
    return total;
}

// funcion para calcular el total de salidas
function calcularSalidas() {
    const transacciones = obtenerTransacciones();
    let total = 0;
    
    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].tipo === "salida") {
            total = total + transacciones[i].valor;
        }
    }
    
    return total;
}

// funcion para calcular el balance total
function calcularBalance() {
    const entradas = calcularEntradas();
    const salidas = calcularSalidas();
    const balance = entradas - salidas;
    return balance;
}
