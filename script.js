/* =========================================
   NOIR — CREATIVE DIGITAL STUDIO
   INTERACTIVE JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        const lines = menuButton.querySelectorAll("span");

        if (mobileMenu.classList.contains("active")) {

            lines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            lines[1].style.transform = "rotate(-45deg) translate(5px, -5px)";

        } else {

            lines[0].style.transform = "";
            lines[1].style.transform = "";

        }

    });


    /* Close menu when clicking a link */

    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            const lines = menuButton.querySelectorAll("span");

            lines[0].style.transform = "";
            lines[1].style.transform = "";

        });

    });

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".service-card, .project, .stat, .about-content, .section-heading"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";
    element.style.transition =
        "opacity 0.8s ease, transform 0.8s cubic-bezier(.2,.8,.2,1)";

    revealObserver.observe(element);

});


/* =========================================
   ANIMATED STATISTICS
========================================= */

const counters = document.querySelectorAll("[data-target]");

const counterObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 1400;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const progress =
                    Math.min((currentTime - startTime) / duration, 1);

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                current = Math.floor(
                    easedProgress * target
                );

                counter.textContent =
                    String(current).padStart(2, "0");

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent =
                        String(target).padStart(2, "0");

                }

            }

            requestAnimationFrame(updateCounter);

            observer.unobserve(counter);

        });

    },
    {
        threshold: 0.7
    }
);


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(245, 243, 239, 0.82)";

        header.style.backdropFilter =
            "blur(18px)";

        header.style.webkitBackdropFilter =
            "blur(18px)";

        header.style.borderBottom =
            "1px solid rgba(17,17,17,0.08)";

        header.style.transition =
            "all 0.35s ease";

    } else {

        header.style.background = "transparent";

        header.style.backdropFilter = "none";

        header.style.webkitBackdropFilter = "none";

        header.style.borderBottom = "none";

    }

});


/* =========================================
   PROJECT HOVER PARALLAX
========================================= */

const projects = document.querySelectorAll(".project-image");

projects.forEach(project => {

    project.addEventListener("mousemove", event => {

        const rect = project.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        project.style.transform =
            `perspective(900px)
             rotateX(${y * -3}deg)
             rotateY(${x * 3}deg)
             translateY(-6px)`;

    });


    project.addEventListener("mouseleave", () => {

        project.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

    });

});


/* =========================================
   MAGNETIC BUTTON EFFECT
========================================= */

const magneticButtons = document.querySelectorAll(
    ".primary-button, .outline-button, .nav-button"
);

magneticButtons.forEach(button => {

    button.addEventListener("mousemove", event => {

        const rect = button.getBoundingClientRect();

        const x =
            event.clientX - rect.left - rect.width / 2;

        const y =
            event.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0, 0)";

    });

});


/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow = document.createElement("div");

cursorGlow.className = "cursor-glow";

document.body.appendChild(cursorGlow);


document.addEventListener("mousemove", event => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* =========================================
   ADD CURSOR STYLE
========================================= */

const cursorStyle = document.createElement("style");

cursorStyle.textContent = `

.cursor-glow {

    position: fixed;

    width: 14px;
    height: 14px;

    border-radius: 50%;

    background: rgba(255, 92, 53, 0.55);

    pointer-events: none;

    z-index: 9999;

    transform: translate(-50%, -50%);

    mix-blend-mode: multiply;

    opacity: 0;

    transition:
        width 0.2s ease,
        height 0.2s ease,
        opacity 0.2s ease;

}

@media (hover: hover) {

    body:hover .cursor-glow {

        opacity: 1;

    }

}

@media (max-width: 900px) {

    .cursor-glow {

        display: none;

    }

}

`;

document.head.appendChild(cursorStyle);


/* =========================================
   LINK HOVER CURSOR
========================================= */

const interactiveElements = document.querySelectorAll(
    "a, button, .service-card, .project-image"
);

interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        cursorGlow.style.width = "28px";
        cursorGlow.style.height = "28px";

    });


    element.addEventListener("mouseleave", () => {

        cursorGlow.style.width = "14px";
        cursorGlow.style.height = "14px";

    });

});


/* =========================================
   PARALLAX HERO SHAPES
========================================= */

const shapeOne = document.querySelector(".shape-one");
const shapeTwo = document.querySelector(".shape-two");

window.addEventListener("mousemove", event => {

    if (window.innerWidth <= 900) return;

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);

    if (shapeOne) {

        shapeOne.style.transform =
            `translate(${x * 30}px, ${y * 30}px)`;

    }

    if (shapeTwo) {

        shapeTwo.style.transform =
            `translate(${x * -20}px, ${y * -20}px)`;

    }

});


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log(
        "NOIR — Creative Digital Studio loaded successfully."
    );

});