import localFont from "next/font/local";

export const fixtureExpanded = localFont({
  src: [{ path: "./fixture-expanded-extrabold.woff2", weight: "800" }],
  variable: "--font-fixture-expanded",
  display: "swap",
});

export const sfPro = localFont({
  src: [
    { path: "./sf-pro-regular.woff2", weight: "400" },
    { path: "./sf-pro-medium.woff2", weight: "500" },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

export const sfProCondensed = localFont({
  src: [
    { path: "./sf-pro-condensed-regular.woff2", weight: "400" },
    { path: "./sf-pro-condensed-medium.woff2", weight: "500" },
    { path: "./sf-pro-condensed-semibold.woff2", weight: "600" },
    { path: "./sf-pro-condensed-bold.woff2", weight: "700" },
    // SF Pro has no ExtraBold: Heavy fills the 800 slot (font-extrabold)
    { path: "./sf-pro-condensed-heavy.woff2", weight: "800" },
    { path: "./sf-pro-condensed-black.woff2", weight: "900" },
  ],
  variable: "--font-sf-pro-condensed",
  display: "swap",
});

export const sfProExpanded = localFont({
  src: [
    { path: "./sf-pro-expanded-bold.woff2", weight: "700" },
    { path: "./sf-pro-expanded-black.woff2", weight: "900" },
  ],
  variable: "--font-sf-pro-expanded",
  display: "swap",
});

export const fontVariables = [
  fixtureExpanded.variable,
  sfPro.variable,
  sfProCondensed.variable,
  sfProExpanded.variable,
].join(" ");
