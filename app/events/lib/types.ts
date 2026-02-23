// app/events/lib/types.ts

// イベント作成時はイベント名のみ入力で作成可能（状態初期値: planning
// イベント名以外が未入力でも成立するUI設計
// 空のフィールドは、基本的に作成時（CREATE）ではなく編集（PUT）から追加できるように。

// データベース（Neon）導入前は模擬データで開発

// ============================================================
// タブ1&ヘッダー: イベント基本情報・メタデータ
// ============================================================

export type Event = {
    id: string; // イベントid（必須・自動付与）
    name: string; // イベント名 (必須)
    category: "大イベント" | "小イベント"; // (必須)
    // 進行状況 (必須)
    status: "planning" | "preparing" | "in_progress" | "completed" | "archived";

    // 頻繁に参照するURL（1件・ヘッダーにも表示される）
    coreReferenceUrl?: {
        label: string;
        url: string;
    };

    // 基本情報（すべてオプショナル）
    purpose?: string; // 開催目的
    overview?: string; // 概要
    location?: string; // 開催場所
    date?: string; // 開催日
    startTime?: string; // イベント開始時刻
    endTime?: string; // イベント終了時刻
    prepTime?: string; // 準備開始時刻
    targetAudience?: string; // ターゲット層
    expectedParticipants?: number; // 参加想定人数
    budget?: number; // イベント予算総額（円）
    promotionMethods?: string; // 宣伝方法

    // 当日運営役割 { "司会": "山田", ... }
    roles?: Record<string, string>;

    // タイムテーブル { "16:30～": "イベント開始" }
    // 柔軟に書けるようにキーも文字列型で統一（キー重複に注意）
    timeTable?: Record<string, string>;

    // 参考URL { "ラベル": "URL"} 
    referenceUrls?: Record<string, string>;

    // 任意メモ
    memo?: string;

    createdAt: Date; // 作成日 (必須)
    updatedAt: Date; // 更新日 (必須)
};

// ============================================================
// タブ2: イベント内容 (サブ企画)
// ============================================================

export type EventContent = {
    id: string;
    eventId: string;
    order: number; // 表示順序 (必須: システムで自動採番)

    name: string; // 企画名 (必須)
    
    // 以下、後から追記可能にするためオプショナル化
    overview?: string; // 概要
    description?: string; // 説明
    flow?: string; // 企画の流れ
    equipment?: string; // 準備物
    referenceUrls?: string[]; // 参考URL
    memo?: string; // 企画メモ

    createdAt: Date;
    updatedAt: Date;
};

// ============================================================
// タブ3: タスク
// ============================================================

export type EventTask = {
    id: string;
    eventId: string;

    // タスクカテゴリ: "企画立案段階" | "イベント内容・準備" | "宣伝" | "リハーサル" | "本番（最終確認）" | "任意カテゴリ"
    // カテゴリも作成時は未定の場合があるためオプショナル化（UI側で "未分類" として扱うか、空欄を許容する）
    category?: string; 

    name: string; // タスク名 (必須)
    
    deadline?: Date; // 期限
    assignee?: string; // 担当者 (オプショナル化)
    
    // 完了フラグは true/false の2値なので必須のまま（初期値 false）
    completed: boolean; 
    
    memo?: string; // メモ

    order: number; // カテゴリ内での表示順序 (必須)

    createdAt: Date;
    updatedAt: Date;
};

// ============================================================
// タブ4-1: 備品
// ============================================================

export type EventEquipment = {
    id: string;
    eventId: string;
    order: number; 

    itemName: string; // 品名 (必須)
    
    // 以下、後から追記可能にするためオプショナル化
    purpose?: string; // 用途
    purchaseStatus?: "inStock" | "required" | "completed" // 購入有無（既存 | 要購入 | 購入済み）
    price?: number; // 価格
    note?: string; // 備考
    referenceUrl?: string; // 参考URL

    createdAt: Date;
    updatedAt: Date;
};

// ============================================================
// タブ4-2: 景品
// ============================================================

export type EventPrize = {
    id: string;
    eventId: string;
    order: number;

    itemName: string; // 景品名 (必須)
    
    // 以下、後から追記可能にするためオプショナル化
    estimatedPrice?: number; // 想定価格
    actualPrice?: number; // 実購入価格
    category?: "大景品" | "中景品" | "小景品"; // カテゴリ未定も許容
    storeCandidates?: string; // 購入先候補
    description?: string; // 一言紹介
    referenceUrl?: string; // 参考URL
    proposedBy?: string; // 提案者

    createdAt: Date;
    updatedAt: Date;
};

// ============================================================
// タブ5: イベントノート
// ============================================================

export type EventNote = {
    id: string;
    eventId: string;
    order: number; // 表示順序（作成順のデフォルト、並び替え可能にする余地）

    title: string; // ノートタイトル (必須)
    
    // 以下、後から追記可能にするためオプショナル化
    content?: string; // 本文（Markdown対応）
    category?: string; // 任意文字列タグ（"宣伝", "振り返り", "SNS"等、自由入力）
    color?: "blue" | "green" | "yellow" | "pink" | "purple" | "gray"; // パステルカラー識別用
    
    author?: string; // 作成者（オプショナル、心理的ハードルを下げるため）
    editor?: string; // 最終編集者（オプショナル、手動記録）

    createdAt: Date;
    updatedAt: Date;
};

// ============================================================
// 統合型
// ============================================================

// 全データを統合した型
// イベントタイトル作成時に空配列も一緒に作成される→中身がなくてもエラーにはならない
export type EventWithRelations = Event & {
    contents: EventContent[]; 
    tasks: EventTask[]; 
    equipment: EventEquipment[]; 
    prizes: EventPrize[]; 
    notes: EventNote[];
};