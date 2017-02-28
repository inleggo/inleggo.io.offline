/*
Usuario de prueba: 41468609
*/
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   return;
}
// cometario
const electron = require('electron');
const {Menu} = require('electron');
const app = electron.app;


const template = [
  {
    label: 'Editar',
    submenu: [
      {
        label: 'Deshacer',
        role: 'undo'
      },
      {
        label: 'Rehacer',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cortar',
        role: 'cut'
      },
      {
        label: 'Copiar',
        role: 'copy'
      },
      {
        label: 'Pegar',
        role: 'paste'
      },
      {
        label: 'Eliminar',
        role: 'delete'
      },
      {
        label: 'Seleccionar todo',
        role: 'selectall'
      },
      {
          type: 'separator'
      },
      {
          label: 'Salir',
          click: () => {
              app.quit();
          }
      }
    ]
  },
  {
    label: 'Ver',
    submenu: [
      {
        label: 'Recargar',
        role: 'reload'
      },
      {
        label: 'Forzar recarga',
        role: 'forcereload'
      },
      {
        type: 'separator'
      },
      {
        label: 'Modo Desarrollador',
        role: 'toggledevtools'
      },
      {
        label: 'Pantalla completa',
        role: 'togglefullscreen'
      }
    ]
  },
  {
    label: 'Ayuda',
    role: 'help',
    submenu: [
      {
          label: 'Inleggo.com',
          click () { require('electron').shell.openExternal('http://inleggo.com') }
      },
      {
        label: 'Inleggo.io',
        click () { require('electron').shell.openExternal('http://inleggo.io') }
      },
      {
        label: 'Información',
        click () { require('electron').shell.openExternal('http://info.inleggo.com') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
  // Edit menu.
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  )
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);



const path = require('path');
const url = require('url');
const remote = require('electron').remote;
const BrowserWindow = electron.BrowserWindow;

var win;
var $ = require('jquery');
//const {BrowserWindow} = require('electron').remote;
app.on('ready',function(){
	win = new BrowserWindow({nodeIntegration: true, width: 900, height: 630,backgroundColor: '#ffffff',frame: false});
	//win.loadURL('https://inleggo.io');
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'app/login.html'),
		protocol: 'file:',
		slashes: true
	}));
  //win.setIgnoreMouseEvents(true);

});


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
