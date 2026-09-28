/**
 * ==========================================
 * 📁 遊戲資源管理器 (Asset Manager)
 * 所有的圖片路徑都在這裡統一設定，未來修改只需動這裡
 * ==========================================
 */
export const assets = {
  // 背景圖 (Backgrounds)
  bg: {
    meeting_room: "background.png",
    number_blackboard: "number.png",
    route_blackboard:"blackboard_route.png",
    password_input: "password.png",
    
      
  },
  // 角色立繪 (Sprites)
  sprite: {
    anya_smile: "images/anya_smile.png",
    anya_thinking: "images/anya_thinking.png",
    anya_scared: "images/anya_scared.png",
    anya_shy: "images/anya_shy.png",
    anya_cry: "images/anya_cry.png",
    forger_strict: "images/forger_strict.png",
    forger_calm: "images/forger_calm.png",
    forger_polite: "images/forger_polite.png",
    forger_surprise: "images/forger_surprise.png",
    yoru_calm: "images/yoru_calm.png",
    yoru_angry: "images/yoru_angry.png",
    yoru_shy: "images/yoru_shy.png",
    yoru_scared: "images/yoru_scared.png",
    // 範例：anya_smile: "images/anya_smile.png",
  },
  // 特寫插圖 (CG / Props)
  cg: {
    success: "images/15727.jpg"
  }
};

/**
 * ==========================================
 * 📖 劇情節點資料 (Dialogues)
 * 每個節點透過 id 與 next 串接；main.js 只負責解讀資料與啟動對應互動模式。
 * ==========================================
 */
