// app/events/[id]/notes/[noteId]/page.tsx

import { notFound } from "next/navigation";
import { getEventById } from "../../../lib/mock-data";
import { NoteDetailClient } from "./NoteDetailClient";

// params の型定義に noteId を追加
export default async function EventNoteDetailPage({
    params
}: {
    params: Promise<{ id: string; noteId: string }>
}) {
    // 1. await で id と noteId を取り出す
    const { id, noteId } = await params;

    // 2. イベントを取得
    const event = getEventById(id);

    if (!event) {
        notFound();
    }

    // 3. イベント内の notes 配列から、noteId が一致するものを探す
    // (notesがundefinedの場合は空配列扱いで検索)
    const note = (event.notes || []).find((n) => n.id === noteId);

    // 4. ノートが見つからない場合は 404
    if (!note) {
        notFound();
    }

    // 5. 特定した note オブジェクトのみをクライアントコンポーネントに渡す
    return <NoteDetailClient note={note} eventId={id} />;
}