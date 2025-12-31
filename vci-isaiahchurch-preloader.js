/**
 * Snappages Preloader Animation
 * A smooth logo fade animation with mask-up exit
 * 
 * CRITICAL: This script does NOT hide the body. You must hide your page content separately.
 * 
 * Usage in Snappages:
 * 
 * 1. Add to Custom Code → Header (BEFORE external script):
 * 
 * <style>
 *   html { background-color: #202020 !important; }
 *   html.page-loaded { background-color: #ffffff !important; }
 *   body { background-color: #202020 !important; }
 *   body.page-loaded { background-color: #ffffff !important; }
 *   
 *   .content { visibility: hidden; }
 *   body.page-loaded .content { visibility: visible; }
 * </style>
 * <script>document.documentElement.style.backgroundColor = '#202020';</script>
 * 
 * 2. Load this script:
 * <script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@VERSION/vci-isaiahchurch-preloader.js"></script>
 * 
 * 3. Wrap your page content in a div with class="content"
 */

(function() {
  'use strict';

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = `
    #preloader {
      position: fixed;
      inset: 0;
      display: grid;
      place-items: center;
      background: #202020;
      z-index: 999999;
      contain: layout paint;
      clip-path: inset(0 0 0 0);
      transition: clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1);
    }
    
    #preloader.mask-up {
      clip-path: inset(0 0 100% 0);
    }
    
    .logo-mask {
      position: relative;
      width: 300px;
      height: 55px;
      -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.93 26.88"><g><path fill="%23fff" d="M8.05,2.98c-.45.04-.9-.13-1.22-.48L4.95.48C4.63.14,4.17-.04,3.73,0L0,.38v5.22l8.17-.82c.45-.04.9.13,1.22.48l1.88,2.02c.32.34.78.52,1.22.48l21.49-2.16V.38L8.05,2.98Z"/><path fill="%23fff" d="M16.94,12.54c-.45.04-.9-.13-1.22-.48l-1.88-2.02c-.32-.34-.78-.52-1.22-.48L0,10.83v5.22l17.05-1.71c.45-.04.9.13,1.22.48l1.88,2.02c.32.34.78.52,1.22.48l12.61-1.26v-5.22l-17.05,1.71Z"/><path fill="%23fff" d="M24.6,21.61l-1.88-2.02c-.32-.34-.78-.52-1.22-.48L0,21.27v5.22l25.94-2.6c.45-.04.9.13,1.22.48l1.88,2.02c.32.34.78.52,1.22.48l3.73-.37v-5.22l-8.17.82c-.45.04-.9-.13-1.22-.48Z"/></g><g><path fill="%23fff" d="M47.92.4h3.76v13.61h-3.76V.4Z"/><path fill="%23fff" d="M58.31,13.25c-1.43-.76-2.18-2.01-2.26-3.76h3.91c0,.71.36,1.23,1.08,1.57s1.9.51,3.54.51c1.06,0,1.88-.05,2.48-.16.59-.11,1.01-.26,1.25-.47.24-.21.36-.49.36-.84,0-.39-.15-.68-.46-.88-.31-.19-.75-.33-1.32-.41-.57-.08-1.48-.15-2.73-.23l-.4-.02c-1.79-.11-3.22-.33-4.3-.66s-1.87-.79-2.36-1.4c-.5-.6-.75-1.39-.75-2.36,0-1.35.65-2.36,1.97-3.04,1.31-.68,3.16-1.02,5.56-1.02,2.62,0,4.62.39,5.98,1.18,1.37.79,2.08,1.95,2.15,3.49h-3.89c0-.68-.35-1.16-1.05-1.44-.7-.28-1.79-.42-3.28-.42-1.31,0-2.23.1-2.75.3-.52.2-.78.52-.78.95,0,.38.15.66.46.86.31.2.77.34,1.37.42.6.09,1.54.18,2.8.28,1.87.14,3.32.32,4.36.54,1.04.22,1.86.62,2.45,1.19.59.57.89,1.42.89,2.52,0,1.6-.66,2.74-1.98,3.41s-3.28,1.01-5.89,1.01c-2.82,0-4.95-.38-6.38-1.13Z"/><path fill="%23fff" d="M82.8.4h4.86l7.2,13.61h-4.14l-1.32-2.74h-8.36l-1.32,2.74h-4.14L82.8.4ZM88.07,8.52l-2.85-5.94-2.86,5.94h5.71Z"/><path fill="%23fff" d="M98.67.4h3.76v13.61h-3.76V.4Z"/><path fill="%23fff" d="M113.46.4h4.86l7.2,13.61h-4.14l-1.32-2.74h-8.36l-1.32,2.74h-4.14L113.46.4ZM118.74,8.52l-2.85-5.94-2.86,5.94h5.71Z"/><path fill="%23fff" d="M142.17,8.77h-9.07v5.24h-3.76V.4h3.76v5.22h9.07V.4h3.76v13.61h-3.76v-5.24Z"/></g><g><path fill="%23fff" d="M47.34,23.05c0-2.18,1.82-3.58,4.37-3.58,2.29,0,3.97,1.17,4.17,2.75h-1.33c-.16-.82-1.2-1.68-2.84-1.68-1.85,0-3.05,1.05-3.05,2.51s1.21,2.52,3.05,2.52c1.64,0,2.68-.87,2.84-1.7h1.33c-.19,1.59-1.88,2.78-4.17,2.78-2.56,0-4.37-1.42-4.37-3.59Z"/><path fill="%23fff" d="M65.08,23.59h-5.37v2.87h-1.27v-6.81h1.27v2.87h5.37v-2.87h1.27v6.81h-1.27v-2.87Z"/><path fill="%23fff" d="M69.11,23.14v-3.49h1.27v3.45c0,1.24.49,2.47,2.65,2.47s2.64-1.24,2.64-2.47v-3.45h1.27v3.49c0,2.08-1,3.51-3.91,3.51s-3.92-1.43-3.92-3.51Z"/><path fill="%23fff" d="M79.7,19.65h5.14c1.78,0,2.61.68,2.61,1.96,0,.93-.48,1.54-1.38,1.78,1,.03,1.33.43,1.33,1.29v1.79h-1.26v-1.62c0-.61-.3-.87-.91-.87h-4.27v2.49h-1.27v-6.81ZM84.57,22.93c1.02,0,1.57-.32,1.57-1.15s-.55-1.1-1.57-1.1h-3.6v2.25h3.6Z"/><path fill="%23fff" d="M89.93,23.05c0-2.18,1.82-3.58,4.37-3.58,2.29,0,3.97,1.17,4.17,2.75h-1.33c-.16-.82-1.2-1.68-2.84-1.68-1.85,0-3.06,1.05-3.06,2.51s1.21,2.52,3.06,2.52c1.64,0,2.68-.87,2.84-1.7h1.33c-.19,1.59-1.88,2.78-4.17,2.78-2.56,0-4.37-1.42-4.37-3.59Z"/><path fill="%23fff" d="M107.67,23.59h-5.37v2.87h-1.27v-6.81h1.27v2.87h5.37v-2.87h1.27v6.81h-1.27v-2.87Z"/></g></svg>') no-repeat 50% 50% / contain;
      mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.93 26.88"><g><path fill="%23fff" d="M8.05,2.98c-.45.04-.9-.13-1.22-.48L4.95.48C4.63.14,4.17-.04,3.73,0L0,.38v5.22l8.17-.82c.45-.04.9.13,1.22.48l1.88,2.02c.32.34.78.52,1.22.48l21.49-2.16V.38L8.05,2.98Z"/><path fill="%23fff" d="M16.94,12.54c-.45.04-.9-.13-1.22-.48l-1.88-2.02c-.32-.34-.78-.52-1.22-.48L0,10.83v5.22l17.05-1.71c.45-.04.9.13,1.22.48l1.88,2.02c.32.34.78.52,1.22.48l12.61-1.26v-5.22l-17.05,1.71Z"/><path fill="%23fff" d="M24.6,21.61l-1.88-2.02c-.32-.34-.78-.52-1.22-.48L0,21.27v5.22l25.94-2.6c.45-.04.9.13,1.22.48l1.88,2.02c.32.34.78.52,1.22.48l3.73-.37v-5.22l-8.17.82c-.45.04-.9-.13-1.22-.48Z"/></g><g><path fill="%23fff" d="M47.92.4h3.76v13.61h-3.76V.4Z"/><path fill="%23fff" d="M58.31,13.25c-1.43-.76-2.18-2.01-2.26-3.76h3.91c0,.71.36,1.23,1.08,1.57s1.9.51,3.54.51c1.06,0,1.88-.05,2.48-.16.59-.11,1.01-.26,1.25-.47.24-.21.36-.49.36-.84,0-.39-.15-.68-.46-.88-.31-.19-.75-.33-1.32-.41-.57-.08-1.48-.15-2.73-.23l-.4-.02c-1.79-.11-3.22-.33-4.3-.66s-1.87-.79-2.36-1.4c-.5-.6-.75-1.39-.75-2.36,0-1.35.65-2.36,1.97-3.04,1.31-.68,3.16-1.02,5.56-1.02,2.62,0,4.62.39,5.98,1.18,1.37.79,2.08,1.95,2.15,3.49h-3.89c0-.68-.35-1.16-1.05-1.44-.7-.28-1.79-.42-3.28-.42-1.31,0-2.23.1-2.75.3-.52.2-.78.52-.78.95,0,.38.15.66.46.86.31.2.77.34,1.37.42.6.09,1.54.18,2.8.28,1.87.14,3.32.32,4.36.54,1.04.22,1.86.62,2.45,1.19.59.57.89,1.42.89,2.52,0,1.6-.66,2.74-1.98,3.41s-3.28,1.01-5.89,1.01c-2.82,0-4.95-.38-6.38-1.13Z"/><path fill="%23fff" d="M82.8.4h4.86l7.2,13.61h-4.14l-1.32-2.74h-8.36l-1.32,2.74h-4.14L82.8.4ZM88.07,8.52l-2.85-5.94-2.86,5.94h5.71Z"/><path fill="%23fff" d="M98.67.4h3.76v13.61h-3.76V.4Z"/><path fill="%23fff" d="M113.46.4h4.86l7.2,13.61h-4.14l-1.32-2.74h-8.36l-1.32,2.74h-4.14L113.46.4ZM118.74,8.52l-2.85-5.94-2.86,5.94h5.71Z"/><path fill="%23fff" d="M142.17,8.77h-9.07v5.24h-3.76V.4h3.76v5.22h9.07V.4h3.76v13.61h-3.76v-5.24Z"/></g><g><path fill="%23fff" d="M47.34,23.05c0-2.18,1.82-3.58,4.37-3.58,2.29,0,3.97,1.17,4.17,2.75h-1.33c-.16-.82-1.2-1.68-2.84-1.68-1.85,0-3.05,1.05-3.05,2.51s1.21,2.52,3.05,2.52c1.64,0,2.68-.87,2.84-1.7h1.33c-.19,1.59-1.88,2.78-4.17,2.78-2.56,0-4.37-1.42-4.37-3.59Z"/><path fill="%23fff" d="M65.08,23.59h-5.37v2.87h-1.27v-6.81h1.27v2.87h5.37v-2.87h1.27v6.81h-1.27v-2.87Z"/><path fill="%23fff" d="M69.11,23.14v-3.49h1.27v3.45c0,1.24.49,2.47,2.65,2.47s2.64-1.24,2.64-2.47v-3.45h1.27v3.49c0,2.08-1,3.51-3.91,3.51s-3.92-1.43-3.92-3.51Z"/><path fill="%23fff" d="M79.7,19.65h5.14c1.78,0,2.61.68,2.61,1.96,0,.93-.48,1.54-1.38,1.78,1,.03,1.33.43,1.33,1.29v1.79h-1.26v-1.62c0-.61-.3-.87-.91-.87h-4.27v2.49h-1.27v-6.81ZM84.57,22.93c1.02,0,1.57-.32,1.57-1.15s-.55-1.1-1.57-1.1h-3.6v2.25h3.6Z"/><path fill="%23fff" d="M89.93,23.05c0-2.18,1.82-3.58,4.37-3.58,2.29,0,3.97,1.17,4.17,2.75h-1.33c-.16-.82-1.2-1.68-2.84-1.68-1.85,0-3.06,1.05-3.06,2.51s1.21,2.52,3.06,2.52c1.64,0,2.68-.87,2.84-1.7h1.33c-.19,1.59-1.88,2.78-4.17,2.78-2.56,0-4.37-1.42-4.37-3.59Z"/><path fill="%23fff" d="M107.67,23.59h-5.37v2.87h-1.27v-6.81h1.27v2.87h5.37v-2.87h1.27v6.81h-1.27v-2.87Z"/></g></svg>') no-repeat 50% 50% / contain;
      background: #ffffff;
      overflow: hidden;
      opacity: 0;
      animation: logoFadeIn 1.2s ease-out 0.3s forwards;
    }
    
    @keyframes logoFadeIn {
      to { opacity: 1; }
    }
    
    @keyframes logoBreathe {
      from { opacity: 0.5; }
      to { opacity: 1; }
    }
    
    .logo-mask.breathing {
      animation: logoFadeIn 1.2s ease-out 0.3s forwards, logoBreathe 1.5s ease-in-out 1.5s infinite alternate;
    }
  `;
  document.head.appendChild(style);

  // Create HTML structure
  function createPreloader() {
    var preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.setAttribute('aria-hidden', 'true');
    
    var logoMask = document.createElement('div');
    logoMask.className = 'logo-mask';
    
    preloader.appendChild(logoMask);
    document.body.insertBefore(preloader, document.body.firstChild);
  }

  // Initialize when DOM is ready
  function init() {
    if (document.body) {
      createPreloader();
      startAnimation();
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        createPreloader();
        startAnimation();
      });
    }
  }

  // Animation logic
  function startAnimation() {
    var isFirstLoad = !sessionStorage.getItem('hasLoadedBefore');
    var config = {
      minimumDisplayTime: isFirstLoad ? 2000 : 1000,
      maskUpDuration: 800,
      showLoaderOnlyOnce: false,
      breathingDelay: 2000
    };
    
    sessionStorage.setItem('hasLoadedBefore', 'true');
    
    var preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    var logoMask = preloader.querySelector('.logo-mask');
    var startTime = Date.now();
    var hasLoaded = false;
    
    if (config.showLoaderOnlyOnce && sessionStorage.getItem('snappagesLoaderShown')) {
      preloader.style.display = 'none';
      document.body.classList.add('page-loaded');
      document.documentElement.classList.add('page-loaded');
      return;
    }
    
    // Add breathing animation if page takes longer than 2 seconds
    var breathingTimeout = setTimeout(function() {
      if (!hasLoaded && logoMask) {
        logoMask.classList.add('breathing');
      }
    }, config.breathingDelay);
    
    // Page load complete
    window.addEventListener('load', function() {
      hasLoaded = true;
      clearTimeout(breathingTimeout);
      
      var elapsedTime = Date.now() - startTime;
      var remainingTime = Math.max(0, config.minimumDisplayTime - elapsedTime);
      
      setTimeout(function() {
        document.body.classList.add('page-loaded');
        document.documentElement.classList.add('page-loaded');
        
        setTimeout(function() {
          preloader.classList.add('mask-up');
        }, 50);
        
        if (config.showLoaderOnlyOnce) {
          sessionStorage.setItem('snappagesLoaderShown', 'true');
        }
        
        setTimeout(function() {
          preloader.style.display = 'none';
        }, config.maskUpDuration + 50);
      }, remainingTime);
    }, { once: true });
  }

  // Start initialization
  init();
})();
