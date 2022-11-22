const { app, BrowserWindow, protocol, screen } = require("electron");
const path = require("path");
const url = require("url");

const handleStartup = () => {
  if (process.platform !== 'win32') return false;

  let squirrelCommand = process.argv[1];

  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      app.quit();
      return true;
    case '--squirrel-uninstall':
      app.quit();
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
    default:
      break;
  }
}

const createWindow = () => {  
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const appUrl = !app.isPackaged ? "http://localhost:3000" : url.format({ pathname: path.join(__dirname, "index.html"), protocol: "file:", slashes: true })
  
  win.maximize();
  win.setMenuBarVisibility(false);
  win.loadURL(appUrl);
  
  if (!app.isPackaged ) win.webContents.openDevTools({ mode: "detach" });
}

const setupLocalFilesNormalizerProxy = () =>  {
  protocol.registerHttpProtocol("file", (request, callback) => {
    if(!request.url) console.error("Failed to register protocol");
    else {        
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    }
  });
}

handleStartup();

app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});