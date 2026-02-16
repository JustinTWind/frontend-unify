// ========================================
// EXPOSICIÓN - SCRIPT PRINCIPAL
// Maneja la navegación y animaciones
// ========================================

// Lista de secciones en orden
const secciones = ['intro', 'arquitectura', 'indexhtml', 'storage', 'usuarios', 'transacciones', 'ui', 'app', 'fetch'];

// Estado actual
let seccionActual = 'intro';

// ========================================
// NAVEGACIÓN
// ========================================

// Función para navegar a una sección
function navegarSeccion(seccionId) {
    // Remover clase active de la sección actual
    const seccionAnterior = document.getElementById(seccionActual);
    if (seccionAnterior) {
        seccionAnterior.classList.remove('active');
    }
    
    // Agregar clase active a la nueva sección
    const nuevaSeccion = document.getElementById(seccionId);
    if (nuevaSeccion) {
        nuevaSeccion.classList.add('active');
        
        // Scroll al inicio de la sección
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Actualizar estado
        seccionActual = seccionId;
        
        // Actualizar navegación lateral
        actualizarNavegacion(seccionId);
        
        // Actualizar barra de progreso
        actualizarProgreso();
        
        // Re-ejecutar animaciones
        reiniciarAnimaciones(nuevaSeccion);
    }
}

// Actualizar navegación lateral
function actualizarNavegacion(seccionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('data-section') === seccionId) {
            link.classList.add('active');
        }
    });
}

// Actualizar barra de progreso
function actualizarProgreso() {
    const indiceActual = secciones.indexOf(seccionActual);
    const porcentaje = Math.round(((indiceActual + 1) / secciones.length) * 100);
    
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill) {
        progressFill.style.width = porcentaje + '%';
    }
    
    if (progressText) {
        progressText.textContent = porcentaje + '%';
    }
}

// Reiniciar animaciones de una sección
function reiniciarAnimaciones(seccion) {
    const elementosAnimados = seccion.querySelectorAll('[class*="animate-"]');
    
    elementosAnimados.forEach(elemento => {
        // Guardar las clases de animación
        const clases = elemento.className;
        
        // Remover y re-agregar para reiniciar la animación
        elemento.style.animation = 'none';
        elemento.offsetHeight; // Trigger reflow
        elemento.style.animation = null;
    });
}

// ========================================
// EVENTOS DE NAVEGACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Exposición cargada');
    
    // Eventos para los links de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(evento) {
            evento.preventDefault();
            
            const seccionId = this.getAttribute('data-section');
            navegarSeccion(seccionId);
        });
    });
    
    // Eventos para los items del árbol de archivos
    const treeItems = document.querySelectorAll('.tree-item.highlight');
    
    treeItems.forEach(item => {
        item.addEventListener('click', function() {
            const modulo = this.getAttribute('data-module');
            if (modulo) {
                navegarSeccion(modulo);
            }
        });
    });
    
    // Eventos para los módulos del diagrama
    const moduleBoxes = document.querySelectorAll('.module-box');
    
    moduleBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const clases = this.classList;
            
            if (clases.contains('storage')) navegarSeccion('storage');
            if (clases.contains('usuarios')) navegarSeccion('usuarios');
            if (clases.contains('transacciones')) navegarSeccion('transacciones');
            if (clases.contains('ui')) navegarSeccion('ui');
            if (clases.contains('app')) navegarSeccion('app');
        });
        
        // Hacer que sean clickeables visualmente
        box.style.cursor = 'pointer';
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(evento) {
        const indiceActual = secciones.indexOf(seccionActual);
        
        // Flecha derecha o abajo - siguiente sección
        if (evento.key === 'ArrowRight' || evento.key === 'ArrowDown') {
            evento.preventDefault();
            if (indiceActual < secciones.length - 1) {
                navegarSeccion(secciones[indiceActual + 1]);
            }
        }
        
        // Flecha izquierda o arriba - sección anterior
        if (evento.key === 'ArrowLeft' || evento.key === 'ArrowUp') {
            evento.preventDefault();
            if (indiceActual > 0) {
                navegarSeccion(secciones[indiceActual - 1]);
            }
        }
        
        // Tecla Home - ir al inicio
        if (evento.key === 'Home') {
            evento.preventDefault();
            navegarSeccion('intro');
        }
        
        // Tecla End - ir al final
        if (evento.key === 'End') {
            evento.preventDefault();
            navegarSeccion('app');
        }
    });
    
    // Inicializar progreso
    actualizarProgreso();
    
    // Animar elementos cuando aparecen en el viewport
    observarElementos();
});

