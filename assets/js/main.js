//const header, menuToggle, menuToggleCheckbox, menuContainer, tlOpeningMenu, tlClosingMenu, tlIntro, tlAbout;

const header = document.getElementsByTagName("header")[0];
const menuToggle = document.getElementById("menu-toggle");
const menuToggleCheckbox = document.getElementById("menu-toggle-checkbox");
 menuToggleCheckbox.checked = false;
const menuContainer = document.getElementById("menu");
const menuContent = document.getElementById("menu-content");
const menuBody = document.getElementById("menu-body");
const menuTopBorder = menuBody.querySelector("hr");

const projectContainers = document.querySelectorAll(".project");

const creditsWrapper = document.getElementById("credits_bg");

const tlOpeningMenu1 = gsap.timeline();
const tlOpeningMenu2 = gsap.timeline();
const tlClosingMenu1 = gsap.timeline();
const tlClosingMenu2 = gsap.timeline();


const tlMenuOpening = gsap.timeline();
const tlMenuClosing = gsap.timeline();

const creditsTl = gsap.timeline();

const $xs = 425;
const $sm = 576;
const $md = 768;
const $lg = 992;
const $xl = 1200;
const $xxl = 1400;
const $xxxl = 1600;

gsap.registerPlugin(ScrollTrigger);

if(window.innerWidth >= $lg) {
    console.log("You are not on mobile; LocomotiveScroll active");
    //Locomotive scroll initialization
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".smooth-scroll", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
    });
} else {
console.log("You are on mobile; LocomotiveScroll NOT active");
}