export const dialogues = [
  // --- 序章 ---
  { id: "start", type: "dialogue", speaker: "旁白", avatarColor: "#a8d8b9", text: "陽光透過巨大的落地窗灑進考場。亨利·韓德森老師端著精緻的骨瓷茶杯，輕輕啜飲了一口紅茶。在他面前的紅色天鵝絨沙發上，洛伊德、約兒與安妮亞三人嚴陣以待，展現出無懈可擊的服裝儀容。
", next: "q1_1" },
  { id: "q1_1", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "佛傑一家，你們的外表與禮儀確實無可挑惕，但伊甸學園要培育的，是能在未來的真實社會中解決問題的菁英。真正的優雅，絕非在紙上死背公式，而是能在實作與生活經驗中，展現出完美無缺的邏輯推演！這才是我們學校該有的模樣！", next: "q1_2" },
  { id: "q1_2", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "因此，我準備了四道融入真實情境的『邏輯考驗』。只要你們能在這四個關卡中，展現出無可挑惕的理性與從容不迫的優雅，我就核准安妮亞同學的入學資格。準備好迎接挑戰了嗎？", next: "q1_3" },
  { id: "q1_3", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "觀察力是邏輯的基礎。你們看，現在校門口剛好有 13 位正在排隊的考生。雖然我尚未閱覽過他們的入學資料，但我可以百分之百確定：這 13 個人之中，絕對至少有兩個人的生日是在同一個月份！請告訴我，這個推論的合理性在哪裡？", next: "q1_choice" },
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
  { id: "q1_wrong_math", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "題目問的是『同一個月份』，除以 2 算出來的餘數並不能證明月份重複喔。想想看一年總共有幾個月？", next: "q1_choice" },
  { id: "q1_wrong_season", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "分進四個季節，只能證明『有人同一個季節』，但一個季節有三個月，不一定會同月份。我們換個『籠子』來裝裝看？", next: "q1_choice" },
  { id: "q1_correct", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "亨利老師，這非常合理，一年只有個月，就像 12 個籠子；而 13 位考生就像 13 隻鴿子。當鴿子數量大於籠子時，必定有一個籠子會擠進兩隻以上的鴿子。這就是大部分人熟知的『鴿籠定理』。」
", next: "q1_4" },
  { id: "q1_4", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "沒錯！非常優雅的回答！看來你對生活中的數學邏輯瞭若指掌，但接下來的問題可就沒那麼平易近人了，就讓我看看你們能否保持從容吧！此外，我希望這道題能讓安妮亞同學回答看看。
", next: "q1_5" },
  { id: "q1_5", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "誒！？我嗎？", next: "q1_6" },
  { id: "q1_6", type: "dialogue", speaker: "洛伊德（心聲）", avatarColor: "#a3c9c7", text: "糟了，若是只要我回答還能應付，要安妮亞思考會不會太強人所難了，畢竟在練習面試時沒想過會出這種題目啊！只好請老師讓我一同參與了。", next: "q2_1" },

  // --- 第二關：保險箱密碼 ---
  { id: "q2_1", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "亨利老師，既然是測試我們『一家人』的從容與默契，是否能讓我們以家庭為單位，共同面對這項挑戰呢？。", next: "q2_2" },
  { id: "q2_2", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "哦？主動要求合作，不願讓女兒獨自面對困難嗎？非常優雅的家庭羈絆！既然如此，我就稍微改變一下規則。", next: "q2_3" },
  { id: "q2_3", type: "dialogue", speaker: "旁白", avatarColor: "#ccc", text: "​亨利老師拿出保險箱，並請另一位老師在黑板上寫下 6 個數字：14、17、24、28、37、39，並將兩張字條交給兩人。", next: "q2_4" },
  { id: "q2_4", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "這是開啟保險箱的密碼線索。現在，我將密碼的『十位數』交給佛傑先生，『個位數』交給安妮亞同學，你們不能直接說出自己手上的數字！只能透過溝通來找出真正的密碼。開始吧！", next: "q2_5" },
  { id: "q2_5", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "完蛋了！安妮亞只知道最後一個數字，有這麼多選項，根本不知道是哪一個啊！今天還是朔月，不能使用超能力，是安妮亞的大危機！", next: "q2_6" },
  { id: "q2_6", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "亨利老師，雖然我目前不知道正確密碼是什麼，但我能百分之百確定安妮亞絕對也不知道。。", next: "q2_7" },
  { id: "q2_7", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "恩...", next: "q2_7" },
  { id: "q2_7", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "原本安妮亞還不知道的，但是聽完父親這句話之後，安妮亞知道密碼是多少了！", next: "q2_8" },
  { id: "q2_9", type: "dialogue", speaker: "旁白", avatarColor: "#ccc", text: "​安妮亞是怎麼知道的呢？可以點對話紀錄回去看題目喔！", next: "q2_keypad" },
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
  
  { id: "q2_correct", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "答案是 17！", next: "q2_correct_2" },
  { id: "q2_correct_2", type: "dialogue", speaker: "亨利老師（心聲）", avatarColor: "#a8d8b9", text: "太優雅了！這兩人靠著聰慧的腦袋與家人間的羈絆成功破解這道題目！只不過我還不能表現得太明顯，還有兩道問題還沒考他們呢。", next: "q2_10" },
  { id: "q2_10", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "正確，太優秀了！你們是最快回答出這道問題的一組，我相當期待你們接下來的表現喔！", next: "q3_1" },
  
  
  // --- 第三關：校園巡邏 ---
  { id: "q3_1", type: "dialogue", speaker: "約兒(心聲)", avatarColor: "d9c9e8", text: "佛傑先生和安妮亞小姐都好厲害!要是我也能幫上一點忙就好了..", next: "q3_2" },
  { id: "q3_2", type: "dialogue", speaker: "旁白", avatarColor: "#a3c9c7", text: "​亨利老師輕輕拍了拍手，黑板上的數字隨即被擦拭乾淨。接著，開始在黑板上開始繪製校園的平面圖。
", next: "q3_3" },
  { id: "q3_3", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "很好，第二關的表現確實令人驚豔。那麼第三道題，我們來談談『校園安全與秩序』。身為伊甸學園的家長，未來勢必要參與學校的志工巡邏。各位請看這示意圖——第三題。請看這張校園地圖，有 5 棟大樓與 6 條走廊。", next: "q3_4" },
  { id: "q3_4", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "最近校園內常有野狗誤闖。為了確保學童安全，巡邏員必須<b>不重複走過任何一條走廊，但必須巡視完所有的走廊</b>。請問，我們應該<b>從哪一棟大樓出發？又該如何優雅地走完這條不走回頭路的巡邏路線？</b>這道題，我想請佛傑夫人來主導。", next: "q3_4" },
  { id: "q3_5", type: "dialogue", speaker: "約兒", avatarColor: "#d9c9e8", text: "誒！？我、我嗎？可是我對數學真的非常不拿手……", next: "q3_6" },
  { id: "q3_6", type: "dialogue", speaker: "旁白", avatarColor: "#ccc", text: "洛伊德正想開口幫忙，亨利老師卻搶先一步說", next: "q3_7" },
  { id: "q3_7", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "佛傑先生，請讓尊夫人獨立思考。敏銳的空間感與應變能力，也是優秀母親的必備特質喔！", next: "q3_8" },
  { id: "q3_8", type: "dialogue", speaker: "約兒", avatarColor: "#d9c9e8", text: "好..好的！我會努力的！", next: "q3_canvas" },
  { id: "q3_9", type: "dialogue", speaker: "旁白", avatarColor: "#ccc", text: "約兒看著眼前的平面圖，腦海中突然閃過無數次執行「地下任務」時隱密潛入的畫面。在她的眼裡，那些線不再是複雜的幾何圖形，而是完美的潛入路徑", next: "q3_10" },
  { id: "q3_10", type: "dialogue", speaker: "約兒(心聲)", avatarColor: "#d9c9e8", text: "啊……如果是要不重複地清理掉所有目標的話……這棟 A 大樓連接了 3 條走廊，C 大樓也連接了 3 條走廊，其他大樓都只連接了 2 條。如果隨便從 B 出發，走到最後一定會卡在 A 或 C 動彈不得！所以，必須把這兩個『奇數走廊』的大樓當成起點和終點才行！", next: "q3_11" },
  { id: "q3_11", type: "dialogue", speaker: "約兒", avatarColor: "#d9c9e8", text: "那個……就是、就是把 A 大樓的肚子切開……不對！我是說，因為 A 大樓和 C 大樓的『手腳』數目是單數，所以我們必須從 A 大樓出發，像這樣……（手勢在空中比出複雜的殘影）……最後在 C 大樓優雅地收工！", next: "q3_12" },
  { id: "q3_12", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "手腳？肚子切開？佛傑夫人，您的意思是……？", next: "q3_13" },
  { id: "q3_13", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "安妮亞知道！媽媽的意思是，大樓連接走廊的數量如果長得像『單數邊』，就是調皮的妖怪！只要從 A 大樓出發，沿著 A → B → C → D → A → E → C 的順序走，就可以像畫一筆畫一樣，不踩到重複的尾巴，把所有走廊都走光光！", next: "q3_14" },
  { id: "q3_canvas", type: "canvas_patrol", nextCorrect: "q3_9" },
  { id: "q3_14", type: "dialogue", speaker: "亨利老師（心聲）", avatarColor: "#a8d8b9", text: "不可思議……夫人雖然表達方式獨特，但竟然在瞬間看穿了圖論中的度數特徵！而安妮亞同學更是完美捕捉了母親的想法，將其轉化為精準的語言！這就是母女之間心領神會的優雅嗎！？
", next: "q3_15" },
  
  { id: "q3_correct", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "優秀！利用頂點度數的奇偶性來決定起終點，並流暢地完成一筆畫路徑！佛傑夫人、安妮亞同學，這真是一場精彩無比的精采配合！", next: "q4_1" },
  
  // --- 第四關：最後的大門 ---
  { id: "q4_1", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "你們一家人的表現真的非常出色，我很想讓你們馬上通過，不過按照規定，還是得要你們通過最後一關才能錄取。", next: "q4_2" },
  { id: "q4_2", type: "dialogue", speaker: "亨利老師", avatarColor: "#a8d8b9", text: "那麼，請跟我來。", next: "q4_3" },
  { id: "q4_3", type: "dialogue", speaker: "旁白", avatarColor: "#ccc", text: "亨利老師帶著佛傑一家來到一扇鐵門前。大門上似乎有幾個引人注目的東西……", next: "q4_investigate" },

  {
    id: "q4_investigate",
    type: "investigation",
    items: [
      { id: "sign", label: "⚠️ 警告標語", top: "70%", left: "20%", next: "q4_sign" },
      { id: "star", label: "⭐", top: "25%", left: "75%", next: "q4_star_1" },
      { id: "keypad", label: "KFRNQD", top: "50%", left: "50%", next: "q4_keypad_intro" },
    ],
  },

  { id: "q4_sign", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "『僅限輸入2次，錯誤即刻淘汰』……看來不能隨便用窮舉法亂猜，必須找到確切的密鑰。", next: "q4_investigate" },

  { id: "q4_star_1", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "父親大人！你看門上那個星星！跟安妮亞想要拿到的『星星』長的一樣！", next: "q4_star_2" },
  { id: "q4_star_2", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "安妮亞數過好多次了，那個星星有 5 個尖角喔！", next: "q4_star_3" },
  { id: "q4_star_3", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "星星的 5 個角？……難道亨利老師把密鑰直接藏在視覺圖像裡了？", next: "q4_star_4" },
  { id: "q4_star_4", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "好，安妮亞，我們就用妳發現的『5』來試試看！把這串字母全部往前推算 5 個字母……", next: "q4_investigate" },
  
  { id: "q4_keypad_intro", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "這是凱撒加密法。將原本的英文字母往後平移替換。我現在必須輸入確切的密碼，才能把門打開。", next: "q4_keypad" },

  {
    id: "q4_keypad",
    type: "password_keypad",
    correct: "FAMILY",
    nextCorrect: "q4_correct",
    nextWrong: "q4_wrong",
    cancel:"q4_investigate"
  },

  { id: "q4_wrong", type: "dialogue", speaker: "系統", avatarColor: "#ccc", text: "【警告：密碼錯誤，防盜機制啟動。】", next: "q4_wrong_2" },
  { id: "q4_wrong_2", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "等等，剛剛輸入太快按錯了，這是最後一次機會，必須正確輸入！", next: "q4_keypad" },

  { 
    id: "q4_correct", 
    type: "dialogue", 
    speaker: "系統", 
    avatarColor: "#ccc", 
    cg: assets.cg.success, // 💡 使用資源管理器讀取通關圖片
    text: "【系統廣播：密碼輸入正確，鎖舌已解除，請轉動手輪開啟大門。】", 
    next: "q4_end_1" 
  },
  { id: "q4_end_1", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "太好了，密碼正確！接下來只要轉動這個把手……（用力轉動）……嗯？", next: "q4_end_2" },
  { id: "q4_end_2", type: "dialogue", speaker: "洛伊德", avatarColor: "#a3c9c7", text: "咕！可惡，這扇門太久沒開，裡面的轉軸完全生鏽卡死了，一個人根本轉不動！", next: "q4_end_3" },
  { id: "q4_end_3", type: "dialogue", speaker: "約兒", avatarColor: "#d9c9e8", text: "洛伊德先生，請讓我也來幫忙吧！遇到困難時，就是要一家人一起面對啊。", next: "q4_end_4" },
  { id: "q4_end_4", type: "dialogue", speaker: "安妮亞", avatarColor: "#f8c6b5", text: "安妮亞也要幫忙！密碼是 FAMILY，所以一家人要一起轉！", next: "end" },
  { id: "end", type: "dialogue", speaker: "系統", avatarColor: "#ccc", text: "（全劇終。感謝遊玩《安妮亞入學大作戰》！）", next: null },
];

