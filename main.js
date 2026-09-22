import { dialogues } from "./data.js";

// 將資料陣列轉成 Map，之後可用 id 快速找到下一個劇情節點。
const dialogueMap = new Map(dialogues.map((dialogue) => [dialogue.id, dialogue]));

// 全域對話歷史與第一、第二關答題統計。
let dialogueHistory = [];
let playerStats = { q1Mistakes: 0, q2Mistakes: 0 };

// 場景與一般 UI 元素。
const loadingScene = document.querySelector("#loading-scene");
const titleScene = document.querySelector("#title-scene");
const dialogueScene = document.querySelector("#dialogue-scene");
const startButton = document.querySelector("#start-button");
const dialogueBox = document.querySelector("#dialogue-box");
const speakerName = document.querySelector("#speaker-name");
const dialogueText = document.querySelector("#dialogue-text");
const avatar = document.querySelector("#avatar");
const choicePanel = document.querySelector("#choice-panel");
const keypadPanel = document.querySelector("#keypad-panel");
const historyButton = document.querySelector("#history-button");
const hintButton = document.querySelector("#hint-button");
const historyModal = document.querySelector("#history-modal");
const hintModal = document.querySelector("#hint-modal");
const historyList = document.querySelector("#history-list");
const hintText = document.querySelector("#hint-text");

// 第三關 Canvas 元素。
const gameCanvas = document.querySelector("#gameCanvas");
const canvasContext = gameCanvas.getContext("2d");
const canvasStatus = document.querySelector("#canvas-status");

let anyaImg = new Image();
anyaImg.src = "images/anya_sprite.png";
anyaImg.addEventListener("load", () => {
  if (patrolState.active) drawPatrolMap();
});

const videoTutorialModal = document.createElement("div");
videoTutorialModal.className = "video-tutorial-modal";
videoTutorialModal.innerHTML = `
  <section class="video-tutorial-content" aria-label="Canvas 操作教學">
    <p class="video-tutorial-text" style="margin-top: 10px;">操作說明：<br>請先用滑鼠【左鍵點擊】選擇起始大樓。<br>選定後用【方向鍵】移動。<br>注意：一旦移動即鎖定起始點！</p>
    <button class="video-tutorial-ready" type="button">我準備好了</button>
  </section>
`;
dialogueScene.append(videoTutorialModal);

const videoTutorialReadyButton = videoTutorialModal.querySelector(".video-tutorial-ready");

let currentNodeId = "start";
let isTyping = false;
let typingTimer = null;
let pendingAfterReminder = null;
let canvasStatusTimer = null;

// 第三關巡邏狀態：加入鎖定機制與自訂起點判定
const patrolState = {
  active: false,
  currentNode: null,
  startNode: null,
  visitedEdges: new Set(),
  failures: 0,
  inputLocked: false,
  animationFrame: null,
  startLocked: false,
  canPickStart: false,
};

// A、C 是左右主要大樓，B、D、E 位於中間；邊正好是題目指定的 6 條走廊。
const patrolNodes = {
  A: { x: 96, y: 200, color: "#f8c6b5" },
  B: { x: 300, y: 96, color: "#a8d8b9" },
  C: { x: 504, y: 200, color: "#f8c6b5" },
  D: { x: 300, y: 304, color: "#d9c9e8" },
  E: { x: 300, y: 200, color: "#f8e4a8" },
};
const patrolEdges = [
  ["A", "B"], ["A", "E"], ["A", "D"],
  ["C", "B"], ["C", "E"], ["C", "D"],
];

function switchScene(fromScene, toScene) {
  fromScene.classList.add("is-hidden");
  window.setTimeout(() => toScene.classList.remove("is-hidden"), 120);
}

function hideInteractionPanels() {
  choicePanel.classList.add("is-hidden");
  keypadPanel.classList.add("is-hidden");
}

function updateCharacter(dialogue) {
  speakerName.textContent = dialogue.speaker;
  avatar.textContent = dialogue.speaker?.charAt(0) || "?";
  avatar.style.backgroundColor = dialogue.avatarColor || "#cccccc";
}

/** 將文字轉成安全的 HTML；只有資料中的 b/strong 會被轉成粗體標籤。 */
function dialogueToHtml(text) {
  const tokens = [];
  const boldPattern = /<(b|strong)>([\s\S]*?)<\/\1>/gi;
  let cursor = 0;
  let match;

  const escapeHtml = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > cursor) tokens.push({ html: escapeHtml(text.slice(cursor, match.index)), isBold: false });
    tokens.push({ html: `<strong>${escapeHtml(match[2])}</strong>`, isBold: true });
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) tokens.push({ html: escapeHtml(text.slice(cursor)), isBold: false });
  return tokens;
}

