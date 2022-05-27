import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = this.createRibbon();
    this.createScrollEvents();
    this.createRibbonSelectCustomItem();
  }

  createRibbon() {
    let divRibbon = document.createElement('div');
    divRibbon.className = 'ribbon';

    let ribbonArrowLeft = document.createElement('button');
    ribbonArrowLeft.classList.add('ribbon__arrow');
    ribbonArrowLeft.classList.add('ribbon__arrow_left');

    let imgArrowLeft = document.createElement('img');
    imgArrowLeft.src = '/assets/images/icons/angle-icon.svg';
    imgArrowLeft.setAttribute('alt', 'icon');

    ribbonArrowLeft.append(imgArrowLeft);

    let ribbonArrowRight = document.createElement('button');
    ribbonArrowRight.classList.add('ribbon__arrow');
    ribbonArrowRight.classList.add('ribbon__arrow_right');
    ribbonArrowRight.classList.add('ribbon__arrow_visible');

    let imgArrowRight = document.createElement('img');
    imgArrowRight.src = '/assets/images/icons/angle-icon.svg';
    imgArrowRight.setAttribute('alt', 'icon');

    ribbonArrowRight.append(imgArrowRight);


    divRibbon.append(ribbonArrowLeft);
    divRibbon.append(this.createNavRibbonInner());
    divRibbon.append(ribbonArrowRight);

    return divRibbon;
  }
  createNavRibbonInner() {
    let navRibbonInner = document.createElement('nav');
    navRibbonInner.className = 'ribbon__inner';

    for (let i = 0; i < this.categories.length; i++) {
      let a = document.createElement('a');
      a.classList.add('ribbon__item');
      a.href = '#';
      a.innerHTML = this.categories[i].name;

      if (i === 0) {
        a.classList.add('ribbon__item_active');
        a.dataset.id = '';
      }
      else {
        a.dataset.id = this.categories[i].id;
      }

      navRibbonInner.append(a);
    }

    return navRibbonInner;
  }

  createScrollEvents() {
    let ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');

    ribbonArrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonArrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = ribbonInner.scrollLeft;
      if (scrollLeft === 0) {
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      }
      else {
        ribbonArrowLeft.classList.add('ribbon__arrow_visible');
      }

      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollRight === 0) {
        ribbonArrowRight.classList.remove('ribbon__arrow_visible');
      }
      else {
        ribbonArrowRight.classList.add('ribbon__arrow_visible');
      }
    });
  }
  createRibbonSelectCustomItem() {
    let anchors = this.elem.querySelectorAll('.ribbon__item');

    for (let i = 0; i < this.categories.length; i++) {
      anchors[i].addEventListener('click', (event) => {
        let activeItem = this.elem.querySelector('.ribbon__item_active');
        activeItem.classList.remove('ribbon__item_active');
        anchors[i].classList.add('ribbon__item_active');

        let ribbonSelectCustomEvent = new CustomEvent('ribbon-select', {
          detail: this.categories[i].id,
          bubbles: true,
        });

        anchors[i].dispatchEvent(ribbonSelectCustomEvent);
      });
    }
  }
}
