// Register the ScrollTrigger plugin with GSAP
// This enables scroll-based animations through the ScrollTrigger API
gsap.registerPlugin(ScrollTrigger);

// INITIAL PAGE LOAD ANIMATIONS (NOT SCROLL-BASED)
// ---------------------------------------------

// Animation 1: Initial zoom effect for the hero container
// This animates FROM scale 1.45 TO the default scale in CSS (1.25)
// Creates a "zoom out" effect when the page first loads
gsap.from(".hero-main-container", {
  scale: 1.45,
  duration: 2.8,           // Animation takes 2.8 seconds
  ease: "power3.out",      // Easing function for smooth deceleration
});

// Animation 2: Fade out the black overlay when the page loads
// Runs simultaneously with the zoom animation above
gsap.to(".overlay", {
  opacity: 0,
  duration: 2.8,           // Same duration as the zoom effect for synchronization
  ease: "power3.out",      // Same easing for consistent feel
  onComplete: () => {
    // After the overlay fades out, enable scrolling
    // This prevents users from scrolling before the intro animation completes
    document.body.style.overflow = "visible";
    document.body.style.overflowX = "hidden";
  },
});

// CONTINUOUS BOUNCE ANIMATION FOR SCROLL INDICATOR
// ------------------------------------------------

// Select the scroll indicator element
const scrollIndicator = document.querySelector(".scroll-indicator");

// Create a timeline for the bounce animation
// This timeline will repeat infinitely with alternating direction
const bounceTimeline = gsap.timeline({
  repeat: -1,              // Infinite repetition
  yoyo: true,              // Alternate between forward and reverse playback
});

// Add the bounce animation to the timeline
// Moves the indicator down and reduces opacity slightly
bounceTimeline.to(scrollIndicator, {
  y: 20,                  // Move 20px down
  opacity: 0.6,           // Reduce opacity to 60%
  duration: 0.8,          // Animation takes 0.8 seconds
  ease: "power1.inOut",   // Smooth in-out easing
});

// SCROLL-BASED ANIMATIONS
// -----------------------

// Create the main timeline for all scroll-based animations
// This timeline will be controlled by scroll position rather than time
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",   // The element that triggers the animation
    scrub: 2,                // Smooth scrubbing with 2-second catch-up
    pin: true,               // Pin the container in place during animation
    start: "top top",        // Start when the top of container hits top of viewport
    end: "+=2000",           // End after 2000px of scrolling
    ease: "none",            // Linear ease for direct scroll mapping
  },
});

// Set the initial state of the hero container to prevent flickering
// This ensures consistency between the intro animation and scroll animations
tl.set(".hero-main-container", {
  scale: 1.25,               // Match the scale after the intro animation
});

// Animation 3: Further scale down the hero container on scroll
// Reduces scale from 1.25 (set above) to 1.0
tl.to(".hero-main-container", {
  scale: 1,
  duration: 1,               // Duration in terms of scroll distance
});

// Animation 4: Fade out the main GTA logo
// The "<" position parameter makes this run simultaneously with Animation 3
tl.to(
  ".hero-main-logo",
  {
    opacity: 0,              // Fade to fully transparent
    duration: 0.5,           // Duration in terms of scroll distance
  },
  "<"                        // Start at the same time as the previous animation
);

// Animation 5: Fade out the hero background image
// Starts 0.5 seconds after Animation 4 begins
tl.to(
  ".hero-main-image",
  {
    opacity: 0,
    duration: 0.9,
  },
  "<+=0.5"                   // Start 0.5 units after the previous animation starts
);

// Animation 6: Shrink the background size of the container
// Reduces the white logo background from 1000vh to 28vh
tl.to(
  ".hero-main-container",
  {
    backgroundSize: "28vh",   // Target size matching the purple logo
    duration: 1.5,            // Duration in terms of scroll distance
  },
  "<+=0.2"                    // Start 0.2 units after the previous animation starts
);

// Animation 7: Change the text gradient color
// Uses fromTo to transition from the initial gradient to a new one
tl.fromTo(
  ".hero-text",
  {
    // Starting gradient defined in CSS
    backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(157, 47, 106, 0.5) 90vh,
          rgba(157, 47, 106, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
  },
  {
    // Ending gradient with more vibrant colors
    backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
     rgb(247, 77, 82) 50.011vh,
      rgb(145, 42, 105) 90.0183vh,
       rgba(32, 31, 66, 0) 140.599vh)`,
    duration: 3,
  },
  "<1.2"                      // Start 1.2 units before the previous animation ends
);

// Animation 8: Fade in the purple GTA logo with mask effect
// Uses a radial gradient mask for a revealing animation
tl.fromTo(
  ".hero-text-logo",
  {
    // Start fully transparent with initial mask
    opacity: 0,
    maskImage: `radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)`,
  },
  {
    // End fully visible with expanded mask
    opacity: 1,
    maskImage: `radial-gradient(
    circle at 50% 105.594%,
    rgb(0, 0, 0) 62.9372%,
    rgba(0, 0, 0, 0) 81.4686%
  )`,
    duration: 3,
  },
  "<0.2"                      // Start 0.2 units after the previous animation starts
);

// Hide the main container completely after previous animations
tl.set(".hero-main-container", { opacity: 0 });

// Animation 9: Scale down the entire first hero section
// This makes the first section appear to recede as user scrolls
tl.to(".hero-1-container", { scale: 0.85, duration: 3 }, "<-=3"); // Start 3 units before previous animation ends

// Set a mask on the first hero container to prepare for fade-out
tl.set(
  ".hero-1-container",
  {
    // Apply a radial gradient mask
    maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
  },
  "<+=2.1"                    // Start 2.1 units after the previous animation starts
);

// Animation 10: Animate the mask to create a fade-out effect
// Changes the mask position to make the content gradually disappear
tl.to(
  ".hero-1-container",
  {
    // Change the mask gradient position for fade-out effect
    maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
    duration: 2,
  },
  "<+=0.2"                    // Start 0.2 units after the previous animation starts
);

// Animation 11: Fade out the purple logo during transition
tl.to(
  ".hero-text-logo",
  {
    opacity: 0,
    duration: 2,
  },
  "<1.5"                      // Start 1.5 units after the previous animation starts
);

// Hide the first section completely and make the second section visible
tl.set(".hero-1-container", { opacity: 0 });
tl.set(".hero-2-container", { visibility: "visible" });

// Animation 12: Fade in the second section
tl.to(".hero-2-container", { opacity: 1, duration: 3 }, "<+=0.2"); // Start 0.2 units after previous animation

// Animation 13: Change gradient background of the second section
// Similar to Animation 7 but applied to the second hero container
tl.fromTo(
  ".hero-2-container",
  {
    // Starting gradient defined in CSS
    backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(157, 47, 106, 0.5) 90vh,
          rgba(157, 47, 106, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
  },
  {
    // Ending gradient with more vibrant colors (same as Animation 7)
    backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
     rgb(247, 77, 82) 50.011vh,
      rgb(145, 42, 105) 90.0183vh,
       rgba(32, 31, 66, 0) 140.599vh)`,
    duration: 3,
  },
  "<1.2"                      // Start 1.2 units before the previous animation ends
); 