/**
 * 逐字播放文字。粗體片段會被當作一個完整 token 一次加入，
 * 因此玩家不會看到 <b>、<strong> 等標籤字元逐字跑出來。
 */
function startTypewriter(dialogue) {
  window.clearTimeout(typingTimer);
  isTyping = true;
  updateCharacter(dialogue);
  dialogueText.innerHTML = "";
  dialogueHistory.push({ speaker: dialogue.speaker, text: dialogue.text });

  const tokens = dialogueToHtml(dialogue.text);
  let tokenIndex = 0;
  let renderedHtml = "";

  const typeNextToken = () => {
    const token = tokens[tokenIndex];
    if (!token) {
      isTyping = false;
      return;
    }

    // 一般文字每次加入一個字；粗體文字整段加入，保留 HTML 顯示效果。
    if (token.isBold) {
      renderedHtml += token.html;
      tokenIndex += 1;
    } else {
      const characters = Array.from(token.html);
      renderedHtml += characters.shift() || "";
      token.html = characters.join("");
      if (token.html.length === 0) tokenIndex += 1;
    }
    dialogueText.innerHTML = renderedHtml;
    typingTimer = window.setTimeout(typeNextToken, token.isBold ? 55 : 55);
  };

  typeNextToken();
}

function renderDialogueHistory() {
  historyList.replaceChildren();
  if (dialogueHistory.length === 0) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "目前還沒有對話紀錄喔！";
    historyList.append(empty);
    return;
  }

  dialogueHistory.forEach((entry) => {
    const item = document.createElement("p");
    item.className = "history-entry";
    const speaker = document.createElement("span");
    speaker.className = "history-speaker";
    speaker.textContent = entry.speaker;
    const text = document.createElement("span");
    text.className = "history-text";
    text.innerHTML = dialogueToHtml(entry.text).map((token) => token.html).join("");
    item.append(speaker, text);
    historyList.append(item);
  });
}

function openModal(modal) { modal.classList.add("modal-open"); }
function closeModal(modal) { modal.classList.remove("modal-open"); }

function openHintModal(customText = null) {
  const currentNode = dialogueMap.get(currentNodeId);
  hintText.textContent = customText || currentNode?.hintText || "目前沒有可用的提示喔！";
  openModal(hintModal);
}

function handleChoice(option) {
  // 第一關（鴿籠定理）錯誤兩次觸發強制提醒
  if (currentNodeId === "q1_choice" && option.next !== "q1_correct") {
    playerStats.q1Mistakes += 1;
    if (playerStats.q1Mistakes === 2) {
      hideInteractionPanels();
      pendingAfterReminder = option.next;
      currentNodeId = "__q1_reminder__";
      startTypewriter({
        speaker: "洛伊德",
        avatarColor: "#a3c9c7",
        text: "安妮亞，妳剛剛已經掉進過類似的邏輯陷阱囉，記得我們要把 13 個人分進 12 個月份裡！",
      });
      return;
    }
  }

  // 第二關（猜生日）錯誤兩次觸發分支對話引導
  if (currentNodeId === "q2_choice" && option.next !== "q2_correct") {
    playerStats.q2Mistakes += 1;
    if (playerStats.q2Mistakes === 2) {
      hideInteractionPanels();
      showNode("q2_subtle_hint"); 
      return;
    }
  }

  showNode(option.next);
}

function renderChoice(node) {
  choicePanel.replaceChildren();
  node.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option.text;
    button.setAttribute("aria-label", `選項 ${index + 1}：${option.text}`);
    button.addEventListener("click", () => handleChoice(option));
    choicePanel.append(button);
  });
  choicePanel.classList.remove("is-hidden");
}

/** 第一次進入才建立鍵盤，之後回到節點時保留錯誤按鈕的 disabled-btn 狀態。 */
function renderKeypad(node) {
  if (keypadPanel.querySelector(".keypad-button")) {
    keypadPanel.classList.remove("is-hidden");
    return;
  }

  keypadPanel.replaceChildren();
  const title = document.createElement("p");
  title.className = "keypad-title";
  title.textContent = "選出你認為正確的密碼";
  keypadPanel.append(title);

  const grid = document.createElement("div");
  grid.className = "keypad-grid";
  node.numbers.forEach((number) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "keypad-button";
    button.textContent = number;
    button.dataset.number = String(number);
    button.setAttribute("aria-label", `密碼 ${number}`);
    button.addEventListener("click", () => {
      if (number === node.correct) {
        showNode(node.nextCorrect);
        return;
      }
      button.classList.add("disabled-btn");
      button.disabled = true;
      showNode(node.nextWrong);
    });
    grid.append(button);
  });
  keypadPanel.append(grid);
  keypadPanel.classList.remove("is-hidden");
}

// ---------- 第三關 Canvas：校園巡邏 ----------

function edgeKey(first, second) { return [first, second].sort().join("-"); }

