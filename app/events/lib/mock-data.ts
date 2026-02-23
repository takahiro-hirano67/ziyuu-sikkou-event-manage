// app/events/lib/mock-data.ts

import type { Event, EventContent, EventEquipment, EventPrize, EventTask, EventNote, EventWithRelations } from "./types";

// ============================================================
// ヘルパー関数
// ============================================================

// IDでイベントを取得（※模擬的）
export function getEventById(id: string): EventWithRelations | null {
    const allEvents = [mockEventWithRelations, mockEventCircleRallyWithRelations];
    return allEvents.find((event) => event.id === id) || null;
}

// 全イベント一覧を取得（※模擬的）
export function getAllEvents(): Event[] {
    return [mockEvent, mockEventCircleRally];
}


// ============================================================
// モックデータ: 春の交流会
// ============================================================

export const mockEvent: Event = {
    id: "event-001",
    name: "2026年度 春の交流会",
    category: "大イベント",
    status: "planning",

    // コアURL
    coreReferenceUrl: {
        "label": "Google Drive",
        "url": "https://drive.google.com/drive/u/0/folders/1ZvjJy1GHA5bFyIRZroC3_7du4b-k_-TT"
    },

    // 基本情報
    purpose: "自由ヶ丘キャンパスのサークル活動を活発にするため。当企画を通して他学年の垣根を超え、より充実した大学生活を送ってもらうことを目指す。",
    overview: "新入生と在学生が交流するイベント。ゲームやビンゴ大会を通じて親睦を深める。",
    location: "自由ヶ丘キャンパス311教室",
    date: "2026-04-22", // 文字列で扱う
    startTime: "16:30",
    endTime: "18:00",
    prepTime: "16:10",

    targetAudience: "・経営情報システム専攻の学生\n・1年生\n・2年生",
    expectedParticipants: 40,
    budget: 160000,

    promotionMethods: "・L-Cam(学内連絡)\n・Instagram\n・X公式LINE\n・ビラ",
    roles: {
        "司会": "山田",
        "副司会": "佐藤",
        "受付": "後藤",
        "ゲームマスター": "鈴木・伊藤・近藤",
    },

    timeTable: {
        "16:10": "講義終了・イベント準備開始",
        "16:20": "参加者入場・受付開始",
        "16:30": "イベント開始",
        "16:35": "企画1「共通点探しゲーム」実施",
        "16:45": "企画2「ito」実施",
        "17:00": "企画3「NGワードゲーム」実施",
        "17:20": "企画4「ビンゴ大会」実施",
        "18:00": "イベント準備開始",
    },

    referenceUrls: {
        "GoogleDrive": "https://drive.google.com/drive/u/0/folders/1ZvjJy1GHA5bFyIRZroC3_7du4b-k_-TT",
        "1月14日議事録": "https://docs.google.com/document/d/1WiomC7XKo4ZHq15TDtEsCcHUM4Avf5T2DGm5-jYmBNU/edit?usp=sharing"
    },

    // メモ欄（Markdown対応）
    memo: "# 任意メモ欄\n## 見出し2",

    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-03-15"),
};

// ------------------------------------------------------------
// イベント内容（企画）
// ------------------------------------------------------------

