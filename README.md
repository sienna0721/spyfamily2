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
<!-- @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap");

:root {
  color-scheme: light;
  --paper: #fdfbf7;
  --paper-deep: #f8f0e5;
  --mint: #a8d8b9;
  --mint-deep: #6fae91;
  --peach: #f8c6b5;
  --peach-deep: #d9927b;
  --butter: #f8e4a8;
  --lavender: #d9c9e8;
  --ink: #5b5960;
  --ink-soft: #817b7d;
  --line: rgba(91, 89, 96, 0.42);
  --shadow: rgba(102, 82, 74, 0.16);
}

* { box-sizing: border-box; }
html, body { min-height: 100%; margin: 0; }
body {
  min-width: 320px;
  overflow: hidden;
  color: var(--ink);
  background: var(--paper);
  font-family: "Nunito", "Comic Sans MS", "Microsoft JhengHei", "微軟正黑體", sans-serif;
}
button { font: inherit; }
.game-shell, .scene { min-height: 100vh; width: 100%; }
.scene { position: absolute; inset: 0; display: grid; transition: opacity 700ms ease, visibility 700ms ease; }
.is-hidden { opacity: 0; pointer-events: none; visibility: hidden; }

/* Loading / Title：用紙張底色與鉛筆色點點，取代原本的深色夜空。 */
.scene--loading, .scene--title {
  place-items: center;
  overflow: hidden;
  background-color: var(--paper);
  background-image: radial-gradient(rgba(168, 216, 185, .33) 1px, transparent 1px), radial-gradient(rgba(248, 198, 181, .28) 1px, transparent 1px);
  background-position: 0 0, 19px 19px;
  background-size: 38px 38px;
}
.loading-content { text-align: center; }
.loading-star { color: var(--peach-deep); font-size: clamp(3rem, 9vw, 6rem); line-height: 1; animation: spin-star 1.8s linear infinite, pencil-glow 1.2s ease-in-out infinite alternate; }
.loading-label { margin: 24px 0 0; color: var(--ink-soft); letter-spacing: .12em; }
.loading-dots { display: inline-block; width: 2.2em; text-align: left; animation: blink-dots 1.2s steps(4, end) infinite; }
.title-content { position: relative; z-index: 1; padding: 24px; text-align: center; }
.eyebrow { margin: 0 0 20px; color: var(--mint-deep); font-size: .75rem; font-weight: 800; letter-spacing: .22em; }
h1 { margin: 0; color: var(--ink); font-size: clamp(2.4rem, 7vw, 6rem); font-weight: 900; letter-spacing: .08em; text-shadow: 3px 3px 0 rgba(248, 198, 181, .55); }
.subtitle { margin: 18px 0 48px; color: var(--ink-soft); font-size: clamp(.95rem, 2vw, 1.2rem); letter-spacing: .16em; }
.start-button, .choice-button, .keypad-button {
  border: 1.5px solid var(--line);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  color: var(--ink);
  background: var(--butter);
  box-shadow: 3px 5px 0 rgba(102, 82, 74, .12), 0 8px 18px var(--shadow);
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}
.start-button { display: inline-flex; min-width: 210px; padding: 17px 32px; flex-direction: column; align-items: center; gap: 5px; animation: pulse-button 2s infinite; }
.start-button span { font-size: 1.35rem; font-weight: 900; letter-spacing: .16em; }
.start-button small { font-size: .82rem; letter-spacing: .12em; }
.start-button:hover, .start-button:focus-visible, .choice-button:hover, .choice-button:focus-visible, .keypad-button:hover, .keypad-button:focus-visible { transform: translateY(-3px) rotate(-.5deg); box-shadow: 4px 8px 0 rgba(102, 82, 74, .13), 0 12px 22px var(--shadow); filter: saturate(1.08); outline: none; }
.title-decoration { position: absolute; color: var(--peach-deep); opacity: .8; font-size: 2rem; animation: float 4s ease-in-out infinite; }
.title-decoration--left { top: 25%; left: 12%; }
.title-decoration--right { right: 14%; bottom: 26%; color: var(--mint-deep); animation-delay: -1.5s; }
.game-footer { position: absolute; right: 16px; bottom: 14px; left: 16px; color: rgba(91, 89, 96, .58); font-size: .7rem; text-align: center; }

