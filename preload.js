import {  ipcRenderer } from 'electron';

window.addEventListener("DOMContentLoaded", () => {
  // 监听应用程序版本信息
  ipcRenderer.on("app-version", (event, version) => {
    console.log('version', version)
    document.getElementById("appVersion").textContent = version;
  });

  // 监听可用更新版本信息
  ipcRenderer.on("update-available", (event, version) => {
    document.getElementById("updateVersion").textContent = version;
  });
});