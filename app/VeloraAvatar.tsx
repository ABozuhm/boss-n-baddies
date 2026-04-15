"use client";

import { useEffect, useState } from "react";

export default function VeloraAvatar() {
  const [state, setState] = useState("idle");

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => (prev === "idle" ? "walk" : "idle"));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 right-0 w-40">
      <video
        src="/velora-walk-right.mp4"
        autoPlay
        loop
        muted
        className="w-full"
      />
    </div>
  );
}
