/**
 * Isaiah Church Navigation Behavior
 * Conditional navigation behavior for tid=79970
 * Includes: smooth retract nav + folder dropdowns + button animations
 */

(function() {
  'use strict';
  
  // Check for tid=79970
  if (typeof tid === 'undefined' || tid !== 79970) return;
  
  // Initialize navigation behavior
  function initNavigation() {
    if (window.innerWidth < 1040) return;

    // Upgrade all nav items to sp-button
    document.querySelectorAll('#sp-nav-links > ul > li[data-type="basic"] > a').forEach(a => {
      a.classList.add('sp-button');
    });
    
    document.querySelectorAll('#sp-nav-links ul.sp-second-nav li > a').forEach(a => {
      a.classList.add('sp-button');
    });

    // Setup folder labels with external hover control
    document.querySelectorAll('#sp-nav-links > ul > li[data-type="folder"]').forEach(li => {
      const label = li.querySelector(':scope > a');
      if (!label) return;
      
      label.classList.add('sp-button');
      label.setAttribute('data-vc-external-hover', '');
      label.addEventListener('click', e => e.preventDefault());

      li.addEventListener('mouseenter', () => {
        if (label._vcHoverPlay) {
          label._vcHoverPlay();
        } else if (label._vcHoverTimeline?.play) {
          label._vcHoverTimeline.play();
        } else {
          label.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
        }
      });

      li.addEventListener('mouseleave', () => {
        if (label._vcHoverReverse) {
          label._vcHoverReverse();
        } else if (label._vcHoverTimeline?.reverse) {
          label._vcHoverTimeline.reverse();
        } else {
          label.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
        }
      });
    });
  }
  
  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
  
  // Smooth retract navigation behavior
  (function initSmoothRetract(){
    // ---- Config ----
    var TOP_ZONE = 32;          // soften behavior near very top
    var REVEAL_THRESHOLD = 48;  // upward px required when fully hidden
    var EPS = 1;                // ignore micro jitter
    var header = document.querySelector('.sp-header, #sp-header');
    if (!header) return;
    // Measure header height (lightweight)
    var H = header.offsetHeight || 64;
    var remeasureTimer = 0;
    function remeasure(){
      clearTimeout(remeasureTimer);
      remeasureTimer = setTimeout(function(){ H = header.offsetHeight || H; }, 60);
    }
    addEventListener('resize', remeasure, { passive:true });
    addEventListener('orientationchange', remeasure, { passive:true });
    // State
    var lastY = (window.lenis && typeof window.lenis.scroll === 'number')
      ? window.lenis.scroll
      : (window.scrollY || 0);
    var offset = 0;            // 0..H (0 visible, H hidden)
    var locked = false;        // true only when fully hidden
    var upAccum = 0;
    var revealOn = false;      // mirrors .is-revealing
    var writePending = false;
    // Helpers
    function setReveal(on){
      if (on === revealOn) return;
      revealOn = on;
      if (on) header.classList.add('is-revealing');
      else    header.classList.remove('is-revealing');
    }
    function applyTransform(){
      // pixel-snap to avoid subpixel jitter
      header.style.transform = 'translate3d(0,' + ( -(((offset+0.5)|0)) ) + 'px,0)';
      writePending = false;
    }
    function scheduleWrite(){
      if (writePending) return;
      writePending = true;
      requestAnimationFrame(applyTransform);
    }
    function startAnimatedRevealToZero(){
      setReveal(true); // ensure transition active
      requestAnimationFrame(function(){
        offset = 0;
        scheduleWrite();
      });
    }
    function handleScrollPosition(y){
      var dy = y - lastY;
      if (Math.abs(dy) < EPS){ lastY = y; return; }
      // Top zone: never hard reset; allow smooth reverse and settle
      if (y <= TOP_ZONE){
        if (dy > 0){
          // small downward → begin hiding (no animation)
          setReveal(false);
          upAccum = 0;
          offset = Math.max(0, Math.min(H, offset + dy));
          if (offset >= H){ offset = H; locked = true; }
        } else {
          // upward → progressive reveal (animate)
          locked = false;
          setReveal(true);
          offset = Math.max(0, Math.min(H, offset + dy)); // dy negative
        }
        scheduleWrite();
        lastY = y;
        return;
      }
      // Below top zone
      if (dy > 0){
        // Down — immediate coupled hide
        setReveal(false);
        upAccum = 0;
        offset = Math.max(0, Math.min(H, offset + dy));
        if (offset >= H){ offset = H; locked = true; }
        scheduleWrite();
      } else {
        // Up
        if (offset < H){
          // Not fully hidden → glide back immediately
          locked = false;
          setReveal(true);
          offset = Math.max(0, Math.min(H, offset + dy)); // dy negative
          scheduleWrite();
        } else {
          // Fully hidden → require threshold
          if (locked){
            upAccum += -dy;
            if (upAccum >= REVEAL_THRESHOLD){
              locked = false; upAccum = 0;
              startAnimatedRevealToZero();
            } else {
              setReveal(false);
              offset = H;
              scheduleWrite();
            }
          } else {
            // Hidden but not locked (edge) → reveal now
            startAnimatedRevealToZero();
          }
        }
      }
      lastY = y;
    }
    // Prefer Lenis' virtual scroll if present; fallback to native scroll
    function nativeScrollHandler(){ handleScrollPosition(window.scrollY || 0); }
    if (window.lenis && typeof window.lenis.on === 'function'){
      window.lenis.on('scroll', function(e){
        var y = (e && typeof e.scroll === 'number') ? e.scroll : (window.scrollY || 0);
        handleScrollPosition(y);
      });
    }
    window.addEventListener('scroll', nativeScrollHandler, { passive:true });
    handleScrollPosition((window.lenis && typeof window.lenis.scroll === 'number')
      ? window.lenis.scroll
      : (window.scrollY || 0));
  })();
})();
