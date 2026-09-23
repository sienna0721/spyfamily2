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
    ]
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
  { id: "q2_wrong", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "密碼不對喔。冷靜下來想想，當我說出『我確定安妮亞不知道』的時候，其實就已經幫妳刪掉好幾個不可能的選項了。", next: "q2_keypad" },


   // 🔽 密碼盤錯兩次時觸發的蘇格拉底式引導
  { id: "q2_subtle_hint", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "看來我們需要一點提示。想想看，安妮亞是怎麼在聽完我的話之後，突然就知道密碼了呢？", next: "q2_hint_step1" },
  { id: "q2_hint_step1", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "因為父親非常肯定安妮亞不知道！", next: "q2_hint_step2" },
  { id: "q2_hint_step2", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "沒錯。如果我的十位數是 2 或 3，妳有可能拿到獨一無二的 8 或 9，我就不敢這麼肯定了。所以，我的十位數只可能是...？", next: "q2_hint_choice" },
  { id: "q2_hint_choice", type: "choice", options: [
      { text: "只可能是 1", next: "q2_hint_step3" },
      { text: "可能是 2 或 3", next: "q2_hint_wrong" }
    ]
  },
  { id: "q2_hint_wrong", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "不對喔。如果我拿 2，保險箱可能是 28，萬一安妮亞剛好拿到 8 她就秒答了。為了讓我『絕對肯定』她不知道，我手上絕對沒有 2 和 3。", next: "q2_hint_choice" },
  { id: "q2_hint_step3", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "完全正確，十位數是 1，密碼只剩下 14 與 17。安妮亞，妳是因為看著手上的個位數，才知道最終答案的對吧？", next: "q2_hint_step4" },
  { id: "q2_hint_step4", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "（小聲對玩家說）沒錯！因為安妮亞手上的數字是 7 喔！快幫我輸入吧！", next: "q2_keypad" },
  // 🔼 新增結束


  { id: "q2_correct", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "答案是 17！", next: "q2_correct_2" },
  { id: "q2_correct_2", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "（心想：太優雅了！這兩人成功破解！）", next: "q3_1" },
  
  // --- 第三關：校園巡邏 ---
  { id: "q3_1", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "第三題。請看這張校園地圖，有 5 棟大樓與 6 條走廊。", next: "q3_2" },
  { id: "q3_2", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "巡邏員必須<b>不重複</b>走過任何一條走廊，但必須<b>巡視完所有走廊</b>。請試著優雅地走完全程吧！", next: "q3_canvas" },
  { id: "q3_canvas", type: "canvas_patrol", nextCorrect: "q3_correct" },
  { id: "q3_correct", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "優秀！利用頂點度數的奇偶性來決定起終點，這真是一場精彩無比的配合！", next: "q4_1" },
    // --- 第四關：最後的大門 ---
  { id: "q4_1", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "你們一家人的表現真的非常出色，我很想讓你們馬上通過，不過按照規定，還是得要你們通過最後一關才能錄取。", next: "q4_2" },
  { id: "q4_2", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "那麼，請跟我來。", next: "q4_3" },
  { id: "q4_3", type: "dialogue", speaker: "系統", avatarColor: "#ccc", text: "亨利老師帶著佛傑一家來到一扇鐵門前。大門上似乎有幾個引人注目的東西……", next: "q4_investigate" },

  {
    id: "q4_investigate",
    type: "investigation",
    items: [
      { id: "sign", label: "⚠️ 警告標語", top: "70%", left: "20%", next: "q4_sign" },
      { id: "star", label: "⭐", top: "25%", left: "75%", next: "q4_star_1" },
      { id: "keypad", label: "KFRNQD", top: "50%", left: "50%", next: "q4_keypad_intro" },
    ],
  },

  { id: "q4_sign", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "『僅限輸入一次，錯誤即刻淘汰』……看來不能隨便用窮舉法亂猜，必須找到確切的密鑰。", next: "q4_investigate" },

  { id: "q4_star_1", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "父親大人！你看門上那個星星！跟安妮亞想要拿到的『星星』長的一樣！", next: "q4_star_2" },
  { id: "q4_star_2", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "安妮亞數過好多次了，那個星星有 5 個尖角喔！", next: "q4_star_3" },
  { id: "q4_star_3", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "星星的 5 個角？……難道亨利老師把密鑰直接藏在視覺圖像裡了？", next: "q4_star_4" },
  { id: "q4_star_4", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "好，安妮亞，我們就用妳發現的『5』來試試看！把這串字母全部往前推算 5 個字母……", next: "q4_star_5" },
  { id: "q4_star_5", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "K 往前 5 格是 F，F 往前 5 格是 A，R 往前 5 格是 M，N 往前 5 格是 I，Q 往前 5 格是 L，D 往前 5 格是……", next: "q4_star_6" },
  { id: "q4_star_6", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "（露出疑惑的表情）", next: "q4_star_7" },
  { id: "q4_star_7", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "注意到了嗎？推到 A 之後要從 Z 繼續倒數，所以是 C、B、A、Z、Y！", next: "q4_star_8" },
  { id: "q4_star_8", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "答案是 <b>FAMILY</b>！", next: "q4_investigate" },

  { id: "q4_keypad_intro", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "這是凱撒加密法。將原本的英文字母往後平移替換。我現在必須輸入確切的密碼，才能把門打開。", next: "q4_keypad" },

  {
    id: "q4_keypad",
    type: "password_keypad",
    correct: "FAMILY",
    nextCorrect: "q4_correct",
    nextWrong: "q4_wrong",
  },

  { id: "q4_wrong", type: "dialogue", speaker: "系統", avatarColor: "#ccc", text: "【警告：密碼錯誤，防盜機制啟動。】", next: "q4_wrong_2" },
  { id: "q4_wrong_2", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "等等，剛剛輸入太快按錯了，這是最後一次機會，必須精準輸入 F-A-M-I-L-Y！", next: "q4_keypad" },

  { id: "q4_correct", type: "dialogue", speaker: "系統", avatarColor: "#ccc", text: "<img src='images/15727.jpg' class='success-image' alt='解鎖成功介面'><br>【系統廣播：密碼輸入正確，鎖舌已解除，請轉動手輪開啟大門。】", next: "q4_end_1" },
  { id: "q4_end_1", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "太好了，密碼正確！接下來只要轉動這個把手……（用力轉動）……嗯？", next: "q4_end_2" },
  { id: "q4_end_2", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "咕！可惡，這扇門太久沒開，裡面的轉軸完全生鏽卡死了，一個人根本轉不動！", next: "q4_end_3" },
  { id: "q4_end_3", type: "dialogue", speaker: "約兒", avatarColor: "#d9c9e8", text: "洛伊德先生，請讓我也來幫忙吧！遇到困難時，就是要一家人一起面對啊。", next: "q4_end_4" },
  { id: "q4_end_4", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "安妮亞也要幫忙！密碼是 FAMILY，所以一家人要一起轉！", next: "end" },
  { id: "end", type: "dialogue", speaker: "系統", avatarColor: "#ccc", text: "（全劇終。感謝遊玩《安妮亞入學大作戰》！）", next: null },
];
