$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // section-01
  const section01Swiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 5000,
    slidesPerView: 'auto',
    spaceBetween: 0,
    allowTouchMove: false,
  });

  const heroAnimation = gsap.timeline();

  heroAnimation.to('#pass-image', {
    transform: 'translate3d(-50%, -50%, 0) scale(1.5)',
    opacity: 1,
    top: '23%',
    duration: 0.3,
    ease: 'power2.in',
  }).to('#hero-ani-01', {
    scale: 1,
    opacity: 1,
    ease: 'back.out(1.7)',
    duration: 0.5,
  }).to('#hero-ani-02', {
    scale: 1,
    opacity: 1,
    ease: 'back.out(1.7)',
    duration: 0.5,
  }).to('#hero-ani-03', {
    scale: 1,
    opacity: 1,
    ease: 'back.out(1.7)',
    duration: 0.5,
  }).to('#hero-ani-04', {
    scale: 1,
    opacity: 1,
    ease: 'back.out(1.7)',
    duration: 0.5,
  });

  // section-03
  const section03Animation = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-03 .section-container',
      pin: false,
      start: 'top top',
    },
  });

  const number01 = {
    percent: 0,
  };
  const number02 = {
    users: 0,
  };

  const number03 = {
    value: 0,
  };

  const count01 = document.getElementById('section-03-count-01');
  const count02 = document.getElementById('section-03-count-02');
  const count03 = document.getElementById('section-03-count-03');

  section03Animation.to('.section-03-ani-01', {
    opacity: 1,
    duration: 1,
  }).to('.section-03-ani-02', {
    opacity: 1,
    duration: 0.5,
  }).to(number01, {
    percent: 85.7,
    duration: 2,
    ease: 'power2.out',
    onUpdate: function () {
      if (number01.percent === 85.7) {
        count01.textContent = `${number01.percent}%`;
        return;
      }

      count01.textContent = `${Math.floor(number01.percent).toString()}%`;
    },
  }, 1).to(number02, {
    users: 150000,
    duration: 2,
    ease: 'power2.out',
    onUpdate: function () {
      count02.textContent = `${Math.floor(number02.users).toLocaleString()}명`;
    },
  }, 1).to(number03, {
    value: 75000000,
    duration: 2,
    ease: 'power2.out',
    onUpdate: function () {
      count03.textContent = `${Math.floor(number03.value).toLocaleString()}건`;
    },
  }, 1).to('#section-03-ani-03', {
    opacity: 1,
    duration: 0.1,
  }).to('#section-03-ani-04', {
    opacity: 1,
    duration: 0.1,
  }).to('#section-03-ani-05', {
    opacity: 1,
    duration: 0.1,
  }).to('.section-03-ani-06', {
    opacity: 1,
    duration: 1,
  });

  // section-05
  new Swiper('.section-05-swiper', {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 1500,
    slidesPerView: 1,
    spaceBetween: 20,
    allowTouchMove: false,
  });

  const section05Animation = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-05-mobile',
      pin: false,
      start: 'top top+=250',
      end: 'bottom bottom',
    },
  });

  section05Animation
    .to('.section-05-animation', {
    opacity: 1,
    ease: 'power2.inOut',
    duration: 0.5,
  }).to('.section-05-animation', {
    scale: 1.1,
    duration: 0.7,
    repeat: 3,
    yoyo: true,
    ease: 'power2.inOut',
  }, 0.3);

  // section-06

  var UniversityAnimation = UniversityAnimation || {};

  UniversityAnimation.init = function () {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Common = Matter.Common;

    var engine = Engine.create();
    var world = engine.world;

    engine.world.gravity.y = 0.8;
    engine.world.gravity.x = 0;

    var render = Render.create({
      element: document.getElementById('canvas-container'),
      engine: engine,
      options: {
        width: '100%',
        height: 0,
        wireframes: false,
        background: 'transparent',
        showAngleIndicator: false,
        showVelocity: false,
        showCollisions: false,
        showDebug: false,
      },
    });

    // 대학 이미지 추가
    var universityImages = [];
    for (var i = 1; i <= 40; i++) {
      universityImages.push(`../assets/images/universities/${i}.png`);
    }

    function createUniversityLogo(x, y, imagePath) {
      var logo = Bodies.rectangle(x, y, 60, 60, {
        render: {
          fillStyle: 'white',
          strokeStyle: '#ddd',
          lineWidth: 2,
        },
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.01,
      });

      var img = document.createElement('img');
      img.src = imagePath;
      img.style.width = '70px';
      img.style.height = '70px';
      img.style.objectFit = 'contain';
      img.style.borderRadius = '50%';
      img.style.position = 'absolute';
      img.style.pointerEvents = 'none';
      img.style.zIndex = '10';
      img.style.opacity = '1';

      logo.imageElement = img;
      document.getElementById('canvas-container').appendChild(img);

      return logo;
    }

    var logos = [];
    for (var i = 0; i < universityImages.length; i++) {
      var x = Common.random(100, 1340);
      var y = Common.random(-1000, -500);
      var logo = createUniversityLogo(x, y, universityImages[i]);
      logos.push(logo);
    }

    Composite.add(world, logos);

    var canvasContainer = document.getElementById('canvas-container');
    var containerHeight = canvasContainer.offsetHeight;

    var walls = [
      Bodies.rectangle(720, containerHeight + 25, 1440, 50, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
      Bodies.rectangle(-25, containerHeight / 2, 50, containerHeight, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
      Bodies.rectangle(1465, containerHeight / 2, 50, containerHeight, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
    ];

    Composite.add(world, walls);

    // 마우스 제약 조건
    var mouse = Mouse.create(render.canvas);
    var mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        damping: 0.3,
        length: 100,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // 렌더링 시작
    Render.run(render);
    var runner = Runner.create();
    Runner.run(runner, engine);

    // 이미지 위치 업데이트
    function updateImagePositions() {
      logos.forEach(function (logo) {
        if (logo.imageElement) {
          logo.imageElement.style.left = (logo.position.x - 25) + 'px';
          logo.imageElement.style.top = (logo.position.y - 25) + 'px';
          logo.imageElement.style.transform = 'rotate(' + logo.angle + 'rad)';
        }
      });
    }

    function animate() {
      updateImagePositions();
      requestAnimationFrame(animate);
    }

    animate();

    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      },
    };
  };

  gsap.to('.section-06-sub', {
    scrollTrigger: {
      trigger: '.section-06',
      start: 'top center',
      end: 'bottom bottom',
    },
    onStart: () => {
      if (!window.matterAnimation) {
        window.matterAnimation = UniversityAnimation.init();
      }
    },
    onLeave: () => {
      if (window.matterAnimation) {
        window.matterAnimation.stop();
        window.matterAnimation = null;
      }
    },
  });

  const cards = document.querySelectorAll('.stack-container .card');

  let currentIndex = 0;
  let autoPlayInterval;

  const carousel = document.getElementById('vertical-carousel');

  function updateCards() {
    cards.forEach((card, index) => {
      card.classList.remove('active', 'next', 'next-next', 'hidden');

      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex + 1) % cards.length) {
        card.classList.add('next');
      } else if (index === (currentIndex + 2) % cards.length) {
        card.classList.add('next-next');
      } else {
        card.classList.add('hidden');
      }
    });

    const firstChild = carousel.firstElementChild;
    const lastChild = carousel.lastElementChild;

    const preparedChild = lastChild.cloneNode(true);
    preparedChild.classList.add('prepared');

    carousel.insertBefore(preparedChild, firstChild);
    preparedChild.classList.add('expand');

    const lastItem = carousel.lastElementChild;
    carousel.removeChild(lastItem);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 3500);
  }

  updateCards();
  startAutoPlay();

  // section-06-sub
  const section06Sub = new Swiper('.banner-line-carousel', {
    loop: true,
    autoplay: {
      delay: 0,
    },
    speed: 5000,
    slidesPerView: 'auto',
    spaceBetween: 0,
    allowTouchMove: false,
  });

  // section-07
  const indicators = document.querySelectorAll('.section-07 .navigations .nav-item');

  function updateIndicator(currentIndex) {
    indicators.forEach((indicator, index) => {
      const title = indicator.querySelector('.title');
      const dot = indicator.querySelector('.dot');

      if (index === currentIndex) {
        title.classList.add('selected');
        dot.classList.add('selected');
        return;
      }

      title.classList.remove('selected');
      dot.classList.remove('selected');
    });
  }

  const section07Swiper = new Swiper('.section-07-swiper', {
    loop: true,
    autoplay: {
      delay: 2000,
    },
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 40,
    allowTouchMove: false,
    on: {
      init() {
        updateIndicator(this.realIndex)
      },
      slideChange() {
        updateIndicator(this.realIndex)
      },
    },
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      section07Swiper.slideToLoop(index);
      updateIndicator(index);
    });

    indicator.addEventListener('pointerenter', () => {
      section07Swiper.slideToLoop(index);
      updateIndicator(index);
    });
  });

  const leftNavigator = document.querySelector('.section-07 .left-navigator');
  const rightNavigator = document.querySelector('.section-07 .right-navigator');

  leftNavigator.addEventListener('click', () => {
    section07Swiper.slidePrev();
  });

  rightNavigator.addEventListener('click', () => {
    section07Swiper.slideNext();
  });

  new Swiper('.mobile-swiper', {
    loop: true,
    autoplay: {
      delay: 0,
    },
    speed: 5000,
    slidesPerView: 1,
    spaceBetween: 20,
    allowTouchMove: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  });

  // section-08
  const section08Swiper = new Swiper('.review-swiper', {
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 5000,
    slidesPerView: 'auto',
    spaceBetween: 0,
    allowTouchMove: false,
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 'auto',
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 'auto',
        spaceBetween: 22,
      },
    },
  });

  // section-09
  const section09Swiper = new Swiper('.result-swiper', {
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 5000,
    slidesPerView: 'auto',
    spaceBetween: 0,
    breakpoints: {
    },
  });

  function updateSlides(wrapperClass, slideClass) {
    const wrapper = document.querySelector(wrapperClass);
    const currentWidth = wrapper.clientWidth || window.innerWidth;

    let isFinish = false;

    while (!isFinish) {
      const slides = document.querySelectorAll(slideClass);
      const itemWidth = slides[0].clientWidth + parseInt(getComputedStyle(slides[0]).marginRight);

      if (currentWidth * 2 <= itemWidth * slides.length) {
        isFinish = true;
        return;
      }

      slides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        wrapper.appendChild(clone);
      });
    }
  }

  const heroSwiper = document.querySelector('.hero-swiper');
  // section-01
  // if (heroSwiper) {
  //   updateSlides('.hero-swiper .swiper-wrapper', '.review-swiper .swiper-slide');
  //   section01Swiper.update();
  // }

  // section-06-sub
  updateSlides('.section-06-sub .banner-line-carousel .swiper-wrapper', '.section-06-sub .banner-line-carousel .swiper-slide');
  section06Sub.update();

  // section-08
  updateSlides('.review-swiper .swiper-wrapper', '.review-swiper .swiper-slide');
  section08Swiper.update();

  // section-09
  updateSlides('.result-swiper .swiper-wrapper', '.result-swiper .swiper-slide');
  section09Swiper.update();


  let resizeTimeout;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {

      // if (heroSwiper) {
      //   updateSlides('.hero-swiper .swiper-wrapper', '.review-swiper .swiper-slide');
      //   section01Swiper.update();
      // }

      // section-06-sub
      updateSlides('.section-06-sub .banner-line-carousel .swiper-wrapper', '.section-06-sub .banner-line-carousel .swiper-slide');
      section06Sub.update();

      // section-08
      updateSlides('.review-swiper .swiper-wrapper', '.review-swiper .swiper-slide');
      section08Swiper.update();

      // section-09
      updateSlides('.result-swiper .swiper-wrapper', '.result-swiper .swiper-slide');
      section09Swiper.update();
    }, 300);
  });

  /* 모바일 대메뉴 토글 */
  if(window.innerWidth <=1024) {
    $('#header-container .mobile-navigation .category > p').click(function(){
      $(this).next('ul').toggle();
    })
  }
});
