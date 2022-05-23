function initCarousel() {
  let carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselItem = document.querySelector('.carousel__inner');

  let carouselItemWidth = carouselItem.offsetWidth;
  let idxCurrentItem = 0;

  carouselArrowLeft.style.display = 'none';
  carouselArrowLeft.addEventListener('click', () => {
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
    idxCurrentItem++;
    carouselArrowLeft.style.display = '';
    carouselItem.style.transform = `translateX(-${carouselItemWidth * idxCurrentItem}px)`;

    if (idxCurrentItem >= 3) {
      carouselArrowRight.style.display = 'none';
      idxCurrentItem = 3;
    }
    else {
      carouselArrowRight.style.display = '';
    }
  });
}
