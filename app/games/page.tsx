"use client";

import React, { useEffect, useState } from "react";
import wordDatabase from "@/app/data/wordDatabase";
import { Home, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Word {
  word: string;
  image: string;
  syllables: string;
  hint: string;
}

const Pages = () => {
  const router = useRouter();
  const [gameType, setGameType] = useState<string | null>(null);

  const [options, setOptions] = useState<Word[]>([]);
  const [gameScore, setGameScore] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);

  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);

  const [progress, setProgress] = useState({ spelled: 0, spoken: 0, games: 0 });

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
    if (currentWord) {
      const allWords = [...wordDatabase];

      const otherOptions = allWords
        .filter((w) => w.word !== currentWord.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const finalOptions = [...otherOptions, currentWord].sort(
        () => Math.random() - 0.5
      );
      setOptions(finalOptions);
    }
  }, [currentWord]);

  const handleMatch = (word: Word) => {
    if (!currentWord) return;

    if (word.word === currentWord.word) {
      speak("Correct! Great job!");
      setGameScore((prev) => prev + 1);
      setStars((prev) => prev + 5);
      setStreak((prev) => prev + 1);
      setProgress((prev) => ({ ...prev, games: prev.games + 1 }));

      setTimeout(() => {
        getRandomWord();
      }, 1500);
    } else {
      speak("Try again!");
      setStreak(0);
    }
  };

  if (!currentWord) return null;

  return (
    <div
      className={`min-h-screen ${
        highContrast
          ? "bg-black"
          : "bg-gradient-to-br from-purple-100 to-pink-100"
      } p-8`}
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/")}
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
              highContrast ? "text-yellow-400" : "text-purple-600"
            }`}
          >
            🎮 Match the Picture!
          </h2>

          <div className="flex justify-between items-center max-w-md mx-auto mb-8">
            <div
              className={`text-2xl font-bold ${
                highContrast ? "text-white" : "text-gray-700"
              }`}
            >
              Score: {gameScore} 🏆
            </div>
            <div
              className={`text-2xl font-bold ${
                highContrast ? "text-white" : "text-orange-500"
              }`}
            >
              Streak: {streak} 🔥
            </div>
          </div>

          <div
            className={`text-7xl font-bold mb-12 ${
              highContrast ? "text-white" : "text-purple-600"
            }`}
          >
            {currentWord.word}
          </div>

          <button
            onClick={() => speak(currentWord.word)}
            className={`${
              highContrast
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-8 py-4 rounded-full text-2xl font-bold mb-12 flex items-center gap-3 mx-auto shadow-lg`}
          >
            <Volume2 className="w-8 h-8" /> Hear It
          </button>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {options.map((opt, idx) => (
              <button
                key={`${opt.word}-${idx}`}
                onClick={() => handleMatch(opt)}
                className={`${
                  highContrast
                    ? "bg-gray-800 hover:bg-gray-700 border-4 border-yellow-400"
                    : "bg-gradient-to-br from-blue-200 to-purple-200 hover:from-blue-300 hover:to-purple-300"
                } p-12 rounded-3xl shadow-xl transform hover:scale-105 transition active:scale-95`}
              >
                <div className="text-9xl mb-4">{opt.image}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
