/*
 * SF Symbols rendered as text glyphs of SF Pro (the web font includes them, see
 * planning/scripts/build_fonts.py). Like text, they take size and weight from
 * font-size/font-weight and sit on the baseline next to the text around them.
 */
const symbols = {
  magnifyingglass: "\u{1002AB}",
  bag: "\u{100363}",
  "slider.horizontal.3": "\u{100306}",
  "star.fill": "\u{1002C3}",
  asterisk: "\u{100E13}",
  "chevron.left": "\u{100189}",
  "chevron.right": "\u{10018A}",
  "chevron.compact.left": "\u{100192}",
  "chevron.compact.right": "\u{100193}",
} as const;

export type SFSymbolName = keyof typeof symbols;

type SFSymbolProps = {
  name: SFSymbolName;
  className?: string;
};

export function SFSymbol({ name, className = "" }: SFSymbolProps) {
  return (
    <span aria-hidden="true" className={`font-sans leading-none ${className}`}>
      {symbols[name]}
    </span>
  );
}
