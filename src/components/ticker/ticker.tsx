"use client";

type TickerProps = {
  messages: string[];
  speed?: number; // higher = slower
};

export default function Ticker({ messages, speed = 20 }: TickerProps) {
  return (
    <div className="w-full overflow-hidden relative h-10 flex items-center">
      <div
        className="flex whitespace-nowrap animate-ticker absolute left-0"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...messages, ...messages].map((msg, index) => (
          <span
            key={index}
            className="mx-6 inline-block text-sm sm:text-base text-gray-700 leading-none"
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
