// app/events/[id]/items/prizes/PrizesClient.tsx

"use client"

import type { EventPrize, EventWithRelations } from "../../../lib/types";

// ============================================================
// メインコンポーネント
// ============================================================

export function PrizesClient({ event }: { event: EventWithRelations }) {

    // 配列が未定義の場合に備えて空配列をデフォルトにする
    const prizeList = event.prizes || [];

    return (
        <>
            {prizeList.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <PrizeTable prizes={prizeList} />
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500">景品が登録されていません</p>
                </div>
            )}
        </>
    );
}

// ============================================================
// サブコンポーネント
// ============================================================

export function PrizeTable({ prizes }: { prizes: EventPrize[] }) {
    return (
        <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-max text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">No.</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">品名</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">カテゴリ</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">想定価格</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">実購入価格</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">購入先候補</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">一言紹介</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">提案者</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">参考リンク</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {prizes
                        .sort((a, b) => a.order - b.order)
                        .map((item) => {

                            // カテゴリバッジの色定義
                            const categoryColors: Record<string, string> = {
                                "大景品": "bg-red-100 text-red-700",
                                "中景品": "bg-orange-100 text-orange-700",
                                "小景品": "bg-green-100 text-green-700",
                            };

                            // カテゴリがない場合の処理
                            const categoryLabel = item.category || "未分類";
                            // 定義されていないカテゴリ（未分類含む）はグレーにする
                            const badgeColor = (item.category && categoryColors[item.category])
                                ? categoryColors[item.category]
                                : "bg-gray-100 text-gray-500";

                            return (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-600">{item.order}</td>
                                    <td className="px-4 py-3 text-gray-800 font-medium">{item.itemName}</td>

                                    {/* カテゴリ */}
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${badgeColor}`}>
                                            {categoryLabel}
                                        </span>
                                    </td>

                                    {/* 想定価格 */}
                                    <td className={`px-4 py-3 text-gray-600 ${item.estimatedPrice != null ? "text-right" : "text-center"}`}>
                                        {item.estimatedPrice != null ? `¥${item.estimatedPrice.toLocaleString()}` : "-"}
                                    </td>

                                    {/* 実価格 */}
                                    <td className={`px-4 py-3 text-gray-600 ${item.actualPrice != null ? "text-right" : "text-center"}`}>
                                        {item.actualPrice != null ? `¥${item.actualPrice.toLocaleString()}` : "-"}
                                    </td>

                                    {/* 購入先候補 */}
                                    <td className="px-4 py-3 text-gray-600 text-xs">
                                        {item.storeCandidates || "-"}
                                    </td>

                                    {/* 一言紹介 */}
                                    <td className={`px-4 py-3 text-gray-600 text-xs ${item.description ? "text-left" : "text-center"}`}>
                                        {item.description || "-"}
                                    </td>

                                    {/* 提案者 */}
                                    <td className="px-4 py-3 text-gray-600">
                                        {item.proposedBy || "-"}
                                    </td>

                                    {/* 参考リンク */}
                                    <td className="px-4 py-3 text-center text-xs">
                                        {item.referenceUrl ? (
                                            <a
                                                href={item.referenceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                {item.referenceUrl}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}