let transaccionEditandoId = null;

document.addEventListener("DOMContentLoaded", function () {
  console.log("Aplicacion cargada");

  if (haySesionActiva()) {
    mostrarPaginaPrincipal();
  } else {
    mostrarLogin();
  }

  const formLogin = document.getElementById("form-login");
  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = document.getElementById("login-email").value;
    const contrasena = document.getElementById("login-password").value;

    const exito = iniciarSesion(email, contrasena);

    if (exito) {
      mostrarPaginaPrincipal();
      formLogin.reset();
    }
  });

  const formRegistro = document.getElementById("form-registro");
  formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("registro-nombre").value;
    const email = document.getElementById("registro-email").value;
    const contrasena = document.getElementById("registro-password").value;
    const confirmarContrasena = document.getElementById(
      "registro-confirm-password",
    ).value;

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (contrasena.length < 4) {
      alert("La contraseña debe tener al menos 4 caracteres");
      return;
    }

    const exito = registrarUsuario(nombre, email, contrasena);

    if (exito) {
      alert("Registro exitoso! Ahora puedes iniciar sesion");
      mostrarFormularioLogin();
      formRegistro.reset();
    }
  });

  const btnMostrarRegistro = document.getElementById("btn-mostrar-registro");
  btnMostrarRegistro.addEventListener("click", function (evento) {
    evento.preventDefault();
    mostrarFormularioRegistro();
  });

  const btnMostrarLogin = document.getElementById("btn-mostrar-login");
  btnMostrarLogin.addEventListener("click", function (evento) {
    evento.preventDefault();
    mostrarFormularioLogin();
  });

  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  btnCerrarSesion.addEventListener("click", function () {
    const confirmar = confirm("¿Estas seguro de cerrar sesion?");

    if (confirmar) {
      cerrarSesion();
      mostrarLogin();
    }
  });

  const formTransaccion = document.querySelector(".formulario");
  formTransaccion.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const descripcion = document.getElementById("input-descripcion").value;
    const valor = document.getElementById("input-valor").value;
    const categoria = document.getElementById("input-categoria").value;

    const tipoSeleccionado = document.querySelector(
      'input[name="tipo"]:checked',
    );

    if (tipoSeleccionado === null) {
      alert("Selecciona el tipo de transaccion (Entrada o Salida)");
      return;
    }

    const tipo = tipoSeleccionado.value;

    if (transaccionEditandoId !== null) {
      editarTransaccion(
        transaccionEditandoId,
        descripcion,
        valor,
        categoria,
        tipo,
      );
      alert("Transaccion editada correctamente!");
    } else {
      agregarTransaccion(descripcion, valor, categoria, tipo);
      alert("Transaccion agregada correctamente!");
    }

    actualizarPagina();

    formTransaccion.reset();

    resetearModal();

    document.getElementById("toggle-modal").checked = false;
  });

  const toggleModal = document.getElementById("toggle-modal");
  toggleModal.addEventListener("change", function () {
    if (!this.checked) {
      resetearModal();
      formTransaccion.reset();
    }
  });

  const botonNuevaTransaccion = document.querySelector(
    ".cabecera-derecha .boton-primario",
  );
  botonNuevaTransaccion.addEventListener("click", function () {
    resetearModal();
    formTransaccion.reset();
  });

  const inputBusqueda = document.querySelector(".busqueda input");
  const botonBuscar = document.querySelector(".boton-buscar");

  botonBuscar.addEventListener("click", function () {
    const termino = inputBusqueda.value;
    const resultados = buscarTransacciones(termino);
    mostrarTransacciones(resultados);

    if (resultados.length === 0 && termino !== "") {
      alert("No se encontraron transacciones con: " + termino);
    }
  });

  inputBusqueda.addEventListener("keypress", function (evento) {
    if (evento.key === "Enter") {
      const termino = inputBusqueda.value;
      const resultados = buscarTransacciones(termino);
      mostrarTransacciones(resultados);
    }
  });

  inputBusqueda.addEventListener("input", function () {
    if (this.value === "") {
      actualizarPagina();
    }
  });
});
