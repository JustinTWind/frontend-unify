async function obtenerTasaDolar() {
  try {
    const respuesta = await fetch("https://open.er-api.com/v6/latest/USD");
    const datos = await respuesta.json();

    const tasaCOP = datos.rates.COP;

    return tasaCOP;
  } catch (error) {
    console.error("Error al obtener la tasa de cambio:", error);
    return null;
  }
}

function actualizarFooterDolar() {
  obtenerTasaDolar().then((tasa) => {
    if (tasa !== null) {
      const elementoTasa = document.getElementById("tasa-dolar-footer");
      if (elementoTasa) {
        const tasaFormateada = tasa.toLocaleString("es-CO", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        elementoTasa.textContent = "1 USD = " + tasaFormateada + " COP";
      }
    }
  });
}
