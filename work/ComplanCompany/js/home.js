$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  const mediaQuery = window.matchMedia('(min-width: 1024px)');
  const isMobile = mediaQuery.matches;

  mediaQuery.addEventListener('change', () => {
    window.location.reload();
  });

  const initVideoId =  $('.played-video').data('youtube-id');
  const storySection = $('#stories');
  const storySectionBg = `linear-gradient(rgba(11, 22, 47, 0.95), rgba(11, 22, 47, 0.95)), url("https://img.youtube.com/vi/${initVideoId}/maxresdefault.jpg") no-repeat center center/cover`;
  storySection.css('background', storySectionBg);

  const storyList = $('.story-item');

  storyList.each(function () {
    const selectedVideoId = $(this).data('youtube-id');
    const videoUrl = `https://www.youtube.com/embed/${selectedVideoId}`;

    $(this).on('click', function () {
      $('.played-video').attr('src', videoUrl);

      storyList.each(function() {
        const videoId = $(this).data('youtube-id');

        if (videoId === selectedVideoId) {
          $(this).addClass('selected');
          return;
        }

        $(this).removeClass('selected');
      })

      storySection.css('background', `linear-gradient(rgba(11, 22, 47, 0.95), rgba(11, 22, 47, 0.95)), url("https://img.youtube.com/vi/${selectedVideoId}/maxresdefault.jpg") no-repeat center center/cover`);
    });

    if (initVideoId === selectedVideoId) {
      $(this).addClass('selected');
      return;
    }

    $(this).removeClass('selected');
  });

  emailjs.init({
    publicKey: 'DQJG8MixTimJe0jFi',
  });

  const contactForm = $('#contact-form');

  contactForm.on('submit', function (event) {
    event.preventDefault();

    const keywordCheck = $('input[name="keyword"]:checked').val();
    const agreeCheck = $('#agree').is(':checked');

    if (!keywordCheck) {
        alert('문의 내용과 관련된 키워드를 선택해 주세요.');
        return false;
    }

    if (!agreeCheck) {
        alert('개인정보 수집 및 이용에 동의해야 합니다.');
        return false;
    }

    const emailTemplate = {
      name: $('#writer').val(),
      company: $('#organization').val(),
      phoneNumber: $('#phone').val(),
      email: $('#email').val(),
      keyword: $('input[name="keyword"]:checked').val(),
      inquiry: $('#message').val(),
    };

    emailjs.send('service_eeht314', 'template_gy6qhb8', emailTemplate)
      .then(function() {
        contactForm.trigger('reset');
        alert('문의 내용이 성공적으로 전송되었습니다.');
      }, function () {
        alert('문의 내용 전송에 실패했습니다. 다시 시도해주세요.');
      });
  });

  const contactEmailButton = $('#contact-email');
  contactEmailButton.on('click', function (event) {
    event.preventDefault();

    navigator.clipboard.writeText('info@complan.co.kr')
      .then(() => { alert('이메일 주소가 복사되었습니다.'); })
  });

  const scrollTop = $('.scroll-top');

  if (scrollTop) {
    scrollTop.on('click', function() {
      $('html, body').animate({ scrollTop: 0 }, 0);
      return false;
    });
  }

  ScrollTrigger.create({
    trigger: '#header-panel',
    start: 'top top',
    end: 'bottom top',
    scrub: false,
    onLeave: () => { $('.scroll-top').css('display', 'block'); },
    onEnterBack: () => { $('.scroll-top').css('display', 'none'); },
  });

  gsap.to('#header-panel img', {
    scrollTrigger: {
      trigger: '#header-panel',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const viewport = window.innerWidth;
        const progress = self.progress;

        if (!$('#header .header-container').hasClass('transparent')) {
          $('#header .header-container').addClass('transparent');
        }

        const horizontalProgress = progress * 800;
        const verticalProgress = progress * 30;

        const widthRatio = viewport <= 1024 ? 0.8 : 0.7;
        const calcWidth = viewport - Math.min(widthRatio * viewport, 1344) - horizontalProgress;
        const horizontal = progress === 1 ? 0 : Math.max(0, calcWidth / 2);

        const initHeightValue = viewport <= 1024 ? 30 : 25;
        const calcHeight = initHeightValue - verticalProgress;
        const vertical = progress === 1 ? 0 : Math.max(0, calcHeight);

        $('#header-panel .header-panel-bg').css('clip-path', `inset(${vertical}% ${horizontal}px round 20px`);
      },
    },
    duration: 1,
  });

  $('.hooking-text').each(function () {
    const hookingText = $(this).text();
    const chars = hookingText.split('');
    $(this).empty();

    chars.forEach((char) => {
      $(this).append(`<span class="hooking-char-animation">${char}</span>`);
    });
  });

  const allChars = $('.hooking-char-animation').toArray();
  const charsCount = allChars.length;

  gsap.to({}, {
    scrollTrigger: {
      trigger: '#hooking',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        if ($('#header .header-container').hasClass('transparent')) {
          $('#header .header-container').removeClass('transparent');
        }

        const progress = Math.floor(self.progress * charsCount);

        const strongText = [65, 66, 67, 68, 69, 70, 71];
        allChars.forEach((char, index) => {
          if (index + 1 <= progress) {
            if (strongText.includes(index)) {
              $(char).css('color', '#206CFF');
            } else {
              $(char).css('color', '#000000');
            }
          } else {
            $(char).css('color', '#C4CDDF');
          }
        });
      },
    },
  });

  [1, 2, 3, 4].forEach((cardNumber) => {
    const card = $(`.feature-hover-${cardNumber}`);

    card.hover(
      function () {
        const isMobile = window.matchMedia('(max-width: 1024px)').matches;

        if (!isMobile) {
          // $(`.feature-hover-${cardNumber} .feature-more`).css('height', '100%');
        }
      },
      function () {
        const isMobile = window.matchMedia('(max-width: 1024px)').matches;

        if (!isMobile) {
          // $(`.feature-hover-${cardNumber} .feature-more`).css('height', '0');
        }
      });
  });

  gsap.utils.toArray('.feature-card').forEach((card, index) => {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    if (index === 1) {
      gsap.fromTo(card, {
        y: isMobile ? 30 : 130,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
        y: isMobile ? 0 : 80,
        opacity: 1,
        duration: 0.5,
      });

      return;
    }

    if (index === 3) {
      gsap.fromTo(card, {
        y: isMobile ? 30 : 130,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        y: isMobile ? 0 : 80,
        opacity: 1,
        duration: 1,
      });

      return;
    }

    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
        scrub: false,
      },
      y: isMobile ? 30 : 50,
      opacity: 0,
      duration: 1,
    });
  });

  const cultureGroup1StartDesktopX = ['50%', '10%', '-100%', '80%', '-50%', '-100%'];
  const cultureGroup1StartDesktopY = ['50%', '10%', '50%', '-100%', '-100%', '-50%'];

  const cultureGroup1StartMobileX = ['30%', '-50%', '-100%', '40%', '30%', '-15%'];
  const cultureGroup1StartMobileY = ['50%', '30%', '-50%', '-40%', '-230%', '-130%'];

  const cultureGroup1StartX = isMobile ? cultureGroup1StartMobileX : cultureGroup1StartDesktopX;
  const cultureGroup1StartY = isMobile ? cultureGroup1StartMobileY : cultureGroup1StartDesktopY;

  const cultureGroup2StartDesktopX = ['50%', '50%', '-50%', '-80%', '30%', '-100%'];
  const cultureGroup2StartDesktopY = ['50%', '100%', '50%', '150%', '-100%', '-100%'];

  const cultureGroup2StartMobileX = ['50%', '-40%', '0%', '-10%', '30%', '-60%'];
  const cultureGroup2StartMobileY = ['50%', '180%', '10%', '100%', '-150%', '-60%'];

  const cultureGroup2StartX = isMobile ? cultureGroup2StartMobileX : cultureGroup2StartDesktopX;
  const cultureGroup2StartY = isMobile ? cultureGroup2StartMobileY : cultureGroup2StartDesktopY;

  const cultureGroup3StartDesktopX = ['50%', '-30%', '-150%', '130%', '-100%'];
  const cultureGroup3StartDesktopY = ['100%', '0%', '100%', '-100%', '-50%'];

  const cultureGroup3StartMobileX = ['50%', '10%', '-100%', '50%', '-50%'];
  const cultureGroup3StartMobileY = ['100%', '0%', '50%', '-100%', '-50%'];

  const cultureGroup3StartX = isMobile ? cultureGroup3StartMobileX : cultureGroup3StartDesktopX;
  const cultureGroup3StartY = isMobile ? cultureGroup3StartMobileY : cultureGroup3StartDesktopY;

  const cultureAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: '#cultures',
      start: 'top top',
      end: '+=600%',
      scrub: true,
      pin: true,
    },
  });

  cultureAnimation.to('.culture-group1 img', {
    duration: 2,
    keyframes: [
      {
        opacity: 0,
        scale: 0.1,
        x: (i) => cultureGroup1StartX[i],
        y: (i) => cultureGroup1StartY[i],
        duration: 0,
      },
      { opacity: 1, scale: 1, x: '0%', y: '0%', duration: 1 },
      { opacity: 0, scale: 1.1, x: '0%', y: '0%', duration: 1 },
    ],
  })
    .to('.culture-group2 img', {
      duration: 2,
      keyframes: [
        {
          opacity: 0,
          scale: 0.1,
          x: (i) => cultureGroup2StartX[i],
          y: (i) => cultureGroup2StartY[i],
          duration: 0,
        },
        { opacity: 1, scale: 1, x: '0%', y: '0%', duration: 1 },
        { opacity: 0, scale: 1.1, x: '0%', y: '0%', duration: 1 },
      ],
    })
    .to('.culture-group3 img', {
      duration: 2,
      keyframes: [
        {
          opacity: 0,
          scale: 0.1,
          x: (i) => cultureGroup3StartX[i],
          y: (i) => cultureGroup3StartY[i],
          duration: 0,
        },
        { opacity: 1, scale: 1, x: '0%', y: '0%', duration: 1 },
      ],
    });

  gsap.utils.toArray('.crew').forEach((crew, index) => {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    if (isMobile) {
      return;
    }

    gsap.from(crew, {
      scrollTrigger: {
        trigger: crew,
        start: 'top bottom-=100',
        toggleActions: 'restart reset none reset',
        scrub: false,
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      delay: index * 0.3,
    });
  });

  gsap.from('#sub-text p', {
    scrollTrigger: {
      trigger: '#sub-text p',
      start: 'top bottom-=100',
      toggleActions: 'restart reset none reset',
      scrub: false,
    },
    y: 50,
    opacity: 0,
    duration: 0.5,
  });

  $('#stories .more').hover(function () {
    $('#stories .more img').attr('src', '../../assets/images/icons/arrow-upward-active.png');
  }, function () {
    $('#stories .more img').attr('src', '../../assets/images/icons/arrow-upward-grey.png');
  });

  gsap.from('#contact .contact-form', {
    scrollTrigger: {
      trigger: '#contact .contact-form',
      start: 'top bottom-=100',
      toggleActions: 'restart reset none reset',
      scrub: false,
    },
    y: 50,
    opacity: 0,
    duration: 0.5,
  });


  $('#contact #agree').on('click', function () {
    const isChecked = $(this).is(':checked');

    if (isChecked) {
      $('.checker').attr('src', '../../assets/images/icons/checked.png');
    } else {
      $('.checker').attr('src', '../../assets/images/icons/unchecked.png');
    }
  });
});

