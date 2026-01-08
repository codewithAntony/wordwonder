"use client";

import { hover } from "framer-motion";
import { Check, Home, RefreshCw, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import wordDatabase from "@/app/data/wordDatabase";
import { useRouter } from "next/navigation";

interface Word {
  word: string;
  image: string;
  syllables: string;
  hint: string;
}

const page = () => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [celebrating, setCelebrating] = useState(false);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [highContrast, setHighContrast] = useState(false);

  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState({ spelled: 0 });

  const router = useRouter();

  useEffect(() => {
    getRandomWord();
  }, []);

  const speak = (text: string, rate: number = 0.9) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (currentWord) {
      const letters = currentWord.word.split("");
      const shuffled = [...letters].sort(() => Math.random() - 0.5);
      setAvailableLetters(shuffled);
      setSelectedLetters([]);
      setShowFeedback(null);
    }
  }, [currentWord]);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordDatabase.length);
    setCurrentWord(wordDatabase[randomIndex]);
  };

  const addLetter = (letter: string, index: number) => {
    setSelectedLetters([...selectedLetters, letter]);
    setAvailableLetters(availableLetters.filter((_, i) => i !== index));
  };

  const removeLetter = (index: number) => {
    const letter = selectedLetters[index];
    setAvailableLetters([...availableLetters, letter]);
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    if (!currentWord) return;

    const userWord = selectedLetters.join("");
    if (userWord === currentWord.word) {
      setShowFeedback("correct");
      setCelebrating(true);
      speak("Amazing! That's correct!");
      setStars(stars + 10);
      setStreak(streak + 1);
      setProgress({ ...progress, spelled: progress.spelled + 1 });
      setTimeout(() => {
        setCelebrating(false);
        getRandomWord();
      }, 3000);
    } else {
      setShowFeedback("incorrect");
      speak("Good try! Let's try again");
      setTimeout(() => setShowFeedback(null), 2000);
    }
  };

  if (!currentWord) return null;

  return (
    <div
      className={`min-h-screen ${
        highContrast
          ? "bg-black"
          : "bg-gradient-to-br from-blue-100 to-purple-100"
      } p-8`}
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => {
            router.push("/");
          }}
          className={`${
            highContrast ? "bg-white text-black" : "bg-white"
          } px-6 py-3 rounded-full mb-6 flex items-center gap-2 text-xl font-bold shadow-lg hover:scale-105 transition`}
        >
          <Home className="w-6 h-6" /> Home
        </button>

        <div
          className={`${
            highContrast ? "bg-gray-900" : "bg-white"
          } rounded-xl shadow-2xl p-12 text-center`}
        >
          {celebrating && (
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
              <div className="text-9xl animate-bounce">🎉</div>
            </div>
          )}

          <h2
            className={`text-4xl font-bold mb-8 ${
              highContrast ? "text-yellow-400" : "text-purple-600"
            }`}
          >
            Spell the Word
          </h2>

          <div className="text-9xl mb-8 animate-pulse">{currentWord.image}</div>

          <button
            onClick={() => speak(currentWord.word)}
            className={`${
              highContrast
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-8 py-4 rounded-full text-2xl font-bold mb-8 flex items-center gap-3 mx-auto shadow-lg`}
          >
            <Volume2 className="w-6 h-6" /> Hear the Word
          </button>

          <p
            className={`text-2xl mb-8 ${
              highContrast ? "text-gray-300" : "text-gray-600"
            }`}
          >
            💡 Hint: {currentWord.hint}
          </p>

          <div className="flex justify-center gap-4 mb-8 min-h-24 flex-wrap">
            {selectedLetters.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => removeLetter(idx)}
                className={`w-20 h-20 ${
                  highContrast
                    ? "bg-yellow-500 text-black"
                    : "bg-purple-400 text-white"
                } rounded-2xl text-4xl font-bold shadow-lg hover:scale-110 transition`}
              >
                {letter}
              </button>
            ))}
            {selectedLetters.length === 0 && (
              <div
                className={`text-3xl ${
                  highContrast ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Tap letters below ⬇️
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {availableLetters.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => addLetter(letter, idx)}
                className={`w-20 h-20 ${
                  highContrast
                    ? "bg-white text-black border-4 border-yellow-400"
                    : "bg-blue-400 text-white"
                } rounded-2xl text-4xl font-bold shadow-lg hover:scale-110 transition active:scale-95`}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={checkAnswer}
              disabled={selectedLetters.length !== currentWord.word.length}
              className={`${
                selectedLetters.length === currentWord.word.length
                  ? highContrast
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-12 py-6 rounded-full text-3xl font-bold shadow-lg`}
            >
              <Check className="w-8 h-8 inline mr-2" /> Check
            </button>
            <button
              onClick={() => getRandomWord()}
              className={`${
                highContrast
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white px-12 py-6 rounded-full text-3xl font-bold shadow-lg`}
            >
              <RefreshCw className="w-8 h-8 inline mr-2" /> New Word
            </button>
          </div>

          {showFeedback === "correct" && (
            <div className="mt-8 text-6xl animate-bounce">
              ✅ Perfect! ⭐⭐⭐
            </div>
          )}
          {showFeedback === "incorrect" && (
            <div className="mt-8 text-5xl">😊 Try again!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
