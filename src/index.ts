import './styles.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  console.clear();

  const canvas = document.getElementById('hero-lightpass');
  const context = canvas.getContext('2d');

  canvas.width = 2680;
  canvas.height = 3840;

  const frameCount = 200;
  const currentFrame = (index) =>
    // `https://bloomweb.b-cdn.net/Nocco/nocco-${(index + 1).toString().padStart(5, '0')}.webp`;
    `https://bloomweb.b-cdn.net/Haglofs/haglofs-hero-${(index + 1)
      .toString()
      .padStart(5, '0')}.webp`;

  const images = [];
  const airpods = {
    frame: 0,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  gsap.to(airpods, {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      scrub: 0.5,
    },
    onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
  });

  images[0].onload = render;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[airpods.frame], 0, 0);
  }
});
