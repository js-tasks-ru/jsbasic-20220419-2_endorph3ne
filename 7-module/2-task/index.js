import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.createModal();
    this.createEvents();
  }

  createModal() {
    let divModal = document.createElement('div');
    divModal.className = 'modal';

    let divModalOverlay = document.createElement('div');
    divModalOverlay.className = 'modal__overlay';

    divModal.append(divModalOverlay);
    divModal.append(this.createModalInner());

    return divModal;
  }
  createModalInner() {
    let divModalInner = document.createElement('div');
    divModalInner.className = 'modal__inner';

    let divModalBody = document.createElement('div');
    divModalBody.className = 'modal__body';

    divModalInner.append(this.createModalHeader());
    divModalInner.append(divModalBody);

    return divModalInner;
  }
  createModalHeader() {
    let divModalHeader = document.createElement('div');
    divModalHeader.className = 'modal__header';

    let buttonModalClose = document.createElement('button');
    buttonModalClose.className = 'modal__close';

    let img = document.createElement('img');
    img.src = '/assets/images/icons/cross-icon.svg';
    img.setAttribute('alt', 'close-icon');

    buttonModalClose.append(img);

    let h3ModalTitle = document.createElement('h3');
    h3ModalTitle.className = 'modal__title';

    divModalHeader.append(buttonModalClose);
    divModalHeader.append(h3ModalTitle);

    return divModalHeader;
  }

  open() {
    let body = document.querySelector('body');
    body.className = 'is-modal-open';

    body.append(this.elem);
  }
  setTitle(title) {
    let h3ModalTitle = this.elem.querySelector('.modal__title');
    h3ModalTitle.innerHTML = title;
  }
  setBody(node) {
    let divModalBody = this.elem.querySelector('.modal__body');
    divModalBody.append(node);
  }
  close() {
    let body = document.querySelector('body');
    body.className = '';
    body.innerHTML = '';

    document.onkeydown = null;
  }

  createEvents() {
    let button = this.elem.querySelector('.modal__close');

    button.addEventListener('click', () => {
      this.close();
    });

    document.onkeydown = function (event) {
      if (event.code === 'Escape') {
        let body = document.querySelector('body');
        body.className = '';
        body.innerHTML = '';

        document.onkeydown = null;
      }
    };
  }
}
