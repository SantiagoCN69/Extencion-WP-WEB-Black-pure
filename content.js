// Inyectar el CSS al cargar la página
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('style.css');
link.id = 'whatsapp-dark-theme';
document.head.appendChild(link);


function updateColors(accentColor, backgroundColor) {
    if (accentColor) {
        document.documentElement.style.setProperty('--accent-color', accentColor);
        
        const styleElement = document.createElement('style');
        styleElement.id = 'accent-color-override';
        styleElement.textContent = `
            a, a:visited, a:hover, a:active {
                color: ${accentColor} !important;
            }
        `;
        
        const oldStyle = document.getElementById('accent-color-override');
        if (oldStyle) {
            document.head.removeChild(oldStyle);
        }
        
        document.head.appendChild(styleElement);
        console.log('Color de acento actualizado a:', accentColor);
    }
    
    if (backgroundColor) {
        document.documentElement.style.setProperty('--background-color', backgroundColor);
        
        const hex = backgroundColor.replace('#', '');
        let newHex = '#';
        for (let i = 0; i < hex.length; i++) {
            const char = hex[i];
            const value = parseInt(char, 16);
            const newValue = Math.min(15, value + 1);
            newHex += newValue.toString(16).toUpperCase();
        }
        
        // Calcular color para mensajes propios (4 valores más claro)
        let msgMiosHex = '#';
        for (let i = 0; i < hex.length; i++) {
            const char = hex[i];
            const value = parseInt(char, 16);
            const newValue = Math.min(15, value + 4);
            msgMiosHex += newValue.toString(16).toUpperCase();
        }
        
        document.documentElement.style.setProperty('--background-color-claro', newHex);
        document.documentElement.style.setProperty('--msg-mios', msgMiosHex);
        console.log('Color de fondo actualizado a:', backgroundColor);
        console.log('Color de fondo claro actualizado a:', newHex);
        console.log('Color de mensajes propios actualizado a:', msgMiosHex);
    }
}

class Color {
    constructor(hex) {
        this.hex = hex.startsWith('#') ? hex : `#${hex}`;
        this.r = parseInt(this.hex.slice(1, 3), 16);
        this.g = parseInt(this.hex.slice(3, 5), 16);
        this.b = parseInt(this.hex.slice(5, 7), 16);
    }
    
    lighten(amount) {
        const r = Math.min(255, Math.floor(this.r + (255 - this.r) * amount));
        const g = Math.min(255, Math.floor(this.g + (255 - this.g) * amount));
        const b = Math.min(255, Math.floor(this.b + (255 - this.b) * amount));
        return new Color(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
    }
    
    toHex() {
        return this.hex;
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateColors') {
        updateColors(request.accentColor, request.backgroundColor);
    }
});
chrome.storage.sync.get(['accentColor', 'backgroundColor'], function(result) {
    updateColors(result.accentColor, result.backgroundColor);
});

// Función para aplicar todos los cambios
function applyAllChanges() {
  cambiarTexto();
  agregarBotonMods();
  actualizarTitulo();
  actualizarMensaje();
  actualizarMod();
}

// Observar cambios en el DOM para mantener los cambios
const observer = new MutationObserver((mutations) => {
  let shouldApplyChanges = false;
  
  // Verificar si hay cambios relevantes
  for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldApplyChanges = true;
          break;
      }
  }
  
  if (shouldApplyChanges) {
      applyAllChanges();
  }
});

// Iniciar el observador
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Aplicar cambios iniciales
applyAllChanges();

// Función para actualizar el título
function actualizarTitulo() {
  const titulo = document.querySelector('h1.xib59rt.xdhfpv1.x1iikomf.xx75k7l');
  if (titulo && titulo.textContent !== "Bienvenid@ a WhatsApp") {
      titulo.textContent = "Bienvenid@ a WhatsApp";
  }
}

// Función para actualizar el mensaje
function actualizarMensaje() {
  const mensaje = document.querySelector('div.xqui205.x1f6kntn.x16h55sf.x1fcty0u.x1rw0npd');
  if (mensaje && mensaje.textContent !== "Aquí podrás enviar mensajes, compartir archivos y mantenerte conectado fácilmente desde tu computador.") {
      mensaje.textContent = "Aquí podrás enviar mensajes, compartir archivos y mantenerte conectado fácilmente desde tu computador.";
  }
}

// Función para actualizar el texto del mod
function actualizarMod() {
  const divMod = document.querySelector('div.x1f6kntn.xhslqc4.xk82a7y.xg87l8a');
  if (divMod && divMod.textContent !== "Mod by Santiago Cardona Nossa") {
      divMod.textContent = "Mod by Santiago Cardona Nossa";
  }
}

// Resto de tus funciones existentes...
function cambiarTexto() {
  const divAlx = document.querySelector('div._al_x');
  
  if (divAlx && !divAlx.querySelector('span[style*="vertical-align: middle"]')) {
      console.log('¡Elemento encontrado! Cambiando texto...');
      divAlx.innerHTML = `
      <span style="vertical-align: middle;">Mod by Santiago Cardona Nossa</span>
      <a href="https://github.com/SantiagoCN69/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" 
           x="0px" y="0px" 
           width="24" 
           height="24" 
           viewBox="0 0 30 30"
           style="vertical-align: middle; margin-left: 2px; margin-bottom: 2px; background-color: #fff; border-radius: 50%; display: inline; cursor: pointer;">
          <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"/>
      </svg>
      </a>`;
      return true;
  }
  return false;
}

function agregarBotonMods() {
  const contenedor = document.querySelector('div._al_t');
  
  if (contenedor && !contenedor.querySelector('a[href="#"]')) {
      console.log('Contenedor encontrado, agregando enlace...');
      // Crear el botón
      const boton = document.createElement('a');
      boton.href = '#';
      boton.className = 'x889kno x1a8lsjc x13jy36j x64bnmy x1n2onr6 x1rg5ohu xk50ysn x1f6kntn xyesn5m x1rl75mt x19t5iym xz7t8uv x13xmedi x178xt8z x1lun4ml xso031l xpilrb4 x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x1v8p93f x1o3jo1z x16stqrj xv5lvn5 x1hl8ikr xfagghw x9dyr19 x9lcvmn xbtce8p xcjl5na x14v0smp x1k3x3db xgm1il4 xuxw1ft xv52azi boton-mods-hover';
      boton.style.color = 'var(--background-color) !important';
      boton.style.textDecoration = 'none';
      boton.textContent = '🔗 Ver más mods';
      
      // Agregar el manejador de eventos
      boton.addEventListener('click', (e) => {
          e.preventDefault();
          window.alert('¡Próximamente más mods!');
      });
      
      // Limpiar el contenedor y agregar el botón
      contenedor.innerHTML = '';
      contenedor.appendChild(boton);
      return true;
  }
  return false;
}