function getNeighbors(nodeName, onlyUnvisited = false) {
  return patrolEdges
    .filter(([first, second]) => first === nodeName || second === nodeName)
    .filter(([first, second]) => !onlyUnvisited || !patrolState.visitedEdges.has(edgeKey(first, second)))
    .map(([first, second]) => (first === nodeName ? second : first));
}

function drawPatrolMap() {
  const ctx = canvasContext;
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillStyle = "#cfe8dd";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  // 柔和格線讓 Canvas 保持繪本地圖的紙張感。
  ctx.strokeStyle = "rgba(91, 89, 96, .08)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= gameCanvas.width; x += 30) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, gameCanvas.height); ctx.stroke();
  }
  for (let y = 0; y <= gameCanvas.height; y += 30) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(gameCanvas.width, y); ctx.stroke();
  }

  // 未巡邏走廊使用淺色虛線，已巡邏走廊改成粉彩橘實線。
  patrolEdges.forEach(([first, second]) => {
    const start = patrolNodes[first];
    const end = patrolNodes[second];
    const visited = patrolState.visitedEdges.has(edgeKey(first, second));
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = visited ? "#edaa8e" : "rgba(253, 251, 247, .95)";
    ctx.lineWidth = visited ? 7 : 4;
    ctx.setLineDash(visited ? [] : [10, 8]);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  Object.entries(patrolNodes).forEach(([name, node]) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 27, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.strokeStyle = "rgba(91, 89, 96, .55)";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 強化當前所在位置的標示（發光與加粗外框）
    if (name === patrolState.currentNode) {
      ctx.shadowColor = "#f8e4a8";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 36, 0, Math.PI * 2);
      ctx.strokeStyle = "#fdfbf7";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    
    ctx.fillStyle = "#5b5960";
    ctx.font = "800 22px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, node.x, node.y);
  });

  // 用圖片呈現安妮亞目前所在的節點；尚未選起點時不顯示角色。
  if (patrolState.currentNode) {
    const player = patrolNodes[patrolState.currentNode];
    if (anyaImg.complete && anyaImg.naturalWidth > 0) {
      ctx.drawImage(anyaImg, player.x - 24, player.y - 70, 48, 48);
    }
  }
}

function patrolLoop() {
  if (!patrolState.active) return;
  drawPatrolMap();
  patrolState.animationFrame = window.requestAnimationFrame(patrolLoop);
}

function resetPatrolState(startNode = null) {
  patrolState.currentNode = startNode;
  patrolState.startNode = startNode;
  patrolState.startLocked = false;
  patrolState.canPickStart = true;
  patrolState.visitedEdges.clear();
  patrolState.inputLocked = false;
  drawPatrolMap();
}

function openVideoTutorial() {
  patrolState.canPickStart = false;
  videoTutorialModal.classList.add("modal-open");
}

function closeVideoTutorial() {
  videoTutorialModal.classList.remove("modal-open");
  patrolState.canPickStart = true;
}

function getCanvasPoint(event) {
  const rect = gameCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * gameCanvas.width,
    y: ((event.clientY - rect.top) / rect.height) * gameCanvas.height,
  };
}

function getClickedPatrolNode(event) {
  const point = getCanvasPoint(event);
  return Object.entries(patrolNodes).find(([, node]) => {
    return Math.hypot(point.x - node.x, point.y - node.y) <= 34;
  })?.[0] || null;
}

function handleCanvasClick(event) {
  if (!patrolState.active || !patrolState.canPickStart || patrolState.startLocked) return;

  const nodeName = getClickedPatrolNode(event);
  if (!nodeName) return;

  patrolState.currentNode = nodeName;
  patrolState.startNode = nodeName;
  drawPatrolMap();
}

function showCanvasStatus(message, duration = 1000) {
  window.clearTimeout(canvasStatusTimer);
  canvasStatus.textContent = message;
  canvasStatus.hidden = false;
  canvasStatus.classList.remove("is-visible");
  void canvasStatus.offsetWidth;
  canvasStatus.classList.add("is-visible");
  canvasStatusTimer = window.setTimeout(() => {
    canvasStatus.hidden = true;
    canvasStatus.classList.remove("is-visible");
  }, duration);
}

function stopPatrol() {
  patrolState.active = false;
  if (patrolState.animationFrame) window.cancelAnimationFrame(patrolState.animationFrame);
  patrolState.animationFrame = null;
  gameCanvas.hidden = true;
  gameCanvas.classList.remove("is-visible");
  canvasStatus.hidden = true;
}

function failPatrol() {
  patrolState.failures += 1;
  patrolState.inputLocked = true;
  showCanvasStatus("被野狗追上了！", 1300);

  window.setTimeout(() => {
    resetPatrolState(null);
    openHintModal("路線卡住了！請重新用滑鼠選擇起始大樓，再試著一次走完所有走廊。");
  }, 1300);
}

