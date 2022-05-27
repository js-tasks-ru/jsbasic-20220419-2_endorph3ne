import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = this.createRibbon();
    this.createScrollEvents();
    this.createRibbonSelectCustomItem();
  }

  createRibbon() {
    return createElement(
      `
      <div class="ribbon">
    
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>
          <a href="#" class="ribbon__item" data-id="salads">Salads</a>
          <a href="#" class="ribbon__item" data-id="soups">Soups</a>
          <a href="#" class="ribbon__item" data-id="chicken-dishes">Chicken dishes</a>
          <a href="#" class="ribbon__item" data-id="beef-dishes">Beef dishes</a>
          <a href="#" class="ribbon__item" data-id="seafood-dishes">Seafood dishes</a>
          <a href="#" class="ribbon__item" data-id="vegetable-dishes">Vegetable dishes</a>
          <a href="#" class="ribbon__item" data-id="bits-and-bites">Bits and bites</a>
          <a href="#" class="ribbon__item" data-id="on-the-side">On the side</a>
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
      `
    );
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
