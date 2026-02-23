// app/events/[id]/notes/[noteId]/NoteDetailClient.tsx

"use client"

import MarkdownViewer from "@/components/markdown/MarkdownViewer";
import { formatDate } from "@/util/FormatDate";
import Link from "next/link";
import { MdOutlineArrowBack, MdEdit } from "react-icons/md";
import type { EventNote } from "../../../lib/types";


export function NoteDetailClient({ note, eventId }: { note: EventNote; eventId: string }) {

    // カラーアクセント定義
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

    const colorKey = note.color || "gray";
    const accentColor = noteAccentColors[colorKey];

    return (
        <div className="px-4 pt-6 pb-32">
            <div className="max-w-4xl mx-auto">
                {/* ページヘッダー */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
                    {/* ページタイトル */}
                    <h2 className="text-xl font-semibold text-gray-800">
                        ノート
                    </h2>
                    {/* ツールボタン */}
                    <div className="flex items-center gap-4">
                        {/* 戻るボタン */}
                        <Link href={`/events/${eventId}/notes`}
                            className="flex items-center gap-2 px-3 py-1
                                        text-sm font-medium text-gray-600 
                                        bg-white border border-gray-200 rounded-lg
                                        hover:bg-gray-50 hover:border-gray-300 ">
                            <MdOutlineArrowBack className="w-4 h-4" />
                            戻る
                        </Link>
                        {/* 編集ボタン */}
                        <button onClick={() => alert("編集機能は未実装です")}
                            className="flex items-center gap-2 px-3 py-1 
                                        text-sm font-medium text-blue-600 
                                        bg-blue-50 border border-blue-200 rounded-lg
                                        hover:bg-blue-100 hover:border-blue-300">
                            <MdEdit className="w-4 h-4" />
                            編集
                        </button>
                    </div>
                </div>

                {/* ノート本体（全体の枠線なし） */}
                <div className="bg-white">
                    {/* ノートヘッダー */}
                    <div className="mb-10">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-4">
                                {/* 文書タイトル */}
                                <h1 className={`text-xl font-semibold text-gray-800 flex-1 border-l-4 ${accentColor.border} pl-2`}>
                                    {note.title}
                                </h1>

                                {/* タグ */}
                                {note.category && (
                                    <span className={`
                                    text-sm px-3 py-0.5 rounded-md font-medium whitespace-nowrap
                                    ${accentColor.tag}
                                `}>
                                        {note.category}
                                    </span>
                                )}
                            </div>

                        </div>

                        {/* メタ情報 */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                            {note.author && (
                                <span className="flex items-center gap-1">
                                    <span className="font-medium text-gray-500">作成者:</span>
                                    {note.author}
                                </span>
                            )}
                            {note.editor && (
                                <span className="flex items-center gap-1">
                                    <span className="font-medium text-gray-500">編集者:</span>
                                    {note.editor}
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <span className="font-medium text-gray-500">作成:</span>
                                {formatDate(note.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="font-medium text-gray-500">更新:</span>
                                {formatDate(note.updatedAt)}
                            </span>
                        </div>
                    </div>

                    {/* 本文 */}
                    <div className="prose prose-sm max-w-none">
                        <MarkdownViewer content={note.content || "（本文なし）"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
