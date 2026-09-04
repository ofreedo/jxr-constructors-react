import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
}

export function ServiceCard({ title, description, link }: ServiceCardProps) {
  return (
    <div className="bg-bg-panel border border-hairline border-t-[3px] border-t-jxr-blue rounded p-[26px_22px]">
      <h3 className="text-[1.02rem] mb-2">{title}</h3>
      <p className="text-[0.88rem] mb-3">{description}</p>
      <Link to={link} className="text-[0.82rem] font-semibold text-jxr-blue hover:text-jxr-black">
        Learn more →
      </Link>
    </div>
  );
}
