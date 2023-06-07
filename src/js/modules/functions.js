import flatpickr from 'flatpickr';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate.js';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import Choices from 'choices.js';

export function isWebp() {
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

// (gist - b47008824b0175d587f9acbc51892319)

export const anchors = () => {
  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
};

export const burger = () => {
  if (document.querySelector('.header-body__burger')) {
    const openBtn = document.querySelector('.header-body__burger');
    const menu = document.querySelector('.header-body__nav');
    const header = document.querySelector('.header');
    const body = document.querySelector('body');

    let toggleBurger = () => {
      if (openBtn.classList.contains('active')) {
        header.classList.remove('active');
        openBtn.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('lock');
      } else {
        header.classList.add('active');
        openBtn.classList.add('active');
        menu.classList.add('active');
        body.classList.add('lock');
      }
    };

    openBtn.addEventListener('click', toggleBurger);
  }
};

export const modal = () => {
  if (document.querySelector('.modal_booking')) {
    const openBtn = document.querySelectorAll('.modal_booking-btn');
    const modal = document.querySelector('.modal_booking');
    const body = document.querySelector('body');
    const content = document.querySelectorAll('.container');

    let toggleModal = (e) => {
      e.preventDefault();

      let div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      document.body.append(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;

      div.remove();

      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        body.classList.remove('lock');
        if (window.innerWidth > 992) {
          content.forEach((item) => {
            item.style.maxWidth = `1610px`;
            item.style.padding = ` 0 15px`;
          });
        }
      } else {
        modal.classList.add('active');
        body.classList.add('lock');
        if (window.innerWidth > 992) {
          content.forEach((item) => {
            item.style.maxWidth = `${1610 + scrollWidth}px`;
            item.style.padding = ` 0 ${scrollWidth + 15}px 0 15px`;
          });
        }
      }
    };

    openBtn.forEach((item) => {
      item.addEventListener('click', toggleModal);
    });

    modal.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('.modal__bg')) {
        toggleModal(event);
      } else if (target.closest('.modal-body__close')) {
        toggleModal(event);
      }
    });
  }
};

