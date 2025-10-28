import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";

export default function Home() {
  return (
    <>
      <Navbar01 />
      <Hero />
      <WhyUs />
    </>
  );
}
