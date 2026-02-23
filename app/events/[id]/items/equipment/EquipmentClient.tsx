// app/events/[id]/items/equipment/EquipmentClient.tsx

"use client"

import type { EventEquipment, EventWithRelations } from "../../../lib/types";

// ============================================================
// メインコンポーネント
// ============================================================

export function EquipmentClient({ event }: { event: EventWithRelations }) {

    // 配列が未定義の場合に備えて空配列をデフォルトにする
    const equipmentList = event.equipment || [];

    return (
        <div>
            {equipmentList.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <EquipmentTable equipment={equipmentList} />
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500">備品が登録されていません</p>
                </div>
            )}
        </div>
    );
}

// ============================================================
// サブコンポーネント
// ============================================================

export function EquipmentTable({ equipment }: { equipment: EventEquipment[] }) {
    return (
        <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-max text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">No.</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">品名</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">用途</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">調達</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">価格</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">備考</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">参考リンク</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {equipment
                        .sort((a, b) => a.order - b.order)
                        .map((item) => {
                            // ステータスに応じたラベルと色の定義
                            const statusConfig = {
                                inStock: { label: "既存", color: "bg-gray-100 text-gray-600" },
                                required: { label: "要購入", color: "bg-yellow-100 text-yellow-700" },
                                completed: { label: "購入済", color: "bg-green-100 text-green-700" },
                            };

                            // 現在のステータス情報（未定義の場合はundefined）
                            const currentStatus = item.purchaseStatus ? statusConfig[item.purchaseStatus] : undefined;

                            return (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-left text-gray-600">{item.order}</td>
                                    <td className="px-4 py-3 text-left text-gray-800 font-medium">{item.itemName}</td>

                                    {/* 用途: 未入力時はハイフン */}
                                    <td className="px-4 py-3 text-gray-600">{item.purpose || "-"}</td>

                                    {/* 調達ステータス */}
                                    <td className="px-4 py-3 text-center">
                                        {currentStatus ? (
                                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${currentStatus.color}`}>
                                                {currentStatus.label}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>

                                    {/* 価格: null/undefined の場合のみハイフン（0円は表示） */}
                                    <td className={`px-4 py-3 text-gray-600 ${item.price != null ? "text-right " : "text-center"}`}>
                                        {item.price != null ? `¥${item.price.toLocaleString()}` : "-"}
                                    </td>

                                    {/* 備考: 未入力時はハイフン */}
                                    <td className={`px-4 py-3 text-gray-600 ${item.note ? "text-left" : "text-center"}`}>
                                        {item.note || "-"}
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