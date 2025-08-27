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
  
  // Tiny top progress preloader (JS-only, no HTML edits)
(function () {
  // --- create styles + bar ---
  const css = `
    #pp-bar{position:fixed;top:0;left:0;height:2px;width:0;z-index:99999;
      background: linear-gradient(90deg,rgba(255,255,255,.3),rgba(255,255,255,.9));
      box-shadow:0 0 8px rgba(255,255,255,.6);
      transition: width .25s ease, opacity .25s ease;}
    #pp-bar.pp-done{opacity:0;}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.id = 'pp-bar';
  document.documentElement.appendChild(bar);

  // --- progress logic (simulated until real load) ---
  let prog = 0;
  const tick = () => {
    // accelerate at start, slow toward 90%
    const step = (prog < 60) ? 10 : (prog < 80) ? 5 : 2;
    prog = Math.min(prog + step, 90);
    bar.style.width = prog + 'vw';
  };
  // start ticking every 300ms
  const iv = setInterval(tick, 300);

  // --- when DOM is ready, give it a bump ---
  const onDom = () => { prog = Math.max(prog, 60); bar.style.width = prog + 'vw'; };
  if (document.readyState === 'interactive' || document.readyState === 'complete') onDom();
  else document.addEventListener('DOMContentLoaded', onDom, { once: true });

  // --- finish on full load (all assets) ---
  const finish = () => {
    clearInterval(iv);
    bar.style.width = '100vw';
    requestAnimationFrame(() => {
      bar.classList.add('pp-done');
      setTimeout(() => bar.remove(), 350);
    });
  };
  // window 'load' will fire when images/css/js finished
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });

  // --- safety timeout (in case 'load' never fires) ---
  setTimeout(finish, 10000);
})();

  