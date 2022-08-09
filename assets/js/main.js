var header, menuToggle, menuToggleCheckbox, menuContainer, tlOpeningMenu, tlClosingMenu;

header = document.getElementsByTagName("header")[0];
menuToggle = document.getElementById("menu-toggle");
menuToggleCheckbox = document.getElementById("menu-toggle-checkbox");
menuToggleCheckbox.checked = false;
menuContainer = document.getElementById("menu");
menuBody = document.getElementById("menu-body");
menuTopBorder = menuBody.querySelector("hr");

tlOpeningMenu1 = gsap.timeline();
tlOpeningMenu2 = gsap.timeline();
tlClosingMenu1 = gsap.timeline();
tlClosingMenu2 = gsap.timeline();

function showHideMenu() {
    if (menuToggleCheckbox.checked) {//OPEN MENU
        gsap.to(header, { duration: 0.01, backgroundColor: "#111111" });
        tlOpeningMenu1
            .to(menuContainer, { duration: 0.01, display: "flex" })
            .to(menuContainer, { duration: 0.6, opacity: "1" })
            .to(menuTopBorder, { duration: 1, ease: "power4.in", width: "100%" })
            .from(".menu__body .row .menu__links-column .menu__links li a", 0.8, {
                y: 100,
                opacity: 0,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }
            });
        tlOpeningMenu2
            .to(menuToggle, { duration: 0.61, pointerEvents: "none" })
            .from(".menu__body .row .menu__content-column .menu__content li *", 0.8, {
                y: 200,
                opacity: 0,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }
            })
            .to(menuToggle, { duration: 0.61, pointerEvents: "auto" });
    } else {//CLOSEN MENU
        gsap.to(menuToggle, { duration: 0.01, pointerEvents: "none" });
        tlClosingMenu1
            .to(".menu__body .row .menu__links-column .menu__links li a", 0.8, {
                y: 100,
                opacity: 0,
                ease: "power4.in",
                stagger: {
                    amount: 0.3
                }
            })
            .to(header, { duration: 1, opacity: "1" })
            .to(header, { duration: 0.01, backgroundColor: "rgba(0,0,0,0)" });
        tlClosingMenu2
            .to(menuTopBorder, { duration: 1, ease: "power4.in", width: "0" })
            .to(".menu__body .row .menu__content-column .menu__content li *", 0.8, {
                y: 200,
                opacity: 0,
                ease: "power4.in",
                stagger: {
                    amount: 0.3
                }
            })
            .to(menuContainer, { duration: 0.6, opacity: "0" })
            .to(menuContainer, { duration: 0.01, display: "none" })
            //ritorna allo stato normale per poter fare l'animazione dopo
            .to(".menu__body .row .menu__links-column .menu__links li a", 0.1, {
                y: 0,
                opacity: 1,
                ease: "power4.in"
            })
            .to(".menu__body .row .menu__content-column .menu__content li *", 0.1, {
                y: 0,
                opacity: 1,
                ease: "power4.in"
            })
            .to(menuToggle, { duration: 0.01, pointerEvents: "auto" });
    }
}

window.onload = function (event) {
    //Current year 
    var currentYearSpan = document.getElementById("current-year");
    currentYearSpan.innerHTML = new Date().getFullYear();

    menuToggle.addEventListener("click", function () {
        showHideMenu();
    });
};