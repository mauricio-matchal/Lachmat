import type { Metadata } from "next";
import { fontVariables } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lachmat",
  description: "Viva o sentimento.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
