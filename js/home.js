document.addEventListener("DOMContentLoaded", function () {
  // ========== СЛАЙДЕР ОТЗЫВЫ ==========
  const reviewsSlider = new Swiper(".reviews__slider", {
    loop: true,
    speed: 700,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".reviews__arrow--next",
      prevEl: ".reviews__arrow--prev",
    },
    pagination: {
      el: ".reviews__pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        centeredSlides: false,
      },
      480: {
        slidesPerView: 1,
        centeredSlides: false,
      },
      560: {
        slidesPerView: 2,
        centeredSlides: false,
      },
      780: {
        slidesPerView: 2,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: 3,
        centeredSlides: true,
      },
    },
  });

  // ========== СЛАЙДЕР НОВИНОК ==========
  const noveltiesSlider = document.querySelector(".novelties__slider");

  if (noveltiesSlider) {
    new Swiper(".novelties__slider", {
      loop: true,
      speed: 500,
      slidesPerView: 3,
      spaceBetween: 45,
      navigation: {
        nextEl: ".novelties__slider-btn--next",
        prevEl: ".novelties__slider-btn--prev",
      },
      pagination: {
        el: ".novelties__pagination",
        clickable: true,
      },
      breakpoints: {
        1200: { slidesPerView: 3, spaceBetween: 45 },
        1024: { slidesPerView: 3, spaceBetween: 35 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        560: { slidesPerView: 2, spaceBetween: 20 },
        0: { slidesPerView: 1, spaceBetween: 0 },
      },
    });
  }
  // FAQ ==========
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const button = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    button.addEventListener('click', () => {

        faqItems.forEach(other => {
            if (other !== item) {
                const otherAnswer = other.querySelector('.faq__answer');
                other.classList.remove('active');
                otherAnswer.style.height = 0;
                otherAnswer.style.opacity = 0;
            }
        });

        const isOpen = item.classList.contains('active');

        if (isOpen) {
            answer.style.height = 0;
            answer.style.opacity = 0;
            item.classList.remove('active');
        } else {
            item.classList.add('active');
            answer.style.height = answer.scrollHeight + 'px';
            answer.style.opacity = 1;
        }
    });
});


  // ========== АНИМАЦИЯ ПРИ СКРОЛЛЕ (advantages) ==========
  function animateOnScroll() {
    const advantagesItems = document.querySelectorAll(".advantages__item");
    const advantagesSection = document.querySelector(".advantages");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            advantagesSection.classList.add("loading");
            advantagesItems.forEach((item) => {
              item.classList.add("animate");
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (advantagesSection) {
      observer.observe(advantagesSection);
    }
  }
  animateOnScroll();

  // ========== САКУРА 🌸 ==========
  const sakuraContainer = document.getElementById("sakura");

  // отключаем на мобилках
  if (sakuraContainer && window.innerWidth > 768) {
    const PETAL_COUNT = window.innerWidth > 1400 ? 20 : 14;
    const petals = [];

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createPetal() {
      const petal = document.createElement("div");
      petal.className = "sakura-petal";

      const size = random(14, 22);
      petal.style.width = size + "px";
      petal.style.height = size * 0.6 + "px";

      petal.x = random(0, window.innerWidth);
      petal.y = random(-window.innerHeight, 0);
      petal.speedY = random(0.6, 1.4);
      petal.speedX = random(-0.4, 0.4);
      petal.rotate = random(0, 360);
      petal.rotateSpeed = random(-1, 1);
      petal.opacity = random(0.5, 1);

      petal.style.opacity = petal.opacity;
      petal.style.transition = "opacity 1s";

      sakuraContainer.appendChild(petal);
      petals.push(petal);
    }

    function updatePetals() {
      petals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.x += petal.speedX;
        petal.rotate += petal.rotateSpeed;

        petal.style.transform = `
                    translate(${petal.x}px, ${petal.y}px)
                    rotate(${petal.rotate}deg)
                `;

        // если улетел вниз — плавно исчезает и возвращается
        if (petal.y > window.innerHeight + 50) {
          petal.style.opacity = 0;

          setTimeout(() => {
            petal.y = random(-200, -50);
            petal.x = random(0, window.innerWidth);
            petal.style.opacity = petal.opacity;
          }, 1000);
        }
      });

      requestAnimationFrame(updatePetals);
    }

    // порывы ветра 🌬
    setInterval(() => {
      petals.forEach((petal) => {
        petal.speedX += random(-0.2, 0.2);
      });
    }, 4000);

    // создаём лепестки
    for (let i = 0; i < PETAL_COUNT; i++) {
      createPetal();
    }

    updatePetals();
  }
});