export const upBtn = () => {
  if (document.querySelector('#toTop')) {
    const btn = document.querySelector('#toTop');

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

export const openMoreMobile = () => {
  if (document.querySelector('.mobile-more-btn')) {
    const allMoreContent = document.querySelectorAll('.mobile-more-content');

    allMoreContent.forEach((item) => {
      item.addEventListener('click', (event) => {
        const { target } = event;

        if (target.closest('.mobile-more-btn')) {
          if (item.classList.contains('open')) {
            item.classList.remove('open');
          } else {
            item.classList.add('open');
          }
        }
      });
    });
  }
};

export const homepageMainDataPicker = () => {
  if (document.querySelector('#homepage-main-datapicker')) {
    const isMobie = window.innerWidth < 767;
    const btnClear = document.querySelector('#homepage-main-datapicker__clear');

    const homepageDatapicker = flatpickr('#homepage-main-datapicker', {
      mode: 'range',
      showMonths: isMobie ? 1 : 2,
      minDate: Date.now(),
      locale: Russian,
      wrap: true,

      plugins: [new confirmDatePlugin({})],
    });
  }
};

// export const supportDataPicker = () => {
//   if (document.querySelector('#support-datapicker')) {
//     const isMobie = window.innerWidth < 767;

//     flatpickr('#support-datapicker', {
//       mode: 'range',
//       showMonths: isMobie ? 1 : 2,
//       minDate: Date.now(),
//       locale: Russian,
//       inline: true,
//     });
//   }
// };

export const homepageSupportChat = () => {
  if (document.querySelector('.support_main')) {
    let step = 0;
    const support = document.querySelector('.support_main');
    const supportPhonePicked = support.querySelector('#support-phone-input');
    const supportNamePicked = support.querySelector('#support-name-input');
    const supportGuestPicked = support.querySelector(
      '#support-guest-container-picked'
    );
    const supportScroller = support.querySelector(
      '.support-content__container'
    );
    const supportDatePicked = support.querySelector(
      '#support-date-container-picked'
    );
    const supportSend = support.querySelector('.support-content__send');
    const supportSendForm = supportSend.querySelector('form');
    const supportMessages = support.querySelectorAll('._message');
    const isMobie = window.innerWidth < 767;

    const picker = document.querySelector('#support-guestpicker-item');
    const pickerBottom = picker.querySelector('.main-guestpicker__bottom');
    const pickerAdult = picker.querySelector('#support-guestpicker-value');
    const adultInput = pickerAdult.querySelector('input');
    let guestCount = 0;

    const addChild = (age) => {
      const childElement = document.createElement('div');
      childElement.classList.add('child');

      const childName = document.createElement('div');
      childName.classList.add('child-name');
      childName.innerText = 'Ребенок';

      const childAge = document.createElement('div');
      childAge.classList.add('child-age');
      childAge.innerText = age;

      const childBtn = document.createElement('div');
      childBtn.classList.add('child-btn');

      childBtn.addEventListener('click', () => {
        childElement.remove();
      });

      childElement.append(childName, childAge, childBtn);

      const childsContainer = picker.querySelector(
        '.main-guestpicker__content-childs'
      );
      childsContainer.append(childElement);
    };

    const selectChildAge = (position) => {
      const container = document.createElement('div');
      container.classList.add('main-guestpicker__content-age');

      const containerTitle = document.createElement('span');
      containerTitle.classList.add('_title');
      containerTitle.innerText = 'Укажите возраст ребенка';

      const containerAges = document.createElement('div');
      containerAges.classList.add('_ages');

      for (let index = 0; index < 14; index++) {
        const containerAgesItem = document.createElement('span');
        containerAgesItem.innerText = index + 1;
        containerAges.append(containerAgesItem);

        containerAgesItem.addEventListener('click', (event) => {
          const { target } = event;

          addChild(target.innerText);
          container.remove();
        });
      }

      container.append(containerTitle, containerAges);
      position.insertAdjacentElement('afterend', container);
    };

    picker.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('.main-guestpicker__content-add')) {
        if (!picker.querySelector('.main-guestpicker__content-age')) {
          selectChildAge(target.closest('.main-guestpicker__content-add'));
          pickerBottom.classList.remove('_hidden');
        }
      } else if (target.closest('#guest-picker-confirm')) {
        const childCount = picker.querySelectorAll('.child');
        guestCount = +adultInput.value + +childCount.length;
        pickerBottom.classList.add('_hidden');

        if (step <= 3) {
          nextStep();
        }

        if (guestCount === 1) {
          supportGuestPicked.innerText = `${guestCount} Гость`;
        } else if (guestCount <= 4) {
          supportGuestPicked.innerText = `${guestCount} Гостя`;
        } else if (guestCount > 4) {
          supportGuestPicked.innerText = `${guestCount} Гостей`;
        }
      }
    });
    pickerAdult.addEventListener('click', (event) => {
      const { target } = event;

      pickerBottom.classList.remove('_hidden');

      if (target.closest('._minus') && adultInput.value > 1) {
        adultInput.value--;
      } else if (target.closest('._plus')) {
        adultInput.value++;
      }
    });

    setTimeout(() => {
      nextStep();
    }, 1000);

    flatpickr('#support-datapicker', {
      mode: 'range',
      showMonths: isMobie ? 1 : 2,
      minDate: Date.now(),
      locale: Russian,
      inline: true,

      onValueUpdate: function (selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
          supportDatePicked.innerText = dateStr;
          if (step <= 1) {
            nextStep();
          }
        }
      },
    });

    supportSendForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const { target } = event;

      if (step === 5) {
        supportPhonePicked.innerText = target.querySelector('input').value;
      }
      if (step === 7) {
        supportNamePicked.innerText = target.querySelector('input').value;
      }

      nextStep();
      target.querySelector('input').value = '';
    });

    const nextStep = (num) => {
      if (step === 0) {
        supportMessages.forEach((item) => {
          item.classList.remove('_sent');
        });
        step++;
        supportMessages[step].classList.add('_sent');
      } else {
        step++;
        supportMessages[step].classList.add('_sent');

        if (step >= 5 && step < 9) {
          supportSend.classList.remove('_hidden');
        }
        if (step === 9) {
          supportSend.classList.add('_hidden');
        }
      }

      if (step % 2 === 0 && step > 0 && step < 9) {
        setTimeout(nextStep, 1000);
      }

      supportScroller.scrollTo({ top: 1000000, behavior: 'smooth' });
    };
  }
};

