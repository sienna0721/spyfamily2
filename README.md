# spyfamily2
我們正在開發一款手繪繪本風的 Vanilla JS 網頁解謎遊戲《安妮亞入學大作戰》。目前的對話系統、UI 介面皆已穩定運作，請「絕對不要」修改或重寫現有正常運行的邏輯。

【目前專案程式碼】
<!-- <!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="安妮亞入學大作戰｜視覺小說風格網頁解謎遊戲第一階段"
    />
    <title>安妮亞入學大作戰</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <main class="game-shell" aria-live="polite">
      <!-- Loading Scene：初始顯示，約 2 秒後由 main.js 切換至標題畫面。 -->
      <section id="loading-scene" class="scene scene--loading" aria-label="載入畫面">
        <div class="loading-content">
          <div class="loading-star" aria-hidden="true">✦</div>
          <p class="loading-label">正在準備潛入作戰<span class="loading-dots">...</span></p>
        </div>
      </section>

      <!-- Title Scene：玩家完成載入後看到的入口畫面。 -->
      <section id="title-scene" class="scene scene--title is-hidden" aria-label="標題畫面">
        <div class="title-decoration title-decoration--left" aria-hidden="true">✦</div>
        <div class="title-decoration title-decoration--right" aria-hidden="true">★</div>
        <div class="title-content">
          <p class="eyebrow">SPY x FAMILY · SECRET MISSION</p>
          <h1>安妮亞入學大作戰</h1>
          <p class="subtitle">優雅地解開考驗，潛入伊甸學園！</p>
          <button id="start-button" class="start-button" type="button">
            <span>Tap to Start</span>
          </button>
        </div>
        <footer class="game-footer">
          © Tatsuya Endo/Shueisha, SPY x FAMILY Project. 本網頁僅供教育作業展示，無商業用途。
        </footer>
      </section>

      <!-- Dialogue Scene：第一階段只處理視覺小說對話與打字機互動。 -->
      <section id="dialogue-scene" class="scene scene--dialogue is-hidden" aria-label="劇情對話">
        <div class="scene-backdrop" aria-label="情境圖片佔位區">
          <div class="backdrop-skyline" aria-hidden="true"></div>
          <div class="placeholder-copy">EDEN ACADEMY · ENTRY EXAM</div>
          <div class="character-placeholder" aria-label="角色立繪佔位區">角色立繪</div>
        </div>

        <!-- 對話場景的輔助功能導覽列。 -->
        <nav class="top-right-nav" aria-label="輔助功能">
          <button id="history-button" class="utility-button" type="button">📖 回顧對話</button>
          <button id="hint-button" class="utility-button" type="button">💡 提示</button>
        </nav>

        <!-- 關卡互動層：根據 data.js 的 type 動態顯示 choice 或 keypad。 -->
        <div id="interaction-layer" class="interaction-layer" aria-live="polite">
          <div id="choice-panel" class="interaction-panel choice-panel is-hidden" aria-label="選項"></div>
          <div id="keypad-panel" class="interaction-panel keypad-panel is-hidden" aria-label="密碼鍵盤"></div>
        </div>

        <!-- 第三關 Canvas：預設隱藏，只有進入 canvas_patrol 節點時才會啟用。 -->
        <canvas id="gameCanvas" width="600" height="400" hidden aria-label="校園巡邏地圖"></canvas>
        <div id="canvas-status" class="canvas-status" hidden aria-live="assertive"></div>

        <div id="dialogue-box" class="dialogue-box" role="button" tabindex="0" aria-label="對話框，點擊或按空白鍵繼續">
          <div id="avatar" class="avatar" aria-hidden="true">?</div>
          <div class="dialogue-header">
            <span id="speaker-name" class="speaker-name">—</span>
            <span class="dialogue-hint">點擊或按空白鍵繼續</span>
          </div>
          <p id="dialogue-text" class="dialogue-text"></p>
          <span class="continue-indicator" aria-hidden="true">▼</span>
        </div>

        <!-- 預設以 display: none 隱藏，開啟時由 main.js 加上 modal-open。 -->
        <div id="history-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="history-modal-title">
          <section class="modal-content history-content">
            <div class="modal-heading">
              <h2 id="history-modal-title">📖 對話回顧</h2>
              <button class="modal-close-button" type="button" data-close-modal="history-modal">✖ 關閉</button>
            </div>
            <div id="history-list" class="history-list" aria-live="polite"></div>
          </section>
        </div>

        <div id="hint-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="hint-modal-title">
          <section class="modal-content hint-content">
            <div class="modal-heading">
              <h2 id="hint-modal-title">💡 目前關卡提示</h2>
              <button class="modal-close-button" type="button" data-close-modal="hint-modal">✖ 關閉</button>
            </div>
            <p id="hint-text" class="hint-text"></p>
          </section>
        </div>
      </section>
    </main>

    <script type="module" src="js/main.js"></script>
  </body>
</html> -->
<!-- 請在這裡貼上你目前的 style.css 內容 -->
<!-- 請在這裡貼上你目前的 data.js 內容 -->
<!-- 請在這裡貼上你目前的 main.js 內容 -->

【你的任務：階段四 Canvas 局部擴充】
請在現有架構上局部新增第三關 `canvas_patrol` 的遊戲邏輯。
⚠️ 極度重要：為了節省輸出長度，請「只」輸出需要新增/修改的 CSS 樣式，以及 `main.js` 中特定被修改的函式（如初始化 Canvas、事件監聽、繪製迴圈等）。絕對不要印出未修改的完整程式碼！

具體需求：
1. 影音教學彈出視窗 (Video Tutorial Modal)：
   - 進入 Canvas 關卡時，疊加一個半透明提示框（維持手繪風格）。
   - 提示框內容上半部：請加入一個 HTML `<video>` 標籤，設定為自動播放(autoplay)、靜音(muted)、無限循環(loop)與 playsinline，影片預設路徑為 `videos/tutorial.mp4`。請在 CSS 為影片加上手繪風格的微圓角與邊框。
   - 提示框內容下半部：文字說明「操作說明：請先用滑鼠【左鍵點擊】選擇起始大樓。選定後用【方向鍵】移動。一旦移動即鎖定起始點！」。
   - 底部附帶一個「我準備好了」按鈕，點擊後關閉視窗，才啟動 Canvas 的滑鼠點擊監聽。

2. 自訂起始點與鎖定機制：
   - 初始 Canvas 沒有角色。
   - 點擊 A, B, C, D, E 節點範圍時，角色出現在該座標。
   - 玩家按下方向鍵成功移動到下一節點後，狀態設為「已鎖定 (Locked)」，無法再用滑鼠改變位置。若失敗重置關卡，則解除鎖定讓玩家重新點擊。

3. 角色圖片渲染：
   - 宣告 `let anyaImg = new Image(); anyaImg.src = 'images/anya_sprite.png';`。
   - 在繪製迴圈中使用 `ctx.drawImage()` 替換原本畫圓點的邏輯，確保圖片正確載入與顯示。
