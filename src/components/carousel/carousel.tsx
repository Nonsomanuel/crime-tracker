"use client";

import { useEffect, useState } from "react";

type CarouselProps = {
  messages: string[];
  interval?: number;
};

export default function Carousel({ messages, interval = 3000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-lg bg-white">
      {/* Messages */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className=" flex-shrink-0 flex items-center justify-center  p-6 text-[14px] font-medium text-gray-800"
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {messages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