export const roomsSupportChat = () => {
  if (document.querySelector('.support_rooms')) {
    let step = 0;
    const support = document.querySelector('.support_rooms');
    const supportPhonePicked = support.querySelector('#support-phone-input');
    const supportNamePicked = support.querySelector('#support-name-input');
    const supportGuestPicked = support.querySelector(
      '#support-guest-container-picked'
    );
    const supportScroller = support.querySelector(
      '.support-content__container'
    );
    const supportDatePicked = support.querySelector(
      '#support-date-container-picked'
    );
    const supportSend = support.querySelector('.support-content__send');
    const supportSendForm = supportSend.querySelector('form');
    const supportMessages = support.querySelectorAll('._message');
    const isMobie = window.innerWidth < 767;

    const picker = document.querySelector('#support-guestpicker-item-rooms');
    const pickerBottom = picker.querySelector('.main-guestpicker__bottom');
    const pickerAdult = picker.querySelector('#support-guestpicker-value');
    const adultInput = pickerAdult.querySelector('input');
    let guestCount = 0;

    const addChild = (age) => {
      const childElement = document.createElement('div');
      childElement.classList.add('child');

      const childName = document.createElement('div');
      childName.classList.add('child-name');
      childName.innerText = 'Ребенок';

      const childAge = document.createElement('div');
      childAge.classList.add('child-age');
      childAge.innerText = age;

      const childBtn = document.createElement('div');
      childBtn.classList.add('child-btn');

      childBtn.addEventListener('click', () => {
        childElement.remove();
      });

      childElement.append(childName, childAge, childBtn);

      const childsContainer = picker.querySelector(
        '.main-guestpicker__content-childs'
      );
      childsContainer.append(childElement);
    };

    const selectChildAge = (position) => {
      const container = document.createElement('div');
      container.classList.add('main-guestpicker__content-age');

      const containerTitle = document.createElement('span');
      containerTitle.classList.add('_title');
      containerTitle.innerText = 'Укажите возраст ребенка';

      const containerAges = document.createElement('div');
      containerAges.classList.add('_ages');

      for (let index = 0; index < 14; index++) {
        const containerAgesItem = document.createElement('span');
        containerAgesItem.innerText = index + 1;
        containerAges.append(containerAgesItem);

        containerAgesItem.addEventListener('click', (event) => {
          const { target } = event;

          addChild(target.innerText);
          container.remove();
        });
      }

      container.append(containerTitle, containerAges);
      position.insertAdjacentElement('afterend', container);
    };

    picker.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('.main-guestpicker__content-add')) {
        if (!picker.querySelector('.main-guestpicker__content-age')) {
          selectChildAge(target.closest('.main-guestpicker__content-add'));
          pickerBottom.classList.remove('_hidden');
        }
      } else if (target.closest('#guest-picker-confirm')) {
        const childCount = picker.querySelectorAll('.child');
        guestCount = +adultInput.value + +childCount.length;
        pickerBottom.classList.add('_hidden');

        if (step <= 3) {
          nextStep();
        }

        if (guestCount === 1) {
          supportGuestPicked.innerText = `${guestCount} Гость`;
        } else if (guestCount <= 4) {
          supportGuestPicked.innerText = `${guestCount} Гостя`;
        } else if (guestCount > 4) {
          supportGuestPicked.innerText = `${guestCount} Гостей`;
        }
      }
    });
    pickerAdult.addEventListener('click', (event) => {
      const { target } = event;

      pickerBottom.classList.remove('_hidden');

      if (target.closest('._minus') && adultInput.value > 1) {
        adultInput.value--;
      } else if (target.closest('._plus')) {
        adultInput.value++;
      }
    });

    setTimeout(() => {
      nextStep();
    }, 1000);

    flatpickr('#support-datapicker', {
      mode: 'range',
      showMonths: isMobie ? 1 : 2,
      minDate: Date.now(),
      locale: Russian,
      inline: true,

      onValueUpdate: function (selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
          supportDatePicked.innerText = dateStr;
          if (step <= 1) {
            nextStep();
          }
        }
      },
    });

    supportSendForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const { target } = event;

      if (step === 5) {
        supportPhonePicked.innerText = target.querySelector('input').value;
      }
      if (step === 7) {
        supportNamePicked.innerText = target.querySelector('input').value;
      }

      nextStep();
      target.querySelector('input').value = '';
    });

    const nextStep = (num) => {
      if (step === 0) {
        supportMessages.forEach((item) => {
          item.classList.remove('_sent');
        });
        step++;
        supportMessages[step].classList.add('_sent');
      } else {
        step++;
        supportMessages[step].classList.add('_sent');

        if (step >= 5 && step < 9) {
          supportSend.classList.remove('_hidden');
        }
        if (step === 9) {
          supportSend.classList.add('_hidden');
        }
      }

      if (step % 2 === 0 && step > 0 && step < 9) {
        setTimeout(nextStep, 1000);
      }

      supportScroller.scrollTo({ top: 1000000, behavior: 'smooth' });
    };
  }
};

