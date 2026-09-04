import { useState } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { RevealGroup } from "@/components/reveal/RevealGroup";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PhotoGalleryDialog } from "@/components/gallery/PhotoGalleryDialog";
import { portfolioProjects, type PortfolioProject } from "@/data/projects";

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  return (
    <main>
      <PageHero
        image="VA.01-Bldg 2 Parking Lot-1262.jpg"
        imageAlt="VA Palo Alto parking lot construction"
        eyebrow="Our Work"
        heading="Delivering Excellence, One Project at a Time"
        sub="$30M+ in completed construction across hospitals, military bases, airports, and public buildings — with zero safety violations and top-tier client evaluations."
      />

      <section className="py-[88px]">
        <div className="max-w-container mx-auto px-6">
          <RevealGroup as="div" className="grid grid-cols-3 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-8">
            {portfolioProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} onOpenGallery={setActiveProject} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <PhotoGalleryDialog
        title={activeProject?.title ?? ""}
        images={activeProject?.gallery ?? []}
        open={activeProject !== null}
        onOpenChange={(open) => {
          if (!open) setActiveProject(null);
        }}
      />

      <CtaBand
        heading="Ready to Start Your Project?"
        body="Contact us today and take the first step toward a successful project."
      />
    </main>
  );
}
