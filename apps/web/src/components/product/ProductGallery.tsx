"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { SFSymbol } from "@/components/icons/SFSymbol";
import { Button } from "@/components/ui/button";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  const forward = () => {
    setCurrent((current + 1) % images.length);
  };

  const backward = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* fotos com a mesma largura; a foto em hover fica mais larga.
        O espaço entre as fotos é uma borda transparente, e não um gap: assim
        não há um vão sem hover entre elas, e a animação não "pisca" */}
      <div className="-mx-1 flex h-[808px] flex-1">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => {
              setCurrent(index);
              setOpen(true);
            }}
            className="h-full min-w-0 flex-1 border-x-4 border-transparent transition-[flex-grow] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] hover:flex-[3] hover:cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-6 focus-visible:outline-ink motion-reduce:transition-none"
          >
            <Image
              unoptimized
              src={image}
              alt={`${name}, foto ${index + 1} de ${images.length}`}
              width={1920}
              height={1920}
              sizes="808px"
              loading="eager"
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="inset-0 flex max-w-none translate-x-0 translate-y-0 flex-row gap-0 bg-surface p-0 sm:max-w-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") backward();
            if (e.key === "ArrowRight") forward();
          }}
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Fotos de {name}</DialogTitle>

          <div className="flex flex-1 justify-center">
            <Button
              onClick={backward}
              aria-label="Foto anterior"
              variant="secondary"
              className="px-20 text-[42px] font-light"
            >
              <SFSymbol name={"chevron.compact.left"} />
            </Button>
            <Image
              unoptimized
              src={images[current]}
              alt={`${name}, foto ${current + 1} de ${images.length}`}
              width={1920}
              height={1920}
              className="h-full w-auto border-x border-ink object-contain mix-blend-darken"
            />
            <Button
              onClick={forward}
              aria-label="Próxima foto"
              variant="secondary"
              className="px-20 text-[42px] font-light"
            >
              <SFSymbol name={"chevron.compact.right"} />
            </Button>
          </div>
          <aside className="ml-auto grid grid-rows-[1fr_auto_1fr]">
            <DialogClose asChild>
              <Button
                variant="secondary"
                size="default"
                className="aspect-square w-full self-start"
              >
                Sair
              </Button>
            </DialogClose>
            <div className="flex flex-col">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-current={index === current ? "true" : undefined}
                  className="outline outline-transparent hover:cursor-pointer aria-[current=true]:outline-ink"
                >
                  <Image
                    src={image}
                    alt={`${name}, foto ${index + 1} de ${images.length}`}
                    loading="eager"
                    width={80}
                    height={80}
                    className="w-full object-cover mix-blend-darken"
                  />
                </button>
              ))}
            </div>
          </aside>
        </DialogContent>
      </Dialog>
    </>
  );
}
