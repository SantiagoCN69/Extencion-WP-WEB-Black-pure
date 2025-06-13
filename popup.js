// Función para aplicar el color de acento seleccionado
function applyAccentColor(color) {
    // Enviamos un mensaje al content script para que actualice el color
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateAccentColor',
            color: color
        });
    });
}

// Cargar el color guardado al abrir el popup
document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById('accentColor');
    const applyButton = document.getElementById('applyColor');
    
    // Cargar el color guardado si existe
    chrome.storage.sync.get(['accentColor'], function(result) {
        if (result.accentColor) {
            colorPicker.value = result.accentColor;
        }
    });
    
    // Aplicar el color cuando se hace clic en el botón
    applyButton.addEventListener('click', function() {
        const selectedColor = colorPicker.value;
        
        // Guardar el color seleccionado
        chrome.storage.sync.set({accentColor: selectedColor}, function() {
            console.log('Color guardado:', selectedColor);
        });
        
        // Aplicar el color
        applyAccentColor(selectedColor);
        
        // Cerrar el popup después de aplicar
        window.close();
    });
});
