import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/reveal/Reveal";

interface CtaBandProps {
  heading: string;
  body: string;
  buttonLabel?: string;
}

export function CtaBand({ heading, body, buttonLabel = "Schedule an Appointment" }: CtaBandProps) {
  return (
    <Reveal as="section" className="bg-jxr-black text-white text-center px-6 py-[72px] relative">
      <h2 className="text-white mb-3">{heading}</h2>
      <p className="text-white/70 max-w-[480px] mx-auto mb-7">{body}</p>
      <Button to="/contact" variant="primary" className="bg-white text-jxr-black hover:bg-jxr-blue-bright hover:text-white">
        {buttonLabel}
      </Button>
    </Reveal>
  );
}
