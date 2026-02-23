// components/layout/header.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

export const Header = () => {

    return (
        <header
            className="flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200/70 shadow-2xs z-40 transition-all duration-300 relative"
            style={{ height: "52px" }}>
            <div className="flex items-center gap-2">
                {/* ロゴ部分 */}
                <Link href="/events" className="flex items-center gap-2 ml-2">
                    <Image src="/mascot/aorun_normal.svg" alt="あおるん" width={40} height={40} />
                    <span className="font-semibold text-gray-600">自由ヶ丘執行委員会</span>
                </Link>
            </div>
        </header>
    );
};