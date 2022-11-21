const path = require("path");

const { app, screen, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

let installExtension, REACT_DEVELOPER_TOOLS;

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (width, height) => {
  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  win.maximize();
  win.setMenuBarVisibility(false);
  win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
  
  if (isDev) win.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(() => {
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;
  createWindow(width, height);

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(error => console.log(`An error occurred: , ${error}`));
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;
    createWindow(width, height);
  }
});