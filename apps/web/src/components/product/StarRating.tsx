import { SFSymbol } from "@/components/icons/SFSymbol";

const MAX_RATING = 5;

export function StarRating({ rating }: { rating: number }) {
  // Rounded down, as in the Figma (3.8 → 3 stars): never show more than the real rating
  const filledStars = Math.floor(rating);

  return (
    <p className="flex items-center gap-3.5">
      <span className="flex text-[14px]">
        {Array.from({ length: MAX_RATING }, (_, index) => (
          <SFSymbol
            key={index}
            name="star.fill"
            className={index < filledStars ? "text-lime" : "text-ink/15"}
          />
        ))}
      </span>
      <span className="type-footnote">
        <span className="sr-only">Avaliação </span>
        {rating.toFixed(1)}
        <span className="sr-only"> de {MAX_RATING}</span>
      </span>
    </p>
  );
}