export const mobileSupportChat = () => {
  if (document.querySelector('.support_mobile')) {
    let step = 0;
    const support = document.querySelector('.support_mobile');
    const supportPhonePicked = support.querySelector('#support-phone-input');
    const supportNamePicked = support.querySelector('#support-name-input');
    const supportGuestPicked = support.querySelector(
      '#support-guest-container-picked'
    );
    const supportScroller = support.querySelector(
      '.support-content__container'
    );
    const supportDatePicked = support.querySelector(
      '#support-date-container-picked'
    );
    const supportSend = support.querySelector('.support-content__send');
    const supportSendForm = supportSend.querySelector('form');
    const supportMessages = support.querySelectorAll('._message');
    const isMobie = window.innerWidth < 767;

    const picker = document.querySelector('#support-guestpicker-item-rooms');
    const pickerBottom = picker.querySelector('.main-guestpicker__bottom');
    const pickerAdult = picker.querySelector('#support-guestpicker-value');
    const adultInput = pickerAdult.querySelector('input');
    let guestCount = 0;

    const addChild = (age) => {
      const childElement = document.createElement('div');
      childElement.classList.add('child');

      const childName = document.createElement('div');
      childName.classList.add('child-name');
      childName.innerText = 'Ребенок';

      const childAge = document.createElement('div');
      childAge.classList.add('child-age');
      childAge.innerText = age;

      const childBtn = document.createElement('div');
      childBtn.classList.add('child-btn');

      childBtn.addEventListener('click', () => {
        childElement.remove();
      });

      childElement.append(childName, childAge, childBtn);

      const childsContainer = picker.querySelector(
        '.main-guestpicker__content-childs'
      );
      childsContainer.append(childElement);
    };

    const selectChildAge = (position) => {
      const container = document.createElement('div');
      container.classList.add('main-guestpicker__content-age');

      const containerTitle = document.createElement('span');
      containerTitle.classList.add('_title');
      containerTitle.innerText = 'Укажите возраст ребенка';

      const containerAges = document.createElement('div');
      containerAges.classList.add('_ages');

      for (let index = 0; index < 14; index++) {
        const containerAgesItem = document.createElement('span');
        containerAgesItem.innerText = index + 1;
        containerAges.append(containerAgesItem);

        containerAgesItem.addEventListener('click', (event) => {
          const { target } = event;

          addChild(target.innerText);
          container.remove();
        });
      }

      container.append(containerTitle, containerAges);
      position.insertAdjacentElement('afterend', container);
    };

    picker.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('.main-guestpicker__content-add')) {
        if (!picker.querySelector('.main-guestpicker__content-age')) {
          selectChildAge(target.closest('.main-guestpicker__content-add'));
          pickerBottom.classList.remove('_hidden');
        }
      } else if (target.closest('#guest-picker-confirm')) {
        const childCount = picker.querySelectorAll('.child');
        guestCount = +adultInput.value + +childCount.length;
        pickerBottom.classList.add('_hidden');

        if (step <= 3) {
          nextStep();
        }

        if (guestCount === 1) {
          supportGuestPicked.innerText = `${guestCount} Гость`;
        } else if (guestCount <= 4) {
          supportGuestPicked.innerText = `${guestCount} Гостя`;
        } else if (guestCount > 4) {
          supportGuestPicked.innerText = `${guestCount} Гостей`;
        }
      }
    });
    pickerAdult.addEventListener('click', (event) => {
      const { target } = event;

      pickerBottom.classList.remove('_hidden');

      if (target.closest('._minus') && adultInput.value > 1) {
        adultInput.value--;
      } else if (target.closest('._plus')) {
        adultInput.value++;
      }
    });

    setTimeout(() => {
      nextStep();
    }, 1000);

    flatpickr('#support-datapicker', {
      mode: 'range',
      showMonths: isMobie ? 1 : 2,
      minDate: Date.now(),
      locale: Russian,
      inline: true,

      onValueUpdate: function (selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
          supportDatePicked.innerText = dateStr;
          if (step <= 1) {
            nextStep();
          }
        }
      },
    });

    supportSendForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const { target } = event;

      if (step === 5) {
        supportPhonePicked.innerText = target.querySelector('input').value;
      }
      if (step === 7) {
        supportNamePicked.innerText = target.querySelector('input').value;
      }

      nextStep();
      target.querySelector('input').value = '';
    });

    const nextStep = (num) => {
      if (step === 0) {
        supportMessages.forEach((item) => {
          item.classList.remove('_sent');
        });
        step++;
        supportMessages[step].classList.add('_sent');
      } else {
        step++;
        supportMessages[step].classList.add('_sent');

        if (step >= 5 && step < 9) {
          supportSend.classList.remove('_hidden');
        }
        if (step === 9) {
          supportSend.classList.add('_hidden');
        }
      }

      if (step % 2 === 0 && step > 0 && step < 9) {
        setTimeout(nextStep, 1000);
      }

      supportScroller.scrollTo({ top: 1000000, behavior: 'smooth' });
    };
  }
};

