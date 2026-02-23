// app/events/[id]/basic/BasicClient.tsx

"use client"

import MarkdownViewer from "@/components/markdown/MarkdownViewer";
import Link from "next/link";
import type { EventWithRelations } from "../../lib/types";

// ============================================================
// メインコンポーネント
// ============================================================

// 基本情報タブ: 文書スタイルで表示
export function BasicClient({ event }: { event: EventWithRelations }) {

    // イベントの状態ラベル
    const statusLabels: Record<string, string> = {
        planning: "企画中",
        preparing: "準備中",
        in_progress: "開催中",
        completed: "開催済み",
        archived: "アーカイブ",
    };

    return (
        <div className="px-4 pt-6 pb-32">
            <div className="max-w-4xl mx-auto">
                {/* 開催目的：文章として見せる（値がない場合もセクションは表示） */}
                <div className="mb-8">
                    <Section title="開催目的" >
                        <hr className="border-gray-200 pb-2" />
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed min-h-[1.5em]">
                            {/* 値がない場合は空表示 */}
                            {event.purpose}
                        </p>
                    </Section>
                </div>

                {/* 基本情報以降：2カラムレイアウト */}
                <div className="space-y-6 mb-8 pb-4 w-full max-w-full min-w-full">
                    <Section title="基本情報">
                        <InfoList>
                            <InfoRow label="イベント名" value={event.name} />

                            <InfoRow label="カテゴリ / 状態" value={`${event.category} / ${statusLabels[event.status]}`} />
                            <InfoRow label="概要" value={event.overview} isLongText />
                            <InfoRow label="開催場所" value={event.location} />
                            <InfoRow label="開催日" value={event.date} />
                            <InfoRow label="開始時間" value={event.startTime} />
                            <InfoRow label="終了時間" value={event.endTime} />
                            <InfoRow label="準備開始時間" value={event.prepTime} />
                            {/* 数値型などは undefined チェックを行う */}
                            <InfoRow label="参加想定人数" value={event.expectedParticipants ? `${event.expectedParticipants}名` : undefined} />
                            <InfoRow label="イベント予算" value={event.budget ? `¥${event.budget.toLocaleString()}` : undefined} />
                            <InfoRow label="ターゲット層" value={event.targetAudience} isLongText />
                            <InfoRow label="宣伝方法" value={event.promotionMethods} isLongText />

                            {/* coreReferenceUrl 自体がない場合を考慮 */}
                            <InfoRow
                                label="主要リンク"
                                value={
                                    event.coreReferenceUrl ? (
                                        <Link className="text-blue-600" target="_blank" href={event.coreReferenceUrl.url}>
                                            {event.coreReferenceUrl.label}
                                        </Link>
                                    ) : undefined
                                }
                                isLongText
                            />
                        </InfoList>
                    </Section>

                    {/* 当日運営役割：空オブジェクトへのフォールバック込み */}
                    <Section title="当日運営役割">
                        <InfoList>
                            {Object.entries(event.roles || {}).map(([role, assignee]) => (
                                <InfoRow key={role} label={role} value={assignee} />
                            ))}
                        </InfoList>
                    </Section>

                    {/* タイムテーブル */}
                    <Section title="タイムテーブル">
                        <InfoList>
                            {Object.entries(event.timeTable || {}).map(([time, content]) => (
                                <InfoRow key={time} label={time} value={content} />
                            ))}
                        </InfoList>
                    </Section>

                    {/* 参考URL */}
                    <Section title="参考URL">
                        <InfoList>
                            {Object.entries(event.referenceUrls || {}).map(([label, url]) =>
                            (
                                <InfoRow key={label} label={label} value={<Link href={url} className="text-blue-600" target="_brank">{url}</Link>} />
                            ))}
                        </InfoList>
                    </Section>
                </div>

                {/* 任意メモ欄：値がない場合は空文字を渡す */}
                <div className="mb-8">
                    <Section title="メモ">
                        <hr className="border-gray-200 pb-2" />
                        <MarkdownViewer content={event.memo || ""} />
                    </Section>
                </div>

            </div>
        </div>
    );
}

// ============================================================
// ヘルパーコンポーネント (変更なし)
// ============================================================

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {title}
            </h2>
            {children}
        </div>
    );
}

function InfoList({ children }: { children: React.ReactNode }) {
    return (
        <dl className="border-t border-gray-100 w-full">
            {children}
        </dl>
    );
}

function InfoRow({
    label,
    value,
    isLongText = false
}: {
    label: string;
    value: React.ReactNode; // 文字列だけでなく<Link>にも対応するため
    isLongText?: boolean
}) {
    return (
        <div className="flex w-full border-b border-gray-100 py-3 sm:gap-4">
            <dt className="w-1/3 sm:w-1/4 shrink-0 text-sm font-medium text-gray-500">
                {label}
            </dt>
            {/* value が undefined/null の場合は何も表示されませんが、dt(label)は残ります */}
            <dd className={`grow text-sm text-gray-800 ${isLongText ? 'whitespace-pre-wrap' : ''}`}>
                {value}
            </dd>
        </div>
    );
}