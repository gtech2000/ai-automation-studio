import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { CTABand } from "@/components/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Services />
      <About />
      <CTABand />
    </>
  );
}
