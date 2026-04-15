"use client";

import { useState } from "react";

export default function VeloraVoice() {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const recognition =
      new (window as any).webkitSpeechRecognition();

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;

      const res = await fetch("/api/velora", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: "voiceUser",
          message: text
        })
      });

      const data = await res.json();

      speak(data.content);
    };

    recognition.start();
    setListening(true);
  };

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);

    speech.pitch = 1.2;
    speech.rate = 1;
    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
  };

  return (
    <button
      onClick={startListening}
      className="bg-purple-500 px-4 py-2 rounded"
    >
      🎤 Talk to Velora
    </button>
  );
}