/* Dialogue Scene：以手繪紙張對話框承載下方對話，上方保留場景與立繪佔位。 */
.scene--dialogue { display: flex; flex-direction: column; justify-content: flex-end; background: var(--paper-deep); }
.scene-backdrop { position: absolute; inset: 0 0 31%; overflow: hidden; background: linear-gradient(180deg, #cde7dc, #f8d7c8 64%, #ead6c2); }
.scene-backdrop::after { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 45%, rgba(91, 89, 96, .16)); content: ""; }
.backdrop-skyline { position: absolute; right: 0; bottom: 0; left: 0; height: 44%; background: repeating-linear-gradient(90deg, #bad5c3 0 90px, #d6e3c6 90px 140px, #b4ccbc 140px 230px); clip-path: polygon(0 38%, 10% 18%, 22% 32%, 32% 4%, 45% 28%, 58% 10%, 71% 35%, 81% 8%, 100% 22%, 100% 100%, 0 100%); opacity: .8; }
.placeholder-copy { position: absolute; top: 17%; width: 100%; color: rgba(91, 89, 96, .48); font-size: clamp(1rem, 3vw, 2rem); font-weight: 800; letter-spacing: .25em; text-align: center; }
.character-placeholder { position: absolute; right: 10%; bottom: 0; z-index: 1; display: grid; place-items: center; width: clamp(130px, 24vw, 280px); height: 72%; border: 2px dashed rgba(91, 89, 96, .42); border-bottom: 0; border-radius: 50% 50% 0 0; color: rgba(91, 89, 96, .64); background: rgba(253, 251, 247, .32); font-size: .9rem; letter-spacing: .14em; }
.interaction-layer { position: absolute; inset: 0; z-index: 3; display: grid; place-items: center; padding: 4vh 20px 31vh; pointer-events: none; }
.interaction-panel { width: min(720px, 100%); pointer-events: auto; }
.choice-panel { display: grid; gap: 14px; }
.choice-button { min-height: 64px; padding: 13px 22px; font-size: clamp(.95rem, 2vw, 1.1rem); text-align: left; background: var(--mint); }
.choice-button:nth-child(2) { background: var(--peach); }
.choice-button:nth-child(3) { background: var(--lavender); }
.keypad-panel { width: min(440px, 100%); padding: 20px; border: 1.5px solid var(--line); border-radius: 24px 12px 28px 16px; background: rgba(253, 251, 247, .94); box-shadow: 4px 7px 0 rgba(102, 82, 74, .12), 0 12px 24px var(--shadow); }
.keypad-title { margin: 0 0 15px; color: var(--ink-soft); font-size: .9rem; font-weight: 800; text-align: center; letter-spacing: .13em; }
.keypad-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.keypad-button { padding: 14px 10px; color: var(--ink); background: var(--butter); font-size: 1.15rem; font-weight: 900; }
.keypad-button:nth-child(2n) { background: var(--peach); }
.dialogue-box { position: relative; z-index: 2; width: min(1080px, calc(100% - 32px)); min-height: 190px; margin: 0 auto 28px; padding: 25px 32px 30px; border: 1.5px solid var(--line); border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; background: rgba(253, 251, 247, .96); box-shadow: 4px 7px 0 rgba(102, 82, 74, .12), 0 12px 30px var(--shadow); cursor: pointer; outline: none; }
.dialogue-box:focus-visible { box-shadow: 0 0 0 3px rgba(168, 216, 185, .85), 4px 7px 0 rgba(102, 82, 74, .12); }
.avatar { position: absolute; top: -27px; left: 28px; display: grid; place-items: center; width: 70px; height: 70px; border: 1.5px solid var(--line); border-radius: 24px 10px 20px 12px; color: var(--ink); background: var(--mint); box-shadow: 3px 4px 0 rgba(102, 82, 74, .14); font-size: 1.7rem; font-weight: 900; }
.dialogue-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 12px; padding-left: 76px; border-bottom: 1px dashed rgba(91, 89, 96, .32); }
.speaker-name { color: var(--mint-deep); font-size: 1.25rem; font-weight: 900; }
.dialogue-hint { color: var(--ink-soft); font-size: .75rem; }
.dialogue-text { min-height: 3.4em; margin: 20px 0 0; color: var(--ink); font-size: clamp(1rem, 2vw, 1.25rem); line-height: 1.9; letter-spacing: .05em; }
.continue-indicator { position: absolute; right: 25px; bottom: 13px; color: var(--peach-deep); font-size: .8rem; animation: bounce 900ms ease-in-out infinite alternate; }

/* 標題按鈕改為融入背景的純文字 Tap to Start，只保留柔和呼吸閃爍。 */
.start-button { min-width: 0; padding: 12px 18px; border: 0; border-radius: 0; color: var(--mint-deep); background: transparent; box-shadow: none; animation: pulse-text 2s ease-in-out infinite; }
.start-button span { font-size: clamp(1.05rem, 2.4vw, 1.5rem); letter-spacing: .08em; }
.start-button:hover, .start-button:focus-visible { transform: none; border: 0; box-shadow: none; background: transparent; }

/* 第三關巡邏地圖與即時狀態提示。Canvas 本身仍使用 HTML/CSS 做響應式縮放。 */
#gameCanvas { position: relative; z-index: 4; display: none; width: min(600px, calc(100% - 32px)); height: auto; margin: auto auto 24vh; border: 2px solid rgba(91, 89, 96, .42); border-radius: 28px 12px 24px 14px; background: #cfe8dd; box-shadow: 4px 7px 0 rgba(102, 82, 74, .12), 0 12px 30px var(--shadow); }
#gameCanvas.is-visible { display: block; }
.canvas-status { position: absolute; top: 42%; left: 50%; z-index: 6; width: min(420px, calc(100% - 44px)); padding: 16px 22px; border: 1.5px solid var(--line); border-radius: 24px 10px 20px 12px; color: var(--ink); background: rgba(253, 251, 247, .96); box-shadow: 3px 5px 0 rgba(102, 82, 74, .13), 0 12px 24px var(--shadow); font-size: 1.05rem; font-weight: 800; text-align: center; transform: translate(-50%, -50%); }
.canvas-status.is-visible { animation: fade-in 180ms ease both; }

/* 階段 2.5 輔助導覽列：固定在對話場景右上角，不干擾對話框。 */
.top-right-nav { position: absolute; top: 20px; right: 22px; z-index: 5; display: flex; gap: 10px; }
.utility-button, .modal-close-button { border: 1.5px solid var(--line); border-radius: 80px 12px 70px 14px / 14px 70px 12px 80px; color: var(--ink); background: rgba(253, 251, 247, .9); box-shadow: 2px 3px 0 rgba(102, 82, 74, .11); cursor: pointer; transition: transform 180ms ease, box-shadow 180ms ease; }
.utility-button { padding: 9px 14px; font-size: .86rem; font-weight: 800; }
.utility-button:hover, .utility-button:focus-visible, .modal-close-button:hover, .modal-close-button:focus-visible { transform: translateY(-2px) rotate(-.5deg); box-shadow: 3px 5px 0 rgba(102, 82, 74, .14); outline: none; }

/* Modal 預設 display:none；modal-open 才會顯示並播放淡入動畫。 */
.modal-overlay { position: absolute; inset: 0; z-index: 10; display: none; place-items: center; padding: 24px; background: rgba(91, 89, 96, .3); }
.modal-overlay.modal-open { display: grid; animation: fade-in 220ms ease both; }
.modal-content { width: min(720px, 100%); max-height: min(76vh, 650px); padding: 25px; border: 1.5px solid var(--line); border-radius: 35px 14px 28px 18px; background: var(--paper); box-shadow: 5px 8px 0 rgba(102, 82, 74, .13), 0 18px 36px var(--shadow); }
.modal-heading { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding-bottom: 14px; border-bottom: 1px dashed rgba(91, 89, 96, .32); }
.modal-heading h2 { margin: 0; color: var(--mint-deep); font-size: 1.25rem; }
.modal-close-button { flex: 0 0 auto; padding: 8px 12px; font-size: .82rem; font-weight: 800; background: var(--peach); }
.history-list { max-height: min(56vh, 470px); margin-top: 16px; padding-right: 10px; overflow-y: auto; }
.history-entry { margin: 0 0 12px; padding: 12px 15px; border: 1px dashed rgba(91, 89, 96, .28); border-radius: 20px 8px 18px 10px; background: var(--paper-deep); line-height: 1.7; }
.history-entry:nth-child(even) { background: #eef7ef; }
.history-speaker { display: block; margin-bottom: 2px; color: var(--peach-deep); font-size: .88rem; font-weight: 900; }
.history-text { color: var(--ink); font-size: .95rem; }
.history-empty { margin: 22px 0 8px; color: var(--ink-soft); text-align: center; }
.hint-content { width: min(560px, 100%); background: #fff8df; }
.hint-text { margin: 24px 5px 8px; color: var(--ink); font-size: 1.05rem; line-height: 1.9; }

/* 已選錯的密碼按鈕保留在鍵盤中，但不可再次互動。 */
.disabled-btn { color: rgba(91, 89, 96, .5) !important; background: #dedbd5 !important; box-shadow: none !important; cursor: not-allowed !important; pointer-events: none; filter: grayscale(.7); }

@keyframes spin-star { to { transform: rotate(360deg); } }
@keyframes pencil-glow { from { text-shadow: 0 0 5px var(--peach); } to { text-shadow: 0 0 24px var(--peach); } }
@keyframes blink-dots { 0%, 20% { opacity: 0; } 50% { opacity: 1; } 80%, 100% { opacity: 0; } }
@keyframes pulse-button { 0%, 100% { box-shadow: 3px 5px 0 rgba(102, 82, 74, .12), 0 0 0 0 rgba(248, 198, 181, .65); } 50% { box-shadow: 3px 5px 0 rgba(102, 82, 74, .12), 0 0 0 14px rgba(248, 198, 181, 0); } }
@keyframes pulse-text { 0%, 100% { opacity: .58; text-shadow: 0 0 0 rgba(111, 174, 145, 0); } 50% { opacity: 1; text-shadow: 0 0 12px rgba(111, 174, 145, .52); } }
@keyframes float { 50% { transform: translateY(-12px) rotate(8deg); } }
@keyframes bounce { to { transform: translateY(4px); } }
@keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 600px) {
  .scene-backdrop { inset: 0 0 39%; }
  .interaction-layer { padding-bottom: 39vh; }
  .dialogue-box { min-height: 220px; margin-bottom: 14px; padding: 20px 20px 28px; }
  .dialogue-header { align-items: flex-start; flex-direction: column; gap: 6px; }
  .character-placeholder { right: 5%; height: 60%; }
  .game-footer { font-size: .62rem; }
  #gameCanvas { width: calc(100% - 24px); margin-bottom: 25vh; }
  .top-right-nav { top: 12px; right: 12px; flex-direction: column; align-items: flex-end; gap: 6px; }
  .utility-button { padding: 7px 10px; font-size: .75rem; }
  .modal-content { padding: 18px; }
} -->
<!-- /**
 * 劇情節點資料。
 * 每個節點透過 id 與 next 串接；main.js 只負責解讀資料與啟動對應互動模式。
 */
export const dialogues = [
  // --- 序章 ---
  { id: "start", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "佛傑一家，真正的優雅是能在實作中展現邏輯！", next: "q1_1" },
  { id: "q1_1", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "第一題。校門口剛好有 13 位考生。我可以確定其中絕對至少有兩人的生日在同一個月份！為什麼？", next: "q1_choice" },

  // --- 第一關：鴿籠定理（優化誘答選項） ---
  {
    id: "q1_choice",
    type: "choice",
    hintText: "💡 提示：想想看『月份』總共有幾個？13 個人就像 13 隻鴿子，要分進幾個籠子裡呢？",
    options: [
      { text: "因為一年只有 12 個月，13 人分進 12 個月，一定會有月份重複。", next: "q1_correct" },
      { text: "因為 13 除以 2 等於 6 餘 1，所以絕對有兩個人同一天生日。", next: "q1_wrong_math" },
      { text: "因為一年有四個季節，13 個人平均分配，一定會有人同月份。", next: "q1_wrong_season" },
    ],
  },
  { id: "q1_wrong_math", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "安妮亞，題目問的是『同一個月份』，除以 2 算出來的餘數並不能證明月份重複喔。想想看一年總共有幾個月？", next: "q1_choice" },
  { id: "q1_wrong_season", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "分進四個季節，只能證明『有人同一個季節』，但一個季節有三個月，不一定會同月份。我們換個『籠子』來裝裝看？", next: "q1_choice" },
  { id: "q1_correct", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "這就是大部分人熟知的『鴿籠定理』。", next: "q2_1" },

  // --- 第二關：保險箱密碼 ---
  { id: "q2_1", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "第二題。保險箱的密碼是 14、17、24、28、37、39 其中之一。", next: "q2_2" },
  { id: "q2_2", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "我拿到十位數，安妮亞拿到個位數。雖然我不知道密碼，但我確定安妮亞絕對也不知道。", next: "q2_3" },
  { id: "q2_3", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "聽完父親這句話，安妮亞知道密碼是多少了！", next: "q2_keypad" },
  {
    id: "q2_keypad",
    type: "keypad",
    numbers: [14, 17, 24, 28, 37, 39],
    correct: 17,
    nextCorrect: "q2_correct",
    nextWrong: "q2_wrong",
    hintText: "💡 提示：如果洛伊德拿到 2 或 3，因為有 28 或 39 這兩個不重複的個位數，安妮亞拿到 8 或 9 就能馬上通關。但他確定安妮亞不知道，代表他手上的十位數排除了 2 跟 3 喔！",
  },
  { id: "q2_wrong", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "不對。如果我拿到 2 或 3，可能會有不重複的 8 或 9 讓安妮亞秒答。所以我手上的數字排除了 2 跟 3 喔！", next: "q2_keypad" },
  { id: "q2_correct", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "答案是 17！", next: "q2_correct_2" },
  { id: "q2_correct_2", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "（心想：太優雅了！這兩人成功破解！）", next: "q3_1" },

  // --- 第三關：校園巡邏 ---
  { id: "q3_1", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "第三題。請看這張校園地圖，有 5 棟大樓與 6 條走廊。", next: "q3_2" },
  { id: "q3_2", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "巡邏員必須<b>不重複</b>走過任何一條走廊，但必須<b>巡視完所有走廊</b>。請試著優雅地走完全程吧！", next: "q3_canvas" },
  { id: "q3_canvas", type: "canvas_patrol", nextCorrect: "q3_correct" },
  { id: "q3_correct", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "優秀！利用頂點度數的奇偶性來決定起終點，這真是一場精彩無比的配合！", next: "end" },
  { id: "end", type: "dialogue", speaker: "系統", avatarColor: "#ccc", text: "（第三關測試完畢，等待最終關卡）", next: null },
]; -->
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
