// Efecto de escritura para el logo "Federico"
const typingText = document.getElementById("typing-text")
const text = "Federico"
let index = 0

function typeWriter() {
  if (index < text.length) {
    typingText.textContent += text.charAt(index)
    index++
    setTimeout(typeWriter, 200)
  }
}

// Iniciar animación de escritura cuando carga la página
window.addEventListener("load", () => {
  setTimeout(typeWriter, 500)
})

// Toggle del menú móvil
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Animación del fondo 3D con canvas
const canvas = document.getElementById("background-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Partículas para el fondo
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > canvas.width) this.x = 0
    if (this.x < 0) this.x = canvas.width
    if (this.y > canvas.height) this.y = 0
    if (this.y < 0) this.y = canvas.height
  }

  draw() {
    ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Crear partículas
const particles = []
const particleCount = 100

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle())
}

// Animar partículas
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  // Conectar partículas cercanas
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 100)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }

  requestAnimationFrame(animateParticles)
}

animateParticles()

// Redimensionar canvas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Animación de las barras de habilidades cuando son visibles
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
}

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll(".skill-progress")
      progressBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress")
        bar.style.width = progress + "%"
      })
      skillObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

const skillsSection = document.querySelector(".skills")
if (skillsSection) {
  skillObserver.observe(skillsSection)
}

// Animación de fade-in para elementos al hacer scroll
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
      fadeObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

// Aplicar fade-in a las tarjetas
document.querySelectorAll(".project-card, .stat-card, .skill-category, .contact-card").forEach((el) => {
  el.classList.add("fade-in")
  fadeObserver.observe(el)
})

// Efecto parallax suave en el hero
let lastScrollY = window.scrollY

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY
  const heroContent = document.querySelector(".hero-content")

  if (heroContent && scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrollY * 0.5}px)`
    heroContent.style.opacity = 1 - scrollY / window.innerHeight
  }

  lastScrollY = scrollY
})

// Efecto de cursor personalizado (opcional - comentado por defecto)
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
*/

console.log("[v0] Portfolio cargado correctamente")
