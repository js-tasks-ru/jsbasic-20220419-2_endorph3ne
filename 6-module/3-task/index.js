import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.elem = this.createCarousel();
    this.createArrowEvents(this.slides.length);
    this.createProductAddCustomEvent(this.slides);
  }

  createCarousel() {
    let divCarousel = document.createElement('div');
    divCarousel.className = 'carousel';

    let divArrowRight = document.createElement('div');
    divArrowRight.classList.add('carousel__arrow');
    divArrowRight.classList.add('carousel__arrow_right');

    let imgArrowRight = document.createElement('img');
    imgArrowRight.src = '/assets/images/icons/angle-icon.svg';
    imgArrowRight.setAttribute('alt', 'icon');

    divArrowRight.append(imgArrowRight);

    let divArrowLeft = document.createElement('div');
    divArrowLeft.classList.add('carousel__arrow');
    divArrowLeft.classList.add('carousel__arrow_left');

    let imgArrowLeft = document.createElement('img');
    imgArrowLeft.src = '/assets/images/icons/angle-left-icon.svg';
    imgArrowLeft.setAttribute('alt', 'icon');

    divArrowLeft.append(imgArrowLeft);

    divCarousel.append(divArrowRight);
    divCarousel.append(divArrowLeft);
    divCarousel.append(this.createCarouselInner());

    return divCarousel;
  }
  createCarouselInner() {
    let div = document.createElement('div');
    div.className = 'carousel__inner';

    for (let currentSlide of this.slides) {
      div.append(this.createSlide(currentSlide));
    }

    return div;
  }
  createSlide(slide) {
    let divCarouselSlide = document.createElement('div');
    divCarouselSlide.className = 'carousel__slide';
    divCarouselSlide.dataset.id = slide.id;

    let imgSlide = document.createElement('img');
    imgSlide.src = '/assets/images/carousel/' + slide.image;
    imgSlide.className = 'carousel__img';
    imgSlide.setAttribute('alt', 'slide');

    let divCarouselCaption = document.createElement('div');
    divCarouselCaption.className = 'carousel__caption';

    let span = document.createElement('span');
    span.className = 'carousel__price';
    span.textContent = '€' + slide.price.toFixed(2);

    let divCarouselTitle = document.createElement('div');
    divCarouselTitle.className = 'carousel__title';
    divCarouselTitle.innerHTML = slide.name;

    let button = document.createElement('button');
    button.type = 'button';
    button.className = 'carousel__button';

    let imgPlus = document.createElement('img');
    imgPlus.src = '/assets/images/icons/plus-icon.svg';
    imgPlus.setAttribute('alt', 'icon');

    button.append(imgPlus);

    divCarouselCaption.append(span);
    divCarouselCaption.append(divCarouselTitle);
    divCarouselCaption.append(button);

    divCarouselSlide.append(imgSlide);
    divCarouselSlide.append(divCarouselCaption);
    return divCarouselSlide;
  }

  createArrowEvents(lengthCarousel) {
    let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    let carouselItem = this.elem.querySelector('.carousel__inner');

    let carouselItemWidth = 0;
    let idxCurrentItem = 0;


    carouselArrowLeft.style.display = 'none';
    carouselArrowLeft.addEventListener('click', () => {
      carouselItemWidth = carouselItem.offsetWidth;

      idxCurrentItem--;
      carouselArrowRight.style.display = '';
      carouselItem.style.transform = `translateX(-${carouselItemWidth * idxCurrentItem}px)`;

      if (idxCurrentItem <= 0) {
        carouselArrowLeft.style.display = 'none';
        idxCurrentItem = 0;
      }
      else {
        carouselArrowLeft.style.display = '';
      }
    });

    carouselArrowRight.addEventListener('click', () => {
      carouselItemWidth = carouselItem.offsetWidth;

      idxCurrentItem++;
      carouselArrowLeft.style.display = '';
      carouselItem.style.transform = `translateX(-${carouselItemWidth * idxCurrentItem}px)`;

      if (idxCurrentItem >= lengthCarousel - 1) {
        carouselArrowRight.style.display = 'none';
        idxCurrentItem = lengthCarousel - 1;
      }
      else {
        carouselArrowRight.style.display = '';
      }
    });
  }
  createProductAddCustomEvent(slides) {
    let buttons = this.elem.querySelectorAll('.carousel__button');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (event) => {
        let productAddEvent = new CustomEvent('product-add', {
          detail: slides[i].id,
          bubbles: true,
        });

        event.target.dispatchEvent(productAddEvent);
      });
    }
  }
}
