// Inyectar el CSS al cargar la página
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('style.css');
document.head.appendChild(link);

// Función para cambiar el texto
function cambiarTexto() {
    const divAlx = document.querySelector('div._al_x');
    
    if (divAlx) {
        const spans = divAlx.querySelectorAll('span');
        
        if (spans.length >= 2) {
            console.log('¡Elemento encontrado! Cambiando texto...');
            spans[1].textContent = 'Mod by Santiago Cardona';
            return true;
        }
    }
    return false;
}

// Intentar cambiar el texto inmediatamente
let textoCambiado = cambiarTexto();

// Si no se pudo cambiar, configurar el observador
if (!textoCambiado) {
    console.log('Esperando a que el elemento se cargue...');
    
    const observer = new MutationObserver(function() {
        if (cambiarTexto()) {
            console.log('¡Texto cambiado exitosamente!');
            observer.disconnect();
        }
    });

    // Observar cambios en el documento
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}