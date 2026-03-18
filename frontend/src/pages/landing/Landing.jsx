import Navbar from "../../components/Navbar";

import Hero from "./Hero";
import ProblemSection from "./ProblemSection";
import Solution from "./Solution";
import UseCase from "./UseCase";
import CTA from "./CTA";

export default function Landing() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <Solution />
      <UseCase />
      <CTA />
    </>
  );
}