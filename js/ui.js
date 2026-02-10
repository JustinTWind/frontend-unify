function formatearDinero(numero) {
  const numeroFormateado = numero.toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return "COP$ " + numeroFormateado;
}

function mostrarTransacciones(transacciones) {
  const tbody = document.querySelector(".tabla-transacciones tbody");

  tbody.innerHTML = "";

  if (transacciones.length === 0) {
    const filaVacia = document.createElement("tr");
    filaVacia.innerHTML =
      '<td colspan="5" style="text-align: center;">No hay transacciones registradas</td>';
    tbody.appendChild(filaVacia);
    return;
  }

  for (let i = 0; i < transacciones.length; i++) {
    const transaccion = transacciones[i];

    const fila = document.createElement("tr");

    let claseValor = "";
    let valorTexto = "";

    if (transaccion.tipo === "entrada") {
      claseValor = "entrada";
      valorTexto = formatearDinero(transaccion.valor);
    } else {
      claseValor = "salida";
      valorTexto = "- " + formatearDinero(transaccion.valor);
    }

    fila.innerHTML =
      '<td width="40%">' +
      transaccion.descripcion +
      "</td>" +
      '<td class="' +
      claseValor +
      '">' +
      valorTexto +
      "</td>" +
      "<td>" +
      transaccion.categoria +
      "</td>" +
      "<td>" +
      transaccion.fecha +
      "</td>" +
      "<td>" +
      '<button class="boton-editar" data-id="' +
      transaccion.id +
      '">✎</button>' +
      '<button class="boton-eliminar" data-id="' +
      transaccion.id +
      '">✕</button>' +
      "</td>";

    tbody.appendChild(fila);
  }

  agregarEventosEliminar();
  agregarEventosEditar();
}

function agregarEventosEliminar() {
  const botones = document.querySelectorAll(".boton-eliminar");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function (evento) {
      const id = parseInt(this.getAttribute("data-id"));

      const confirmar = confirm("¿Estas seguro de eliminar esta transaccion?");

      if (confirmar) {
        eliminarTransaccion(id);
        actualizarPagina();
      }
    });
  }
}

function agregarEventosEditar() {
  const botones = document.querySelectorAll(".boton-editar");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      cargarTransaccionEnFormulario(id);
    });
  }
}

function cargarTransaccionEnFormulario(id) {
  const transaccion = obtenerTransaccionPorId(id);

  if (transaccion === null) {
    alert("No se encontro la transaccion");
    return;
  }

  document.getElementById("input-descripcion").value = transaccion.descripcion;
  document.getElementById("input-valor").value = transaccion.valor;
  document.getElementById("input-categoria").value = transaccion.categoria;

  const radios = document.querySelectorAll('input[name="tipo"]');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].value === transaccion.tipo) {
      radios[i].checked = true;
    } else {
      radios[i].checked = false;
    }
  }

  document.querySelector(".modal-header h2").textContent = "Editar transacción";
  document.querySelector(".boton-registrar").textContent = "Guardar cambios";

  transaccionEditandoId = id;

  document.getElementById("toggle-modal").checked = true;
}

function resetearModal() {
  document.querySelector(".modal-header h2").textContent = "Nueva transacción";
  document.querySelector(".boton-registrar").textContent = "Registrar";
  transaccionEditandoId = null;
}

function actualizarTotales() {
  const entradas = calcularEntradas();
  const salidas = calcularSalidas();
  const balance = calcularBalance();

  const tarjetas = document.querySelectorAll(".tarjeta strong");

  tarjetas[0].textContent = formatearDinero(entradas);
  tarjetas[1].textContent = formatearDinero(salidas);
  tarjetas[2].textContent = formatearDinero(balance);
}

function actualizarPagina() {
  const transacciones = obtenerTransacciones();
  mostrarTransacciones(transacciones);
  actualizarTotales();
}

function mostrarLogin() {
  document.getElementById("pagina-login").style.display = "flex";
  document.getElementById("pagina-principal").style.display = "none";
}

function mostrarPaginaPrincipal() {
  document.getElementById("pagina-login").style.display = "none";
  document.getElementById("pagina-principal").style.display = "block";

  const usuario = obtenerUsuarioActual();
  if (usuario !== null) {
    document.getElementById("nombre-usuario").textContent = usuario.nombre;
  }

  actualizarPagina();
  actualizarFooterDolar();
}

function mostrarFormularioRegistro() {
  document.getElementById("form-login").style.display = "none";
  document.getElementById("form-registro").style.display = "flex";
}

function mostrarFormularioLogin() {
  document.getElementById("form-login").style.display = "flex";
  document.getElementById("form-registro").style.display = "none";
}