export const homepageMainGuestPicker = () => {
  if (document.querySelector('#homepage-main-guestpicker-item')) {
    const btn = document.querySelector('#homepage-main-guestpicker-btn');
    const picker = document.querySelector('#homepage-main-guestpicker-item');
    const pickerAdult = document.querySelector('#main-guestpicker-value');
    const pickerClear = document.querySelector(
      '#homepage-guestpicker-btn-clear'
    );
    const adultInput = pickerAdult.querySelector('input');
    let guestCount = 0;

    const togglePicker = (type) => {
      if (type === 'close') {
        picker.classList.remove('active');
        pickerClear.classList.remove('_visible');
      } else {
        if (picker.classList.contains('active')) {
          picker.classList.remove('active');
          pickerClear.classList.remove('_visible');
        } else {
          picker.classList.add('active');
          pickerClear.classList.add('_visible');
        }
      }
    };

    const addChild = (age) => {
      const childElement = document.createElement('div');
      childElement.classList.add('child');

      const childName = document.createElement('div');
      childName.classList.add('child-name');
      childName.innerText = 'Ребенок';

      const childAge = document.createElement('div');
      childAge.classList.add('child-age');
      childAge.innerText = age;

      const childBtn = document.createElement('div');
      childBtn.classList.add('child-btn');

      childBtn.addEventListener('click', () => {
        childElement.remove();
      });

      childElement.append(childName, childAge, childBtn);

      const childsContainer = picker.querySelector(
        '.main-guestpicker__content-childs'
      );
      childsContainer.append(childElement);
    };

    const selectChildAge = (position) => {
      const container = document.createElement('div');
      container.classList.add('main-guestpicker__content-age');

      const containerTitle = document.createElement('span');
      containerTitle.classList.add('_title');
      containerTitle.innerText = 'Укажите возраст ребенка';

      const containerAges = document.createElement('div');
      containerAges.classList.add('_ages');

      for (let index = 0; index < 14; index++) {
        const containerAgesItem = document.createElement('span');
        containerAgesItem.innerText = index + 1;
        containerAges.append(containerAgesItem);

        containerAgesItem.addEventListener('click', (event) => {
          const { target } = event;

          addChild(target.innerText);
          container.remove();
        });
      }

      container.append(containerTitle, containerAges);
      position.insertAdjacentElement('afterend', container);
    };

    window.addEventListener(
      'click',
      (event) => {
        const withinBoundaries = event.composedPath().includes(picker);

        if (!withinBoundaries) {
          togglePicker('close');
        }
      },
      true
    );
    pickerClear.addEventListener('click', () => {
      guestCount = 0;
      btn.value = '';
    });
    btn.addEventListener('click', togglePicker);
    picker.addEventListener('mouseleave', () => togglePicker('close'));
    picker.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('.main-guestpicker__content-add')) {
        if (!picker.querySelector('.main-guestpicker__content-age')) {
          selectChildAge(target.closest('.main-guestpicker__content-add'));
        }
      } else if (target.closest('#guest-picker-confirm')) {
        const childCount = picker.querySelectorAll('.child');
        guestCount = +adultInput.value + +childCount.length;
        togglePicker();

        if (guestCount === 1) {
          btn.value = `${guestCount} Гость`;
        } else if (guestCount <= 4) {
          btn.value = `${guestCount} Гостя`;
        } else if (guestCount > 4) {
          btn.value = `${guestCount} Гостей`;
        }
      }
    });
    pickerAdult.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('._minus') && adultInput.value > 1) {
        adultInput.value--;
      } else if (target.closest('._plus')) {
        adultInput.value++;
      }
    });
  }
};

// export const supportGuestPicker = () => {
//   if (document.querySelector('#support-guestpicker-item')) {
//     const picker = document.querySelector('#support-guestpicker-item');
//     const pickerAdult = document.querySelector('#support-guestpicker-value');
//     const adultInput = pickerAdult.querySelector('input');
//     let guestCount = 0;

//     const addChild = (age) => {
//       const childElement = document.createElement('div');
//       childElement.classList.add('child');

//       const childName = document.createElement('div');
//       childName.classList.add('child-name');
//       childName.innerText = 'Ребенок';

//       const childAge = document.createElement('div');
//       childAge.classList.add('child-age');
//       childAge.innerText = age;

//       const childBtn = document.createElement('div');
//       childBtn.classList.add('child-btn');

//       childBtn.addEventListener('click', () => {
//         childElement.remove();
//       });

//       childElement.append(childName, childAge, childBtn);

//       const childsContainer = picker.querySelector(
//         '.main-guestpicker__content-childs'
//       );
//       childsContainer.append(childElement);
//     };

//     const selectChildAge = (position) => {
//       const container = document.createElement('div');
//       container.classList.add('main-guestpicker__content-age');

//       const containerTitle = document.createElement('span');
//       containerTitle.classList.add('_title');
//       containerTitle.innerText = 'Укажите возраст ребенка';

//       const containerAges = document.createElement('div');
//       containerAges.classList.add('_ages');

//       for (let index = 0; index < 14; index++) {
//         const containerAgesItem = document.createElement('span');
//         containerAgesItem.innerText = index + 1;
//         containerAges.append(containerAgesItem);

