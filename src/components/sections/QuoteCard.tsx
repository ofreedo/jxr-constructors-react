import { Link } from "react-router-dom";

interface QuoteCardProps {
  quote: string;
  name: string;
  attribution: string;
  projectLink?: string;
}

export function QuoteCard({ quote, name, attribution, projectLink }: QuoteCardProps) {
  return (
    <div className="bg-bg-panel border border-hairline border-l-[3px] border-l-jxr-blue rounded p-[30px_32px]">
      <span className="block font-head text-[2.6rem] leading-none text-jxr-blue mb-2.5 h-5">&ldquo;</span>
      <p className="text-[1.02rem] text-charcoal mb-[18px]">{quote}</p>
      <div className="text-[0.82rem] text-charcoal-soft border-t border-hairline pt-3.5">
        <strong className="block text-jxr-black text-[0.88rem] mb-0.5">{name}</strong>
        {attribution}
        {projectLink && (
          <Link to={projectLink} className="block mt-2.5 text-[0.82rem] font-semibold text-jxr-blue hover:text-jxr-black">
            View Project →
          </Link>
        )}
      </div>
    </div>
  );
}
