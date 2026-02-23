// app/events/components/EventHeader.tsx

import Link from "next/link";
import { MdLink, MdOutlineCalendarMonth, MdPeopleAlt, MdPinDrop, MdOutlineArrowBack } from "react-icons/md";
import type { Event } from "../lib/types";

// ============================================================
// 【イベントヘッダー】
// どのタブでも共通して表示される
// ここに記載されている情報は直接編集しない。あくまで表示のみ
// --> 基本情報タブ内で編集＆反映が原則
// ============================================================

export function EventHeader({ event }: { event: Event }) {

    // カテゴリバッジの色
    const categoryColor = event.category === "大イベント"
        ? "bg-blue-100 text-blue-700"
        : "bg-green-100 text-green-700";

    // ステータスバッジの色
    const statusColors: Record<string, string> = {
        planning: "bg-yellow-100 text-yellow-700",   // アイデア・検討中
        preparing: "bg-orange-100 text-orange-700",   // 動き始めている
        in_progress: "bg-blue-100 text-blue-700",       // 実行中・注目
        completed: "bg-green-100 text-green-700",     // 正常終了・達成
        archived: "bg-gray-100 text-gray-500",       // 過去・保管
    };

    // ステータスラベル
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

    // 日時情報の結合 (例: "2024-01-01 | 10:00～12:00" or "2024-01-01" or "10:00～")
    const timeString = (event.startTime || event.endTime)
        ? `${event.startTime || ""}～${event.endTime || ""}`
        : "";

    // 日付と時間を結合（片方が無くても変な区切り線が出ないようにfilterする）
    const dateTimeDisplay = [event.date, timeString]
        .filter((str) => str && str.trim() !== "") // 空文字やundefinedを除去
        .join(" | ");

    // 参加想定人数（値がなければ空文字）
    const participantsDisplay = (event.expectedParticipants !== undefined && event.expectedParticipants !== null)
        ? `参加想定: ${event.expectedParticipants}名`
        : "";

    return (
        <div className="bg-white border-b border-gray-200 px-4 py-6">
            <div className="max-w-6xl mx-auto">
                {/* バッジ・戻るボタン */}
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${categoryColor}`}>
                            {event.category}
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[event.status]}`}>
                            {statusLabels[event.status]}
                        </span>
                    </div>
                    <Link href="/events">
                        <MdOutlineArrowBack className="w-8 h-8 mr-2 text-gray-500 shrink-0" />
                    </Link>
                </div>

                {/* イベント名 */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {event.name}
                </h1>

                {/* 概要 (値がない場合は高さ0になるがエラーにはならない) */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[1.25em]">
                    {event.overview}
                </p>

                {/* メタ情報 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {/* 開催日時 */}
                    <div className="flex items-center gap-2 min-h-6">
                        <MdOutlineCalendarMonth className="w-5 h-5 text-gray-600 shrink-0" />
                        <span className="text-gray-700">
                            {dateTimeDisplay}
                        </span>
                    </div>

                    {/* 開催場所 */}
                    <div className="flex items-center gap-2 min-h-6">
                        <MdPinDrop className="w-5 h-5 text-gray-600 shrink-0" />
                        <span className="text-gray-700">
                            {event.location}
                        </span>
                    </div>

                    {/* 参加想定人数 */}
                    <div className="flex items-center gap-2 min-h-6">
                        <MdPeopleAlt className="w-5 h-5 text-gray-600 shrink-0" />
                        <span className="text-gray-700">
                            {participantsDisplay}
                        </span>
                    </div>

                    {/* コアリンク (ここはURLがないとリンクが作れないため条件付き表示のまま) */}
                    {event.coreReferenceUrl && (
                        <div className="flex items-center gap-2 min-h-6">
                            <MdLink className="w-5 h-5 text-gray-600 shrink-0" />
                            <Link className="text-blue-600 truncate" target="_blank" href={event.coreReferenceUrl.url}>
                                {event.coreReferenceUrl.label}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}