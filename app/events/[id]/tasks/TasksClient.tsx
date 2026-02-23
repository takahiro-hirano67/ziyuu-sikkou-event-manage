// app/events/[id]/tasks/TasksClient.tsx

"use client"

import type { EventTask, EventWithRelations } from "../../lib/types";

export function TasksClient({ event }: { event: EventWithRelations }) {

    // tasksがundefinedの場合に備えて空配列をデフォルトに
    const tasks = event.tasks || [];

    return (
        <div className="px-4 pt-6 pb-32">
            <div className="max-w-4xl mx-auto space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    タスク一覧
                </h2>
                <hr className="border-gray-200 pb-2" />
                {tasks.length > 0 ? (
                    <TaskTable tasks={tasks} />
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500">タスクが登録されていません</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================================
// サブコンポーネント
// ============================================================

export function TaskTable({ tasks }: { tasks: EventTask[] }) {

    // カテゴリ未設定時のラベル
    const NO_CATEGORY_LABEL = "未分類";

    // カテゴリごとにグループ化
    const tasksByCategory = tasks.reduce(
        (acc, task) => {
            // カテゴリがない場合は「未分類」として扱う
            const category = task.category || NO_CATEGORY_LABEL;

            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(task);
            return acc;
        },
        {} as Record<string, EventTask[]>,
    );

    // 固定のカテゴリ表示順序
    const defaultOrder = ["企画立案段階", "イベント内容・準備", "宣伝", "リハーサル", "本番（最終確認）"];

    // 実際にデータが存在するカテゴリのキー一覧
    const existingCategories = Object.keys(tasksByCategory);

    // 表示順序の決定:
    // 1. defaultOrder にあるものを先に表示
    // 2. defaultOrder に含まれていないもの（"未分類"や"任意カテゴリ"）をその後に表示
    const sortedCategories = [
        ...defaultOrder.filter(cat => existingCategories.includes(cat)),
        ...existingCategories.filter(cat => !defaultOrder.includes(cat))
    ];

    return (
        <div className="space-y-6">
            {sortedCategories.map((category) => (
                <div key={category}>
                    {/* カテゴリヘッダー */}
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1 border-l-4 border-gray-300 pl-2">
                        {category}
                    </h3>

                    {/* タスクリスト */}
                    <div className="space-y-2">
                        {tasksByCategory[category]
                            .sort((a, b) => a.order - b.order)
                            .map((task) => (
                                <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
                                    <div className="flex items-start gap-3">
                                        {/* チェックボックス */}
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            readOnly
                                            className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />

                                        {/* タスク情報 */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h4 className={`text-sm font-medium ${task.completed ? "text-gray-400 line-through" : "text-gray-800"}`}>
                                                    {task.name}
                                                </h4>
                                                {/* 期限がある場合のみ表示 */}
                                                {task.deadline && (
                                                    <span className={`text-xs whitespace-nowrap ${task.completed ? "text-gray-300" : "text-gray-800"}`}>
                                                        期限: {new Date(task.deadline).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" })}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                {/* 担当者: 未入力の場合は「未定」と表示 */}
                                                <span className={!task.assignee ? "text-gray-300 bg-orange-50 px-1 rounded" : ""}>
                                                    担当: {task.assignee || "未定"}
                                                </span>

                                                {/* メモがある場合のみ表示 */}
                                                {task.memo && (
                                                    <span className="text-gray-400 truncate max-w-[150px] sm:max-w-xs">
                                                        {task.memo}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}