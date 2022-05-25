export default class ProductCard {
  constructor(product) {
    this.product = product;

    this.elem = this.createCard();
    this.createProductAddCustomEvent();
  }

  createCard() {
    let divCard = document.createElement('div');
    divCard.className = 'card';

    divCard.append(this.createCardTop());
    divCard.append(this.createCardBody());

    return divCard;
  }
  createCardTop() {
    let divCardTop = document.createElement('div');
    divCardTop.className = 'card__top';

    let img = document.createElement('img');
    img.src = '/assets/images/products/' + this.product.image;
    img.className = 'card__image';
    img.setAttribute('alt', 'product');

    let span = document.createElement('span');
    span.className = 'card__price';
    span.textContent = '€' + this.product.price.toFixed(2);

    divCardTop.append(img);
    divCardTop.append(span);

    return divCardTop;
  }
  createCardBody() {
    let divCardBody = document.createElement('div');
    divCardBody.className = 'card__body';

    let div = document.createElement('div');
    div.className = 'card__title';
    div.innerHTML = this.product.name;

    let button = document.createElement('button');
    button.type = 'button';
    button.className = "card__button";

    let img = document.createElement('img');
    img.src = '/assets/images/icons/plus-icon.svg';
    img.setAttribute('alt', 'icon');

    button.append(img);

    divCardBody.append(div);
    divCardBody.append(button);

    return divCardBody;
  }

  createProductAddCustomEvent() {
    let button = this.elem.querySelector('.card__button');

    button.addEventListener('click', (event) => {
      let productAddEvent = new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true,
      });

      event.target.dispatchEvent(productAddEvent);
    });

  }
}