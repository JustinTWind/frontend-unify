# 💰 Unify - Gestor Financiero Personal

Unify es una aplicación web para gestionar tus finanzas personales. Permite registrar ingresos y gastos, visualizar el balance total y buscar transacciones. Los datos se guardan en el navegador usando **localStorage** y **sessionStorage**.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Cómo Funciona](#-cómo-funciona)
- [Flujo de la Aplicación](#-flujo-de-la-aplicación)
- [Almacenamiento de Datos](#-almacenamiento-de-datos)
- [Instalación y Uso](#-instalación-y-uso)

---

## ✨ Características

- 🔐 **Sistema de autenticación**: Registro e inicio de sesión de usuarios
- 💵 **Gestión de transacciones**: Agregar y eliminar ingresos/gastos
- 🔍 **Búsqueda**: Filtrar transacciones por descripción o categoría
- 📊 **Resumen financiero**: Visualización de entradas, salidas y balance total
- 💾 **Persistencia de datos**: Los datos se guardan en el navegador (localStorage)
- 🔄 **Sesiones**: La sesión del usuario se mantiene mientras el navegador esté abierto (sessionStorage)

---

## 📁 Estructura del Proyecto

```
Proyecto-Integrador-FrontEnd/
│
├── index.html          # Página principal con HTML
├── style.css           # Estilos de la aplicación
├── Logo.png            # Logo de la aplicación
│
└── js/                 # Carpeta con módulos de JavaScript
    ├── storage.js      # Funciones para localStorage y sessionStorage
    ├── usuarios.js     # Lógica de registro e inicio de sesión
    ├── transacciones.js# CRUD de transacciones
    ├── ui.js           # Actualización de la interfaz
    └── app.js          # Archivo principal con eventos
```

### Descripción de cada archivo:

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Contiene la estructura HTML de la página de login y la página principal |
| `style.css` | Todos los estilos CSS con variables para colores y diseño responsive |
| `js/storage.js` | Módulo que encapsula las operaciones con localStorage y sessionStorage |
| `js/usuarios.js` | Maneja el registro de usuarios y la autenticación |
| `js/transacciones.js` | Contiene las funciones para crear, leer, buscar y eliminar transacciones |
| `js/ui.js` | Funciones para actualizar el DOM (mostrar transacciones, totales, etc.) |
| `js/app.js` | Punto de entrada que conecta los eventos con las funciones |

---

## 🛠 Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la página
- **CSS3**: Estilos con variables CSS y Flexbox/Grid
- **JavaScript (Vanilla)**: Lógica de la aplicación sin frameworks
- **localStorage**: Almacenamiento persistente de usuarios y transacciones
- **sessionStorage**: Manejo de la sesión del usuario actual

---

## ⚙ Cómo Funciona

### 1. Módulo de Almacenamiento (`storage.js`)

Este módulo proporciona funciones para interactuar con el almacenamiento del navegador:

```javascript
// Guardar datos en localStorage
guardarEnLocalStorage(clave, datos)

// Obtener datos de localStorage
obtenerDeLocalStorage(clave)

// Guardar sesión en sessionStorage
guardarSesion(usuario)

// Obtener sesión actual
obtenerSesion()

// Verificar si hay sesión activa
haySesionActiva()
```

**¿Por qué dos tipos de almacenamiento?**
- `localStorage`: Los datos persisten incluso al cerrar el navegador. Se usa para guardar usuarios y transacciones.
- `sessionStorage`: Los datos se borran al cerrar el navegador. Se usa para la sesión del usuario (así debe volver a iniciar sesión al abrir el navegador).

### 2. Módulo de Usuarios (`usuarios.js`)

Maneja la autenticación de usuarios:

```javascript
// Registrar un nuevo usuario
registrarUsuario(nombre, email, contrasena)

// Iniciar sesión
iniciarSesion(email, contrasena)

// Obtener el usuario que está logueado
obtenerUsuarioActual()
```

**Estructura de un usuario en localStorage:**
```javascript
{
    id: 1706284800000,        // Timestamp como ID único
    nombre: "Mariana",
    email: "mariana@ejemplo.com",
    contrasena: "1234",       // En producción debería estar encriptada
    fechaRegistro: "26/1/2026"
}
```

### 3. Módulo de Transacciones (`transacciones.js`)

Gestiona las operaciones CRUD de transacciones:

```javascript
// Obtener todas las transacciones del usuario
obtenerTransacciones()

// Agregar una nueva transacción
agregarTransaccion(descripcion, valor, categoria, tipo)

// Eliminar una transacción por ID
eliminarTransaccion(id)

// Buscar transacciones por término
buscarTransacciones(termino)

// Calcular totales
calcularEntradas()
calcularSalidas()
calcularBalance()
```

**Estructura de una transacción:**
```javascript
{
    id: 1706284800000,
    descripcion: "Salario",
    valor: 3500000,
    categoria: "Trabajo",
    tipo: "entrada",          // "entrada" o "salida"
    fecha: "26/1/2026"
}
```

### 4. Módulo de Interfaz (`ui.js`)

Actualiza el DOM con los datos:

```javascript
// Formatear números como moneda colombiana
formatearDinero(numero)  // Retorna: "COP$ 3.500.000,00"

// Mostrar transacciones en la tabla
mostrarTransacciones(transacciones)

// Actualizar los totales en las tarjetas
actualizarTotales()

// Mostrar/ocultar páginas
mostrarLogin()
mostrarPaginaPrincipal()
```

### 5. Archivo Principal (`app.js`)

Conecta los eventos del DOM con las funciones de los módulos:

- Evento `submit` del formulario de login
- Evento `submit` del formulario de registro
- Evento `submit` del formulario de transacciones
- Evento `click` del botón de búsqueda
- Evento `click` del botón de cerrar sesión
- Eventos para cambiar entre formularios

---

## 🔄 Flujo de la Aplicación

```
┌─────────────────────────────────────────────────────────────┐
│                    INICIO DE LA APP                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ ¿Hay sesión     │
                    │ activa?         │
                    └─────────────────┘
                      │           │
                     NO          SÍ
                      │           │
                      ▼           ▼
            ┌──────────────┐  ┌──────────────────┐
            │ PÁGINA LOGIN │  │ PÁGINA PRINCIPAL │
            └──────────────┘  └──────────────────┘
                   │                    │
                   ▼                    ▼
        ┌─────────────────┐    ┌────────────────────┐
        │ Usuario ingresa │    │ Se cargan las      │
        │ credenciales    │    │ transacciones del  │
        └─────────────────┘    │ usuario            │
                   │           └────────────────────┘
                   ▼                    │
        ┌─────────────────┐            ▼
        │ ¿Credenciales   │    ┌────────────────────┐
        │ válidas?        │    │ Usuario puede:     │
        └─────────────────┘    │ - Ver transacciones│
              │      │         │ - Agregar nuevas   │
             NO     SÍ         │ - Eliminar         │
              │      │         │ - Buscar           │
              ▼      │         │ - Cerrar sesión    │
        ┌─────────┐  │         └────────────────────┘
        │ Error   │  │
        └─────────┘  │
                     ▼
           ┌─────────────────┐
           │ Guardar sesión  │
           │ en sessionStorage│
           └─────────────────┘
                     │
                     ▼
           ┌─────────────────┐
           │ Ir a página     │
           │ principal       │
           └─────────────────┘
```

### Flujo de Registro:

1. Usuario llena el formulario de registro
2. Se valida que las contraseñas coincidan
3. Se verifica que el email no esté registrado
4. Se crea el usuario y se guarda en localStorage
5. Se redirige al formulario de login

### Flujo de Login:

1. Usuario ingresa email y contraseña
2. Se busca el usuario en localStorage
3. Si existe y la contraseña coincide, se guarda la sesión en sessionStorage
4. Se muestra la página principal con las transacciones del usuario

### Flujo de Transacciones:

1. Usuario hace clic en "Nueva Transacción"
2. Se abre el modal con el formulario
3. Llena descripción, valor, categoría y tipo
4. Se guarda en localStorage bajo la clave `transacciones_{userId}`
5. Se actualiza la tabla y los totales

---

## 💾 Almacenamiento de Datos

### Claves en localStorage:

| Clave | Contenido |
|-------|-----------|
| `usuarios` | Array con todos los usuarios registrados |
| `transacciones_{userId}` | Array con las transacciones de cada usuario |

### Clave en sessionStorage:

| Clave | Contenido |
|-------|-----------|
| `sesionActual` | Objeto con los datos del usuario logueado |

### Ejemplo de datos almacenados:

```javascript
// localStorage["usuarios"]
[
    {
        id: 1706284800000,
        nombre: "Mariana",
        email: "mariana@ejemplo.com",
        contrasena: "1234",
        fechaRegistro: "26/1/2026"
    }
]

// localStorage["transacciones_1706284800000"]
[
    {
        id: 1706284900000,
        descripcion: "Salario mensual",
        valor: 3500000,
        categoria: "Trabajo",
        tipo: "entrada",
        fecha: "26/1/2026"
    },
    {
        id: 1706285000000,
        descripcion: "Almuerzo",
        valor: 25000,
        categoria: "Alimentación",
        tipo: "salida",
        fecha: "26/1/2026"
    }
]

// sessionStorage["sesionActual"]
{
    id: 1706284800000,
    nombre: "Mariana",
    email: "mariana@ejemplo.com"
}
```

---

## 🚀 Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JustinTWind/frontend-unify.git
   ```

2. **Abrir el proyecto:**
   ```bash
   cd frontend-unify
   ```

3. **Ejecutar:**
   - Abre el archivo `index.html` en tu navegador
   - O usa una extensión como "Live Server" en VS Code

4. **Usar la aplicación:**
   - Crea una cuenta con el formulario de registro
   - Inicia sesión con tus credenciales
   - Comienza a registrar tus transacciones

---

## 👥 Autores

- **Mariana Marin** - Desarrollo Frontend

---

## 📝 Licencia

Este proyecto es de uso educativo.
