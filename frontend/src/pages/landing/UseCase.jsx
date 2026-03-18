import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Hotel, ShoppingBag } from "lucide-react";
import "./UseCase.css";

gsap.registerPlugin(ScrollTrigger);
export default function UseCase() {

  const sectionRef = useRef(null);
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const isMobile = window.matchMedia("(max-width:768px)").matches;

    const tl = gsap.timeline({
      scrollTrigger:{
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // heading
    tl.fromTo(
      ".usecases-header h2",
      { opacity:0, y:50 },
      {
        opacity:1,
        y:0,
        duration:0.8,
        ease:"power3.out"
      }
    )

    // subtitle
    .fromTo(
      ".usecases-header p",
      { opacity:0, y:30 },
      {
        opacity:1,
        y:0,
        duration:0.6,
        ease:"power2.out"
      },
      "-=0.4"
    );
if (!isMobile) {
    // cards appear
    tl.fromTo(
      ".usecase-card",
      {
        opacity:0,
        y:60,
        scale:0.96
      },
      {
        opacity:1,
        y:0,
        scale:1,
        duration:0.8,
        stagger:0.18,
        ease:"power3.out"
      },
      "-=0.3"
    )

    // icons pop slightly
    .fromTo(
      ".usecase-icon",
      {
        scale:0.6,
        opacity:0
      },
      {
        scale:1,
        opacity:1,
        duration:0.5,
        stagger:0.18,
        ease:"back.out(1.8)"
      },
      "-=0.6"
    );
  }
  else {

  gsap.utils.toArray(".usecase-card").forEach((card) => {

    gsap.fromTo(card,
      { opacity:0, y:50 },
      {
        opacity:1,
        y:0,
        duration:0.7,
        ease:"power3.out",
        scrollTrigger:{
          trigger:card,
          start:"top 85%"
        }
      }
    );

  });

}
  }, sectionRef);

  return () => ctx.revert();

}, []);

  const useCases = [
    {
      icon: <GraduationCap size={22}/>,
      title: "Campuses",
      description:
        "Manage student, faculty, and visitor parking efficiently with real-time slot visibility and controlled access."
    },
    {
      icon: <Hotel size={22}/>,
      title: "Hotels & Resorts",
      description:
        "Provide seamless parking experiences for guests while giving staff complete visibility and control."
    },
    {
      icon: <ShoppingBag size={22}/>,
      title: "Malls & Venues",
      description:
        "Handle high vehicle traffic with automated parking management and real-time monitoring."
    }
  ];

  return (
    <section id="usecases-section" className="usecases-section" ref={sectionRef}>

      <div className="usecases-container">

        <div className="usecases-header">
          <h2>Built for Modern Parking Operations</h2>
          <p>
            CampusPark adapts to different environments where parking needs to be
            managed efficiently and intelligently.
          </p>
        </div>

        <div className="usecases-grid">

          {useCases.map((item, index) => (
            <div className="usecase-card" key={index}>

              <div className="usecase-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}