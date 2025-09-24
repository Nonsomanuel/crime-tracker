"use client";

type TickerProps = {
  messages: string[];
  speed?: number; // animation speed in seconds
};

export default function Ticker({ messages, speed = 20 }: TickerProps) {
  return (
    <div className="w-full overflow-hidden bg-gray-900 py-2">
      <div
        className="flex whitespace-nowrap animate-ticker text-white text-sm"
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Duplicate messages twice for seamless looping */}
        {[...messages, ...messages].map((msg, idx) => (
          <span key={idx} className="mx-8">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
