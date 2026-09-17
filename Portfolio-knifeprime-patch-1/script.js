// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".navbar ul li")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((li) => {
    li.classList.remove("active")
    if (li.querySelector("a").getAttribute("href") === `#${current}`) {
      li.classList.add("active")
    }
  })
})

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  // Ensure fixed UI elements are direct children of body so CSS `position: fixed`
  // behaves correctly in all browsers (Edge can create containing blocks when
  // ancestors have transform/filter). Moving them to a top-level fixed container
  // prevents them from being affected by page transforms.
  (function ensureFixedUI() {
    try {
      const selectors = ['.navbar', '.custom-scroll-wheel', '.scroll-indicator']
      let container = document.getElementById('fixed-ui-container')
      if (!container) {
        container = document.createElement('div')
        container.id = 'fixed-ui-container'
        container.style.position = 'fixed'
        container.style.inset = '0'
        container.style.zIndex = '10005'
        container.style.pointerEvents = 'none'
        document.body.appendChild(container)
      }

      selectors.forEach((sel) => {
        const el = document.querySelector(sel)
        if (el && container && el.parentNode !== container) {
          // Keep element interactive
          el.style.pointerEvents = 'auto'
          container.appendChild(el)
        }
      })
    } catch (e) {
      // non-fatal
      console.warn('ensureFixedUI failed', e)
    }
  })()

  // When the page loads or is refreshed, jump to #home so users start at the top.
  // Use replaceState so we don't add an extra history entry.
  try {
    const home = document.getElementById('home')
    if (home) {
      history.replaceState(null, '', '#home')
      // scroll without smooth to avoid interfering with reveal animation
      home.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
  } catch (e) {
    console.warn('scroll to #home failed', e)
  }
  const menuToggle = document.getElementById("menu-toggle")
  const menuOverlay = document.querySelector(".menu-overlay")
  const navLinks = document.querySelectorAll(".nav-menu a")

  // Detect touch devices and add a body class so CSS can adapt
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  if (isTouchDevice) {
    document.body.classList.add('is-touch')
  }

  // Close menu when overlay is clicked
  if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
      menuToggle.checked = false
      document.body.style.overflow = ""
    })
  }

  // Close menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.checked = false
      document.body.style.overflow = ""
    })
  })

  // Prevent body scroll when menu is open
  if (menuToggle) {
    menuToggle.addEventListener("change", () => {
      if (menuToggle.checked) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    })
  }

  // Initialize custom scroll features (skip heavier/desktop-only features on touch)
  initCustomScrollWheel()
  createScrollParticles()
  window.addEventListener("scroll", handleScroll)
  initMouseGlow()
  updateScrollProgress()

  // Only initialize the custom cursor on non-touch devices
  if (!isTouchDevice) {
    initCustomCursor()
    // Add bubble particles on non-touch devices for visual depth
    initBubbleParticles()
  }

  // Add tap-to-open behavior for project/code/video cards on touch devices or small screens.
  // Some environments (devtools device emulation) may not set touch flags, so we also
  // enable this behavior when the viewport is narrow.
  const touchOrSmallScreen = () => isTouchDevice || window.innerWidth <= 940

  const touchCards = document.querySelectorAll('.project-card, .video-card, .code-card')
  touchCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // If user clicked/tapped a real link inside the card, let the normal behavior happen
      if (e.target.closest('a')) return

      // Only activate on touch devices or small screens
      if (!touchOrSmallScreen()) return

      // Try to open the first meaningful link inside the card
      const firstLink = card.querySelector('.project-links a, .code-links a, .project-link, a[href]')
      // If there's no overlay visible yet, show the overlay (first tap)
      if (!card.classList.contains('tapped')) {
        // Add tapped to reveal overlay (CSS can target .tapped to show overlay)
        card.classList.add('tapped')
        // Remove tapped after a timeout so it doesn't stay forever
        setTimeout(() => card.classList.remove('tapped'), 5000)
        return
      }

      // If overlay was already tapped (second tap), follow the link
      if (firstLink && firstLink.href) {
        const target = firstLink.getAttribute('target')
        if (target === '_blank') {
          window.open(firstLink.href, '_blank')
        } else {
          window.location.assign(firstLink.href)
        }
      }
    })
  })

  // Hide tapped state when clicking/tapping elsewhere
  document.addEventListener('click', (e) => {
    const anyTapped = document.querySelectorAll('.tapped')
    anyTapped.forEach((t) => {
      if (!t.contains(e.target)) t.classList.remove('tapped')
    })
  })
})

