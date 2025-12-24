;(function () {
  if (window.__vcLenisInitialized) return;
  window.__vcLenisInitialized = true;

  function initLenis() {
    if (typeof Lenis === 'undefined') {
      console.warn('[Isaiah Lenis] Lenis not loaded');
      return;
    }

    // Disable SnapPages built-in smooth scroll behavior
    const style = document.createElement('style');
    style.innerHTML = 'html, body { scroll-behavior: auto !important; }';
    document.head.appendChild(style);

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.7,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      // Force high-priority animation frame to bypass SnapPages throttling
      setTimeout(function () {
        requestAnimationFrame(raf);
      }, 0);
    }

    requestAnimationFrame(raf);

    // Smooth internal anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target);
        }
      });
    });

    // Expose for debugging if you want
    window.lenis = lenis;
    window.__lenis = lenis;

    console.log('[Isaiah Lenis] Initialized');
  }

  // Run now if DOM is already ready; otherwise wait for DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLenis);
  } else {
    initLenis();
  }
})();
