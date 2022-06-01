import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = this.createProductList();
    this.populateProductList(this.products);
  }

  createProductList() {
    let div = document.createElement('div');
    div.className = 'products-grid';

    let divInner = document.createElement('div');
    divInner.className = 'products-grid__inner';

    div.append(divInner);
    return div;
  }
  populateProductList(products) {
    let divInner = this.elem.querySelector('.products-grid__inner');
    divInner.innerHTML = '';

    for (let currentProduct of products) {
      divInner.append(new ProductCard(currentProduct).elem);
    }
  }
  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);
    let filteredArray = this.products;

    for (let currentProperty in this.filters) {
      let valueFilter = this.filters[currentProperty];

      if (currentProperty === 'noNuts') {
        filteredArray = filteredArray.filter(product => product.nuts !== valueFilter);
      }
      if (currentProperty === 'vegeterianOnly') {
        filteredArray = filteredArray.filter(product => product.vegeterian === valueFilter);
      }
      if (currentProperty === 'maxSpiciness') {
        filteredArray = filteredArray.filter(product => product.spiciness <= valueFilter);
      }
      if (currentProperty === 'category') {
        filteredArray = filteredArray.filter(product => product.category === valueFilter);
      }
    }

    this.populateProductList(filteredArray);
  }
}
