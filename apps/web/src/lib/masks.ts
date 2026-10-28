import { maskPrice } from "@/lib/price";

// Input masks: each one drops the non-digits and formats what is left,
// so letters never reach the field. The template is shown while the field is
// focused, and the typed digits replace its "_" one by one, so a formatted value
// always lines up with the start of its template ("40110 - 9" + "__" = "40110 - 9__")

const digits = (value: string, max: number) =>
  value.replace(/\D/g, "").slice(0, max);

type Mask = {
  format: (value: string) => string;
  template?: string;
};

export type MaskName = "price" | "cep" | "sku" | "card" | "cvv" | "expiry";

export const masks: Record<MaskName, Mask> = {
  /** "abc1234" -> "12,34"; no template, it fills from the cents (see maskPrice) */
  price: { format: maskPrice },
  /** "40110909" -> "40110 - 909" */
  cep: {
    format: (value) => digits(value, 8).replace(/^(\d{5})(\d)/, "$1 - $2"),
    template: "_____ - ___",
  },
  /** "10000458" -> "1000 - 0458" (stored as "1000-0458") */
  sku: {
    format: (value) => digits(value, 8).replace(/^(\d{4})(\d)/, "$1 - $2"),
    template: "____ - ____",
  },
  /** "4111111111111111" -> "4111 1111 1111 1111" */
  card: {
    format: (value) => digits(value, 16).replace(/(\d{4})(?=\d)/g, "$1 "),
    template: "____ ____ ____ ____",
  },
  /** 3 digits, 4 on Amex */
  cvv: { format: (value) => digits(value, 4), template: "___" },
  /** "1229" -> "12 / 29" */
  expiry: {
    format: (value) => digits(value, 4).replace(/^(\d{2})(\d)/, "$1 / $2"),
    template: "__ / __",
  },
};
