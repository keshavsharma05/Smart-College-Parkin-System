import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./Hero.css";
import logo from "../../assets/logo.png";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollToPlugin);
export default function Hero() {
    const heroRef = useRef(null);
useLayoutEffect(() => {

  const ctx = gsap.context((self) => {
    const q = self.selector;
const tl = gsap.timeline();

tl.from(q(".logo"), {
  x: -40,
  opacity: 0,
  duration: 0.4,
  ease: "power3.out"
})

.from(q(".nav-links a"), {
  x: -20,
  opacity: 0,
  stagger: 0.12,
  duration: 0.3,
  ease: "power3.out"
})

.fromTo(q(".nav-btn"),
{
  x: -20,
  opacity: 0
},
{
  x: 0,
  opacity: 1,
  duration: 0.4
})

.from(q(".hero-content h1"), {
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease:"power2.out"
})

.from(q(".hero-content p"), {
  y: 40,
  opacity: 0,
  duration: 0.7
})

.fromTo(
  q(".hero-buttons button"),
  {
    y: 20,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 0.35,
    ease: "power2.out"
  },
  "-=0.3"
)
.from(q(".scroll-indicator"), {
  opacity: 0,
  y: 20,
  duration: 0.3
});

  }, heroRef);

  return () => ctx.revert();

}, []);

  return (
    <section className="hero" ref={heroRef}>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Navbar */}
      <nav className="landing-navbar">
<div className="logo">
  <img src={logo} alt="ParkFlow Logo" className="logo-img" />
  <span>ParkFlow</span>
</div>
<div className="nav-links">

  <a
    href="#problem-section"
    onClick={(e)=>{
      e.preventDefault();
      document.getElementById("problem-section")
        .scrollIntoView({behavior:"smooth"});
    }}
  >
  Problem
  </a>

  <a
    href="#solution-section"
    onClick={(e)=>{
      e.preventDefault();
      document.getElementById("solution-section")
        .scrollIntoView({behavior:"smooth"});
    }}
  >
  Solutions
  </a>

  <a
    href="#usecases-section"
    onClick={(e)=>{
      e.preventDefault();
      document.getElementById("usecases-section")
        .scrollIntoView({behavior:"smooth"});
    }}
  >
  Use-Cases
  </a>

<Link to="/login">
  Login
</Link>

<Link to="/register">
  <button className="nav-btn">Get Started</button>
</Link>
</div>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>Stop Searching for Parking</h1>

        <p>
          Manage parking across campuses, hotels, malls and venues
          with real-time availability and effortless booking.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Request Demo</button>
          <button className="secondary-btn">Get Started</button>
        </div>

      </div>
        <div className="scroll-indicator">
  <div className="scroll-icon"></div>
  <span>Scroll To See Why Parking Is Broken</span>
</div>
    </section>
  );
}