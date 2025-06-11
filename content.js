// Función para inyectar o remover estilos
function toggleStyles(enabled) {
    let styleElement = document.getElementById('whatsapp-dark-style');
    
    if (enabled) {
        if (!styleElement) {
            styleElement = document.createElement('link');
            styleElement.id = 'whatsapp-dark-style';
            styleElement.rel = 'stylesheet';
            styleElement.href = chrome.runtime.getURL('style.css');
            document.head.appendChild(styleElement);
            console.log('Estilos de modo oscuro aplicados');
        }
    } else {
        if (styleElement) {
            styleElement.remove();
            console.log('Estilos de modo oscuro eliminados');
        }
    }
}

// Cargar el estado guardado al iniciar
chrome.storage.sync.get(['darkModeEnabled'], function(result) {
    const isDarkMode = result.darkModeEnabled !== undefined ? result.darkModeEnabled : true;
    toggleStyles(isDarkMode);
});

// Escuchar mensajes del popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleDarkMode') {
        toggleStyles(request.enabled);
    }
});
