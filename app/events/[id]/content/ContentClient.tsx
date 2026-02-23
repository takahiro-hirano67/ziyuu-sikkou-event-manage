// app/events/[id]/content/ContentClient.tsx

"use client"

import MarkdownViewer from "@/components/markdown/MarkdownViewer";
import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import type { EventContent, EventWithRelations } from "../../lib/types";

// ============================================================
// メインコンポーネント
// ============================================================

export function ContentClient({ event }: { event: EventWithRelations }) {

    // contents自体がundefinedの可能性も考慮して安全にアクセス
    const contents = event.contents || [];

    return (
        <div className="px-4 pt-6 pb-32">
            <div className="max-w-4xl mx-auto space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    企画一覧
                </h2>
                <hr className="border-gray-200 pb-2" />
                {contents
                    .sort((a, b) => a.order - b.order)
                    .map((content) => (
                        <ContentCard key={content.id} content={content} />
                    ))}

                {/* コンテンツがない場合 */}
                {contents.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500">企画内容が登録されていません</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================================
// 企画カードコンポーネント（アコーディオン）
// ============================================================

function ContentCard({ content }: { content: EventContent }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* ヘッダー（クリックで開閉） */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 shrink-0">企画 {content.order}</span>
                    <h3 className="text-md font-semibold text-gray-600 break-all">{content.name}</h3>
                </div>
                {isOpen ? (
                    <LuChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                ) : (
                    <LuChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
            </button>

            {/* コンテンツ（展開時のみ表示） */}
            {isOpen && (
                <div className="px-6 pb-6 space-y-6 border-t border-gray-200 pt-4">

                    {/* 概要 */}
                    <Section title="概要">
                        <p className="text-gray-700 whitespace-pre-wrap min-h-[1.5em]">
                            {content.overview}
                        </p>
                    </Section>

                    {/* 説明 */}
                    <Section title="説明">
                        <p className="text-gray-700 whitespace-pre-wrap min-h-[1.5em]">
                            {content.description}
                        </p>
                    </Section>

                    {/* 企画の流れ */}
                    <Section title="企画の流れ">
                        <p className="text-gray-700 whitespace-pre-wrap min-h-[1.5em]">
                            {content.flow}
                        </p>
                    </Section>

                    {/* 準備物 */}
                    <Section title="準備物">
                        <p className="text-gray-700 whitespace-pre-wrap min-h-[1.5em]">
                            {content.equipment}
                        </p>
                    </Section>

                    {/* 参考URL: 空配列フォールバック */}
                    <Section title="参考URL">
                        {/* URLがある場合 */}
                        {(content.referenceUrls && content.referenceUrls.length > 0) ? (
                            <ul className="space-y-1">
                                {content.referenceUrls.map((url: string, index: number) => (
                                    <li key={index} className="truncate">
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            {url}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            // URLがない場合
                            <p className="text-gray-400 text-sm italic">なし</p>
                        )}
                    </Section>
                    {/* 任意メモ欄：値がない場合は空文字を渡す */}
                    <div className="mb-8">
                        <Section title="メモ">
                            <MarkdownViewer content={content.memo || ""} />
                        </Section>
                    </div>
                </div>
            )}
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 border-l-4 border-gray-300 pl-2">
                {title}
            </h4>
            <div className="pl-3">
                {children}
            </div>
        </div>
    );
}