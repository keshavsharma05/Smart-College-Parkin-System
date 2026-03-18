import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProblemSection.css";
import { AlertTriangle, Search, EyeOff } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const sectionRef = useRef(null);
useLayoutEffect(() => {

  const ctx = gsap.context(() => {

const isMobile = window.matchMedia("(max-width:640px)").matches;


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 92%",
    toggleActions: "play none play reverse",
    onEnter: () => console.log("Timeline trigger fired")
  }
});

    tl.fromTo(".problem-content h2",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
    .fromTo(".problem-divider",
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(".problem-sub",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
    if (!isMobile) {
    tl.fromTo(".center-card",
      { opacity: 0, scale: 0.85, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(".left-card",
      { opacity: 0, x: 150 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
      "-=0.2"
    )
    .fromTo(".right-card",
      { opacity: 0, x: -150 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
      "-=0.6"
    );
  }  else {
  console.log("Running MOBILE animation");
gsap.fromTo(".left-card",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: ".left-card",
start: "top 85%",
      onEnter: () => console.log("LEFT CARD TRIGGERED")
    }
  }
);

  gsap.fromTo(".center-card",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".center-card",
        start: "top 85%",
        onEnter: () => console.log("CENTER CARD TRIGGERED")
      }
    }
  );

  gsap.fromTo(".right-card",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".right-card",
        start: "top 85%",
        onEnter: () => console.log("RIGHT CARD TRIGGERED")
      }
    }
  );

}

}, sectionRef);

  const refresh = () => ScrollTrigger.refresh();

  window.addEventListener("load", refresh);
  window.addEventListener("resize", refresh);
  window.addEventListener("orientationchange", refresh);

  setTimeout(refresh, 600);

  return () => {
    window.removeEventListener("load", refresh);
    window.removeEventListener("resize", refresh);
    window.removeEventListener("orientationchange", refresh);
    ctx.revert();
  };

}, []);
  return (
    <section id="problem-section" className="problem-section" ref={sectionRef}>
      {/* Blurred background */}
      <div className="problem-bg"></div>
      <div className="problem-overlay"></div>

      <div className="problem-content">

        <h2>Parking Shouldn't Be This Complicated</h2>
<div className="problem-divider"></div>

        <p className="problem-sub">
          Traditional parking systems create confusion for drivers and
          inefficiency for administrators. Finding and managing spaces
          should be simple, but it rarely is.
        </p>

        <div className="problem-grid">

<div className="problem-card left-card">

  <div className="problem-icon">
    <AlertTriangle size={22} strokeWidth={1.6}/>
  </div>

  <h3>Manual Entry & Verification</h3>
  <p>
    Staff frequently rely on outdated manual systems to track
    vehicle entry and exit, slowing operations.
  </p>

</div>


<div className="problem-card center-card">

  <div className="problem-icon">
    <Search size={22} strokeWidth={1.6}/>
  </div>

  <h3>Drivers Waste Time Searching</h3>
  <p>
    Drivers often circle parking areas hoping a space opens,
    leading to frustration and unnecessary congestion.
  </p>

</div>


<div className="problem-card right-card">

  <div className="problem-icon">
    <EyeOff size={22} strokeWidth={1.6}/>
  </div>

  <h3>No Real-Time Visibility</h3>
  <p>
    Without a smart system, administrators have no clear view
    of available parking slots across the facility.
  </p>

</div>
</div>
        </div>


    </section>
  );
}