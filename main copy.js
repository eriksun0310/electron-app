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
  url: "https://github.com/eriksun0310/electron-app",
});



// 当应用程序准备就绪时
app.on("ready", () => {

  autoUpdater.checkForUpdatesAndNotify();

  // 当有更新可用时触发
  autoUpdater.on("update-available", () => {
    // 提示用户有新版本可用，并询问是否要立即更新
    dialog
      .showMessageBox({
        type: "info",
        title: "更新提示",
        message: "有新版本可用，是否立即更新？",
        buttons: ["是", "否"],
      })
      .then((response) => {
        if (response.response === 0) {
          // 如果用户选择立即更新，则开始下载并安装新版本
          autoUpdater.downloadUpdate();
        }
      });
  });

  // 当更新下载完成时触发
  autoUpdater.on("update-downloaded", () => {
    // 提示用户更新已完成，并要求重新启动应用程序
    dialog
      .showMessageBox({
        type: "info",
        title: "更新完成",
        message: "更新已完成，重启应用程序以应用更新。",
        buttons: ["确定"],
      })
      .then(() => {
        app.quit(); // 退出应用程序以应用更新
      });
  });
});
