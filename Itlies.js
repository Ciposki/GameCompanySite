

function load(){
const cursor= document.querySelector('.cursor');
let flashlightable= document.querySelector('.flashlightable');
let mouseX=0;
let mouseY=0;
const positionElement = (e)=> {

    mouseY = e.clientY;
    mouseX = e.clientX;

    cursor.style.transform = `translate3d(${mouseX-10}px, ${mouseY-5}px, 0)`;
    //if stuff


    flashlightable.style.webkitMaskImage = `radial-gradient(circle at ${mouseX/window.innerWidth*100}% ${mouseY/window.innerHeight*100}%, black -10%, transparent 30%)`;

// And set the mask-image property
    flashlightable.style.maskImage = `radial-gradient(circle at ${mouseX/window.innerWidth*100}% ${mouseY/window.innerHeight*100}%, black 0%, transparent 40%)`;
}


function removebro(){

    gsap.to("#bro",{
        opacity: 0,
        scale: 0,
        duration: 1,
        rotate: 15,
        ease: "power3.inOut"
    })
}
window.addEventListener('mousemove', positionElement);
bro.addEventListener("mouseover",removebro)
}
document.addEventListener('DOMContentLoaded',load);


gsap.registerPlugin(ScrollTrigger);
//console.log(window.location.href)
gsap.to(".Gameinfo", {
    scrollTrigger: {
        trigger:"#scrolltrigger1",
        start:"700",
        end:"+=900",
    scrub:3},
    y: -500,

});
gsap.to(".Data", {
    scrollTrigger: {
        start:"700",
        end:"+=100",
        scrub:3},
    opacity:0

});

const text=new SplitType("#flashtext",{types:"chars"});
gsap.from(text.chars, {
    scrollTrigger: {
        start:"700",
        end:"+=100",
        scrub:3},
    duration: 0.5,
    opacity: 0,
    yPercent: -100,
    stagger: {from:"center",amount:0.35},
    ease: "back.out(1.7)"
});

gsap.to("#flashtext", {
    scrollTrigger: {
        trigger:"#scrolltrigger1",
        start:"700",
        end:"+=900",
        scrub:3},


});
gsap.to(".room", {
    scrollTrigger: {
        trigger:"#scrolltrigger1",
        start:"1000",
        end:"+=900",
        scrub:3},
    y:-300


});