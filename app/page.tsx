"use client";

import { BarChart3, BookOpen, Gamepad2, Mic, Star } from "lucide-react";
import { useEffect, useState } from "react";
import wordDatabase from "@/app/data/wordDatabase";

interface Word {
  word: string;
  image: string;
  syllables: string;
  hint: string;
}

export default function Home() {
  const [page, setPage] = useState("home");
  const [stars, setStars] = useState(0);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState({ spelled: 0, spoken: 0, games: 0 });
  const [highContrast, setHighContrast] = useState(false);

  const speak = (text: string, rate: number = 0.9) => {
    if ("speechSynthesis" in window) {
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
    if (currentWord) {
      speak(`Let's practice the word: ${currentWord.word}`);
    }
  }, [currentWord]);

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        highContrast ? "bg-black" : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-8xl mb-4 animate-bounce">🎓</div>
          <h1
            className={`text-6xl font-bold mb-4 ${
              highContrast ? "text-yellow-400" : "text-purple-600"
            }`}
          >
            Let's Learn Words Together!
          </h1>
          <p
            className={`text-2xl ${
              highContrast ? "text-white" : "text-gray-700"
            }`}
          >
            Choose what you want to do today
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <div
              className={`${
                highContrast ? "bg-yellow-500 text-black" : "bg-yellow-400"
              } px-6 py-3 rounded-full flex items-center gap-2 text-xl font-bold`}
            >
              <Star className="w-6 h-6" /> {stars} Stars
            </div>
            <div
              className={`${
                highContrast ? "bg-orange-500 text-black" : "bg-orange-400"
              } px-6 py-3 rounded-full flex items-center gap-2 text-xl font-bold`}
            >
              🔥{streak} Streak
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <button
            onClick={() => {
              setPage("spell");
              getRandomWord();
            }}
            className={`${
              highContrast
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
            } text-white p-12 rounded-3xl shadow-2xl transform transition hover:scale-105 active:scale-95`}
          >
            <BookOpen className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-2">Spell Words</h2>
            <p className="text-xl">Put letters in order</p>
          </button>

          <button
            onClick={() => {
              setPage("speak");
              getRandomWord();
            }}
            className={`${
              highContrast
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
            } text-white p-12 rounded-3xl shadow-2xl transform transition hover:scale-105 active:scale-95`}
          >
            <Mic className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-2">Speak Words</h2>
            <p className="text-xl">Say words out loud</p>
          </button>

          <button
            onClick={() => {
              setPage("games");
              getRandomWord();
            }}
            className={`${
              highContrast
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
            } text-white p-12 rounded-3xl shadow-2xl transform transition hover:scale-105 active:scale-95`}
          >
            <Gamepad2 className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-2">Fun Games</h2>
            <p className="text-xl">Play and learn</p>
          </button>

          <button
            onClick={() => setPage("progress")}
            className={`${
              highContrast
                ? "bg-pink-600 hover:bg-pink-700"
                : "bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700"
            } text-white p-12 rounded-3xl shadow-2xl transform transition hover:scale-105 active:scale-95`}
          >
            <BarChart3 className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-2">My Progress</h2>
            <p className="text-xl">See how you're doing</p>
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`${
              highContrast ? "bg-white text-black" : "bg-gray-800 text-white"
            } px-8 py-4 rounded-full text-xl font-bold`}
          >
            {highContrast ? "🌙 Normal Mode" : "🌟 High Contrast"}
          </button>
        </div>

        {/** Footer */}
        <div
          className={`text-center mt-12 ${
            highContrast ? "text-white" : "text-gray-600"
          } text-lg`}
        >
          <p>👨‍👩‍👧 Parent & Teacher Section | 🔒 Safe & Private</p>
        </div>
      </div>
    </div>
  );
}
