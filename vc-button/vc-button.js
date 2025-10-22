// ===== Configurable Animation Settings =====
const TRANSITION_DURATION = 0.5;   // seconds
const STAGGER_AMOUNT      = 0.02;  // seconds between each char
const EASING_TYPE         = "power2.inOut";
const YOYO_EASE           = true;
const ENTER_OFFSET        = 100;   // hover text starts below
const EXIT_OFFSET         = -100;  // default text exits upward
// ==========================================

// --- Load GSAP if not already present ---
(function loadGSAP(){
  if (window.gsap) return;
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
  s.defer = true;
  document.head.appendChild(s);
})();

// --- Split Text Utility ---
function splitChars(el){
  const text = el.textContent;
  el.textContent = "";
  const chars = [];
  for (const ch of text){
    const span = document.createElement("span");
    span.textContent = ch === " " ? "\u00A0" : ch; // preserve spaces
    span.style.display = "inline-block";
    span.style.willChange = "transform";
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

// --- Animation Setup ---
function enhanceSpButton(btn){
  // skip if already initialized
  if (btn.querySelector(".text-wrap")) return;

  const label = (btn.getAttribute("data-label") || btn.textContent || "").trim();

  const wrap  = document.createElement("span");
  wrap.className = "text-wrap";

  const base  = document.createElement("span");
  base.className = "text is-default";
  base.textContent = label;

  const hover = document.createElement("span");
  hover.className = "text is-hover";
  hover.textContent = label;

  btn.innerHTML = "";
  wrap.appendChild(base);
  wrap.appendChild(hover);
  btn.appendChild(wrap);

  hover.style.opacity = "1";
  const w = Math.max(base.scrollWidth, hover.scrollWidth);
  const h = Math.max(base.scrollHeight, hover.scrollHeight);
  wrap.style.width = w + "px";
  wrap.style.height = h + "px";

  const baseChars  = splitChars(base);
  const hoverChars = splitChars(hover);

  gsap.set(hoverChars, { yPercent: ENTER_OFFSET });

  const tl = gsap.timeline({
    paused: true,
    defaults: { duration: TRANSITION_DURATION, ease: EASING_TYPE },
    yoyoEase: YOYO_EASE
  });

  tl.to(baseChars,  { yPercent: EXIT_OFFSET, stagger: STAGGER_AMOUNT }, 0)
    .to(hoverChars, { yPercent: 0,          stagger: STAGGER_AMOUNT }, 0);

  btn.addEventListener("mouseenter", () => tl.play());
  btn.addEventListener("mouseleave", () => tl.reverse());
}

// --- Initialize on DOM ready ---
(function ready(){
  if (!window.gsap || document.readyState === "loading"){
    return setTimeout(ready, 25);
  }

  document.querySelectorAll("a.sp-button, button.sp-button").forEach(enhanceSpButton);

  // Watch for dynamically added buttons
  const mo = new MutationObserver(() => {
    document.querySelectorAll("a.sp-button, button.sp-button").forEach(enhanceSpButton);
  });
  mo.observe(document.body, { childList: true, subtree: true });
})();
