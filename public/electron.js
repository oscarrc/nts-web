const { app, BrowserWindow, protocol, screen } = require("electron");
const path = require("path");
const url = require("url");

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