// app/events/[id]/tasks/page.tsx

import { notFound } from "next/navigation";
import { getEventById } from "../../lib/mock-data";
import { TasksClient } from "./TasksClient";


export default async function EventTasksPage({
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

    return <TasksClient event={event} />
}
