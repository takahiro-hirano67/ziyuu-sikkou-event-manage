// app/events/EventClient.tsx

"use client"

import Link from "next/link";
import { MdChevronRight, MdOutlineCalendarMonth, MdPinDrop } from "react-icons/md";
import type { Event } from "./lib/types";

// ============================================================
// メインコンポーネント
// ============================================================

export function EventsClient({ events }: { events: Event[] }) {

    // 配列が未定義の場合のガード
    const eventList = events || [];

    return (
        <div className="flex-1 px-4 py-6">
            <div className="max-w-6xl mx-auto">
                {/* ページヘッダー */}
                <div className="pb-2 mb-8 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800 pb-1">イベント管理</h1>
                    <p className="text-sm text-gray-600">イベント情報を総合的に管理します</p>
                </div>

                {/* イベント一覧 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {eventList.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

                {/* イベントがない場合 */}
                {eventList.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">イベントがありません</p>
                    </div>
                )}
            </div>
        </div>
    );
}


// ============================================================
// サブコンポーネント
// ============================================================


export function EventCard({ event }: { event: Event }) {

    // カテゴリバッジの色
    const categoryColor = event.category === "大イベント" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700";

    // ステータスバッジの色
    const statusColors: Record<string, string> = {
        planning: "bg-yellow-100 text-yellow-700",   // アイデア・検討中
        preparing: "bg-orange-100 text-orange-700",   // 動き始めている
        in_progress: "bg-blue-100 text-blue-700",       // 実行中・注目
        completed: "bg-green-100 text-green-700",     // 正常終了・達成
        archived: "bg-gray-100 text-gray-500",       // 過去・保管
    };

    // ステータスラベル（型定義のstatusすべてに対応）
    const statusLabels: Record<string, string> = {
        planning: "企画中",
        preparing: "準備中",
        in_progress: "開催中",
        completed: "開催済み",
        archived: "アーカイブ",
    };

    // ----------------------------------------------------------------
    // 表示用データの安全な組み立て
    // ----------------------------------------------------------------

    // 日時情報の結合
    const timeString = (event.startTime || event.endTime)
        ? `${event.startTime || ""}～${event.endTime || ""}`
        : "";

    // 日付と時間を結合（値があるものだけ繋ぐ）
    const dateTimeDisplay = [event.date, timeString]
        .filter((str) => str && str.trim() !== "")
        .join(" ");

    // 日時が全くない場合の表示
    const finalDateTime = dateTimeDisplay || "日時未定";

    // 場所がない場合の表示
    const locationDisplay = event.location || "場所未定";

    return (
        <Link href={`/events/${event.id}/basic`} className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group h-full">
            {/* ヘッダー */}
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${categoryColor}`}>{event.category}</span>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[event.status]}`}>{statusLabels[event.status]}</span>
                </div>
                <MdChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* イベント名 */}
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {event.name}
            </h3>

            {/* 概要 (値がない場合も高さを維持してレイアウト崩れを防ぐ) */}
            <p className="text-sm text-gray-600 mb-2 line-clamp-2 min-h-[2.5em]">
                {event.overview || <span className="text-gray-400 italic">概要未設定</span>}
            </p>

            {/* メタ情報 (カード下部に寄せる) */}
            <div className="mt-auto flex flex-col gap-1 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <MdOutlineCalendarMonth className="w-4 h-4 shrink-0" />
                    <span className="truncate">
                        {finalDateTime}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <MdPinDrop className="w-4 h-4 shrink-0" />
                    <span className="truncate">
                        {locationDisplay}
                    </span>
                </div>
            </div>
        </Link>
    );
}