// ========================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// ========================================

function observarElementos() {
    const opciones = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, opciones);
    
    // Observar elementos con animaciones
    const elementosAnimados = document.querySelectorAll('.feature-card, .function-card, .event-card');
    
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });
}

// ========================================
// EFECTOS ADICIONALES
// ========================================

// Efecto de typing para código (opcional)
function typeCode(elemento, texto, velocidad = 50) {
    let i = 0;
    elemento.innerHTML = '';
    
    function escribir() {
        if (i < texto.length) {
            elemento.innerHTML += texto.charAt(i);
            i++;
            setTimeout(escribir, velocidad);
        }
    }
    
    escribir();
}

// Efecto hover en las tarjetas de módulos
document.querySelectorAll('.module-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.zIndex = '10';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
});

// ========================================
// RESPONSIVE - MENÚ MÓVIL
// ========================================

// Crear botón de menú para móvil
function crearBotonMenu() {
    const boton = document.createElement('button');
    boton.className = 'menu-toggle';
    boton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
    `;
    boton.style.cssText = `
        display: none;
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 200;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 0.75rem;
        cursor: pointer;
        color: var(--text-primary);
    `;
    
    document.body.appendChild(boton);
    
    // Mostrar en móvil
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMediaChange(e) {
        boton.style.display = e.matches ? 'block' : 'none';
    }
    
    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);
    
    // Toggle sidebar
    boton.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
    });
    
    // Cerrar sidebar al hacer click en un link (móvil)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('open');
            }
        });
    });
}

// Inicializar botón de menú
document.addEventListener('DOMContentLoaded', crearBotonMenu);

// ========================================
// TOOLTIPS PARA LOS MÓDULOS
// ========================================

const tooltips = {
    storage: 'Maneja localStorage y sessionStorage',
    usuarios: 'Registro e inicio de sesión',
    transacciones: 'CRUD de ingresos y gastos',
    ui: 'Actualización del DOM',
    app: 'Punto de entrada y eventos'
};

document.querySelectorAll('.module-box').forEach(box => {
    const clases = box.classList;
    let modulo = '';
    
    if (clases.contains('storage')) modulo = 'storage';
    if (clases.contains('usuarios')) modulo = 'usuarios';
    if (clases.contains('transacciones')) modulo = 'transacciones';
    if (clases.contains('ui')) modulo = 'ui';
    if (clases.contains('app')) modulo = 'app';
    
    if (modulo && tooltips[modulo]) {
        box.setAttribute('title', tooltips[modulo]);
    }
});

// ========================================
// CONTADOR DE TIEMPO DE LECTURA
// ========================================

function calcularTiempoLectura() {
    const contenido = document.querySelector('.main-content');
    const texto = contenido.innerText;
    const palabras = texto.split(/\s+/).length;
    const tiempoMinutos = Math.ceil(palabras / 200); // 200 palabras por minuto
    
    console.log(`Tiempo estimado de lectura: ${tiempoMinutos} minutos`);
    return tiempoMinutos;
}

// ========================================
// ATAJOS DE TECLADO INFO
// ========================================

console.log(`
🎹 Atajos de Teclado:
   → ↓  : Siguiente sección
   ← ↑  : Sección anterior
   Home : Ir al inicio
   End  : Ir al final
`);
