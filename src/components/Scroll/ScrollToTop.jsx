export const scrollToTopSlowly = (position, time) => {
    const targetPosition = position; // Target scroll position
    const currentPosition = window.scrollY; // Current scroll position
    const distance = targetPosition - currentPosition; // Distance to scroll
    const duration = time; // Duration of scroll animation in milliseconds
    const startTime = performance.now(); // Get start time of the animation
  
    // Define the scroll function
    const scrollInterval = setInterval(() => {
      // Calculate elapsed time since animation started
      const elapsedTime = performance.now() - startTime;
      
      // Calculate the scroll position based on elapsed time and easing function (e.g., quadratic easing)
      const scrollPosition = easeInOutQuad(elapsedTime, currentPosition, distance, duration);
  
      // Scroll to the calculated position
      window.scrollTo(0, scrollPosition);
  
      // If animation duration has elapsed or target position reached, clear the interval
      if (elapsedTime >= duration || window.scrollY === targetPosition) {
        clearInterval(scrollInterval);
      }
    }, 15); // Interval between each scroll step
  };
  
  // Easing function for smooth animation (quadratic easing)
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  