import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CTA.css";

gsap.registerPlugin(ScrollTrigger);
export default function CTA() {

  const sectionRef = useRef(null);

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger:{
          trigger: sectionRef.current,
          start:"top 80%",
          toggleActions:"play none none none"
        }
      });

      tl.fromTo(
        ".cta-container",
        { opacity:0, scale:0.96 },
        {
          opacity:1,
          scale:1,
          duration:0.8,
          ease:"power3.out"
        }
      )

      .fromTo(
        ".cta-container h2",
        { opacity:0, y:40 },
        {
          opacity:1,
          y:0,
          duration:0.7,
          ease:"power3.out"
        },
        "-=0.4"
      )

      .fromTo(
        ".cta-container p",
        { opacity:0, y:25 },
        {
          opacity:1,
          y:0,
          duration:0.6,
          ease:"power2.out"
        },
        "-=0.4"
      )

      .fromTo(
        ".cta-buttons button",
        {
          opacity:0,
          y:25,
          scale:0.9
        },
        {
          opacity:1,
          y:0,
          scale:1,
          duration:0.5,
          stagger:0.15,
          ease:"back.out(1.7)"
        },
        "-=0.3"
      );

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <section className="cta-section" ref={sectionRef}>

      <div className="cta-container">

        <h2>Ready to Simplify Parking?</h2>

        <p>
          CampusPark helps campuses, hotels, and venues manage parking
          with real-time visibility and automation.
        </p>

        <div className="cta-buttons">

          <button className="cta-primary">
            Get Started
          </button>

          <button className="cta-secondary">
            Login
          </button>

        </div>

      </div>

    </section>
  );
}