document.addEventListener("DOMContentLoaded", () => {
    
    const tl = gsap.timeline();

    // 1. Animar a Imagem (Slide da esquerda)
    // Se a tela for pequena, ignoramos isso para não bugar
    if (window.innerWidth > 900) {
        tl.from(".split-visual", {
            xPercent: -100, // Vem de fora da tela
            duration: 1.5,
            ease: "power4.out"
        });
        
        tl.from(".visual-text", {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5
        }, "<"); // "<" significa: começa junto com o anterior
    }

    // 2. Animar o Formulário (Sequência)
    tl.to(".booking-title", {
        opacity: 1,
        y: 0,
        startAt: { y: 30 },
        duration: 0.8,
        ease: "power2.out"
    }, "-=1") // Começa um pouco antes da imagem terminar
    
    // O STAGGER MÁGICO
    .to(".input-group", {
        opacity: 1,
        y: 0,
        startAt: { y: 20 }, // Começa levemente descido
        duration: 0.6,
        stagger: 0.1, // Espera 0.1s entre cada input!
        ease: "power2.out"
    })
    
    .to(".btn-confirm", {
        opacity: 1,
        y: 0,
        startAt: { y: 20 },
        duration: 0.6
    }, "-=0.4");

    // Bónus: Validação simples do formulário
    const form = document.getElementById("reservationForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Simular envio
        const btn = document.querySelector(".btn-confirm");
        const originalText = btn.innerText;
        
        btn.innerText = "Processando...";
        btn.style.background = "#333";
        
        setTimeout(() => {
            btn.innerText = "Reserva Confirmada ✓";
            btn.style.background = "#28a745"; // Verde Sucesso
            form.reset();
        }, 2000);
    });

});