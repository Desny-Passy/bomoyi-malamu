// ...existing code...
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  (function () {
    // Avoid calling window.chatbase("getState") if chatbase exists but is not a function
    const chatbaseNotInitialized =
      !window.chatbase ||
      (typeof window.chatbase === 'function' && window.chatbase('getState') !== 'initialized');

    if (chatbaseNotInitialized) {
      window.chatbase = function () {
        if (!window.chatbase.q) window.chatbase.q = [];
        window.chatbase.q.push(arguments);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === 'q') return target.q;
          return (...args) => target(prop, ...args);
        }
      });
    }

    const onLoad = function () {
      // Prevent loading twice
      if (document.getElementById('fUlXLcAYawxbs4B5Zt0tA')) return;
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = 'fUlXLcAYawxbs4B5Zt0tA';
      script.domain = 'www.chatbase.co';
      document.body.appendChild(script);
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }
  })();
}
// ...existing code...