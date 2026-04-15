"use client";

import Link from "next/link";
import VeloraAvatar from "@/components/VeloraAvatar";

export default function Home() {
  return (
    <main className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-10">Boss N Baddies</h1>

      <div className="flex gap-10">
        <Link href="/baddest">
          <div className="bg-pink-500 p-10 rounded-xl cursor-pointer hover:scale-105">
            THE BADDEST 🔥
          </div>
        </Link>

        <Link href="/bossdup">
          <div className="bg-yellow-500 p-10 rounded-xl cursor-pointer hover:scale-105">
            BOSS’D UP 👑
          </div>
        </Link>
      </div>

      <Link href="/ai-boo" className="mt-10 underline">
        AI BOO (Velora)
      </Link>

      <VeloraAvatar />
    </main>
  );
}
