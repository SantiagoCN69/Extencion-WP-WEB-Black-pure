// Inyectar el CSS al cargar la página
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('style.css');
document.head.appendChild(link);

// Función para cambiar el texto
function cambiarTexto() {
    const divAlx = document.querySelector('div._al_x');
    
    if (divAlx) {
        console.log('¡Elemento encontrado! Cambiando texto...');
        divAlx.textContent = 'Mod by Santiago Cardona';
        return true;
    }
    return false;
}

// El resto del código permanece igual
let textoCambiado = cambiarTexto();

if (!textoCambiado) {
    console.log('Esperando a que el elemento se cargue...');
    
    const observer = new MutationObserver(function() {
        if (cambiarTexto()) {
            console.log('¡Texto cambiado exitosamente!');
            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}