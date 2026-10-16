/* ===== 乔天宇 · 無限進步 — 交互脚本 ===== */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1) 星空背景 */
  function starfield() {
    var c = document.getElementById("stars");
    if (!c || reduce) { if (c) c.style.display = "none"; return; }
    var ctx = c.getContext("2d");
    var w, h, dpr, stars = [];
    // 四撞色星点
    var colors = [
      "57,255,106",   // 荧光绿
      "157,78,221",   // 绮堇紫
      "255,224,102",  // 柔柠黄
      "99,242,183"    // 薄荷绿
    ];
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.width = Math.floor(innerWidth * dpr);
      h = c.height = Math.floor(innerHeight * dpr);
      c.style.width = innerWidth + "px";
      c.style.height = innerHeight + "px";
      var n = Math.round((innerWidth * innerHeight) / 8500);
      stars = [];
      for (var i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.4 + 0.3) * dpr,
          a: Math.random() * 0.65 + 0.15,
          s: (Math.random() * 0.02 + 0.004) * dpr,
          d: Math.random() * Math.PI * 2,
          c: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }
    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        var tw = st.a + Math.sin(t * st.s + st.d) * 0.28;
        if (tw < 0.05) tw = 0.05;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + st.c + "," + tw.toFixed(3) + ")";
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    window.addEventListener("resize", resize, { passive: true });
    resize();
    requestAnimationFrame(frame);
  }

  /* 2) 打字机 */
  function typing() {
    var el = document.getElementById("typed");
    if (!el) return;
    var lines = [
      "化工杯三等奖 · 未来 ACM 之星。",
      "大一新生，进度条 1%，正在加载。",
      "無限進步。"
    ];
    if (reduce) { el.textContent = lines[0]; return; }
    var li = 0, ci = 0, del = false;
    function tick() {
      var cur = lines[li];
      if (!del) {
        el.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { del = true; return setTimeout(tick, 1800); }
        return setTimeout(tick, 60);
      }
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; li = (li + 1) % lines.length; return setTimeout(tick, 350); }
      setTimeout(tick, 28);
    }
    setTimeout(tick, 500);
  }

  /* 3) 滚动显现 */
  function reveals() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e, i) { e.style.transitionDelay = ((i % 6) * 60) + "ms"; io.observe(e); });
  }

  /* 4) 技能条动画 */
  function skillBars() {
    var bars = document.querySelectorAll(".bar-fill");
    if (!bars.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      bars.forEach(function (b) { b.style.width = b.getAttribute("data-w"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.style.width = el.getAttribute("data-w");
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { io.observe(b); });
  }

  /* 5) 导航状态 + 移动菜单 */
  function nav() {
    var bar = document.getElementById("nav");
    function onScroll() {
      if (!bar) return;
      if (scrollY > 24) bar.classList.add("scrolled");
      else bar.classList.remove("scrolled");
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var btn = document.getElementById("menuBtn");
    var mob = document.getElementById("mobileNav");
    if (btn && mob) {
      btn.addEventListener("click", function () {
        var open = mob.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      mob.addEventListener("click", function (e) {
        if (e.target.tagName === "A") { mob.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
      });
    }
  }

  /* 6) 年份 */
  function year() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function boot() { starfield(); typing(); reveals(); skillBars(); nav(); year(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
