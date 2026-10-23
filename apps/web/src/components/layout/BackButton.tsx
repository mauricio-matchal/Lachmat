"use client";
import { useRouter } from "next/navigation";

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
    <button className="type-footnote hover:cursor-pointer" onClick={handlePop}>
      Página anterior
    </button>
  );
}
