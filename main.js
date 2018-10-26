console.log("Hello from electron")

const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require("path")
const url = require("url")
const Menu = electron.Menu


let win;

function createWindow(){
    win = new BrowserWindow({width: 1200, height: 800, minHeight: 800, minWidth: 1200, maxHeight:800, maxWidth: 1200, show: false})
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))

    // win.webContents.openDevTools()

    win.on('closed', () => {
    win = null
    })

    win.once('ready-to-show', () => {
        win.show();
    })

}

app.on('ready',function(){
    createWindow();

    const template = [
        // {
        //   label: 'Edit',
        //   submenu: [
        //     {role: 'copy'},
        //     {role: 'selectall'}
        //   ]
        // },
        // {
        //   label: 'View',
        //   submenu: [
        //     {role: 'reload'},
        //     {role: 'forcereload'},
        //     {type: 'separator'},
        //     {role: 'resetzoom'},
        //     {role: 'zoomin'},
        //     {role: 'zoomout'}
        //   ]
        // },
        {
          role: 'window',
          submenu: [
            {role: 'minimize'},
            {role: 'close'}
          ]
        }
        // {
        //   role: 'help',
        //   submenu: [
        //     {
        //       label: 'Learn More',
        //       click () { require('electron').shell.openExternal('https://shayaribox.com') }
        //     }
        //   ]
        // }
      ]
      
      if (process.platform === 'darwin') {
        template.unshift({
          label: app.getName(),
          submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services', submenu: []},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
          ]
        })
      
      
        // Window menu
        // template[3].submenu = [
        //   {role: 'close'},
        //   {role: 'minimize'},
        //   {role: 'zoom'},
        //   {type: 'separator'},
        //   {role: 'front'}
        // ]
      }
      
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})




app.on('window-all-closed', () => {
    if(process.platform !=='darwin'){
        app.quit()
    }
})


