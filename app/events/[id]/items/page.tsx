// app/events/[id]/items/page.tsx

import { redirect } from "next/navigation";

export default async function ItemsIndexPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // リダイレクト専用
    redirect(`/events/${id}/items/equipment`);
}
