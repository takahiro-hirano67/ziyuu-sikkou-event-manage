// app/events/[id]/items/equipment/page.tsx

import { notFound } from "next/navigation";

import { getEventById } from "../../../lib/mock-data";
import { EquipmentClient } from "./EquipmentClient";

export default async function EventEquipmentPage({
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

    return <EquipmentClient event={event} />
}
