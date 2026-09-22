/**
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
];
  { id: "q2_subtle_hint", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "（心想：安妮亞看起來有點苦惱。這題需要排除法，她可能卡在某個邏輯死角了。）", next: "q2_hint_ask" },
  { id: "q2_hint_ask", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "安妮亞，妳的表情告訴我妳遇到了困難。是卡在「艾伯特說的話」，還是「貝納德說的話」呢？", next: "q2_hint_choice" },
  { id: "q2_hint_choice", type: "choice", options: [
      { text: "為什麼艾伯特確定貝納德不知道？", next: "q2_hint_albert" },
      { text: "貝納德是怎麼突然知道的？", next: "q2_hint_bernard" },
    ]
  },
  { id: "q2_hint_albert", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "如果艾伯特手上的月份，包含了一個「只有唯一日期的日子」（例如 18 或 19），他就不敢這麼肯定了。試著把不可能的月份劃掉吧。", next: "q2_choice" },
  { id: "q2_hint_bernard", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "原本貝納德只有日期，無法確定。但聽完艾伯特的話，排除了某些月份後，剩下的選項中，他的日期肯定沒有重複了。", next: "q2_choice" },

