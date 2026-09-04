import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/utils";

const SWIPE_THRESHOLD = 40;

function preload(filename: string | undefined) {
  if (!filename) return;
  const img = new Image();
  img.src = assetPath(filename);
}

/**
 * Ports the original's showImage/preload/touch-swipe logic exactly:
 * circular index wrapping via modulo, adjacent-only preloading (current
 * neighbors, not the whole set), and a 40px touchstart->touchend delta
 * threshold with no touchmove tracking.
 */
export function useGalleryNavigation(images: string[], startIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(startIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    if (!images.length) return;
    preload(images[(currentIndex + 1) % images.length]);
    preload(images[(currentIndex - 1 + images.length) % images.length]);
  }, [currentIndex, images]);

  function showImage(index: number) {
    if (!images.length) return;
    setCurrentIndex(((index % images.length) + images.length) % images.length);
  }

  function goNext() {
    showImage(currentIndex + 1);
  }

  function goPrev() {
    showImage(currentIndex - 1);
  }

  function onTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      deltaX > 0 ? goPrev() : goNext();
    }
    touchStartX.current = null;
  }

  function onKeyDown(event: React.KeyboardEvent | KeyboardEvent) {
    if (event.key === "ArrowLeft") goPrev();
    if (event.key === "ArrowRight") goNext();
  }

  return {
    currentIndex,
    currentImage: images[currentIndex],
    goNext,
    goPrev,
    onTouchStart,
    onTouchEnd,
    onKeyDown,
  };
}