//         containerAgesItem.addEventListener('click', (event) => {
//           const { target } = event;

//           addChild(target.innerText);
//           container.remove();
//         });
//       }

//       container.append(containerTitle, containerAges);
//       position.insertAdjacentElement('afterend', container);
//     };

//     picker.addEventListener('click', (event) => {
//       const { target } = event;

//       if (target.closest('.main-guestpicker__content-add')) {
//         if (!picker.querySelector('.main-guestpicker__content-age')) {
//           selectChildAge(target.closest('.main-guestpicker__content-add'));
//         }
//       } else if (target.closest('#guest-picker-confirm')) {
//         const childCount = picker.querySelectorAll('.child');
//         guestCount = +adultInput.value + +childCount.length;

//         // if (guestCount === 1) {
//         //   btn.value = `${guestCount} Гость`;
//         // } else if (guestCount <= 4) {
//         //   btn.value = `${guestCount} Гостя`;
//         // } else if (guestCount > 4) {
//         //   btn.value = `${guestCount} Гостей`;
//         // }
//       }
//     });
//     pickerAdult.addEventListener('click', (event) => {
//       const { target } = event;

//       if (target.closest('._minus') && adultInput.value > 1) {
//         adultInput.value--;
//       } else if (target.closest('._plus')) {
//         adultInput.value++;
//       }
//     });
//   }
// };

export const modalGuestPicker = () => {
  if (document.querySelector('#modal-guestpicker-item')) {
    const btn = document.querySelector('#modal-guestpicker-btn');
    const picker = document.querySelector('#modal-guestpicker-item');
    const pickerClear = document.querySelector('#modal-guestpicker-btn-clear');
    const pickerAdult = document.querySelector(
      '.modal-guestpicker__content-value'
    );
    const adultInput = pickerAdult.querySelector('input');
    let guestCount = 0;

    const togglePicker = (type) => {
      if (type === 'close') {
        picker.classList.remove('active');
        pickerClear.classList.remove('_visible');
      } else {
        if (picker.classList.contains('active')) {
          picker.classList.remove('active');
          pickerClear.classList.remove('_visible');
        } else {
          picker.classList.add('active');
          pickerClear.classList.add('_visible');
        }
      }
    };

    const addChild = (age) => {
      const childElement = document.createElement('div');
      childElement.classList.add('child');

      const childName = document.createElement('div');
      childName.classList.add('child-name');
      childName.innerText = 'Ребенок';

      const childAge = document.createElement('div');
      childAge.classList.add('child-age');
      childAge.innerText = age;

      const childBtn = document.createElement('div');
      childBtn.classList.add('child-btn');

      childBtn.addEventListener('click', () => {
        childElement.remove();
      });

      childElement.append(childName, childAge, childBtn);

      const childsContainer = picker.querySelector(
        '.modal-guestpicker__content-childs'
      );
      childsContainer.append(childElement);
    };

    const selectChildAge = (position) => {
      const container = document.createElement('div');
      container.classList.add('modal-guestpicker__content-age');

      const containerTitle = document.createElement('span');
      containerTitle.classList.add('_title');
      containerTitle.innerText = 'Укажите возраст ребенка';

      const containerAges = document.createElement('div');
      containerAges.classList.add('_ages');

      for (let index = 0; index < 14; index++) {
        const containerAgesItem = document.createElement('span');
        containerAgesItem.innerText = index + 1;
        containerAges.append(containerAgesItem);

        containerAgesItem.addEventListener('click', (event) => {
          const { target } = event;

          addChild(target.innerText);
          container.remove();
        });
      }

      container.append(containerTitle, containerAges);
      position.insertAdjacentElement('afterend', container);
    };

    window.addEventListener(
      'click',
      (event) => {
        const withinBoundaries = event.composedPath().includes(picker);

        if (!withinBoundaries) {
          togglePicker('close');
        }
      },
      true
    );
    pickerClear.addEventListener('click', () => {
      guestCount = 0;
      btn.value = '';
    });
    btn.addEventListener('click', togglePicker);
    picker.addEventListener('mouseleave', () => togglePicker('close'));
    picker.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('.modal-guestpicker__content-add')) {
        if (!picker.querySelector('.modal-guestpicker__content-age')) {
          selectChildAge(target.closest('.modal-guestpicker__content-add'));
        }
      } else if (target.closest('#guest-picker-confirm')) {
        const childCount = picker.querySelectorAll('.child');
        guestCount = +adultInput.value + +childCount.length;
        togglePicker();

        if (guestCount === 1) {
          btn.value = `${guestCount} Гость`;
        } else if (guestCount <= 4) {
          btn.value = `${guestCount} Гостя`;
        } else if (guestCount > 4) {
          btn.value = `${guestCount} Гостей`;
        }
      }
    });
    pickerAdult.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('._minus') && adultInput.value > 1) {
        adultInput.value--;
      } else if (target.closest('._plus')) {
        adultInput.value++;
      }
    });
  }
};

