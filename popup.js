function applyColors(accentColor, backgroundColor) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateColors',
            accentColor: accentColor,
            backgroundColor: backgroundColor
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const accentColorPicker = document.getElementById('accentColor');
    const backgroundColorPicker = document.getElementById('backgroundColor');
    const applyButton = document.getElementById('applyColor');
    
    chrome.storage.sync.get(['accentColor', 'backgroundColor'], function(result) {
        if (result.accentColor) {
            accentColorPicker.value = result.accentColor;
        }
        if (result.backgroundColor) {
            backgroundColorPicker.value = result.backgroundColor;
        }
    });
    
    applyButton.addEventListener('click', function() {
        const selectedAccentColor = accentColorPicker.value;
        const selectedBackgroundColor = backgroundColorPicker.value;
        
        chrome.storage.sync.set({
            accentColor: selectedAccentColor,
            backgroundColor: selectedBackgroundColor
        }, function() {
            console.log('Colores guardados:', { 
                accentColor: selectedAccentColor, 
                backgroundColor: selectedBackgroundColor 
            });
        });
        
        applyColors(selectedAccentColor, selectedBackgroundColor);
        
        window.close();
    });
});
