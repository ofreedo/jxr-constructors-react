import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGalleryNavigation } from "@/hooks/useGalleryNavigation";
import { assetPath, cn } from "@/lib/utils";

interface PhotoGalleryDialogProps {
  title: string;
  images: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PhotoGalleryDialog({ title, images, open, onOpenChange }: PhotoGalleryDialogProps) {
  const { currentIndex, currentImage, goNext, goPrev, onTouchStart, onTouchEnd, onKeyDown } =
    useGalleryNavigation(images);

  if (!images.length) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="w-[min(92vw,1100px)] max-h-[90vh] bg-jxr-black rounded overflow-hidden flex flex-col outline-none"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/10 pr-14">
          <DialogTitle className="text-white text-[0.95rem] font-semibold font-head truncate">
            {title}
          </DialogTitle>
          <span className="text-white/60 text-[0.8rem] shrink-0 tabular-nums">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="relative flex-1 min-h-0 flex items-center justify-center bg-jxr-black">
          {images.length > 1 && (
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-3 z-10 grid place-items-center w-10 h-10 rounded-full bg-jxr-black/60 text-white hover:bg-jxr-black/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-jxr-blue-bright"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <img
            key={currentImage}
            src={assetPath(currentImage)}
            alt={`${title} — photo ${currentIndex + 1}`}
            className={cn("max-w-full max-h-[75vh] w-auto h-auto object-contain select-none")}
          />

          {images.length > 1 && (
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-3 z-10 grid place-items-center w-10 h-10 rounded-full bg-jxr-black/60 text-white hover:bg-jxr-black/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-jxr-blue-bright"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