// Custom Scroll Progress
function updateScrollProgress() {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100

  const progressBar = document.querySelector(".scroll-progress")
  if (progressBar) {
    progressBar.style.width = scrollPercent + "%"
  }
}

// Remove reveal overlay after its animation finishes so it doesn't block interactions
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.reveal-overlay')
  if (!overlay) return
  overlay.addEventListener('animationend', () => {
    // add revealed class so main can fade in smoothly
    try { document.body.classList.add('revealed') } catch (e) {}
    // remove overlay shortly after to allow the fade transition to run
    setTimeout(() => {
      try { overlay.remove() } catch (e) { overlay.style.display = 'none' }
    }, 80)
  }, { once: true })

  // Fallback: in case animationend doesn't fire, hide after 2s
  setTimeout(() => {
    if (overlay && overlay.parentNode) {
      try { overlay.remove() } catch (e) { overlay.style.display = 'none' }
    }
  }, 2200)
})

// Custom Scroll Wheel Navigation
function initCustomScrollWheel() {
  const scrollWheel = document.querySelector(".custom-scroll-wheel")
  const scrollDots = document.querySelectorAll(".scroll-dot")
  const sections = document.querySelectorAll("section")

  function toggleScrollWheel() {
    if (window.pageYOffset > 100) {
      scrollWheel.classList.add("visible")
    } else {
      scrollWheel.classList.remove("visible")
    }
  }

  function updateActiveDot() {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    scrollDots.forEach((dot) => {
      dot.classList.remove("active")
      if (dot.getAttribute("data-section") === current) {
        dot.classList.add("active")
      }
    })
  }

  scrollDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetSection = dot.getAttribute("data-section")
      const targetElement = document.getElementById(targetSection)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  window.addEventListener("scroll", () => {
    toggleScrollWheel()
    updateActiveDot()
    updateScrollProgress()
  })
}

// Background particle animation
function createScrollParticles() {
  const bgAnimation = document.querySelector(".scroll-bg-animation")
  if (!bgAnimation) return // nothing to do if container missing

  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "scroll-particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 8 + "s"
    particle.style.animationDuration = Math.random() * 4 + 6 + "s"

    bgAnimation.appendChild(particle)

    setTimeout(() => {
      if (particle.parentNode) particle.parentNode.removeChild(particle)
    }, 10000)
  }

  // Reduce particle creation frequency for better performance (was 500ms, now 2500ms)
  createParticle()
  setInterval(createParticle, 2500)
}

// Bubble particle animation (larger, slow rising bubbles)
function initBubbleParticles() {
  const container = document.querySelector('.scroll-bg-animation')
  if (!container) return

  function createBubble() {
    const bubble = document.createElement('div')
    bubble.className = 'bubble-particle'
    const size = Math.random() * 60 + 20 // 20px - 80px
    bubble.style.width = size + 'px'
    bubble.style.height = size + 'px'
    bubble.style.left = Math.random() * 100 + '%'
    bubble.style.bottom = -Math.random() * 60 - 20 + 'px'
    const duration = Math.random() * 12 + 8 // 8s - 20s
    bubble.style.animationDuration = duration + 's'

    container.appendChild(bubble)

    setTimeout(() => {
      if (bubble.parentNode) bubble.parentNode.removeChild(bubble)
    }, (duration + 1) * 1000)
  }

  // create bubbles more sparsely for a subtle effect (increased from 1200ms to 3000ms for better performance)
  setInterval(createBubble, 3000)
}

// Scroll wave and glow effects
function handleScroll() {
  const scrollWave = document.querySelector(".scroll-wave")
  const scrollGlow = document.querySelector(".scroll-glow")
  let isScrolling = false
  let scrollTimeout

  if (!isScrolling) {
    scrollWave.classList.add("active")
    scrollGlow.classList.add("active")
    isScrolling = true
  }

  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    scrollWave.classList.remove("active")
    scrollGlow.classList.remove("active")
    isScrolling = false
  }, 150)
}

