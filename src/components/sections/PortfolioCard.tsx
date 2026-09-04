import { cn, assetPath } from "@/lib/utils";
import type { PortfolioProject } from "@/data/projects";

interface PortfolioCardProps {
  project: PortfolioProject;
  /** Wired up in Phase 5 — opens the photo gallery dialog for this project. */
  onOpenGallery?: (project: PortfolioProject) => void;
}

export function PortfolioCard({ project, onOpenGallery }: PortfolioCardProps) {
  const isClickable = Boolean(project.gallery?.length);

  function handleActivate() {
    if (isClickable) onOpenGallery?.(project);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!isClickable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  }

  return (
    <article
      id={project.id}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={
        isClickable ? `${project.title} — view photo gallery, ${project.gallery!.length} photos` : undefined
      }
      onClick={isClickable ? handleActivate : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      className={cn(
        "bg-bg-panel border border-hairline rounded overflow-hidden flex flex-col transition-[transform,box-shadow] duration-[0.18s] ease-linear",
        project.isTechnical && "[&_.portfolio-media]:bg-jxr-black",
        isClickable
          ? "cursor-pointer hover:-translate-y-[5px] hover:shadow-[0_16px_32px_rgba(28,63,191,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-jxr-blue focus-visible:outline-offset-2"
          : "hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(20,22,26,0.1)]"
      )}
    >
      <div className={cn("portfolio-media relative aspect-[4/3] overflow-hidden group", project.isTechnical ? "bg-jxr-black" : "bg-charcoal")}>
        <img
          src={assetPath(project.image)}
          alt={project.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        {isClickable && (
          <span className="absolute right-2.5 bottom-2.5 z-[2] inline-flex items-center gap-1.5 px-3 py-[7px] rounded-full bg-jxr-black/70 text-white text-[0.76rem] font-semibold tracking-[0.02em] backdrop-blur-[2px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="w-3.5 h-3.5 shrink-0"
            >
              <rect x="3" y="7" width="15" height="13" rx="2" />
              <path d="M7 7V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-3" />
            </svg>
            <span>{project.gallery!.length} Photos</span>
          </span>
        )}
      </div>
      <div className="p-6 pt-[22px] flex flex-col flex-1">
        <div className="text-[0.7rem] font-bold tracking-[0.06em] uppercase text-jxr-blue mb-2">{project.tag}</div>
        <h3 className="text-[1.1rem] mb-1">{project.title}</h3>
        {project.code && (
          <p className="text-[0.72rem] font-bold tracking-[0.06em] uppercase text-charcoal-soft mb-3">
            {project.code}
          </p>
        )}
        <p className="text-[0.9rem]">{project.description}</p>
        {project.quote && (
          <blockquote className="mt-4 p-[14px_16px] bg-bg-warm border-l-[3px] border-jxr-blue rounded text-[0.85rem] italic text-charcoal">
            &ldquo;{project.quote.text}&rdquo;
            <span className="block mt-2 text-[0.75rem] not-italic font-semibold text-charcoal-soft">
              {project.quote.attribution}
            </span>
          </blockquote>
        )}
      </div>
    </article>
  );
}
