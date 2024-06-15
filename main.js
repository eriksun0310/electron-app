const { app, BrowserWindow, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const fs = require("fs");
const feed = "your_site/update/windows_64";
const log = require("electron-log");

/*
 為了要讓node-module 生成 app-update.yml、 dev-app-update.yml, 否則會報錯()
 no such file or directory, open 'C:\Users\USER\Desktop\electron-app\node_modules\electron\dist\resources\app-update.yml'
*/
let yaml = "";

yaml += "provider: generic\n";
yaml += "url: your_site/update/windows_64\n";
yaml += "useMultipleRangeRequest: false\n";
yaml += "channel: latest\n";
yaml += "updaterCacheDirName: " + app.getName();

let update_file = [path.join(process.resourcesPath, "app-update.yml"), yaml];
let dev_update_file = [
  path.join(process.resourcesPath, "dev-app-update.yml"),
  yaml,
];
let chechFiles = [update_file, dev_update_file];

for (let file of chechFiles) {
  if (!fs.existsSync(file[0])) {
    fs.writeFileSync(file[0], file[1], () => {});
  }
}

log.transports.file.level = "info";
autoUpdater.logger = log;

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

Object.defineProperty(app, "isPackaged", {
  get() {
    return true;
  },
});

autoUpdater.setFeedURL({
  provider: "github",
  owner: "eriksun0310",
  repo: "electron-app",
  releaseType: "release",
  url: "https://github.com/eriksun0310/electron-app/releases/latest",
});

// 每1分鐘檢查一次是否要更新
app.on("ready", () => {
  autoUpdater.checkForUpdates();

  // setInterval(() => {
  //   autoUpdater.checkForUpdates();
  // }, 60000);
});

// 當有更新可用時觸發
autoUpdater.on("update-available", () => {
  //提示使用者有新版本可用，並詢問是否要立即更新
  dialog
    .showMessageBox({
      type: "info",
      title: "更新提示",
      message: "有新版本可用，是否立即更新？",
      buttons: ["是", "否"],
    })
    .then((response) => {
      if (response.response === 0) {
        // 如果使用者選擇立即更新，則開始下載並安裝新版本
        autoUpdater.downloadUpdate();
      }
    });
});

// 當更新下載完成時觸發
autoUpdater.on("update-downloaded", () => {
  //提示用戶下載已完成，並要求重新啟動應用程式
  dialog
    .showMessageBox({
      type: "info",
      title: "下載完成",
      message: "下載已完成，重啟應用程式以應用更新。",
      buttons: ["确定"],
    })
    .then(() => {
      autoUpdater.quitAndInstall(); // 退出应用程序以应用更新
    });
});
autoUpdater.on("error", (error) => {
  log.error("Error during update:", error);
});