// Mouse tracking for glow effect
function initMouseGlow() {
  const scrollGlow = document.querySelector(".scroll-glow")

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100

    scrollGlow.style.setProperty("--mouse-x", x + "%")
    scrollGlow.style.setProperty("--mouse-y", y + "%")
  })
}

// Custom Cursor Implementation
function initCustomCursor() {
  const cursor = document.createElement("div")
  cursor.className = "custom-cursor"
  document.body.appendChild(cursor)

  const trailElements = []
  // Reduced from 8 to 5 trail elements for better performance
  for (let i = 0; i < 5; i++) {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.opacity = ((5 - i) / 5) * 0.5
    trail.style.transform = `translate(-50%, -50%) scale(${(5 - i) / 5})`
    document.body.appendChild(trail)
    trailElements.push(trail)
  }

  let mouseX = 0
  let mouseY = 0
  const trailX = []
  const trailY = []

  for (let i = 0; i < trailElements.length; i++) {
    trailX[i] = 0
    trailY[i] = 0
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursor.style.left = mouseX + "px"
    cursor.style.top = mouseY + "px"
  })

  function animateTrail() {
    trailX[0] = mouseX
    trailY[0] = mouseY

    for (let i = 1; i < trailElements.length; i++) {
      trailX[i] += (trailX[i - 1] - trailX[i]) * 0.3
      trailY[i] += (trailY[i - 1] - trailY[i]) * 0.3

      trailElements[i].style.left = trailX[i] + "px"
      trailElements[i].style.top = trailY[i] + "px"
    }

    requestAnimationFrame(animateTrail)
  }
  animateTrail()

  const interactiveElements = document.querySelectorAll("a, button, .btn, .project-card, .service-card, .scroll-dot")

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover")
    })

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover")
    })
  })

  const textElements = document.querySelectorAll("input, textarea")

  textElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("text")
    })

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("text")
    })
  })

  document.addEventListener("mousedown", () => {
    cursor.classList.add("click")
  })

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click")
  })

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0"
    trailElements.forEach((trail) => {
      trail.style.opacity = "0"
    })
  })

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1"
    trailElements.forEach((trail, index) => {
      trail.style.opacity = ((5 - index) / 5) * 0.5
    })
  })
}

/* ─── View More Projects ─── */
document.addEventListener('DOMContentLoaded', () => {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  if (!viewMoreBtn) return;

  const extraProjects = document.querySelectorAll('.hidden-project');

  viewMoreBtn.addEventListener('click', () => {
    const isExpanded = viewMoreBtn.classList.contains('expanded');

    if (!isExpanded) {
      // Show extras
      extraProjects.forEach((card, i) => {
        card.classList.remove('hidden-project');
        card.classList.add('revealed-project');
        card.style.animationDelay = (i * 0.07) + 's';
      });
      viewMoreBtn.classList.add('expanded');
      viewMoreBtn.setAttribute('aria-expanded', 'true');
      viewMoreBtn.querySelector('.view-more-text').textContent = 'View Less Projects';
      viewMoreBtn.querySelector('.view-more-count').textContent = '−';
    } else {
      // Hide extras, smooth scroll back to section title first
      const projectsSection = document.getElementById('projects');
      if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        extraProjects.forEach((card) => {
          card.classList.add('hidden-project');
          card.classList.remove('revealed-project');
          card.style.animationDelay = '';
        });
        viewMoreBtn.classList.remove('expanded');
        viewMoreBtn.setAttribute('aria-expanded', 'false');
        viewMoreBtn.querySelector('.view-more-text').textContent = 'View More Projects';
        viewMoreBtn.querySelector('.view-more-count').textContent = '+10';
        // Re-apply active filter
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) activeFilter.click();
      }, 600);
    }
  });

  /* ─── Project filter tabs ─── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const allCards = document.querySelectorAll('.project-card:not(.hidden-project)');

      allCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('filter-hidden');
        } else {
          card.classList.add('filter-hidden');
        }
      });
    });
  });
});
