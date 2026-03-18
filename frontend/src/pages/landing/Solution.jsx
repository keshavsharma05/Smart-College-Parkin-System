import { useLayoutEffect,useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Solution.css";

gsap.registerPlugin(ScrollTrigger);

export default function Solution() {

  const sectionRef = useRef(null);
  const [step, setStep] = useState(0);

  const isMobile = window.innerWidth <= 768;

  const content = [
    {
      title: "Owner Dashboard",
      points: [
        "Monitor parking activity in real time",
        "Control slots and permissions",
        "Track analytics and parking usage"
      ],
      video: "/Post-1.mp4"
    },
    {
      title: "User App",
      points: [
        "Find available parking instantly",
        "Reserve a slot before arrival",
        "Navigate directly to your parking space"
      ],
      video: "/Post-2.mp4"
    },
    {
      title: "Staff App",
      points: [
        "Verify vehicles on entry",
        "Manage check-in and check-out",
        "Maintain smooth parking flow"
      ],
      video: "/Post-4.mp4"
    }
  ];

  useLayoutEffect(() => {

    const el = sectionRef.current;

    const ctx = gsap.context(() => {

const introTL = gsap.timeline({
  scrollTrigger: {
    trigger: el,
    start: "top 65%",
    toggleActions: "play none none reverse"
  }
});

introTL
  .from(".solution-intro h2", {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out"
  })
  .from(".solution-intro p", {
    y: 25,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.4")
  .from(".solution-progress span", {
    scaleX: 0,
    transformOrigin: "left",
    duration: 0.5,
    stagger: 0.12,
    ease: "power2.out"
  }, "-=0.3")
  .from(".laptop", {
    y: 50,
    opacity: 0,
    scale: 0.95,
    duration: 0.7,
    ease: "power3.out"
  }, "-=0.4");
      if (!isMobile) {

        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: ".solution-stage",
          anticipatePin: 1,

          onUpdate: (self) => {

            const next =
              self.progress < 0.33 ? 0 :
              self.progress < 0.66 ? 1 : 2;

            setStep(prev => prev === next ? prev : next);
          }
        });
      } else {

        let startX = 0;

        const handleTouchStart = (e) => {
          startX = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {

          const endX = e.changedTouches[0].clientX;
          const diff = startX - endX;

          if (diff > 60) {
            setStep(prev => Math.min(prev + 1, 2));
          }

          if (diff < -60) {
            setStep(prev => Math.max(prev - 1, 0));
          }
        };

        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
          el.removeEventListener("touchstart", handleTouchStart);
          el.removeEventListener("touchend", handleTouchEnd);
        };
      }

    }, sectionRef);

    return () => ctx.revert();

  }, [isMobile]);
useEffect(() => {

  const tl = gsap.timeline({ overwrite: "auto" });

  tl.fromTo(
    ".solution-content h3",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
  )
  .fromTo(
    ".solution-content li",
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out"
    },
    "-=0.25"
  );
  tl.fromTo(
  ".laptop",
  { scale: 0.96, opacity: 0.8 },
  {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out"
  },
  0
);

}, [step]);
  const active = content[step];

  return (
    <section
      id="solution-section"
      className="solution-section"
      ref={sectionRef}
    >

      <div className="solution-bg">
        <img src="/image.png" alt="background"/>
      </div>

      <div className="solution-stage">

        <div className="solution-wrapper">

          {/* LEFT SIDE */}

          <div className="solution-left">

            <div className="solution-intro">
              <h2>The Solution:<br/>CampusPark</h2>

              <p>
                CampusPark connects drivers, staff and administrators
                into one seamless smart parking system.
              </p>
            </div>

            <div className="solution-progress">
              <span className={step === 0 ? "active" : ""}></span>
              <span className={step === 1 ? "active" : ""}></span>
              <span className={step === 2 ? "active" : ""}></span>
            </div>

            <div className="solution-content">

              <h3>{active.title}</h3>

              <ul>
                {active.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="solution-right">

            <div className="laptop">

              <div className="laptop-screen">

                <video
                  key={active.video}
                  src={active.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="solution-video"
                />

              </div>

            </div>

          </div>

        </div>

        {/* SWIPE INDICATOR (mobile only) */}

        {isMobile && (
          <div className="swipe-indicator">
            <div className="swipe-icon"></div>
            <span>Swipe to explore</span>
          </div>
        )}

      </div>

    </section>
  );
}