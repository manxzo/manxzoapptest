"use client";

import { Aurora, RotatingText } from "@/components/Reactbits";
import { useState } from "react";

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnimationComplete = (index: number) => {
    if (index === 4) {
      setTimeout(() => {
        setAnimationComplete(true);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#01213a", "#01411f", "#005d55"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="max-w-3xl w-full bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl border border-gray-700">
        {/* Terminal header */}
        <div className="flex items-center bg-gray-800 px-4 py-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-sm text-gray-400 font-mono">
            terminal
          </div>
        </div>

        <div className="p-6 font-mono text-gray-100 text-2xl">
          <div className="flex items-center">
            <span className="text-green-400 mr-2">user@manzo:~$</span>
            <div className="flex items-center">
              <RotatingText
                texts={[
                  "Hello, World!",
                  "I'm Manzo!",
                  "I'm a software developer!",
                  "Welcome to my website!",
                  "What are you looking for?",
                ]}
                mainClassName="text-white"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                rotationInterval={2500}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                loop={false}
                onNext={handleAnimationComplete}
              />
              {!animationComplete && (
                <span className="ml-1 w-2 h-6 bg-white inline-block animate-[pulse_0.8s_ease-in-out_infinite]"></span>
              )}
            </div>
          </div>

          {animationComplete && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">user@manzo:~$</span>
                <span>Please select an option:</span>
              </div>

              <div className="ml-8 space-y-3">
                <button
                  onClick={() => setSelectedOption(1)}
                  className={`flex items-center w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors ${selectedOption === 1 ? "bg-gray-700/50 border-l-4 border-green-400 pl-1" : ""}`}
                >
                  <span className="text-yellow-400 mr-2">{">"}</span>
                  <span>See my Professional Side</span>
                </button>

                <button
                  onClick={() => setSelectedOption(2)}
                  className={`flex items-center w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors ${selectedOption === 2 ? "bg-gray-700/50 border-l-4 border-green-400 pl-1" : ""}`}
                >
                  <span className="text-yellow-400 mr-2">{">"}</span>
                  <span>See my Personal Side</span>
                </button>
              </div>

              {selectedOption && (
                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">user@manzo:~$</span>
                    <span>
                      Loading{" "}
                      {selectedOption === 1 ? "Professional" : "Personal"}{" "}
                      page...
                    </span>
                    <span className="ml-2 w-2 h-6 bg-white inline-block animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
