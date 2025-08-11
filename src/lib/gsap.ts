import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Ensure plugins are registered once in the browser
if (typeof window !== "undefined" && !(gsap as any)._gsapRegistered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  (gsap as any)._gsapRegistered = true;
}

export { gsap, ScrollTrigger, useGSAP };


