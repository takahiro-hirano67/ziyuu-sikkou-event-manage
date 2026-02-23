// app/events/[id]/notes/NotesClient.tsx

"use client"

import { formatDate } from "@/util/FormatDate";
import Link from "next/link";
import type { EventWithRelations } from "../../lib/types";

// ============================================================
// メインコンポーネント
// ============================================================

export function NotesClient({ event }: { event: EventWithRelations }) {

    // notes自体がundefinedの可能性も考慮して安全にアクセス
    const notes = event.notes || [];

    // カラーアクセント定義（左ボーダー + カテゴリタグ背景）
    const noteAccentColors = {
        blue: {
            border: "border-l-blue-400",
            tag: "bg-blue-100 text-blue-700",
        },
        green: {
            border: "border-l-green-400",
            tag: "bg-green-100 text-green-700",
        },
        yellow: {
            border: "border-l-yellow-400",
            tag: "bg-yellow-100 text-yellow-700",
        },
        pink: {
            border: "border-l-pink-400",
            tag: "bg-pink-100 text-pink-700",
        },
        purple: {
            border: "border-l-purple-400",
            tag: "bg-purple-100 text-purple-700",
        },
        gray: {
            border: "border-l-gray-300",
            tag: "bg-gray-100 text-gray-600",
        },
    };

    return (
        <div className="px-4 pt-6 pb-32">
            <div className="max-w-4xl mx-auto space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    ノート一覧
                </h2>
                <hr className="border-gray-200 pb-2" />

                {notes
                    .sort((a, b) => a.order - b.order)
                    .map((note) => {
                        // カラー取得（未設定時はgray）
                        const colorKey = note.color || "gray";
                        const accentColor = noteAccentColors[colorKey];

                        return (
                            <Link
                                key={note.id}
                                href={`/events/${event.id}/notes/${note.id}`}
                                className="block p-4 pl-6 rounded-lg bg-white border border-gray-200 hover:shadow-xs">
                                {/* ヘッダー */}
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className={`font-semibold text-gray-800 flex-1 border-l-4 ${accentColor.border} pl-2`}>
                                        {note.title}
                                    </h3>
                                    {note.category && (
                                        <span className={`
                                            text-xs px-2 py-1 rounded-md font-medium
                                            ${accentColor.tag}
                                        `}>
                                            {note.category}
                                        </span>
                                    )}
                                </div>

                                {/* プレビュー */}
                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                    {note.content || "（内容未記入）"}
                                </p>

                                {/* メタ情報 */}
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    {note.author && (
                                        <span className="flex items-center gap-1">
                                            <span className="font-medium">作成者:</span>
                                            {note.author}
                                        </span>
                                    )}
                                    <span>{formatDate(note.createdAt)}</span>
                                </div>
                            </Link>
                        );
                    })}

                {/* ノートがない場合 */}
                {notes.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500">ノートが登録されていません</p>
                    </div>
                )}
            </div>
        </div>
    );
}