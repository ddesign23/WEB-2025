function fadeOutLoading(selector) {
  const loadingOverlay = document.querySelector(selector);
  if (loadingOverlay) {
    // Delay the fade-out process by 3 seconds
    setTimeout(() => {
      loadingOverlay.style.opacity = '0'; // Start fade-out
      setTimeout(() => {
        loadingOverlay.style.display = 'none'; // Hide completely after fade-out
      }, 2000); // Match the transition duration (2 seconds)
    }, 3000); // Add a 3-second delay before fade-out starts
  }
}

// Apply fade-out for both .iframe-loading and .iframe-loading-v
fadeOutLoading('.iframe-loading');
fadeOutLoading('.iframe-loading-v');
  document.addEventListener("DOMContentLoaded", () => {
    const pageContent = document.querySelector('.page-content');
  
    // Add a delay to ensure the animation is visible
    setTimeout(() => {
      pageContent.style.animation = 'smoothPop 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards';
  
      // Ensure the final state after the animation
      pageContent.addEventListener('animationend', () => {
        pageContent.classList.add('visible');
      });
    }, 100); // Adjust delay as needed
  });
  
// Ultra-light top preloader — no layout shifts, no touch blocking
(function () {
  const css = `
    #pp-bar{
      position:fixed;top:0;left:0;height:2px;width:100vw;
      transform-origin:left center;transform:scaleX(0);
      background:linear-gradient(90deg,rgba(255,255,255,.3),rgba(255,255,255,.9));
      box-shadow:0 0 8px rgba(255,255,255,.6);
      transition:transform .25s ease, opacity .25s ease;
      z-index:99999;pointer-events:none;will-change:transform;contain:strict;
    }
    #pp-bar.pp-done{opacity:0;}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const bar = document.createElement('div'); bar.id = 'pp-bar';
  (document.body || document.documentElement).appendChild(bar);

  let prog = 0, rafId = null, ticking = true;

  function tick() {
    if (!ticking) return;
    // Smooth toward 90%
    const target = Math.min(90, prog + (prog < 60 ? 0.12 : prog < 80 ? 0.06 : 0.02) * 100);
    prog = target;
    bar.style.transform = `scaleX(${prog / 100})`;
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);

  function bump(to) {
    prog = Math.max(prog, to);
    bar.style.transform = `scaleX(${prog / 100})`;
  }

  // DOM ready bump
  if (document.readyState === 'interactive' || document.readyState === 'complete') bump(0.6 * 100);
  else document.addEventListener('DOMContentLoaded', () => bump(0.6 * 100), { once: true });

  function finish() {
    if (!ticking) return;
    ticking = false;
    cancelAnimationFrame(rafId);
    bar.style.transform = 'scaleX(1)';
    requestAnimationFrame(() => {
      bar.classList.add('pp-done');
      setTimeout(() => bar.remove(), 350);
    });
  }

  // Full load or 8s safety
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
  setTimeout(finish, 8000);
})();


  