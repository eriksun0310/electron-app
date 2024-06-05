const { app, BrowserWindow, autoUpdater } = require("electron");

const log = require("electron-log");

// 配置日志输出
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 设置自动更新的来源
autoUpdater.setFeedURL({
  provider: "github",
  repo: "electron-app",
  releaseType: "release",
});

//當更新可用時
autoUpdater.on("update-available", () => {
  log.info("Update available.");
});

//當更新已下載完成時
autoUpdater.on("update-downloaded", () => {
  log.info("Update downloaded; will install now");
  autoUpdater.quitAndInstall();
});

//在應用程式啟動時, 設置每3分鐘檢查一次, 是否要更新
app.on("ready", () => {
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify();
  }, 3 * 60 * 1000); 
});
