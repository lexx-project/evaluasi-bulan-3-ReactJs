import AboutHeader from "@/components/about/AboutHeader";
import AboutStory from "@/components/about/AboutStory";
import Team from "@/components/about/Team";
import VisiMisi from "@/components/about/VisiMisi";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";

export default function About() {
  return (
    <>
      <Navbar01 />
      <AboutHeader />
      <AboutStory />
      <Team />
      <VisiMisi />
    </>
  );
}
