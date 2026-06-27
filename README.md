# MTR ETA PWA 完整版

這是一個不用 MacBook 都可以在 iPhone 使用的 PWA 版本。

## 檔案內容

- `index.html`：MTR ETA 主介面
- `manifest.webmanifest`：PWA 名稱、圖示、主畫面設定
- `service-worker.js`：PWA 離線殼與快取
- `icons/`：iPhone 主畫面 icon、透明 logo
- `mtr_eta_app_icon_preview.png`：App icon 預覽

## 功能

- 白色、清晰、低數據 UI
- 路綫 / 車站選擇
- 兩個目的地方向按鈕，例如「往 黃埔 / 往 調景嶺」
- 0 分鐘 = 車門關閉
- 1 分鐘 = 即將到站
- ETA 佔主要畫面空間
- 一行顯示數據用量：本次 / 已用 / 數據
- 繁中 / English 切換
- 每 15 秒自動更新
- Safari 加入主畫面後可像 App 一樣開啟

## 如何部署到 GitHub Pages

1. 解壓 ZIP。
2. 開一個 GitHub repository，例如 `mtr-eta-pwa`。
3. 把整個資料夾內的檔案上載到 repository 根目錄。
4. GitHub → Settings → Pages。
5. Source 選 `Deploy from a branch`。
6. Branch 選 `main`，folder 選 `/root`。
7. 等 1-3 分鐘。
8. 你會得到網址，例如：

`https://你的用戶名.github.io/mtr-eta-pwa/`

## 如何部署到 Netlify

1. 解壓 ZIP。
2. 去 Netlify。
3. Add new site → Deploy manually。
4. 把整個資料夾拖入去。
5. Netlify 會給你一條 HTTPS 網址。

## 如何在 iPhone 加入主畫面

1. 用 iPhone Safari 打開你的 PWA 網址。
2. 按底部分享按鈕。
3. 選「加入主畫面」。
4. 名稱用 `MTR ETA`。
5. 之後 iPhone 主畫面就會出現 MTR ETA icon。

## 注意

這個 PWA 使用即時 MTR ETA API，所以網站必須用 HTTPS 部署。GitHub Pages / Netlify 都會自動提供 HTTPS。

iPhone 主畫面 icon 使用白色背景，因為 iOS app icon 一般不應使用透明背景。



# Logo 修正版說明

這一版已修正：

- 只使用你上傳的 `HK_MTR_logo.svg.png` 作為 logo 來源。
- `icons/hk-mtr-logo-exact.png` 是透明背景的 in-app logo。
- `apple-touch-icon.png` 和 manifest icon 都是同一個 logo，沒有加 `ETA` 字。
- 移除了容易在 iPhone PWA 顯示成 `?` 的 emoji / 特殊 icon。
- Service worker cache 改成 `mtr-eta-pwa-exact-logo-v2`，減少舊 icon 快取問題。

如果 iPhone 主畫面仍然顯示舊圖示，請刪除舊的 MTR ETA 主畫面捷徑，再用 Safari 重新「加入主畫面」。
