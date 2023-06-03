import Swiper, { Navigation, Pagination } from 'swiper';

export const homepageAboutInfoSlider = () => {
  if (document.querySelector('.about-slider_info')) {
    const swiper = new Swiper('.about-slider_info', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 20,

      navigation: {
        prevEl: '.about-slider_info_prev',
        nextEl: '.about-slider_info_next',
      },

      pagination: {
        el: '.about-slider_info__pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return `<span>${String(current).padStart(2, '0')}</span>/${total}`;
        },
      },

      breakpoints: {
        992: {
          slidesPerView: 'auto',
        },
      },
    });
  }
};

export const homepageAboutServicesSlider = () => {
  if (document.querySelector('.about-slider_services')) {
    const swiper = new Swiper('.about-slider_services', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 20,

      navigation: {
        prevEl: '.about-slider_services_prev',
        nextEl: '.about-slider_services_next',
      },

      pagination: {
        el: '.about-slider_services__pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return `<span>${String(current).padStart(2, '0')}</span>/${total}`;
        },
      },

      breakpoints: {
        992: {
          slidesPerView: 'auto',
        },
      },
    });
  }
};

export const roomsItemSlider = () => {
  if (document.querySelector('.rooms-body__item-slider')) {
    const swiper = new Swiper('.rooms-body__item-slider', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 0,

      navigation: {
        prevEl: '.swiper-navigation__prev',
        nextEl: '.swiper-navigation__next',
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
};
