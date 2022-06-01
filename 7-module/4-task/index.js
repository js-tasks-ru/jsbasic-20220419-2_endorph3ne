import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.createSlider();
    this.setActiveStep(this.value);
    this.createClickEvent();
    this.createDragAndDrop();
  }

  createSlider() {
    return createElement(
      `
      <div class="slider">

        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>
      `
    );
  }
  createClickEvent() {
    this.elem.addEventListener('click', (event) => {
      let x = event.clientX - this.elem.getBoundingClientRect().left;
      let sliderValue = this.setSliderValuesClick(x);

      let sliderChangeCustomEvent = new CustomEvent('slider-change', {
        detail: sliderValue,
        bubbles: true
      });

      this.elem.dispatchEvent(sliderChangeCustomEvent);
    });
  }
  createDragAndDrop() {
    let thumb = this.elem.querySelector('.slider__thumb');
    let sliderValue = 0;

    thumb.onpointerdown = () => {
      thumb.ondragstart = () => false;
      this.elem.classList.add('slider_dragging');

      thumb.style.position = 'absolute';
      thumb.style.zIndex = 99999;

      document.onpointermove = (event) => {
        let x = event.clientX - this.elem.getBoundingClientRect().left;
        sliderValue = this.setSliderValuesDrag(x);
      };

      thumb.onpointerup = () => {
        document.onpointermove = null;
        document.onpointerup = null;

        this.elem.classList.remove('slider_dragging');


        let sliderChangeCustomEvent = new CustomEvent('slider-change', {
          detail: sliderValue,
          bubbles: true
        });

        this.elem.dispatchEvent(sliderChangeCustomEvent);
      };
    };
  }


  setSliderValuesDrag(x) {
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    let left = x;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    sliderThumb.style.left = `${leftPercents}%`;
    sliderProgress.style.width = `${leftPercents}%`;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    this.setActiveStep(value);
    sliderValue.textContent = value;

    return Math.round(approximateValue);
  }
  setSliderValuesClick(x) {
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    let segmentsAmount = this.steps - 1;
    let value = this.calculateSliderValue(x, segmentsAmount);
    sliderValue.textContent = value;
    this.setActiveStep(value);

    let valuePercents = value / segmentsAmount * 100;
    sliderThumb.style.left = `${valuePercents}%`;
    sliderProgress.style.width = `${valuePercents}%`;

    return value;
  }
  calculateSliderValue(x, segmentsAmount) {
    let lengthSegment = this.elem.clientWidth / segmentsAmount;
    return Math.round(x / lengthSegment);
  }
  setActiveStep(stepValue) {
    let sliderSteps = this.elem.querySelector('.slider__steps');
    let spans = sliderSteps.querySelectorAll('span');

    for (let i = 0; i < spans.length; i++) {
      if (i === stepValue) {
        spans[i].className = 'slider__step-active';
      }
      else {
        spans[i].className = '';
      }
    }
  }
}
