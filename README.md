


### npm
1. npm install electron-builder --save-dev
2. npm install electron-updater


## electron 打包.exe 檔的流程
1. 下指令: npm run build (要用cmd、powerShell 系統管理員身分執行)
2. 生成 dist 資料夾, 裡面包含 .exe執行檔 (electron-app Setup 1.0.10.exe)
3. 點下 .exe 執行檔之後, 會把 應用程式 下載到該路徑 C:\Users\USER\AppData\Local\Programs
4. 如果 在 Programs 把 electron-app 資料夾 刪除的話, 要在執行一次 .exe執行檔 重新下載
* 如果遇到有改卻還是一樣的話, 建議把 Programs 資料夾裡面的 刪掉electron-app 以及 dist 資料夾整個刪掉 重下 npm run build




## 假如有 一個 a.exe 檔想要在  執行electron-app.exe後, 到本地下載的路徑底下 也要有a.exe檔的話
1. 先把 a.exe 檔,拉到跟package.json 同層
2. 在package.json 添加 extraFiles、 extraResources (擇1就好)

```json
 "extraFiles": [
      {
        "from": "a.exe",
        "to": "a.exe"
      }
]
"extraResources": [
      {
        "from": "a.exe",
        "to": "a.exe"
      }
]
```
>extraFiles vs extraResources 的差別
* electron 下載後的本地路徑: C:\Users\USER\AppData\Local\Programs\electron-app
* extraFiles:  a.exe檔 會跟 electron-app.exe 在同一層
* extraResources:  a.exe檔 會放在 resources資料夾 裡面


 






## electron 自動更新的流程、注意事項
1. 更改想更新的檔案 index.html 新增了 v1.0.8 才有的功能
2. 更改 package.json version:"1.0.8"
3. npm run build (建置 1.0.8 檔) </br>✩: 要用cmd、powerShell 系統管理員身分執行,否則會遇到『曾經遇到的問題 1』
<!-- push gitHub -->
4. git add . 
5. git commit -m "v1.0.8"
6. git push
<!-- 增加 Releases tag -->
7. git tag -a v1.0.8 -m "Version 1.0.8"
8. git push origin v1.0.8
<!-- 回到gitHub 的Release -->
9. Draft a new release , 把dist 生成的檔案(除了 win-unpacked 不加),其他都添加到  Attach binaries by dropping them here or selecting them. </br>
✩ electron-app Setup 1.0.8 -> electron-app-Setup-1.0.8.exe (推上去前要先改 『-』, 否則會 『曾經遇到的問題 2』 )

10. 回到code, 進行測試
11. 把package.json version:"1.0.7" 降一個版本號 (直接把剛剛上傳的 v1.0.8 刪除)
12. 刪除dist 資料夾(因為會有v1.0.8版本的)
13. npm run build 这样做会生成一个低版本号(1.0.7) 的应用程序
14. npm install (看有沒有依賴項要安裝)
15. npm start (開啟electron)
16. 過大概1分鐘左右(第一次會比較久), 會跳出是否要更新彈窗,按下 '是'


>electron download location: ：C:\Users\{yourPCname}\AppData\Local\Programs\{your APP name}




## 避免暴露source code 到 release  上, 所以要把安裝包放在另外一個server上(測試方式)
1. 加 root 資料夾
2. npm run build (將生成的dist 的檔案: 5個), 移到root 資料夾
3. npm run http (開啟本地伺服器)
4. npm run start (找到 需要 更新的安裝包, 就會從"http://127.0.0.1:8080/"取得, 最新的安裝包,並下載)







## 曾經遇到的問題
1. 無法生成 electron-app Setup 1.0.8 安裝檔
2. 目前 npm start 會報錯 
Error: Cannot download "https://github.com/eriksun0310/electron-app/releases/download/v1.0.7/electron-app-Setup-1.0.7.exe", status 404:
3. npm run start 後 按下'是'更新, 關閉electron 後會自己下載完之後,再自動開啟 electron 時, 就會報錯 以及 開啟dist 中的 electron-app Setup 1.0.8 安裝檔 也會報錯
https://github.com/electron-userland/electron-builder/issues/8220
4.  no such file or directory, open 'C:\Users\USER\Desktop\electron-app\node_modules\electron\dist\resources\app-update.yml'