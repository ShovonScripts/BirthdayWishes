// ============================================
// BIRTHDAY WISHES — FABIA ANJUM BADHAN
// Epic Animated Birthday Show
// All emojis replaced with Font Awesome icons
// ============================================

(function () {
  "use strict";

  // ---- CONFIG ----
  const SLIDE_TIMINGS = {
    0: "click",   // Click to start
    1: 4500,      // Name reveal
    2: 5000,      // Roast slide
    3: 4500,      // Today is your special day
    4: 5500,      // Report card
    5: 4500,      // Let's celebrate
    6: 8000,      // Heartfelt message
    7: Infinity,  // Grand finale (stays)
  };

  const TOTAL_SLIDES = 8;
  let currentSlide = 0;
  let isTransitioning = false;

  // ---- UTILITY ----
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ---- SLIDE TRANSITIONS ----
  function showSlide(index) {
    if (index >= TOTAL_SLIDES || isTransitioning) return;
    isTransitioning = true;

    const currentEl = document.querySelector(".slide-" + currentSlide);
    const nextEl = document.querySelector(".slide-" + index);

    if (!nextEl) return;

    // Exit animation
    if (currentEl) {
      currentEl.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      currentEl.style.opacity = "0";
      currentEl.style.transform = "scale(1.1)";
    }

    setTimeout(function () {
      if (currentEl) {
        currentEl.classList.remove("active");
        currentEl.style.opacity = "";
        currentEl.style.transform = "";
        currentEl.style.transition = "";
      }

      nextEl.classList.add("active");
      nextEl.style.opacity = "0";
      nextEl.style.transform = "scale(0.95)";

      // Force reflow
      void nextEl.offsetWidth;

      nextEl.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      nextEl.style.opacity = "1";
      nextEl.style.transform = "scale(1)";

      currentSlide = index;
      isTransitioning = false;

      // Trigger slide-specific effects
      onSlideEnter(index);

      // Schedule next slide
      var timing = SLIDE_TIMINGS[index];
      if (timing !== "click" && timing !== Infinity) {
        setTimeout(function () { showSlide(index + 1); }, timing);
      }
    }, 600);
  }

  // ---- SLIDE-SPECIFIC EFFECTS ----
  function onSlideEnter(index) {
    switch (index) {
      case 1:
        spawnParticles("particles-1", 40);
        screenShake();
        break;
      case 2:
        screenShake();
        break;
      case 3:
        startIconRain();
        break;
      case 5:
        screenShake();
        break;
      case 6:
        startHeartsBg();
        break;
      case 7:
        startConfetti();
        launchFireworks();
        screenShake();
        break;
    }
  }

  // ---- PARTICLES ----
  function spawnParticles(containerId, count) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var colors = ["#ff69b4", "#ffc107", "#8a2be2", "#4ecdc4", "#ff6b6b", "#a78bfa"];

    for (var i = 0; i < count; i++) {
      var particle = document.createElement("div");
      particle.className = "particle";

      var size = randomRange(4, 12);
      var x = randomRange(0, 100);
      var dur = randomRange(2, 5);
      var delay = randomRange(0, 2);

      particle.style.cssText =
        "width:" + size + "px;" +
        "height:" + size + "px;" +
        "left:" + x + "%;" +
        "bottom:-20px;" +
        "background:" + randomPick(colors) + ";" +
        "animation-duration:" + dur + "s;" +
        "animation-delay:" + delay + "s;" +
        "box-shadow:0 0 " + size + "px " + randomPick(colors) + ";";

      container.appendChild(particle);
    }
  }

  // ---- ICON RAIN (replaces emoji rain) ----
  function startIconRain() {
    var container = document.getElementById("emojiRain");
    if (!container) return;

    // Font Awesome icon classes to rain down
    var icons = [
      "fa-solid fa-cake-candles",
      "fa-solid fa-gift",
      "fa-solid fa-star",
      "fa-solid fa-heart",
      "fa-solid fa-champagne-glasses",
      "fa-solid fa-music",
      "fa-solid fa-wand-magic-sparkles",
      "fa-regular fa-gem",
      "fa-solid fa-crown",
      "fa-solid fa-bolt",
      "fa-solid fa-fire",
      "fa-solid fa-sparkles"
    ];

    var iconColors = ["#ff69b4", "#ffc107", "#4ecdc4", "#a78bfa", "#ff6b6b", "#60a5fa", "#34d399", "#fb923c"];

    var count = 0;
    var maxIcons = 45;

    var interval = setInterval(function () {
      if (count >= maxIcons) {
        clearInterval(interval);
        return;
      }

      var el = document.createElement("i");
      el.className = "rain-icon " + randomPick(icons);
      el.style.left = randomRange(0, 95) + "%";
      el.style.animationDuration = randomRange(2.5, 5) + "s";
      el.style.fontSize = randomRange(0.8, 2) + "em";
      el.style.color = randomPick(iconColors);
      el.style.filter = "drop-shadow(0 0 4px " + el.style.color + ")";
      container.appendChild(el);

      // Cleanup
      setTimeout(function () { el.remove(); }, 6000);
      count++;
    }, 180);
  }

  // ---- FLOATING HEARTS (icon version) ----
  function startHeartsBg() {
    var container = document.getElementById("heartBg");
    if (!container) return;

    var heartIcons = [
      "fa-solid fa-heart",
      "fa-solid fa-heart",
      "fa-regular fa-heart",
      "fa-solid fa-star"
    ];

    var heartColors = ["#ff69b4", "#ff1493", "#a78bfa", "#f472b6", "#ffc107"];

    var count = 0;

    var interval = setInterval(function () {
      if (count >= 25) {
        clearInterval(interval);
        return;
      }

      var heart = document.createElement("i");
      heart.className = "floating-heart " + randomPick(heartIcons);
      heart.style.left = randomRange(5, 95) + "%";
      heart.style.animationDuration = randomRange(3, 6) + "s";
      heart.style.animationDelay = randomRange(0, 0.5) + "s";
      heart.style.fontSize = randomRange(0.8, 2) + "em";
      heart.style.color = randomPick(heartColors);
      container.appendChild(heart);

      setTimeout(function () { heart.remove(); }, 7000);
      count++;
    }, 350);
  }

  // ---- CONFETTI ----
  function startConfetti() {
    var canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var confettiPieces = [];
    var colors = [
      "#ff6b6b", "#ffc107", "#4ecdc4", "#ff69b4",
      "#a78bfa", "#34d399", "#fb923c", "#60a5fa",
      "#f472b6", "#fbbf24", "#8b5cf6", "#ff3366"
    ];

    // Create initial confetti burst
    for (var i = 0; i < 200; i++) {
      confettiPieces.push({
        x: randomRange(0, canvas.width),
        y: randomRange(-canvas.height, -10),
        w: randomRange(5, 12),
        h: randomRange(3, 8),
        color: randomPick(colors),
        angle: randomRange(0, Math.PI * 2),
        angleSpeed: randomRange(-0.05, 0.05),
        vx: randomRange(-3, 3),
        vy: randomRange(2, 7),
        gravity: 0.05,
        opacity: 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var activeCount = 0;

      for (var i = 0; i < confettiPieces.length; i++) {
        var p = confettiPieces[i];
        if (p.opacity <= 0) continue;
        activeCount++;

        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.angle += p.angleSpeed;
        p.vx *= 0.99;

        if (p.y > canvas.height + 50) {
          p.opacity -= 0.02;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (activeCount > 0) {
        requestAnimationFrame(animate);
      }
    }

    animate();

    // More bursts
    setTimeout(function () {
      for (var i = 0; i < 100; i++) {
        confettiPieces.push({
          x: randomRange(0, canvas.width),
          y: randomRange(-50, -200),
          w: randomRange(5, 12),
          h: randomRange(3, 8),
          color: randomPick(colors),
          angle: randomRange(0, Math.PI * 2),
          angleSpeed: randomRange(-0.05, 0.05),
          vx: randomRange(-4, 4),
          vy: randomRange(1, 5),
          gravity: 0.04,
          opacity: 1,
        });
      }
    }, 2000);

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ---- FIREWORKS ----
  function launchFireworks() {
    var container = document.getElementById("fireworks");
    if (!container) return;

    var colors = ["#ff6b6b", "#ffc107", "#4ecdc4", "#ff69b4", "#a78bfa", "#fff"];
    var bursts = 0;

    var interval = setInterval(function () {
      if (bursts >= 8) {
        clearInterval(interval);
        return;
      }

      var x = randomRange(15, 85);
      var y = randomRange(10, 50);
      var color = randomPick(colors);

      for (var i = 0; i < 20; i++) {
        var particle = document.createElement("div");
        particle.className = "firework-particle";

        var angle = (Math.PI * 2 * i) / 20;
        var distance = randomRange(40, 120);
        var tx = Math.cos(angle) * distance;
        var ty = Math.sin(angle) * distance;

        particle.style.cssText =
          "left:" + x + "%;" +
          "top:" + y + "%;" +
          "background:" + color + ";" +
          "box-shadow:0 0 6px " + color + ";" +
          "--tx:" + tx + "px;" +
          "--ty:" + ty + "px;";

        container.appendChild(particle);
        (function (el) {
          setTimeout(function () { el.remove(); }, 1200);
        })(particle);
      }

      bursts++;
    }, 800);
  }

  // ---- SCREEN SHAKE ----
  function screenShake() {
    document.body.classList.add("shake");
    setTimeout(function () {
      document.body.classList.remove("shake");
    }, 500);
  }

  // ---- INITIALIZE ----
  function init() {
    // Handle click-to-start
    var slide0 = document.getElementById("slide-0");
    if (slide0) {
      slide0.addEventListener("click", function () {
        if (currentSlide === 0) {
          showSlide(1);
        }
      });
    }
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
