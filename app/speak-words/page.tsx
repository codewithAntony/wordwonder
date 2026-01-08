"use client";

import React, { useEffect, useState } from "react";
import { Home, Volume2, Mic, RefreshCw } from "lucide-react";
import wordDatabase from "@/app/data/wordDatabase";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface Word {
  word: string;
  image: string;
  syllables: string;
  hint: string;
}

const Page = () => {
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "tryagain" | null>(null);
  const [recognition, setRecognition] = useState<any>(null);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [highContrast, setHighContrast] = useState(false);

  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState({ spelled: 0, spoken: 0 });

  const speak = (text: string, rate: number = 0.9) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordDatabase.length);
    setCurrentWord(wordDatabase[randomIndex]);
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition && !recognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";
      setRecognition(recog);
    }
  }, []);

  useEffect(() => {
    if (!recognition || !currentWord) return;

    recognition.onresult = (event: any) => {
      const spokenWord = event.results[0][0].transcript.toUpperCase().trim();

      if (spokenWord === currentWord.word.toUpperCase()) {
        setFeedback("correct");
        speak("Excellent pronunciation!");
        setStars((prev) => prev + 15);
        setStreak((prev) => prev + 1);
        setProgress((prev) => ({ ...prev, spoken: prev.spoken + 1 }));

        setTimeout(() => {
          setFeedback(null);
          getRandomWord();
        }, 3000);
      } else {
        setFeedback("tryagain");
        speak(
          `I heard ${spokenWord}. Let's try saying ${currentWord.word} slowly: ${currentWord.syllables}`
        );
        setTimeout(() => setFeedback(null), 4000);
      }
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      speak("I didn't hear that. Try again!");
    };
  }, [currentWord, recognition]);

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    } else {
      speak("Speech recognition is not available in this browser");
    }
  };

  if (!currentWord) return null;

  return (
    <div
      className={`min-h-screen ${
        highContrast
          ? "bg-black"
          : "bg-gradient-to-br from-green-100 to-blue-100"
      } p-8`}
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => (window.location.href = "/")} // Use routing here
          className={`${
            highContrast ? "bg-white text-black" : "bg-white"
          } px-6 py-3 rounded-full mb-6 flex items-center gap-2 text-xl font-bold shadow-lg hover:scale-105 transition`}
        >
          <Home className="w-6 h-6" /> Home
        </button>

        <div
          className={`${
            highContrast ? "bg-gray-900" : "bg-white"
          } rounded-3xl shadow-2xl p-12 text-center`}
        >
          <h2
            className={`text-4xl font-bold mb-8 ${
              highContrast ? "text-yellow-400" : "text-green-600"
            }`}
          >
            Say the Word!
          </h2>

          <div className="text-9xl mb-8 animate-pulse">{currentWord.image}</div>

          <div
            className={`text-7xl font-bold mb-8 ${
              highContrast ? "text-white" : "text-purple-600"
            }`}
          >
            {currentWord.word}
          </div>

          <div
            className={`text-4xl mb-8 ${
              highContrast ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Say it like: {currentWord.syllables}
          </div>

          <button
            onClick={() => speak(currentWord.word, 0.7)}
            className={`${
              highContrast
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-10 py-6 rounded-full text-3xl font-bold mb-8 flex items-center gap-3 mx-auto shadow-lg`}
          >
            <Volume2 className="w-10 h-10" /> Listen Slowly
          </button>

          <button
            onClick={startListening}
            disabled={listening}
            className={`${
              listening
                ? "bg-red-500 animate-pulse"
                : highContrast
                ? "bg-green-600 hover:bg-green-700"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-16 py-8 rounded-full text-4xl font-bold shadow-2xl transform hover:scale-105 transition flex items-center gap-4 mx-auto mb-8`}
          >
            <Mic className="w-12 h-12" />
            {listening ? "Listening..." : "Tap to Speak"}
          </button>

          <button
            onClick={() => getRandomWord()}
            className={`${
              highContrast
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white px-10 py-5 rounded-full text-2xl font-bold shadow-lg`}
          >
            <RefreshCw className="w-6 h-6 inline mr-2" /> New Word
          </button>

          {feedback === "correct" && (
            <div className="mt-8 text-6xl animate-bounce">
              🎉 Amazing! Perfect! 🌟
            </div>
          )}
          {feedback === "tryagain" && (
            <div className="mt-8 text-4xl">
              😊 Good try! Let's practice together
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
