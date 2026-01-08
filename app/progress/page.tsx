"use client";

import { Award, BookOpen, Gamepad2, Home, Mic, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [highContrast, setHighContrast] = useState(false);
  const router = useRouter();

  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);

  const [progress, setProgress] = useState({ spelled: 0, spoken: 0, games: 0 });

  return (
    <div
      className={`min-h-screen ${
        highContrast
          ? "bg-black"
          : "bg-gradient-to-br from-pink-100 to-yellow-100"
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
          } rounded-3xl shadow-2xl p-12`}
        >
          <h2
            className={`text-5xl font-bold mb-12 text-center ${
              highContrast ? "text-yellow-400" : "text-pink-600"
            }`}
          >
            <Trophy className="w-16 h-16 inline mb-2" /> My Progress
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div
              className={`${
                highContrast ? "bg-blue-600" : "bg-blue-400"
              } p-8 rounded-3xl text-white text-center shadow-xl`}
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4" />
              <div className="text-5xl font-bold mb-2">{progress.spelled}</div>
              <div className="text-2xl">Words Spelled</div>
            </div>

            <div
              className={`${
                highContrast ? "bg-green-600" : "bg-green-400"
              } p-8 rounded-3xl text-white text-center shadow-xl`}
            >
              <Mic className="w-16 h-16 mx-auto mb-4" />
              <div className="text-5xl font-bold mb-2">{progress.spoken}</div>
              <div className="text-2xl">Words Spoken</div>
            </div>

            <div
              className={`${
                highContrast ? "bg-purple-600" : "bg-purple-400"
              } p-8 rounded-3xl text-white text-center shadow-xl`}
            >
              <Gamepad2 className="w-16 h-16 mx-auto mb-4" />
              <div className="text-5xl font-bold mb-2">{progress.games}</div>
              <div className="text-2xl">Games Played</div>
            </div>
          </div>

          <div
            className={`${
              highContrast
                ? "bg-gray-800"
                : "bg-gradient-to-r from-yellow-200 to-orange-200"
            } p-8 rounded-3xl text-center mb-8`}
          >
            <Award
              className={`w-20 h-20 mx-auto mb-4 ${
                highContrast ? "text-yellow-400" : "text-orange-600"
              }`}
            />
            <div
              className={`text-6xl font-bold mb-2 ${
                highContrast ? "text-yellow-400" : "text-orange-600"
              }`}
            >
              {stars}
            </div>
            <div
              className={`text-3xl font-bold ${
                highContrast ? "text-white" : "text-orange-700"
              }`}
            >
              Total Stars Earned! ⭐
            </div>
          </div>

          <div
            className={`${
              highContrast
                ? "bg-gray-800"
                : "bg-gradient-to-r from-red-200 to-pink-200"
            } p-8 rounded-3xl text-center`}
          >
            <div className="text-6xl mb-4">🔥</div>
            <div
              className={`text-6xl font-bold mb-2 ${
                highContrast ? "text-orange-400" : "text-red-600"
              }`}
            >
              {streak}
            </div>
            <div
              className={`text-3xl font-bold ${
                highContrast ? "text-white" : "text-red-700"
              }`}
            >
              Day Streak!
            </div>
            <p
              className={`text-xl mt-4 ${
                highContrast ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Keep practicing every day!
            </p>
          </div>

          <div
            className={`text-center mt-12 ${
              highContrast ? "text-white" : "text-gray-600"
            } text-xl`}
          >
            <p>🎉 You're doing amazing! Keep learning! 🌟</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
