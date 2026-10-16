type MarqueeProps = {
  text: string;
  /** Repetitions per copy; each copy must be wider than the widest screen. */
  repeat?: number;
};

/*
 * Infinite horizontal scroll with CSS only: the track holds two identical
 * copies and slides by -50%, so the second copy lands exactly where the first
 * started and the loop restarts without a visible jump.
 */
export function Marquee({ text, repeat = 20 }: MarqueeProps) {
  const items = Array.from({ length: repeat * 2 }, (_, index) => index);

  return (
    <div aria-hidden="true" className="overflow-hidden bg-black text-white">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {items.map((index) => (
          // Padding instead of gap keeps the spacing equal at the seam between copies
          <span
            key={index}
            className="pr-2.5 font-expanded text-[10px] leading-5 font-bold whitespace-nowrap"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
