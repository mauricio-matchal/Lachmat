"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ProductDetail } from "@/lib/api";

// The database has no order for sizes, so they are sorted here; unknown names go last
const SIZE_ORDER = ["PP", "P", "M", "G", "GG", "GGG", "XG"];

const sizeRank = (name: string) => {
  const index = SIZE_ORDER.indexOf(name);
  return index === -1 ? SIZE_ORDER.length : index;
};

export const SizeSelector = ({
  sizes,
  invalid = false,
  ...props
}: Omit<React.ComponentProps<typeof RadioGroup>, "children"> & {
  sizes: ProductDetail["sizes"];
  // "Escolha um tamanho" error, e.g. "Comprar agora" clicked with no size
  invalid?: boolean;
}) => {
  const sorted = [...sizes].sort((a, b) => sizeRank(a.name) - sizeRank(b.name));

  return (
    <RadioGroup aria-label="Tamanho" name="size" {...props}>
      {sorted.map((size) => {
        const soldOut = size.stock === 0;
        return (
          <RadioGroupItem
            key={size.id}
            value={size.name}
            disabled={soldOut}
            aria-invalid={invalid || undefined}
            aria-label={soldOut ? `${size.name}, esgotado` : undefined}
          >
            {size.name}
          </RadioGroupItem>
        );
      })}
    </RadioGroup>
  );
};
