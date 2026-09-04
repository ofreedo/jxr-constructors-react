import { Link } from "react-router-dom";
import { assetPath } from "@/lib/utils";

interface ProjectCardProps {
  image: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
  projectLink: string;
}

export function ProjectCard({ image, alt, tag, title, description, projectLink }: ProjectCardProps) {
  return (
    <div className="bg-bg-panel border border-hairline rounded overflow-hidden flex flex-col transition-[transform,box-shadow] duration-[0.18s] ease-linear hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(20,22,26,0.1)] group">
      <div className="aspect-[4/3] overflow-hidden bg-charcoal">
        <img
          src={assetPath(image)}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="p-6 pt-[22px] flex flex-col flex-1">
        <div className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-jxr-blue mb-2">{tag}</div>
        <h3 className="text-[1.15rem] mb-2">{title}</h3>
        <p className="text-[0.92rem] mb-3.5">{description}</p>
        <Link to={projectLink} className="mt-auto text-[0.85rem] font-semibold text-jxr-blue tracking-[0.02em] hover:text-jxr-black">
          View Project →
        </Link>
      </div>
    </div>
  );
}
