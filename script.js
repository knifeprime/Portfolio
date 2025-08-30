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

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe all sections and cards
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(".project-card, .service-card, .skill-item, .stat-item")
  elementsToAnimate.forEach((el) => observer.observe(el))
})

// Parallax effect for background elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".bars-animation")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Dynamic typing effect enhancement
const typingTexts = document.querySelectorAll(".home-info h2 span")
const currentIndex = 0

function enhanceTypingEffect() {
  typingTexts.forEach((text, index) => {
    text.addEventListener("animationiteration", () => {
      if (index === currentIndex) {
        text.style.color = "#008cff"
        setTimeout(() => {
          text.style.color = "transparent"
        }, 3000)
      }
    })
  })
}

// Initialize enhanced effects
document.addEventListener("DOMContentLoaded", () => {
  enhanceTypingEffect()

  // Add loading animation completion
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 2000)
})

// Contact form handling
document.querySelector(".contact-form form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = this.querySelector('input[type="text"]').value
  const email = this.querySelector('input[type="email"]').value
  const subject = this.querySelector('input[placeholder="Subject"]').value
  const message = this.querySelector("textarea").value

  // Simple validation
  if (name && email && subject && message) {
    // Simulate form submission
    const submitBtn = this.querySelector(".btn")
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Sending..."
    submitBtn.style.opacity = "0.7"

    setTimeout(() => {
      submitBtn.textContent = "Message Sent!"
      submitBtn.style.background = "linear-gradient(45deg, #00ff88, #00cc6a)"

      setTimeout(() => {
        submitBtn.textContent = originalText
        submitBtn.style.background = "linear-gradient(45deg, #008cff, #7ec5ff)"
        submitBtn.style.opacity = "1"
        this.reset()
      }, 2000)
    }, 1500)
  }
})

// Add hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) rotateX(5deg)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotateX(0deg)"
  })
})

// Skill bars animation on scroll
const skillBars = document.querySelectorAll(".skill-progress")
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "skill-fill 2s ease-in-out forwards"
      }
    })
  },
  { threshold: 0.5 },
)

skillBars.forEach((bar) => skillObserver.observe(bar))

// Custom Scroll Indicator
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

  // Show/hide scroll wheel based on scroll position
  function toggleScrollWheel() {
    if (window.pageYOffset > 100) {
      scrollWheel.classList.add("visible")
    } else {
      scrollWheel.classList.remove("visible")
    }
  }

  // Update active dot based on current section
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

  // Click handlers for scroll dots
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

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 10000)
  }

  // Create particles periodically
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

  // Create cursor trail elements
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

  // Initialize trail positions
  for (let i = 0; i < trailElements.length; i++) {
    trailX[i] = 0
    trailY[i] = 0
  }

  // Mouse move handler
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursor.style.left = mouseX + "px"
    cursor.style.top = mouseY + "px"
  })

  // Animate cursor trail
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

  // Hover effects for interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .btn, .project-card, .service-card, .scroll-dot")

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover")
    })

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover")
    })
  })

  // Text cursor for input fields
  const textElements = document.querySelectorAll("input, textarea")

  textElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("text")
    })

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("text")
    })
  })

  // Click effect
  document.addEventListener("mousedown", () => {
    cursor.classList.add("click")
  })

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click")
  })

  // Hide cursor when leaving window
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

document.addEventListener("DOMContentLoaded", () => {
  // Dynamic typing effect enhancement
  enhanceTypingEffect()

  // Add loading animation completion
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 2000)

  // Observe all sections and cards
  const elementsToAnimate = document.querySelectorAll(".project-card, .service-card, .skill-item, .stat-item")
  elementsToAnimate.forEach((el) => observer.observe(el))

  // Initialize custom scroll features
  initCustomScrollWheel()
  createScrollParticles()
  window.addEventListener("scroll", handleScroll)
  initMouseGlow()
  updateScrollProgress()

  initCustomCursor()
})
