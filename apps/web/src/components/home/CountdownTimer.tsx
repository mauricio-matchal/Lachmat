"use client";

import { useEffect, useState } from "react";

/*
 * COMO CONFIGURAR O TIMER
 *
 * - Tempo inicial: altere DEAL_DURATION_SECONDS abaixo. O valor é em segundos,
 *   então escreva como horas * 3600 + minutos * 60 + segundos.
 *   Ex.: 1h 30m 00s → 1 * 3600 + 30 * 60 + 0
 * - O timer começa nesse valor quando a página abre, conta até zero e recomeça.
 *   É apenas um mock visual: não existe oferta real nem dado vindo do backend.
 * - Visual das caixas (tamanho, cor, fonte): componente TimeBox, no fim do arquivo.
 * - Animação dos números: keyframes "tick" e variável --animate-tick no
 *   globals.css. Mude a duração (0.35s), o blur ou o deslocamento (queda).
 * - Os números usam tabular-nums (todos os dígitos com a mesma largura),
 *   para as caixas não mudarem de tamanho a cada segundo.
 */
const DEAL_DURATION_SECONDS = 1 * 3600 + 10 * 60 + 40;

const pad = (value: number) => String(value).padStart(2, "0");

export function CountdownTimer() {
  const [remaining, setRemaining] = useState(DEAL_DURATION_SECONDS);

  useEffect(() => {
    const endsAt = Date.now() + DEAL_DURATION_SECONDS * 1000;

    // Recompute from the clock on every tick instead of decrementing a counter,
    // so throttled background tabs never drift
    const interval = setInterval(() => {
      const secondsLeft = Math.round((endsAt - Date.now()) / 1000);
      setRemaining(
        ((secondsLeft % DEAL_DURATION_SECONDS) + DEAL_DURATION_SECONDS) %
          DEAL_DURATION_SECONDS,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return (
    <div
      role="timer"
      aria-label={`Termina em ${hours} horas e ${minutes} minutos`}
      className="flex items-center justify-center gap-1.5"
    >
      <TimeBox value={hours} unit="h" />
      <Separator />
      <TimeBox value={minutes} unit="m" />
      <Separator />
      <TimeBox value={seconds} unit="s" />
    </div>
  );
}

function TimeBox({ value, unit }: { value: number; unit: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex items-center justify-center bg-ink px-2.5 py-0.5 font-condensed text-[27px] font-bold tracking-[-0.5px] text-white tabular-nums"
    >
      {pad(value)
        .split("")
        .map((digit, index) => (
          // The key changes only when this digit changes, so only that digit
          // remounts and replays the blur animation (like the "2" in the Figma)
          <span
            key={`${index}-${digit}`}
            className="inline-block animate-tick will-change-[filter,transform,opacity] motion-reduce:animate-none"
          >
            {digit}
          </span>
        ))}
      {unit}
    </span>
  );
}

// Drawn with CSS instead of the ":" glyph: the glyph's dots barely grow with the
// font weight and sit on the text baseline, while these are sized and centered exactly
function Separator() {
  return (
    <span aria-hidden="true" className="flex flex-col gap-[5px]">
      <span className="size-1.5 rounded-full bg-ink" />
      <span className="size-1.5 rounded-full bg-ink" />
    </span>
  );
}
