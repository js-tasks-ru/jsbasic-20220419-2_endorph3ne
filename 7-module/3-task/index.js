import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.createSlider();
    this.setActiveStep(this.value);
    this.createEvents();
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
  createEvents() {
    this.elem.addEventListener('click', (event) => {
      let sliderValue = this.setSliderValues(event);

      let sliderChangeCustomEvent = new CustomEvent('slider-change', {
        detail: sliderValue,
        bubbles: true
      });

      this.elem.dispatchEvent(sliderChangeCustomEvent);
    });
  }

  setSliderValues(event) {
    let sliderValue = this.elem.querySelector('.slider__value');
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');

    let x = event.clientX - this.elem.getBoundingClientRect().x;
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
