"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  const handlePop = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Button
      variant="ghost"
      size="text"
      className="self-start"
      onClick={handlePop}
    >
      Página anterior
    </Button>
  );
}