export const homepageMainRoomPicker = () => {
  if (document.querySelector('.main-booking__item_select')) {
    const element = document.querySelector('.main-booking__item_select');
    const choices = new Choices(element, {
      searchEnabled: false,
      removeItemButton: true,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices main-booking__item main-booking__item_select',
      },
    });
  }
};

export const modalRoomPicker = () => {
  if (document.querySelector('.modal-booking__item_select')) {
    const element = document.querySelector('.modal-booking__item_select');
    const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: '',
      removeItemButton: true,
      classNames: {
        containerOuter: 'choices main-booking__item modal-booking__item_select',
      },
    });
  }
};

export const supportMain = () => {
  if (document.querySelector('.support_main')) {
    let chatWasOpened = false;
    const primartBlock = document.querySelector('.about');
    const support = document.querySelector('.support_main');
    const supportBg = support.querySelector('.support__bg');
    const btn = support.querySelector('.support-top');

    const toggleSupport = (type) => {
      if (!chatWasOpened) {
        homepageSupportChat();
        chatWasOpened = true;
      }

      if (support.classList.contains('active')) {
        support.classList.remove('active');
        primartBlock.classList.remove('active');
      } else {
        support.classList.add('active');
        primartBlock.classList.add('active');
      }

      if (type === 'close') {
        support.classList.remove('active');
      }
    };

    btn.addEventListener('click', toggleSupport);
    supportBg.addEventListener('click', () => toggleSupport('close'));
  }
};

export const supportRooms = () => {
  if (document.querySelector('.support_rooms')) {
    // const primartBlock = document.querySelector('.rooms');
    // const support = document.querySelector('.support_rooms');
    // const supportBg = support.querySelector('.support__bg');
    // const btn = support.querySelector('.support-top');

    // const toggleSupport = (type) => {
    //   if (support.classList.contains('active')) {
    //     support.classList.remove('active');
    //     primartBlock.classList.remove('active');
    //   } else {
    //     support.classList.add('active');
    //     primartBlock.classList.add('active');
    //   }

    //   if (type === 'close') {
    //     support.classList.remove('active');
    //   }
    // };

    // btn.addEventListener('click', toggleSupport);
    // supportBg.addEventListener('click', () => toggleSupport('close'));

    let chatWasOpened = false;
    const primartBlock = document.querySelector('.rooms');
    const support = document.querySelector('.support_rooms');
    const supportBg = support.querySelector('.support__bg');
    const btn = support.querySelector('.support-top');

    const toggleSupport = (type) => {
      if (!chatWasOpened) {
        roomsSupportChat();
        chatWasOpened = true;
      }

      if (support.classList.contains('active')) {
        support.classList.remove('active');
        primartBlock.classList.remove('active');
      } else {
        support.classList.add('active');
        primartBlock.classList.add('active');
      }

      if (type === 'close') {
        support.classList.remove('active');
      }
    };

    btn.addEventListener('click', toggleSupport);
    supportBg.addEventListener('click', () => toggleSupport('close'));
  }
};

