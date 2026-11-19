/* ============================================
 PORTFÓLIO — JavaScript Completo
 Arquivo: js/main.js
 Funcionalidades: menu hamburger, dark mode,
 scroll header, back-to-top, fade-in, validação
 ============================================ */
// === MENU HAMBURGER ===
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("aberto");
    const isOpen = navMenu.classList.contains("aberto");
    hamburger.querySelector(".hamburger-icon").textContent = isOpen
        ? "\u2715"
        : "\u2630";
    hamburger.setAttribute("aria-expanded", isOpen);
});
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("aberto");
        hamburger.querySelector(".hamburger-icon").textContent = "\u2630";
        hamburger.setAttribute("aria-expanded", "false");
    });
});
// === DARK MODE ===
const themeToggle = document.querySelector(".theme-toggle");
const setTheme = (isDark) => {
    document.body.classList.toggle("dark-mode", isDark);
    themeToggle.textContent = isDark ? "\u2600\uFE0F" : "\uD83C\uDF19";
    localStorage.setItem("tema", isDark ? "dark" : "light");
};
// Carregar tema salvo ou preferência do sistema
const temaSalvo = localStorage.getItem("tema");
const prefereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(temaSalvo === "dark" || (!temaSalvo && prefereDark));
themeToggle.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark-mode"));
});
// === HEADER SCROLL ===
window.addEventListener("scroll", () => {
    document
        .querySelector(".header")
        .classList.toggle("scrolled", window.scrollY > 50);
});
// === BOTÃO VOLTAR AO TOPO ===
const btnTop = document.querySelector(".btn-top");
window.addEventListener("scroll", () => {
    btnTop.classList.toggle("visivel", window.scrollY > 300);
});
btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
// === FADE-IN COM INTERSECTION OBSERVER ===
const fadeElements = document.querySelectorAll(
    ".skill-card, .projeto-card, .sobre-grid",
);
fadeElements.forEach((el) => el.classList.add("fade-in"));
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visivel");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 },
);
fadeElements.forEach((el) => observer.observe(el));
// === SCROLL SUAVE COM JQUERY ===
$('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    if (target.length) {
        $("html, body").animate(
            {
                scrollTop: target.offset().top - 70,
            },
            600,
        );
    }
});
// === VALIDAÇÃO DO FORMULÁRIO (jQuery Validate) ===
$("#formContato").validate({
    rules: {
        nome: { required: true, minlength: 3 },
        email: { required: true, email: true },
        mensagem: { required: true, minlength: 10 },
    },
    messages: {
        nome: {
            required: "Por favor, digite seu nome.",
            minlength: "O nome deve ter pelo menos 3 caracteres.",
        },
        email: {
            required: "Por favor, digite seu e-mail.",
            email: "Por favor, digite um e-mail válido.",
        },
        mensagem: {
            required: "Por favor, escreva sua mensagem.",
            minlength: "A mensagem deve ter pelo menos 10 caracteres.",
        },
    },
    errorClass: "is-invalid",
    validClass: "is-valid",
    errorElement: "div",
    submitHandler: function () {
        $(".form-sucesso").fadeIn(300).text("Mensagem enviada com sucesso!");
        setTimeout(() => {
            $(".form-sucesso").fadeOut(300);
        }, 4000);
        $("#formContato")[0].reset();
        $("#formContato input, #formContato textarea").removeClass("is-valid");
    },
});
