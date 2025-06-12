// Inyectar el CSS al cargar la página
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('style.css');
document.head.appendChild(link);