export const homepageModalWithDataGuestPicker = () => {
  if (document.querySelector('#modal-guestpicker-item-withdata')) {
    const btn = document.querySelector('#modal-guestpicker-item-withdata-btn');
    const picker = document.querySelector('#modal-guestpicker-item-withdata');
    const pickerClear = document.querySelector(
      '#modal-guestpicker-item-withdata-btn-clear'
    );
    const pickerAdult = picker.querySelector(
      '.modal-guestpicker__content-value'
    );
    const adultInput = pickerAdult.querySelector('input');
    let guestCount = 0;

    const togglePicker = (type) => {
      if (type === 'close') {
        picker.classList.remove('active');
        pickerClear.classList.remove('_visible');
      } else {
        if (picker.classList.contains('active')) {
          picker.classList.remove('active');
          pickerClear.classList.remove('_visible');
        } else {
          picker.classList.add('active');
          pickerClear.classList.add('_visible');
        }
      }
    };

    const addChild = (age) => {
      const childElement = document.createElement('div');
      childElement.classList.add('child');

      const childName = document.createElement('div');
      childName.classList.add('child-name');
      childName.innerText = 'Ребенок';

      const childAge = document.createElement('div');
      childAge.classList.add('child-age');
      childAge.innerText = age;

      const childBtn = document.createElement('div');
      childBtn.classList.add('child-btn');

      childBtn.addEventListener('click', () => {
        childElement.remove();
      });

      childElement.append(childName, childAge, childBtn);

      const childsContainer = picker.querySelector(
        '.modal-guestpicker__content-childs'
      );
      childsContainer.append(childElement);
    };

    const selectChildAge = (position) => {
      const container = document.createElement('div');
      container.classList.add('modal-guestpicker__content-age');

      const containerTitle = document.createElement('span');
      containerTitle.classList.add('_title');
      containerTitle.innerText = 'Укажите возраст ребенка';

      const containerAges = document.createElement('div');
      containerAges.classList.add('_ages');

      for (let index = 0; index < 14; index++) {
        const containerAgesItem = document.createElement('span');
        containerAgesItem.innerText = index + 1;
        containerAges.append(containerAgesItem);

        containerAgesItem.addEventListener('click', (event) => {
          const { target } = event;

          addChild(target.innerText);
          container.remove();
        });
      }

      container.append(containerTitle, containerAges);
      position.insertAdjacentElement('afterend', container);
    };

    window.addEventListener(
      'click',
      (event) => {
        const withinBoundaries = event.composedPath().includes(picker);

        if (!withinBoundaries) {
          togglePicker('close');
        }
      },
      true
    );
    pickerClear.addEventListener('click', () => {
      guestCount = 0;
      btn.value = '';
    });
    btn.addEventListener('click', togglePicker);
    picker.addEventListener('mouseleave', () => togglePicker('close'));
    picker.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('.modal-guestpicker__content-add')) {
        if (!picker.querySelector('.modal-guestpicker__content-age')) {
          selectChildAge(target.closest('.modal-guestpicker__content-add'));
        }
      } else if (target.closest('#guest-picker-confirm')) {
        const childCount = picker.querySelectorAll('.child');
        guestCount = +adultInput.value + +childCount.length;
        togglePicker();

        if (guestCount === 1) {
          btn.value = `${guestCount} Гость`;
        } else if (guestCount <= 4) {
          btn.value = `${guestCount} Гостя`;
        } else if (guestCount > 4) {
          btn.value = `${guestCount} Гостей`;
        }
      }
    });
    pickerAdult.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('._minus') && adultInput.value > 1) {
        adultInput.value--;
      } else if (target.closest('._plus')) {
        adultInput.value++;
      }
    });
  }
};

export const homepageModalWithDataRoomPicker = () => {
  if (document.querySelector('.modal-booking__item_select_withdata')) {
    const element = document.querySelector(
      '.modal-booking__item_select_withdata'
    );
    const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: '',
      removeItemButton: true,
      classNames: {
        containerOuter:
          'choices main-booking__item modal-booking__item_select_withdata',
      },
    });

    choices.setValue([{ value: 'One', label: 'Label One' }]);
  }
};

export const homepageBooking = () => {
  if (document.querySelector('#homepage-booking-form-btn')) {
    const openBtn = document.querySelectorAll('#homepage-booking-form-btn');
    const modal = document.querySelector('.modal_booking_withdata');
    const body = document.querySelector('body');
    const content = document.querySelectorAll('.container');
    const dataValueInner = document.querySelector(
      '.homepage-datapicker-inner input'
    );
    const modalDataValue = modal.querySelector(
      '.main-booking__item_input input'
    );
    const guestValueInner = document.querySelector(
      '#homepage-main-guestpicker-btn'
    );
    const guestDataValue = modal.querySelector(
      '#modal-guestpicker-item-withdata-btn'
    );

    const element = document.querySelector(
      '.modal-booking__item_select_withdata'
    );
    const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: '',
      removeItemButton: true,
      classNames: {
        containerOuter:
          'choices main-booking__item modal-booking__item_select_withdata',
      },
    });

    let toggleModal = (e) => {
      e.preventDefault();

      modalDataValue.value = dataValueInner.value;
      guestDataValue.value = guestValueInner.value;

      const roomSelect = document
        .querySelector('.main-booking__item_select')
        .querySelector('.choices__item--selectable');

      if (roomSelect.dataset.value !== false) {
        choices.setChoiceByValue(roomSelect.dataset.value);
      }

      let div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      document.body.append(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;

      div.remove();

      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        body.classList.remove('lock');
        if (window.innerWidth > 992) {
          content.forEach((item) => {
            item.style.maxWidth = `1610px`;
            item.style.padding = ` 0 15px`;
          });
        }
      } else {
        modal.classList.add('active');
        body.classList.add('lock');
        if (window.innerWidth > 992) {
          content.forEach((item) => {
            item.style.maxWidth = `${1610 + scrollWidth}px`;
            item.style.padding = ` 0 ${scrollWidth + 15}px 0 15px`;
          });
        }
      }
    };

    openBtn.forEach((item) => {
      item.addEventListener('click', toggleModal);
    });

    modal.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('.modal__bg')) {
        toggleModal(event);
      } else if (target.closest('.modal-body__close')) {
        toggleModal(event);
      }
    });
  }
};
