// ========================================
//         MODULO DE TRANSACCIONES
// ========================================

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

function guardarTransacciones(transacciones) {
    const usuario = obtenerUsuarioActual();
    
    if (usuario === null) {
        console.log("No hay usuario logueado");
        return;
    }
    
    guardarEnLocalStorage("transacciones_" + usuario.id, transacciones);
}

function agregarTransaccion(descripcion, valor, categoria, tipo) {
    const transacciones = obtenerTransacciones();
    
    const nuevaTransaccion = {
        id: Date.now(),
        descripcion: descripcion,
        valor: parseFloat(valor),
        categoria: categoria,
        tipo: tipo, // "entrada" o "salida"
        fecha: new Date().toLocaleDateString()
    };
    
    transacciones.unshift(nuevaTransaccion);

    guardarTransacciones(transacciones);
    
    console.log("Transaccion agregada: " + descripcion);
    return nuevaTransaccion;
}

function eliminarTransaccion(id) {
    const transacciones = obtenerTransacciones();
    
    const nuevasTransacciones = [];
    
    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].id !== id) {
            nuevasTransacciones.push(transacciones[i]);
        }
    }
    
    guardarTransacciones(nuevasTransacciones);
    
    console.log("Transaccion eliminada con id: " + id);
}

function buscarTransacciones(termino) {
    const transacciones = obtenerTransacciones();
    
    if (termino === "" || termino === null) {
        return transacciones;
    }
    
    const terminoMinuscula = termino.toLowerCase();
    
    const resultados = [];
    
    for (let i = 0; i < transacciones.length; i++) {
        const descripcion = transacciones[i].descripcion.toLowerCase();
        const categoria = transacciones[i].categoria.toLowerCase();
        
        if (descripcion.indexOf(terminoMinuscula) !== -1 || categoria.indexOf(terminoMinuscula) !== -1) {
            resultados.push(transacciones[i]);
        }
    }
    
    return resultados;
}

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

function calcularBalance() {
    const entradas = calcularEntradas();
    const salidas = calcularSalidas();
    const balance = entradas - salidas;
    return balance;
}
