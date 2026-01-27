// ========================================
// MODULO DE INTERFAZ DE USUARIO
// Este modulo maneja la actualizacion de la pagina
// ========================================

// funcion para formatear numeros como dinero colombiano
function formatearDinero(numero) {
    // formateamos el numero con separadores de miles
    const numeroFormateado = numero.toLocaleString("es-CO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return "COP$ " + numeroFormateado;
}

// funcion para mostrar las transacciones en la tabla
function mostrarTransacciones(transacciones) {
    const tbody = document.querySelector(".tabla-transacciones tbody");
    
    // limpiamos la tabla
    tbody.innerHTML = "";
    
    // si no hay transacciones mostramos un mensaje
    if (transacciones.length === 0) {
        const filaVacia = document.createElement("tr");
        filaVacia.innerHTML = '<td colspan="5" style="text-align: center;">No hay transacciones registradas</td>';
        tbody.appendChild(filaVacia);
        return;
    }
    
    // recorremos las transacciones y las mostramos
    for (let i = 0; i < transacciones.length; i++) {
        const transaccion = transacciones[i];
        
        // creamos la fila
        const fila = document.createElement("tr");
        
        // determinamos la clase del valor segun el tipo
        let claseValor = "";
        let valorTexto = "";
        
        if (transaccion.tipo === "entrada") {
            claseValor = "entrada";
            valorTexto = formatearDinero(transaccion.valor);
        } else {
            claseValor = "salida";
            valorTexto = "- " + formatearDinero(transaccion.valor);
        }
        
        // creamos el contenido de la fila
        fila.innerHTML = 
            '<td width="40%">' + transaccion.descripcion + '</td>' +
            '<td class="' + claseValor + '">' + valorTexto + '</td>' +
            '<td>' + transaccion.categoria + '</td>' +
            '<td>' + transaccion.fecha + '</td>' +
            '<td><button class="boton-eliminar" data-id="' + transaccion.id + '">✕</button></td>';
        
        tbody.appendChild(fila);
    }
    
    // agregamos eventos a los botones de eliminar
    agregarEventosEliminar();
}

// funcion para agregar eventos de eliminar a los botones
function agregarEventosEliminar() {
    const botones = document.querySelectorAll(".boton-eliminar");
    
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function(evento) {
            const id = parseInt(this.getAttribute("data-id"));
            
            // confirmamos antes de eliminar
            const confirmar = confirm("¿Estas seguro de eliminar esta transaccion?");
            
            if (confirmar) {
                eliminarTransaccion(id);
                actualizarPagina();
            }
        });
    }
}

// funcion para actualizar los totales en las tarjetas
function actualizarTotales() {
    const entradas = calcularEntradas();
    const salidas = calcularSalidas();
    const balance = calcularBalance();
    
    // obtenemos los elementos de las tarjetas
    const tarjetas = document.querySelectorAll(".tarjeta strong");
    
    // actualizamos los valores
    tarjetas[0].textContent = formatearDinero(entradas);
    tarjetas[1].textContent = formatearDinero(salidas);
    tarjetas[2].textContent = formatearDinero(balance);
}

// funcion para actualizar toda la pagina
function actualizarPagina() {
    const transacciones = obtenerTransacciones();
    mostrarTransacciones(transacciones);
    actualizarTotales();
}

// funcion para mostrar la pantalla de login
function mostrarLogin() {
    document.getElementById("pagina-login").style.display = "flex";
    document.getElementById("pagina-principal").style.display = "none";
}

// funcion para mostrar la pagina principal
function mostrarPaginaPrincipal() {
    document.getElementById("pagina-login").style.display = "none";
    document.getElementById("pagina-principal").style.display = "block";
    
    // actualizamos el nombre del usuario
    const usuario = obtenerUsuarioActual();
    if (usuario !== null) {
        document.getElementById("nombre-usuario").textContent = usuario.nombre;
    }
    
    // actualizamos la pagina con las transacciones
    actualizarPagina();
}

// funcion para mostrar formulario de registro
function mostrarFormularioRegistro() {
    document.getElementById("form-login").style.display = "none";
    document.getElementById("form-registro").style.display = "flex";
}

// funcion para mostrar formulario de login
function mostrarFormularioLogin() {
    document.getElementById("form-login").style.display = "flex";
    document.getElementById("form-registro").style.display = "none";
}
