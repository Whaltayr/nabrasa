// Wait for the HTML to be fully loaded before running animations
document.addEventListener("DOMContentLoaded", () => {

    // 1. Registrar o ScrollTrigger (Obrigatório)
    gsap.registerPlugin(ScrollTrigger);

    // 2. Selecionar todas as imagens de parallax
    const imagens = document.querySelectorAll(".parallax-img");

    // 3. Criar um loop para aplicar a animação em cada uma
    imagens.forEach((img) => {
        
        gsap.to(img, {
            y: "20%", // Move a imagem 20% para baixo (dentro do container)
            ease: "none", // Importante: sem aceleração, movimento linear
            scrollTrigger: {
                trigger: img.parentElement, // O gatilho é o container da imagem
                start: "top bottom", // Começa quando o TOPO do container toca o FUNDO da tela
                end: "bottom top",   // Termina quando o FUNDO do container toca o TOPO da tela
                scrub: true,         // O MAIS IMPORTANTE: Vincula a animação à barra de rolagem!
                // markers: true     // Descomente essa linha se quiser ver as guias de debug na tela
            }
        });

    });

    
    // 1. Create the Embers dynamically (The Loop)
    const emberContainer = document.getElementById("embers");

   const menuToggle = document.getElementById("mobile-menu");
    const navList = document.getElementById("nav-list");

    menuToggle.addEventListener("click", () => {
        // Toggle na lista de links (abre/fecha menu)
        navList.classList.toggle("active");
        
        // Toggle no próprio botão (faz o X aparecer)
        menuToggle.classList.toggle("active");
    });
    
    for (let i = 0; i < 15; i++) {
        let ember = document.createElement("div");
        ember.classList.add("ember");
        
        // Random starting position (0% to 100% width)
        ember.style.left = Math.random() * 100 + "%";
        // Start below the screen
        ember.style.top = "100%"; 
        
        emberContainer.appendChild(ember);
    }

    // 2. Animate the Text
    // Note: In Vanilla, we target the CSS class directly like ".hero-title"
    
    const tl = gsap.timeline(); // A timeline lets us chain animations neatly

    // The Reveal Sequence
    tl.to(".main-header", {
        y: 0,
        opacity: 1,
        startAt: { y: -20 }, // Slide down from top
        duration: 1.2,
        ease: "power3.out"
    })

    tl.to(".hero-title", {
        opacity: 1,
        y: 0,           // Move to natural position
        startAt: { y: 50 }, // Start 50px down
        duration: 1.5,
        ease: "power3.out"
    })
    .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        startAt: { y: 20 },
        duration: 1,
        ease: "power2.out"
    }, "-=1") // "-=1" means start this 1 second BEFORE the previous one finishes
    .to(".cta-button", {
        opacity: 1,
        y: 0,
        startAt: { y: 20 },
        duration: 1
    }, "-=0.5");

    // 3. Animate the Embers (Float Up)
    gsap.to(".ember", {
        y: -window.innerHeight, // Move up by the height of the screen
        opacity: 0,             // Fade out
        duration: "random(3, 6)", // Each ember takes a different time
        repeat: -1,             // Infinite loop
        ease: "none",           // Linear movement (no speeding up/slowing down)
        stagger: {
            amount: 5,          // Spread start times over 5 seconds
            from: "random"
        }
    });

    
    // --- Scroll Horizontal (Pinning) ---
    
    // Seleciona o container gigante
    const sections = gsap.utils.toArray(".panel");
    
    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1), // Move para a esquerda: -100% * 2 = -200%
        ease: "none", // Movimento linear
        scrollTrigger: {
            trigger: ".atmosphere-section",
            pin: true,   // O TRUQUE: Trava a seção na tela
            scrub: 1,    // Suaviza o scroll (demora 1s para 'alcançar' o dedo)
            // snap: 1 / (sections.length - 1), // Opcional: Faz "imã" no slide mais próximo
            end: "+=3000", // Define a duração do scroll vertical "virtual" (quanto mais pixels, mais lento)
        }
    });

    // --- Bónus: Header fica escuro ao rolar ---
    const header = document.querySelector(".main-header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- Animação Simples do Rodapé ---
    gsap.from(".reservation-container", {
        scrollTrigger: {
            trigger: ".reservation-section",
            start: "top 80%", // Começa quando o topo da seção chega a 80% da tela
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

});

// INICIALIZAÇÃO DO LENIS (SMOOTH SCROLL)
const lenis = new Lenis({
    duration: 1.2, // Quanto maior, mais "lento" e suave é o scroll
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de suavidade
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false, // Desativar em mobile (recomendado para performance)
    touchMultiplier: 2,
});

// Sincronizar Lenis com o loop de animação do navegador
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// INTEGRAÇÃO LENIS + GSAP SCROLLTRIGGER
// Isso garante que as animações do GSAP acompanhem a suavidade do Lenis
if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

