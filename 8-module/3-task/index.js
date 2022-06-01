export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    let findedCartItem = this.cartItems.find(cart => cart.product.id === product.id);
    if (findedCartItem) {
      findedCartItem.count++;
      this.onProductUpdate(findedCartItem);
    }
    else {
      let newCartItem = {
        product: product,
        count: 1,
      };
      this.cartItems.push(newCartItem);
      this.onProductUpdate(newCartItem);
    }
  }

  updateProductCount(productId, amount) {
    let findedCartItem = this.cartItems.find(cart => cart.product.id === productId);
    findedCartItem.count += amount;
    this.cartItems = this.cartItems.filter(cart => cart.count !== 0);

    this.onProductUpdate(findedCartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;

    for (let currentCart of this.cartItems) {
      totalCount += currentCart.count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let currentCart of this.cartItems) {
      totalPrice += currentCart.product.price * currentCart.count;
    }

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

