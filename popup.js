// Elementos del DOM
const darkModeToggle = document.getElementById('darkModeToggle');

// Cargar el estado guardado
chrome.storage.sync.get(['darkModeEnabled'], function(result) {
    const isDarkMode = result.darkModeEnabled !== undefined ? result.darkModeEnabled : true;
    darkModeToggle.checked = isDarkMode;
});

// Escuchar cambios en el toggle
darkModeToggle.addEventListener('change', function() {
    const isEnabled = this.checked;
    
    // Guardar la preferencia
    chrome.storage.sync.set({darkModeEnabled: isEnabled}, function() {
        console.log('Modo oscuro ' + (isEnabled ? 'activado' : 'desactivado'));
        
        // Enviar mensaje al content script para aplicar/remover estilos
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url.includes('web.whatsapp.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleDarkMode', enabled: isEnabled});
            }
        });
    });
});