/********** INTRO ANIMATION **********/
tlIntro = gsap.timeline();
function startIntroAnimation() {
    tlIntro.fromTo(".hero__title",{y: 20}, {y:0, opacity: 1, duration: 1.6, ease: "power2.inOut"})
    .to(".hero__title", {filter: "blur(0px)", duration: 1.2/*, delay: 0*/, ease: "power2.inOut"}, "<")
    .addLabel("endTitleAnimation", 1.2)
    .to(".hero__title", {filter: "none", duration: 0.001})
    .to(".hero__subtitle", {opacity: 1, duration: 0.6, ease: "power2.inOut"}, "endTitleAnimation")
    .to(".hero__cta", {opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.inOut"}, "<");
}

/********** SCROLL TO BOTTOM ANIMATION **********/
/* NONE OF THE SCROLL TO METHODS WORK: it scroll correctly but messes up with the locomotive scroll, so after the scroll you can't scroll up
function scrollToBottom() {
    
    //Native scrollTo
    //window.scrollTo(0, document.body.scrollHeight);
    //GSAP scrollTo (plugin)
    //gsap.to(window, {duration: 1, scrollTo:{y:"#footer", offsetY:0}});
    

    //Locomotive scrollTo
    console.log("loco scrollTo");
    const scroll = new LocomotiveScroll();
    const target = document.querySelector('#footer');
    scroll.scrollTo(target);
}
*/

/********** ABOUT ANIMATION **********/

/*tlAbout = gsap.timeline();
tlAbout.fromTo(".about__text",{y: 20}, {y:0, opacity: 1, duration: 1.2, ease: "power2.inOut"})
.to(".about__text", {filter: "blur(0px)", duration: 1, ease: "power2.inOut"}, "<");
*/
var aboutText = document.getElementById("about-text");
tlAbout = gsap.timeline()
    .fromTo(aboutText,{y: 30}, {y:0, opacity: 1, duration: 1.2, ease: "power2.inOut"})
    .to(aboutText, {filter: "blur(0px)", duration: 1/*, delay: 0*/, ease: "power2.inOut"}, "<")

ScrollTrigger.create({
    trigger:aboutText,
    scroller: ".smooth-scroll",
    start:"top 90%", //Start when the top of the element hit the 90% of the page height (almost the bottom of the page), so just a little bit after the element enters the screen
    //end:"bottom top",
    toggleActions:"play none none none",
    animation:tlAbout
})

/********** CONTACTS TEXT ANIMATION **********/
var contactText = document.getElementById("contacts-title");
tlcontact = gsap.timeline()
    .fromTo(contactText,{y: 30}, {y:0, opacity: 1, duration: 1.2, ease: "power2.inOut"})
    .to(contactText, {filter: "blur(0px)", duration: 1/*, delay: 0*/, ease: "power2.inOut"}, "<")

ScrollTrigger.create({
    trigger:contactText,
    scroller: ".smooth-scroll",
    start:"top 90%", //Start when the top of the element hit the 90% of the page height (almost the bottom of the page), so just a little bit after the element enters the screen
    //end:"bottom top",
    toggleActions:"play none none none",
    animation:tlcontact
})

/********** CREDITS ANIMATION **********/
function openCredits() {
    creditsTl.to('#credits_bg', {display: "flex", opacity: 1, duration: 0.4, ease: "power2.inOut"})
    .fromTo('#credits_bg .credits', {y: 20, duration: 0.8, ease: "power2.inOut"}, {y: 0, opacity: 1, ease: "power2.inOut"});
}
function closeCredits() {
    creditsTl.to('#credits_bg .credits', {y: 20, opacity: 0, duration: 0.8, ease: "power2.inOut"})
    .to('#credits_bg', {display: "none", opacity: 0, duration: 0.4, delay: 0.3, ease: "power2.inOut"}, "<");
}

/********** PROJECT HOVER ANIMATION **********/
function addProjectHoverAnimation(element) {
    let tl = gsap.timeline({ paused: true, reversed: true });
    let projectGsapSelector = gsap.utils.selector(element);
    
    tl.to(projectGsapSelector(".project__image"), {filter: "blur(0px)", duration: 0.6, ease: "power1.inOut"})
    .fromTo(projectGsapSelector(".project__category"), {y: 5}, {opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power1.inOut"}, "<")
    .fromTo(projectGsapSelector(".project__title"), {y: 5}, {opacity: 1, y: 0, duration: 0.4, delay: 0.1, ease: "power1.inOut"}, "<");
    
    function checkExecuteAnimation() {
        //If the animation is reversed start it(mouseover), otherwise rewind it(mouseout)
        tl.reversed() ? tl.play() : tl.reverse();
    }

    element.addEventListener('mouseover', function() {
        checkExecuteAnimation();
    });
    element.addEventListener('mouseout', function() {
        checkExecuteAnimation();
    });
}

/********** MENU ANIMATION **********/

var totalOpeningAnimationTime = 1.6;
var totalClosingAnimationTime = 1;

function showHideMenu() {
    if (menuToggleCheckbox.checked) {
        //OPENING MENU
        tlMenuOpening.to(menuToggle, { duration: totalOpeningAnimationTime, pointerEvents: "none" })
        .to(menuContainer, { duration: 0.01, display: "flex" }, "<")
        .to(menuContainer, { duration: 0.6, opacity: 1, ease: "power4.in"}, "<")
        .to(header, { duration: 0.6, backgroundColor: "rgba(17,17,17,1)", ease: "power4.in"}, "<")
        .to(menuTopBorder, { duration: 0.6/*, delay: 0.2*/, width: "100%", ease: "power4.in"}, "<") //ends at 0.6
        .addLabel("contentCheckpoint", 0.8)
        .to(menuContent, { duration: 0.4, opacity: 1, ease: "power4.in"}, "contentCheckpoint") //ends at 1
        .fromTo(".menu__body .row .menu__links-column .menu__links li a",{y: 1000, opacity: 0}, {y:0, opacity: 1, duration: 0.6, delay: 0.4, stagger: {amount: 0.4}, ease: "power4.out"}, "<")
        .to(menuToggle, { duration: 0.01, pointerEvents: "auto" });
    } else {
        //CLOSING MENU
        tlMenuClosing.to(menuToggle, { duration: totalClosingAnimationTime, pointerEvents: "none" })
        .to(".menu__body .row .menu__links-column .menu__links li a", 0.4, { duration: 0.4, delay: 0.2, opacity: 0, ease: "power4.in"}, "<")
        .to(menuContent, { duration: 0.4, opacity: 0, ease: "power4.in"}, "<")
        .to(menuTopBorder, { duration: 0.6, ease: "power4.in", width: "0"})
        .to(header, { duration: 0.6, backgroundColor: "rgba(17,17,17,0)", ease: "power4.in"}, "<")
        .to(menuContainer, { duration: 0.6, opacity: 0, ease: "power4.in"}, "<")
        .to(menuContainer, { duration: 0.01, display: "none" })
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
    
    startIntroAnimation();
    
    if(window.innerWidth >= $lg) {
        console.log("You are not on mobile; project Hover active");
        projectContainers.forEach(function(element) {
            addProjectHoverAnimation(element);
        });
    } else {
    console.log("You are on mobile; project Hover NOT active");
    }

    creditsWrapper.addEventListener("click", function(e){
        if (e.target === this) {
            closeCredits();
        }
    });
};