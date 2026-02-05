document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Animation (Entrada simples)
    gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });

    // 2. Mobile Menu Logic (Copiar do script.js ou importar)
    const menuToggle = document.getElementById("mobile-menu");
    const navList = document.getElementById("nav-list");
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navList.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    // 3. Lógica do Sticky Image Swap (Só funciona em Desktop > 900px)
    if (window.innerWidth > 900) {
        
        const blocks = document.querySelectorAll(".content-block");
        const images = document.querySelectorAll(".event-img");

        blocks.forEach((block, i) => {
            ScrollTrigger.create({
                trigger: block,
                start: "top center", // Quando o topo do texto chega ao centro da tela
                end: "bottom center", 
                onEnter: () => updateImage(block.dataset.img),
                onEnterBack: () => updateImage(block.dataset.img),
                // markers: true // Use para debug se precisar
            });
        });

        function updateImage(imgId) {
            // Remove active de todas
            images.forEach(img => img.classList.remove("active"));
            // Adiciona active na correta
            const targetImg = document.getElementById(imgId);
            if (targetImg) targetImg.classList.add("active");
        }
    }
});