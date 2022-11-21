const { app, BrowserWindow, protocol, screen } = require("electron");
const path = require("path");
const url = require("url");

let installExtension, REACT_DEVELOPER_TOOLS;

if (!app.isPackaged) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

if (require("electron-squirrel-startup")) {
  app.quit();
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

  const appUrl = !app.isPackaged ? 
                  "http://localhost:3000" : 
                  url.format({
                    pathname: path.join(__dirname, "index.html"),
                    protocol: "file:",
                    slashes: true,
                  })
  
  win.maximize();
  win.setMenuBarVisibility(false);
  win.loadURL(appUrl);
  
  if (!app.isPackaged ) win.webContents.openDevTools({ mode: "detach" });
}

const setupLocalFilesNormalizerProxy = () =>  {
  protocol.registerHttpProtocol("file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  if (!app.isPackaged ) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(error => console.log(`An error occurred: , ${error}`));
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});