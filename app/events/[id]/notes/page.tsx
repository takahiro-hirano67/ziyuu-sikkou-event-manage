// app/events/[id]/notes/page.tsx

import { notFound } from "next/navigation";
import { getEventById } from "../../lib/mock-data";
import { NotesClient } from "./NotesClient";

export default async function EventNotesPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    // 情報取得
    const { id } = await params;
    const event = getEventById(id);

    if (!event) {
        notFound();
    }

    return <NotesClient event={event} />
}
