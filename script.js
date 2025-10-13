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
  const menuToggle = document.getElementById("menu-toggle")
  const menuOverlay = document.querySelector(".menu-overlay")
  const navLinks = document.querySelectorAll(".nav-menu a")

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
  menuToggle.addEventListener("change", () => {
    if (menuToggle.checked) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  })

  // Initialize custom scroll features
  initCustomScrollWheel()
  createScrollParticles()
  window.addEventListener("scroll", handleScroll)
  initMouseGlow()
  updateScrollProgress()
  initCustomCursor()
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

  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "scroll-particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 8 + "s"
    particle.style.animationDuration = Math.random() * 4 + 6 + "s"

    bgAnimation.appendChild(particle)

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 10000)
  }

  setInterval(createParticle, 500)
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
  for (let i = 0; i < 8; i++) {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.opacity = ((8 - i) / 8) * 0.5
    trail.style.transform = `translate(-50%, -50%) scale(${(8 - i) / 8})`
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
      trail.style.opacity = ((8 - index) / 8) * 0.5
    })
  })
}
