"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <Link href={"/dashboard"}>Go to dashboard</Link>
    </main>
  );
}