function winPatrol() {
  stopPatrol();
  dialogueBox.hidden = false;
  showNode(dialogueMap.get("q3_canvas").nextCorrect);
}

function getNodeByDirection(direction) {
  const vector = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 } }[direction];
  if (!vector) return null;

  const current = patrolNodes[patrolState.currentNode];
  return getNeighbors(patrolState.currentNode)
    .map((name) => {
      const target = patrolNodes[name];
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const distance = Math.hypot(dx, dy);
      return { name, dot: (dx / distance) * vector.x + (dy / distance) * vector.y };
    })
    .filter((candidate) => candidate.dot > 0)
    .sort((first, second) => second.dot - first.dot)[0]?.name || null;
}

function handlePatrolKey(event) {
  if (!patrolState.active || patrolState.inputLocked) return;

  if (!patrolState.currentNode) {
    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      showCanvasStatus("請先用滑鼠左鍵選擇起始大樓！");
    }
    return;
  }

  const targetNode = getNodeByDirection(event.key);
  if (!targetNode) return;
  event.preventDefault();

  const key = edgeKey(patrolState.currentNode, targetNode);
  if (patrolState.visitedEdges.has(key)) {
    showCanvasStatus("這裡已經巡邏過了！");
    return;
  }

  patrolState.startLocked = true;
  patrolState.canPickStart = false;
  patrolState.visitedEdges.add(key);
  patrolState.currentNode = targetNode;
  drawPatrolMap();

  if (patrolState.visitedEdges.size === patrolEdges.length) {
    winPatrol();
    return;
  }
  if (getNeighbors(patrolState.currentNode, true).length === 0) failPatrol();
}

function startPatrol() {
  hideInteractionPanels();
  dialogueBox.hidden = true;
  gameCanvas.hidden = false;
  gameCanvas.classList.add("is-visible");
  patrolState.active = true;
  resetPatrolState(null);
  patrolLoop();
  openVideoTutorial();
}

// ---------- 劇情節點與一般互動 ----------

function showNode(nodeId) {
  const node = dialogueMap.get(nodeId);
  if (!node) return;
  currentNodeId = nodeId;
  hideInteractionPanels();

  if (node.type === "canvas_patrol") {
    startPatrol();
    return;
  }

  gameCanvas.hidden = true;
  gameCanvas.classList.remove("is-visible");
  dialogueBox.hidden = false;
  if (node.type === "dialogue") startTypewriter(node);
  if (node.type === "choice") renderChoice(node);
  if (node.type === "keypad") renderKeypad(node);
}

function advanceDialogue() {
  if (patrolState.active) return;

  if (currentNodeId === "__q1_reminder__") {
    if (isTyping) {
      window.clearTimeout(typingTimer);
      isTyping = false;
      dialogueText.innerHTML = dialogueToHtml("安妮亞，妳剛剛已經掉進過類似的邏輯陷阱囉，記得我們要把 13 個人分進 12 個月份裡！").map((token) => token.html).join("");
      return;
    }
    showNode(pendingAfterReminder);
    pendingAfterReminder = null;
    return;
  }

  const currentNode = dialogueMap.get(currentNodeId);
  if (!currentNode || currentNode.type !== "dialogue") return;
  if (isTyping) {
    window.clearTimeout(typingTimer);
    isTyping = false;
    updateCharacter(currentNode);
    dialogueText.innerHTML = dialogueToHtml(currentNode.text).map((token) => token.html).join("");
    return;
  }
  if (currentNode.next) showNode(currentNode.next);
}

// Loading Scene 與既有過場時間維持不變。
window.setTimeout(() => switchScene(loadingScene, titleScene), 2000);

startButton.addEventListener("click", () => {
  switchScene(titleScene, dialogueScene);
  showNode("start");
});

dialogueBox.addEventListener("click", advanceDialogue);
videoTutorialReadyButton.addEventListener("click", closeVideoTutorial);
gameCanvas.addEventListener("click", handleCanvasClick);

historyButton.addEventListener("click", () => {
  renderDialogueHistory();
  openModal(historyModal);
});
hintButton.addEventListener("click", () => openHintModal());

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => closeModal(document.querySelector(`#${button.dataset.closeModal}`)));
});

[historyModal, hintModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

window.addEventListener("keydown", (event) => {
  if (patrolState.active) {
    handlePatrolKey(event);
    return;
  }

  if (event.code === "Escape") {
    closeModal(historyModal);
    closeModal(hintModal);
    return;
  }
  if ((event.code === "Space" || event.code === "Enter") && !dialogueScene.classList.contains("is-hidden")) {
    if (historyModal.classList.contains("modal-open") || hintModal.classList.contains("modal-open")) return;
    event.preventDefault();
    advanceDialogue();
  }
});

