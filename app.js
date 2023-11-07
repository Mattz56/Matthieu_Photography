const fullView   = document.querySelector('#full_view');
const imgSliders = document.querySelectorAll('.img_slider');
const fullImage  = document.querySelector('#full_img');
let currentIndex = 0;



document.querySelector('#scroll_button').addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
});

document.querySelector('.btn_close').addEventListener('click', () => {
    fullView.style.display = "none";
})

imgSliders.forEach((imgSlider) => {
        imgSlider.addEventListener('click', (event) => {
            let src = event.target.getAttribute('src');
            fullImage.src = src;
            fullView.style.display = "block";
        });
    });


document.querySelector('.btn_next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgSliders.length;
    const imageUrl = imgSliders[currentIndex].getAttribute('src');
    fullImage.src = imageUrl;
});

document.querySelector('.btn_prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imgSliders.length) % imgSliders.length;
    const imageUrl = imgSliders[currentIndex].getAttribute('src');
    fullImage.src = imageUrl;
});



// ------------------------------------ GSAP
gsap.registerPlugin(ScrollTrigger);

const title = document.querySelector('#title_h2');
const TL    = gsap.timeline();
const about = document.querySelector('#about');

TL.from(title, {
    x: -600,
    ease: "back.out(1.7)", 
    duration:2,
    opacity: 0,
});


gsap.defaults({ease: "power3"});
gsap.set(".img_slider", {y: 100});

ScrollTrigger.batch(".img_slider", {
  interval: 0.1,
  batchMax: 2,
  onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true}),
  onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
  onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
  onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
});
ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".img_slider", {y: 0}));

TL.from(about, {
    opacity: 0,
    duration: 2,
    ease: "power1.out",
})