export const mockEventContents: EventContent[] = [
    {
        id: "content-001",
        eventId: "event-001",
        order: 1,

        name: "共通点探しゲーム",
        overview: "「共通点探しゲーム」は、特別な道具もいらず、初対面の緊張を解く（アイスブレイク）のに最適な企画です。",
        description: "・グループ内で全員が一致する共通点が1つにつき1点\n・（ホワイトボードに記述）\n・一番共通点が多かったチームが勝利",
        flow: "・ルール説明（2分程度）\n・話し合い（6分程度）\n・結果発表（2分程度）",

        equipment: "・各グループにペン1～2本\n・各グループにホワイトボードを1枚\n・タイマー",
        referenceUrls: ["https://example.com"],

        createdAt: new Date("2026-02-10"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "content-002",
        eventId: "event-001",
        order: 2,

        name: "ito",
        overview: "「ito（イト）」は、価値観のズレを楽しむゲーム。新入生同士が「この人、自分と感覚が似てる！」と感じたり、「そんな考え方があるんだ！」と驚いたりするのに最適なゲーム。",
        description: "・各グループで1～100の数字カードを1人1枚配布\n・お題（例: 食べものの人気度）を設定\n・自分の数字について「数字を言わずに」お題に沿った言葉で表現していく。（1が最低～100が最高）\n・全員の表現を聞き、数字が小さいと思う順にカードを場に伏せて出す。\n・カードを表にしたとき、小さい順に並んでいたら成功。",
        flow: "1. ルール説明とデモ（3分）\n2. ゲーム3回実施（10分）\n3. 振り返り（2分）",

        equipment: "・ito(市販)\n・お題表示スライド",
        referenceUrls: ["https://example.com"],

        createdAt: new Date("2026-02-10"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "content-003",
        eventId: "event-001",
        order: 3,

        name: "NGワードゲーム",
        overview: "自分に割り当てられた「NGワード」を知らないまま会話を進め、最後までその言葉を言わずに生き残るゲーム。",
        description: "各参加者にNGワードを配布し、相手のNGワードを引き出すよう会話を行う。最後まで残っている人が勝利。",
        flow: "1. 各参加者にNGワードを配布\n2. ゲーム開始\n   4分間、相手のNGワードを引き出すよう会話を行う\n3. ゲーム終了\n   最後まで残っている人が勝利\n\n（1～3を3回程度繰り返す）",

        equipment: "・参加者に割り当てるNGワードの札\n・タイマー",
        referenceUrls: ["https://example.com"],

        createdAt: new Date("2026-02-10"),
        updatedAt: new Date("2026-03-01"),
    },
];

// ------------------------------------------------------------
// タスク
// ------------------------------------------------------------

export const mockEventTasks: EventTask[] = [
    // 企画立案段階
    {
        id: "task-001",
        eventId: "event-001",
        category: "企画立案段階",
        name: "企画案出し",
        deadline: new Date("2026-02-19"),
        assignee: "全員",
        completed: true,
        memo: undefined,
        order: 1,
        createdAt: new Date("2026-02-01"),
        updatedAt: new Date("2026-02-20"),
    },
    {
        id: "task-002",
        eventId: "event-001",
        category: "企画立案段階",
        name: "景品決定",
        deadline: new Date("2026-02-24"),
        assignee: "全員",
        completed: true,
        memo: undefined,
        order: 2,
        createdAt: new Date("2026-02-01"),
        updatedAt: new Date("2026-02-25"),
    },
    {
        id: "task-003",
        eventId: "event-001",
        category: "企画立案段階",
        name: "企画書作成",
        deadline: new Date("2026-02-28"),
        assignee: "山田",
        completed: false,
        memo: undefined,
        order: 3,
        createdAt: new Date("2026-02-01"),
        updatedAt: new Date("2026-02-15"),
    },

    // イベント内容・準備
    {
        id: "task-004",
        eventId: "event-001",
        category: "イベント内容・準備",
        name: "進行スライド作成",
        deadline: new Date("2026-03-14"),
        assignee: "佐藤",
        completed: false,
        memo: undefined,
        order: 1,
        createdAt: new Date("2026-02-15"),
        updatedAt: new Date("2026-02-15"),
    },
    {
        id: "task-005",
        eventId: "event-001",
        category: "イベント内容・準備",
        name: "ito ルール詳細",
        deadline: new Date("2026-03-10"),
        assignee: "鈴木",
        completed: false,
        memo: undefined,
        order: 2,
        createdAt: new Date("2026-02-15"),
        updatedAt: new Date("2026-02-15"),
    },
    {
        id: "task-006",
        eventId: "event-001",
        category: "イベント内容・準備",
        name: "景品購入",
        deadline: new Date("2026-03-16"),
        assignee: "全員（行ける人）",
        completed: false,
        memo: undefined,
        order: 3,
        createdAt: new Date("2026-02-20"),
        updatedAt: new Date("2026-02-20"),
    },

    // 宣伝
    {
        id: "task-007",
        eventId: "event-001",
        category: "宣伝",
        name: "宣伝用ビラ作成",
        deadline: new Date("2026-03-10"),
        assignee: "後藤",
        completed: true,
        memo: undefined,
        order: 1,
        createdAt: new Date("2026-02-20"),
        updatedAt: new Date("2026-03-11"),
    },
    {
        id: "task-008",
        eventId: "event-001",
        category: "宣伝",
        name: "SNS発信準備",
        deadline: new Date("2026-03-10"),
        assignee: "近藤",
        completed: false,
        memo: undefined,
        order: 2,
        createdAt: new Date("2026-02-20"),
        updatedAt: new Date("2026-02-20"),
    },

    // リハーサル
    {
        id: "task-009",
        eventId: "event-001",
        category: "リハーサル",
        name: "3月16日リハーサル①",
        deadline: new Date("2026-03-30"),
        assignee: "全員",
        completed: false,
        memo: undefined,
        order: 1,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },

    // 本番（最終確認）
    {
        id: "task-010",
        eventId: "event-001",
        category: "本番（最終確認）",
        name: "備品確認",
        deadline: new Date("2026-04-15"),
        assignee: "伊藤",
        completed: false,
        memo: undefined,
        order: 1,
        createdAt: new Date("2026-03-15"),
        updatedAt: new Date("2026-03-15"),
    },
];

// ------------------------------------------------------------
// 備品
// ------------------------------------------------------------

export const mockEventEquipment: EventEquipment[] = [
    {
        id: "equipment-001",
        eventId: "event-001",
        order: 1,
        itemName: "ペン 5本",
        purpose: "受付用",
        purchaseStatus: "inStock",
        price: undefined,
        note: undefined,
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-002",
        eventId: "event-001",
        order: 2,
        itemName: "ホワイトボード 6枚",
        purpose: "共通点探しゲーム用",
        purchaseStatus: "inStock",
        price: undefined,
        note: "グループ数分",
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-003",
        eventId: "event-001",
        order: 3,
        itemName: "タイマー 2個",
        purpose: "ゲーム進行用",
        purchaseStatus: "inStock",
        price: undefined,
        note: undefined,
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-004",
        eventId: "event-001",
        order: 4,
        itemName: "ito（市販ゲーム） 1セット",
        purpose: "ゲーム実施用",
        purchaseStatus: "required",
        price: 2800,
        note: undefined,
        referenceUrl: "https://example.com",
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
];

// ------------------------------------------------------------
// 景品
// ------------------------------------------------------------

export const mockEventPrizes: EventPrize[] = [
    {
        id: "prize-001",
        eventId: "event-001",
        order: 1,
        itemName: "iPad",
        estimatedPrice: 58800,
        actualPrice: undefined,
        category: "大景品",
        storeCandidates: "家電量販店",
        description: "新入生にとって需要しかない。",
        referenceUrl: "https://example.co.jp",
        proposedBy: "佐藤",
        createdAt: new Date("2026-02-24"),
        updatedAt: new Date("2026-02-24"),
    },
    {
        id: "prize-002",
        eventId: "event-001",
        order: 2,
        itemName: "ワイヤレスイヤホン",
        estimatedPrice: 6600,
        actualPrice: undefined,
        category: "中景品",
        storeCandidates: "家電量販店",
        description: "",
        referenceUrl: "https://example.co.jp",
        proposedBy: "後藤",
        createdAt: new Date("2026-02-24"),
        updatedAt: new Date("2026-02-24"),
    },
    {
        id: "prize-003",
        eventId: "event-001",
        order: 3,
        itemName: "入浴剤",
        estimatedPrice: 2000,
        actualPrice: undefined,
        category: "小景品",
        storeCandidates: "雑貨店",
        description: "お風呂時間をもっと楽しく",
        referenceUrl: undefined,
        proposedBy: "山田",
        createdAt: new Date("2026-02-24"),
        updatedAt: new Date("2026-02-24"),
    },
];

// ------------------------------------------------------------
// ノート
// ------------------------------------------------------------

export const mockEventNotes: EventNote[] = [
    {
        id: "note-001",
        eventId: "event-001",
        order: 1,
        title: "L-Cam発信内容",
        content: "# 春の交流会のお知らせ\n\n4月22日(火)16:30より...",
        category: "宣伝",
        color: "blue",
        author: "山田",
        editor: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "note-002",
        eventId: "event-001",
        order: 2,
        title: "リハーサル振り返り",
        content: "## 良かった点\n- 進行がスムーズ\n\n## 改善点\n- タイマーの音量が小さい",
        category: "振り返り",
        color: "yellow",
        author: undefined, // 匿名
        editor: undefined,
        createdAt: new Date("2026-03-16"),
        updatedAt: new Date("2026-03-16"),
    },
    {
        id: "note-003",
        eventId: "event-001",
        order: 3,
        title: "Instagram投稿文案",
        content: "春の交流会、開催決定🌸\n...",
        category: "SNS",
        color: "pink",
        author: "佐藤",
        editor: "鈴木",
        createdAt: new Date("2026-03-10"),
        updatedAt: new Date("2026-03-12"),
    },
];

// ------------------------------------------------------------
// 全データを結合
// ------------------------------------------------------------

export const mockEventWithRelations: EventWithRelations = {
    ...mockEvent,
    contents: mockEventContents,
    tasks: mockEventTasks,
    equipment: mockEventEquipment,
    prizes: mockEventPrizes,
    notes: mockEventNotes,
};


// ============================================================
// モックデータ: サークルラリー
// ============================================================

export const mockEventCircleRally: Event = {
    id: "event-002",
    name: "2026年度 サークルラリー",
    category: "大イベント",
    status: "preparing",

    // コアURL
    coreReferenceUrl: {
        "label": "Google Drive",
        "url": "https://drive.google.com/drive/u/0/folders/1TPYLZaIWUomcVFPrCcsUrxdg5-kQaE-V"
    },

    // 基本情報
    purpose: "自由ヶ丘キャンパスのサークル活動を活発にするため。ひいては自由ヶ丘キャンパスの活性化および学生間の交流を促進するため。",
    overview: "サークルがブース形式で新入生に活動を紹介するイベント。巡回形式で全サークルを回った後、自由に気になるサークルのブースを訪問できる。",
    location: "自由ヶ丘キャンパス311教室",
    date: "4月中旬（講義時間割確定後決定）",
    startTime: "16:30",
    endTime: "18:00",
    prepTime: "16:10",

    targetAudience: "・新一年生 → メインターゲット層\n・新二年生 → 一年生の時に入り損ねた人への機会提供",
    expectedParticipants: 40,
    budget: 13800,

    promotionMethods: "・L-Cam\n・SNS（インスタ、X、LINE）\n・1年生セミナーのタイミング\n・ビラ（1種類、セミナーで配る）\n・イベント当日にキャンパスの出入口で口頭宣伝",

    roles: {
        "会場司会": "田中",
        "受付": "中村",
        "食堂前宣伝": "高橋・小林",
        "進行管理": "伊藤",
    },

    timeTable: {
        "16:10": "サークル集合、必要事項の説明、ブース用意開始 / 食堂前宣伝開始",
        "16:20": "参加者入場・受付開始",
        "16:30": "イベント開始（会場司会による説明＆諸注意等）",
        "16:35": "巡回形式でサークルを見ていく",
        "17:25": "ブース形式（自由）でサークルを見ていく",
        "18:00": "イベント終了・撤収・解散",
    },

    referenceUrls: {
        "昨年度サークル担当者アンケート": "https://docs.google.com/forms/d/1blcZhm4TsvkPwRANhMh2vcEVuk8RAu2rG8d8bF4cqu4/edit#responses",
        "昨年度参加者アンケート": "https://docs.google.com/forms/d/1z4qP0pf7s632kgbYT-r5WuADT5YYADD6D6zgDED33p4/edit#responses"
    },

    memo: "# 参加サークル候補（計10サークル）\n\n・自由ヶ丘ボードゲームサークル\n・e-Sports Community Circle\n・Community Circle Hill's\n・AIT 株式研究会～Beckoning Cat～\n・自由ヶ丘執行委員会（学友会）\n・アイデアクリエイターズ（クラブ会未所属）\n・自由ヶ丘サウナサークル SPREAT\n・なんくるないサークル（活動実態不明）\n・SDGs推進チーム（学生チャレンジプロジェクト）\n・会計勉強会（新規サークル）\n\n※開催日が未定のため、予定によっては参加できないサークルが出てくる可能性あり。\n※評議会の承認後に各サークルへ連絡し、イベントの詳細説明と併せて参加の確認をとる。",

    createdAt: new Date("2026-02-10"),
    updatedAt: new Date("2026-03-01"),
};

// ------------------------------------------------------------
// イベント内容（企画）
// ------------------------------------------------------------

export const mockEventCircleRallyContents: EventContent[] = [
    {
        id: "content-004",
        eventId: "event-002",
        order: 1,

        name: "巡回形式によるサークル紹介",
        overview: "参加者をグループに分け、時間を区切って全サークルのブースを順番に体験する形式。各サークル5分間で活動内容をPRする。",
        description: "・1回あたり5分でサークルについて紹介・PRをしてもらう\n・5分終了後、参加者は次のサークルへ移動（全サークル回り終わるまで繰り返す）\n・5分以内であればPR方法は自由\n・このタイミングで入部に関わる手続きはしない（機会を等しくするため）",
        flow: "1. 受付開始後、集まった参加者を均等にグループに分ける\n2. 最初に説明を受けるサークルのブースの椅子に座ってもらう\n3. 執行委員の指示に従い、順番にブースを回っていく\n4. 全サークルを回り終えるまで繰り返す（所要時間: 約50分）",

        equipment: "・ブース用机・椅子（サークル数分）\n・タイマー\n・進行用スライド（中央スクリーン使用）",
        referenceUrls: undefined,
        memo: "【所要時間計算】\n- 基本時間: 5分 × 9サークル = 45分\n- 移動時間: 20秒 × 8回 = 2分40秒\n- 休憩時間: 2分 × 1回 = 2分\n- 合計 49分40秒 ≒ 50分\n\n※2026年度は7サークル参加、1回4分だったが紹介時間が短かったとの声があったため今年は5分に変更",

        createdAt: new Date("2026-02-15"),
        updatedAt: new Date("2026-02-28"),
    },
    {
        id: "content-005",
        eventId: "event-002",
        order: 2,

        name: "ブース形式による自由見学・入部手続き",
        overview: "イベント終了時刻まで、参加者が自由に気になったサークルのブースへ行き、詳しい話を聞いたり入部手続きを行ったりできる時間。",
        description: "・参加者は自由に気になったサークルのブースへ行ける\n・PR内容も自由（体験企画なども可）\n・入部手続き可能\n・参加者は途中退出可能（アンケート回答後）\n・サークル側も運営側に一声あれば途中撤収可能",
        flow: "1. 巡回形式終了後、ブース形式へ移行（17:25～）\n2. 参加者は自由にサークルブースを訪問\n3. イベント終了時刻（18:00）まで継続\n4. 退出時に参加者アンケート回答\n5. 撤収・解散",

        equipment: "・参加者アンケート用紙・QRコード\n・参加賞（図書カード or ビンゴカード）\n・サークル関係者向け飲み物",
        referenceUrls: undefined,
        memo: "※時間を活かして説明以外にもその場で体験できることをやってもよい\n※ブースの範囲内であれば、ビラ等配布物も許可（311教室外で配布する際は事務室で申請が必要）",

        createdAt: new Date("2026-02-15"),
        updatedAt: new Date("2026-02-28"),
    },
];

// ------------------------------------------------------------
// タスク
// ------------------------------------------------------------

export const mockEventCircleRallyTasks: EventTask[] = [
    // 企画立案段階
    {
        id: "task-011",
        eventId: "event-002",
        category: "企画立案段階",
        name: "企画書作成",
        deadline: new Date("2026-02-20"),
        assignee: "田中",
        completed: true,
        memo: undefined,
        order: 1,
        createdAt: new Date("2026-02-01"),
        updatedAt: new Date("2026-02-21"),
    },
    {
        id: "task-012",
        eventId: "event-002",
        category: "企画立案段階",
        name: "評議会への提出・承認",
        deadline: new Date("2026-02-28"),
        assignee: "田中",
        completed: false,
        memo: undefined,
        order: 2,
        createdAt: new Date("2026-02-01"),
        updatedAt: new Date("2026-02-15"),
    },
    {
        id: "task-013",
        eventId: "event-002",
        category: "企画立案段階",
        name: "講義時間割確定後、開催日確定",
        deadline: new Date("2026-03-31"),
        assignee: "全員",
        completed: false,
        memo: "4月中旬を想定",
        order: 3,
        createdAt: new Date("2026-02-01"),
        updatedAt: new Date("2026-02-15"),
    },

    // イベント内容・準備
    {
        id: "task-014",
        eventId: "event-002",
        category: "イベント内容・準備",
        name: "各サークルへ連絡・参加確認",
        deadline: new Date("2026-03-15"),
        assignee: "中村",
        completed: false,
        memo: "評議会承認後に実施",
        order: 1,
        createdAt: new Date("2026-02-20"),
        updatedAt: new Date("2026-02-20"),
    },
    {
        id: "task-015",
        eventId: "event-002",
        category: "イベント内容・準備",
        name: "会場レイアウト図作成",
        deadline: new Date("2026-03-20"),
        assignee: "伊藤",
        completed: false,
        memo: "311教室のブース配置を決定",
        order: 2,
        createdAt: new Date("2026-02-20"),
        updatedAt: new Date("2026-02-20"),
    },
    {
        id: "task-016",
        eventId: "event-002",
        category: "イベント内容・準備",
        name: "進行用スライド作成",
        deadline: new Date("2026-04-05"),
        assignee: "田中",
        completed: false,
        memo: "中央スクリーン用",
        order: 3,
        createdAt: new Date("2026-02-20"),
        updatedAt: new Date("2026-02-20"),
    },
    {
        id: "task-017",
        eventId: "event-002",
        category: "イベント内容・準備",
        name: "参加者アンケート・サークルアンケート作成",
        deadline: new Date("2026-04-05"),
        assignee: "高橋",
        completed: false,
        memo: "Google Form使用",
        order: 4,
        createdAt: new Date("2026-02-20"),
        updatedAt: new Date("2026-02-20"),
    },
    {
        id: "task-018",
        eventId: "event-002",
        category: "イベント内容・準備",
        name: "参加賞（図書カード）購入",
        deadline: new Date("2026-04-10"),
        assignee: "小林",
        completed: false,
        memo: "500円×20枚（去年度購入分15枚から補充）",
        order: 5,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "task-019",
        eventId: "event-002",
        category: "イベント内容・準備",
        name: "サークル関係者向け飲み物購入",
        deadline: new Date("2026-04-14"),
        assignee: "中村",
        completed: false,
        memo: "15人分想定",
        order: 6,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },

    // 宣伝
    {
        id: "task-020",
        eventId: "event-002",
        category: "宣伝",
        name: "宣伝用ビラ作成",
        deadline: new Date("2026-04-01"),
        assignee: "高橋",
        completed: false,
        memo: "1種類、1年生セミナーで配布",
        order: 1,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "task-021",
        eventId: "event-002",
        category: "宣伝",
        name: "L-Cam掲載依頼",
        deadline: new Date("2026-04-05"),
        assignee: "田中",
        completed: false,
        memo: undefined,
        order: 2,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "task-022",
        eventId: "event-002",
        category: "宣伝",
        name: "SNS発信（インスタ・X・LINE）",
        deadline: new Date("2026-04-10"),
        assignee: "小林",
        completed: false,
        memo: undefined,
        order: 3,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },

    // リハーサル
    {
        id: "task-023",
        eventId: "event-002",
        category: "リハーサル",
        name: "事前リハーサル・最終確認",
        deadline: new Date("2026-04-14"),
        assignee: "全員",
        completed: false,
        memo: "進行確認、役割分担確認",
        order: 1,
        createdAt: new Date("2026-03-15"),
        updatedAt: new Date("2026-03-15"),
    },

    // 本番（最終確認）
    {
        id: "task-024",
        eventId: "event-002",
        category: "本番（最終確認）",
        name: "備品最終確認",
        deadline: new Date("2026-04-15"),
        assignee: "伊藤",
        completed: false,
        memo: "当日朝に実施",
        order: 1,
        createdAt: new Date("2026-04-01"),
        updatedAt: new Date("2026-04-01"),
    },
    {
        id: "task-025",
        eventId: "event-002",
        category: "本番（最終確認）",
        name: "各サークルへ当日連絡事項送付",
        deadline: new Date("2026-04-14"),
        assignee: "中村",
        completed: false,
        memo: "集合時刻・持ち物・注意事項等",
        order: 2,
        createdAt: new Date("2026-04-01"),
        updatedAt: new Date("2026-04-01"),
    },
];

// ------------------------------------------------------------
// 備品
// ------------------------------------------------------------

export const mockEventCircleRallyEquipment: EventEquipment[] = [
    {
        id: "equipment-005",
        eventId: "event-002",
        order: 1,
        itemName: "図書カード 500円 x 20枚",
        purpose: "参加賞（アンケート回答特典）",
        purchaseStatus: "required",
        price: 10000,
        note: "去年度購入分15枚から補充する形",
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-006",
        eventId: "event-002",
        order: 2,
        itemName: "ビンゴカード x 20枚",
        purpose: "参加賞（アンケート回答特典・選択肢2）",
        purchaseStatus: "inStock",
        price: undefined,
        note: "既存のもので対応（イベント終了後追加購入）",
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-007",
        eventId: "event-002",
        order: 3,
        itemName: "飲み物 15人分",
        purpose: "サークル関係者への提供",
        purchaseStatus: "required",
        price: 1800,
        note: "サークル側の人数確認後に購入",
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-008",
        eventId: "event-002",
        order: 4,
        itemName: "印刷用紙・インク等",
        purpose: "ビラ印刷、アンケート印刷等",
        purchaseStatus: "required",
        price: 2000,
        note: "交通費含む",
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-009",
        eventId: "event-002",
        order: 5,
        itemName: "ブース用机・椅子",
        purpose: "各サークルブース設営",
        purchaseStatus: "inStock",
        price: undefined,
        note: "311教室備品を使用（サークル数分）",
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-010",
        eventId: "event-002",
        order: 6,
        itemName: "タイマー 2個",
        purpose: "巡回形式の時間管理",
        purchaseStatus: "inStock",
        price: undefined,
        note: undefined,
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-011",
        eventId: "event-002",
        order: 7,
        itemName: "受付用名簿・筆記用具",
        purpose: "参加者受付",
        purchaseStatus: "inStock",
        price: undefined,
        note: undefined,
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
    {
        id: "equipment-012",
        eventId: "event-002",
        order: 8,
        itemName: "アンケート用紙・QRコード",
        purpose: "参加者・サークル担当者アンケート",
        purchaseStatus: "completed",
        price: undefined,
        note: "印刷費は別途計上済み",
        referenceUrl: undefined,
        createdAt: new Date("2026-03-01"),
        updatedAt: new Date("2026-03-01"),
    },
];

// ------------------------------------------------------------
// 景品（なし）
// ------------------------------------------------------------

export const mockEventCircleRallyPrizes: EventPrize[] = [];

// ------------------------------------------------------------
// ノート
// ------------------------------------------------------------

export const mockEventCircleRallyNotes: EventNote[] = [];

// ============================================================
// 全データを統合
// ============================================================

export const mockEventCircleRallyWithRelations: EventWithRelations = {
    ...mockEventCircleRally,
    contents: mockEventCircleRallyContents,
    tasks: mockEventCircleRallyTasks,
    equipment: mockEventCircleRallyEquipment,
    prizes: mockEventCircleRallyPrizes,
    notes: mockEventCircleRallyNotes,
};