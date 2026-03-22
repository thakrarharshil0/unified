"use client";

import { useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    image: "/assets/construction-site.jpg",
    title: "POST-TENSIONING ENGINEERING",
    description:
      "Unified specialises in the engineering and execution of post-tensioning systems where structural efficiency, speed of construction, and long-span performance directly influence project feasibility.",
  },
  {
    id: 2,
    image: "/assets/construction-site-with-cranes-dubai.jpg",
    title: "BONDED POST-TENSIONING",
    description:
      "Bonded PT offers superior crack control, long-term durability, and high structural reliability for slabs that demand precision and safety under heavy loads.",
  },
  {
    id: 3,
    image:
      "/assets/construction-houses-israel-2022view-building-complex-vintage-processing-selective-focus.jpg",
    title: "UNBONDED POST-TENSIONING",
    description:
      "Unbonded PT provides faster construction cycles, flexible floor planning, and efficient performance for modern high-rise and commercial projects.",
  },
  {
    id: 4,
    image: "/assets/1.jpg",
    title: "INTEGRATED DESIGN STRATEGY",
    description:
      "Post-tensioning is integrated into the structural system as a design strategy - not applied as a standardised solution.",
  },
];

export default function WhatWeDo() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    let ctx;

    const initGSAP = async () => {
      if (typeof window === "undefined") return;

      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        const panels = slidesRef.current;

        if (!wrapper || !track || !panels.length) return;

        const totalPanels = panels.length;
        const getTotalWidth = () => window.innerWidth * (totalPanels - 1);
        const getStartY = () => window.innerHeight * 0.9;

        gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${getTotalWidth()}`,
            scrub: 0.6,
            pin: true,
            snap: 1 / (totalPanels - 1),
            invalidateOnRefresh: true,
          },
        }).to(track, { x: () => -getTotalWidth(), ease: "none" });

        panels.forEach((panel, i) => {
          const imgWrap = panel.querySelector(".img-wrap");
          if (!imgWrap || i === 0) return;

          const setY = gsap.quickSetter(imgWrap, "y", "px");
          const startY = getStartY();

          gsap.set(imgWrap, { y: startY });

          ScrollTrigger.create({
            trigger: wrapper,
            start: "top top",
            end: () => `+=${getTotalWidth()}`,
            scrub: 0.6,
            onUpdate(self) {
              const scrollX = self.progress * getTotalWidth();
              const panelStart = window.innerWidth * (i - 0.6);
              const progress = gsap.utils.clamp(
                0,
                1,
                (scrollX - panelStart) / window.innerWidth
              );
              setY(startY * (1 - progress));
            },
          });
        });
      }, wrapperRef);
    };

    initGSAP();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative min-h-screen w-full overflow-clip bg-gradient-to-br from-[#e8f7f9] via-[#d4f1f4] to-[#bfe8ec]"
    >
      {/* BG TEXT */}
      <div className="hidden xl:block pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-['Anton'] text-[clamp(100px,18vw,280px)] tracking-[25px] text-transparent uppercase whitespace-nowrap [webkit-text-stroke:1px_rgba(0,0,0,0.12)]">
        WHAT WE DO
      </div>

      {/* HEADER */}
      <div className="absolute right-0 top-0 z-[100] flex items-center justify-end px-[60px] py-[40px]">
        <div className="hidden md:flex items-center gap-4 text-sm uppercase tracking-widest">
          <span>Scroll to explore</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0095AA] animate-pulseX">
            →
          </div>
        </div>
      </div>

      {/* SLIDES */}
      <div ref={trackRef} className="flex h-screen w-fit">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => (slidesRef.current[i] = el)}
            className="flex h-screen items-center justify-center px-20 py-20"
          >
            <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-16 lg:flex-row lg:items-center">
              {/* TEXT */}
              <div className="max-w-[500px]">
                <span className="block font-serif text-[72px] font-light text-[#0095AA]/60">
                  0{slide.id}
                </span>
                <h3 className="mb-6 text-4xl font-bold uppercase tracking-widest">
                  {slide.title}
                </h3>
                <p className="mb-8 text-lg leading-relaxed text-gray-700">
                  {slide.description}
                </p>
                <button className="group inline-flex items-center gap-3 rounded-full border-2 border-[#0095AA] px-8 py-4 text-sm uppercase tracking-widest text-[#0095AA] transition hover:bg-[#0095AA] hover:text-white hover:translate-x-1">
                  Learn More →
                </button>
              </div>

              {/* IMAGE */}
              <div className="img-wrap relative max-h-[60vh] max-w-[500px] overflow-hidden rounded-2xl">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}