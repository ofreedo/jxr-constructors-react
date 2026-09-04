interface TimelineItemData {
  year: string;
  text: string;
}

interface TimelineProps {
  items: TimelineItemData[];
}

/**
 * Each dot pops in with a back-out bounce once the parent .reveal-group
 * becomes visible — see the `.timeline-marker` rules in index.css.
 */
function TimelineMarker() {
  return (
    <div className="timeline-marker absolute -top-[5px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-jxr-blue border-2 border-bg-panel" />
  );
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="grid grid-cols-4 max-[900px]:grid-cols-2 gap-8 max-[900px]:gap-x-6 max-[900px]:gap-y-10 max-[600px]:grid-cols-1 relative">
      {items.map((item) => (
        <div key={item.year} className="text-center pt-7 relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-hairline">
          <TimelineMarker />
          <div className="font-head font-semibold text-jxr-black text-[1.05rem] mb-2">{item.year}</div>
          <div className="text-[0.88rem] text-charcoal-soft">{item.text}</div>
        </div>
      ))}
    </div>
  );
}
