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
      height: 50px;
      -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.61 25.32"><g fill="%23fff"><g><g><path d="M57.97,10.56h-2.69c-.01-1.02-.59-1.55-1.52-1.8s-3.73-.42-4.24.59c-.45.89.16,1.47.96,1.75,2.72.95,8.2.16,7.88,4.48-.25,3.4-5.17,3.44-7.66,3.13s-4.39-1.39-4.42-4.09h2.74c-.07,1.28,1.02,1.82,2.11,2.01s4.23.39,4.48-1.06c.22-1.25-1.18-1.48-2.1-1.65-2.25-.41-6.31-.41-6.79-3.3-.64-3.84,4.02-4.35,6.76-4.06,2.38.25,4.41,1.38,4.51,4.01Z"/><polygon points="93.12 11.5 99.72 11.5 99.72 6.81 99.8 6.74 102.34 6.74 102.41 6.81 102.41 18.52 99.72 18.52 99.72 13.76 93.12 13.76 93.12 18.52 90.43 18.52 90.43 6.81 90.5 6.74 93.05 6.74 93.12 6.81 93.12 11.5"/><path d="M71.89,18.52h-2.83l-1.02-2.54h-5.89s-1.01,2.54-1.01,2.54h-2.88l5.02-11.74,3.5-.05.14.05,4.98,11.74ZM67.26,13.95l-2.22-5.51-2.12,5.51h4.34Z"/><path d="M89.72,18.52h-2.88l-.99-2.52-5.91-.02-1.02,2.54h-2.88l5.05-11.76,3.47-.03.14.05,5.02,11.74ZM80.71,13.95h4.34l-2.15-5.51-2.19,5.51Z"/><rect x="42.68" y="6.74" width="2.64" height="11.78"/><rect x="72.64" y="6.74" width="2.64" height="11.78"/></g><g><path d="M143.62,6.84l.16-.07c2.26.05,4.54-.09,6.79.05.97.06,1.88.13,2.66.78,1.37,1.16,1.28,4.03-.33,4.98l-.61.31c.73.06,1.36.5,1.6,1.2.03.08.14.46.14.52v3.93h-.94v-3.88c0-.22-.31-.73-.5-.87-.15-.12-.67-.33-.85-.33h-7.14v5.08h-.99V6.84ZM144.61,12.61h6.3c2.57,0,3.28-3.95.88-4.79-.52-.18-1.19-.23-1.73-.25-1.8-.07-3.65.06-5.45,0v5.03Z"/><path d="M115.75,11.05c-.73-4.1-6.57-5.01-8.91-1.76-1.07,1.48-1.27,3.66-.71,5.36,1.52,4.6,8.65,4.41,9.62-.4h.94c-.33,2.73-2.77,4.42-5.4,4.56-4.56.25-7.2-3.57-6.26-7.85,1.28-5.83,10.26-5.94,11.55-.49.04.15.13.46.04.57h-.87Z"/><path d="M167.2,14.25c-.14,1.75-1.38,3.24-2.94,3.96-2.52,1.17-5.91.67-7.64-1.61-1.58-2.08-1.64-5.54-.16-7.68,2.75-3.96,10.12-2.98,10.74,2.13h-.87c-.12-.13-.1-.34-.15-.51-1.13-3.52-6.09-4.3-8.5-1.63-1.47,1.62-1.7,4.46-.75,6.39,1.97,3.98,8.52,3.45,9.33-1.05h.94Z"/><polygon points="169.8 6.77 169.8 12.23 178.66 12.23 178.66 6.77 179.53 6.77 179.61 6.84 179.61 18.53 178.66 18.53 178.66 13.08 169.8 13.08 169.8 18.53 168.85 18.53 168.85 6.84 168.92 6.77 169.8 6.77"/><polygon points="119.29 6.77 119.29 12.23 128.11 12.23 128.11 6.84 128.18 6.77 129.05 6.77 129.05 18.53 128.11 18.53 128.11 13.08 119.29 13.08 119.29 18.53 118.35 18.53 118.35 6.77 119.29 6.77"/><path d="M140.79,6.77h.94v6.47c0,.08-.04.16-.05.24-.19,3.23-1.47,5.18-4.93,5.34-3.48.16-5.56-1.5-5.78-5.01v-7.03s.87,0,.87,0l.07.16c.09,2.21-.13,4.53,0,6.73.16,2.95,1.81,4.45,4.79,4.3s3.96-2.14,4.08-4.92c.09-2.07-.06-4.2,0-6.28Z"/></g></g><g><path d="M7.59,2.81c-.42.04-.85-.13-1.15-.45l-1.77-1.9C4.36.13,3.93-.04,3.51,0L0,.36v4.92l7.7-.77c.42-.04.85.13,1.15.45l1.77,1.9c.3.32.73.49,1.15.45l20.25-2.03V.36L7.59,2.81Z"/><path d="M15.95,11.81c-.42.04-.85-.13-1.15-.45l-1.77-1.9c-.3-.32-.73-.49-1.15-.45L0,10.2v4.92l16.06-1.61c.42-.04.85.13,1.15.45l1.77,1.9c.3.32.73.49,1.15.45l11.88-1.19v-4.92l-16.06,1.61Z"/><path d="M23.17,20.36l-1.77-1.9c-.3-.32-.73-.49-1.15-.45L0,20.04v4.92l24.43-2.45c.42-.04.85.13,1.15.45l1.77,1.9c.3.32.73.49,1.15.45l3.51-.35v-4.92l-7.7.77c-.42.04-.85-.13-1.15-.45Z"/></g></g></svg>') no-repeat 50% 50% / contain;
      mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.61 25.32"><g fill="%23fff"><g><g><path d="M57.97,10.56h-2.69c-.01-1.02-.59-1.55-1.52-1.8s-3.73-.42-4.24.59c-.45.89.16,1.47.96,1.75,2.72.95,8.2.16,7.88,4.48-.25,3.4-5.17,3.44-7.66,3.13s-4.39-1.39-4.42-4.09h2.74c-.07,1.28,1.02,1.82,2.11,2.01s4.23.39,4.48-1.06c.22-1.25-1.18-1.48-2.1-1.65-2.25-.41-6.31-.41-6.79-3.3-.64-3.84,4.02-4.35,6.76-4.06,2.38.25,4.41,1.38,4.51,4.01Z"/><polygon points="93.12 11.5 99.72 11.5 99.72 6.81 99.8 6.74 102.34 6.74 102.41 6.81 102.41 18.52 99.72 18.52 99.72 13.76 93.12 13.76 93.12 18.52 90.43 18.52 90.43 6.81 90.5 6.74 93.05 6.74 93.12 6.81 93.12 11.5"/><path d="M71.89,18.52h-2.83l-1.02-2.54h-5.89s-1.01,2.54-1.01,2.54h-2.88l5.02-11.74,3.5-.05.14.05,4.98,11.74ZM67.26,13.95l-2.22-5.51-2.12,5.51h4.34Z"/><path d="M89.72,18.52h-2.88l-.99-2.52-5.91-.02-1.02,2.54h-2.88l5.05-11.76,3.47-.03.14.05,5.02,11.74ZM80.71,13.95h4.34l-2.15-5.51-2.19,5.51Z"/><rect x="42.68" y="6.74" width="2.64" height="11.78"/><rect x="72.64" y="6.74" width="2.64" height="11.78"/></g><g><path d="M143.62,6.84l.16-.07c2.26.05,4.54-.09,6.79.05.97.06,1.88.13,2.66.78,1.37,1.16,1.28,4.03-.33,4.98l-.61.31c.73.06,1.36.5,1.6,1.2.03.08.14.46.14.52v3.93h-.94v-3.88c0-.22-.31-.73-.5-.87-.15-.12-.67-.33-.85-.33h-7.14v5.08h-.99V6.84ZM144.61,12.61h6.3c2.57,0,3.28-3.95.88-4.79-.52-.18-1.19-.23-1.73-.25-1.8-.07-3.65.06-5.45,0v5.03Z"/><path d="M115.75,11.05c-.73-4.1-6.57-5.01-8.91-1.76-1.07,1.48-1.27,3.66-.71,5.36,1.52,4.6,8.65,4.41,9.62-.4h.94c-.33,2.73-2.77,4.42-5.4,4.56-4.56.25-7.2-3.57-6.26-7.85,1.28-5.83,10.26-5.94,11.55-.49.04.15.13.46.04.57h-.87Z"/><path d="M167.2,14.25c-.14,1.75-1.38,3.24-2.94,3.96-2.52,1.17-5.91.67-7.64-1.61-1.58-2.08-1.64-5.54-.16-7.68,2.75-3.96,10.12-2.98,10.74,2.13h-.87c-.12-.13-.1-.34-.15-.51-1.13-3.52-6.09-4.3-8.5-1.63-1.47,1.62-1.7,4.46-.75,6.39,1.97,3.98,8.52,3.45,9.33-1.05h.94Z"/><polygon points="169.8 6.77 169.8 12.23 178.66 12.23 178.66 6.77 179.53 6.77 179.61 6.84 179.61 18.53 178.66 18.53 178.66 13.08 169.8 13.08 169.8 18.53 168.85 18.53 168.85 6.84 168.92 6.77 169.8 6.77"/><polygon points="119.29 6.77 119.29 12.23 128.11 12.23 128.11 6.84 128.18 6.77 129.05 6.77 129.05 18.53 128.11 18.53 128.11 13.08 119.29 13.08 119.29 18.53 118.35 18.53 118.35 6.77 119.29 6.77"/><path d="M140.79,6.77h.94v6.47c0,.08-.04.16-.05.24-.19,3.23-1.47,5.18-4.93,5.34-3.48.16-5.56-1.5-5.78-5.01v-7.03s.87,0,.87,0l.07.16c.09,2.21-.13,4.53,0,6.73.16,2.95,1.81,4.45,4.79,4.3s3.96-2.14,4.08-4.92c.09-2.07-.06-4.2,0-6.28Z"/></g></g><g><path d="M7.59,2.81c-.42.04-.85-.13-1.15-.45l-1.77-1.9C4.36.13,3.93-.04,3.51,0L0,.36v4.92l7.7-.77c.42-.04.85.13,1.15.45l1.77,1.9c.3.32.73.49,1.15.45l20.25-2.03V.36L7.59,2.81Z"/><path d="M15.95,11.81c-.42.04-.85-.13-1.15-.45l-1.77-1.9c-.3-.32-.73-.49-1.15-.45L0,10.2v4.92l16.06-1.61c.42-.04.85.13,1.15.45l1.77,1.9c.3.32.73.49,1.15.45l11.88-1.19v-4.92l-16.06,1.61Z"/><path d="M23.17,20.36l-1.77-1.9c-.3-.32-.73-.49-1.15-.45L0,20.04v4.92l24.43-2.45c.42-.04.85.13,1.15.45l1.77,1.9c.3.32.73.49,1.15.45l3.51-.35v-4.92l-7.7.77c-.42.04-.85-.13-1.15-.45Z"/></g></g></svg>') no-repeat 50% 50% / contain;
      background: #ffffff;
      overflow: hidden;
      opacity: 0;
      animation: logoFadeIn 1.2s ease-out 0.3s forwards;
    }
    
    @keyframes logoFadeIn {
      to { opacity: 1; }
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
      showLoaderOnlyOnce: false
    };
    
    sessionStorage.setItem('hasLoadedBefore', 'true');
    
    var preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    var startTime = Date.now();
    
    if (config.showLoaderOnlyOnce && sessionStorage.getItem('snappagesLoaderShown')) {
      preloader.style.display = 'none';
      document.body.classList.add('page-loaded');
      document.documentElement.classList.add('page-loaded');
      return;
    }
    
    // Page load complete
    window.addEventListener('load', function() {
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
