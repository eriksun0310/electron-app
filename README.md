# 推上新版本 的流程

### 下指令 (要用cmd、powerShell 系統管理員身分執行)

1. 更改想更新的檔案 index.html 新增了 v1.0.8 才有的功能
2. 更改 package.json version:"1.0.8"
3. npm run build (建置 1.0.8 檔)
> 3.✩: 要用cmd、powerShell 系統管理員身分執行,否則會遇到『曾經遇到的問題 1』
<!-- push gitHub -->
4. git add . 
5. git commit -m "v1.0.8"
6. git push
<!-- 增加 Releases tag -->
7. git tag -a v1.0.8 -m "Version 1.0.8"
8. git push origin v1.0.8
<!-- 回到gitHub 的Release -->
9. Draft a new release , 把dist 生成的檔案(除了 win-unpacked 不加),其他都添加到  Attach binaries by dropping them here or selecting them.
> 9.✩ electron-app Setup 1.0.8 -> electron-app-Setup-1.0.8.exe (推上去前要先改 『-』, 否則會 『曾經遇到的問題 2』 )

10. 回到code, 進行測試
11. 把package.json version:"1.0.7" 降一個版本號 (直接把剛剛上傳的 v1.0.8 刪除)
12. 刪除dist 資料夾(因為會有v1.0.8版本的)
13. npm run build 这样做会生成一个低版本号(1.0.7) 的应用程序
14. npm install (看有沒有依賴項要安裝)
15. npm start (開啟electron)
16. 過大概1分鐘左右(第一次會比較久), 會跳出是否要更新彈窗,按下 '是' 就會有問題1出現了....




> 還沒解決的問題
1. npm run start 後 按下'是'更新, 關閉electron 後會自己下載完之後,再自動開啟 electron 時, 就會報錯 以及 開啟dist 中的 electron-app Setup 1.0.8 安裝檔 也會報錯
https://github.com/electron-userland/electron-builder/issues/8220



> 曾經遇到的問題
1. 無法生成 electron-app Setup 1.0.8 安裝檔
2. 目前 npm start 會報錯 
Error: Cannot download "https://github.com/eriksun0310/electron-app/releases/download/v1.0.7/electron-app-Setup-1.0.7.exe", status 404: