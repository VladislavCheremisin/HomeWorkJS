"use strict"

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
})

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (!event.target.closest('.addToCard')) {
    return;
  }
  const featuredItem = event.target.closest('.featuredItem');
  const id = +featuredItem.dataset.id;
  const name = featuredItem.dataset.name;
  const price = +featuredItem.dataset.price;
  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {
      id: id,
      name: name,
      price: price,
      count: 0,
    }
  }
  basket[id].count++;
  basketCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalPrice().toFixed(2);
  renderProductInBasket(id);
}

function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalPrice() {
  return Object.values(basket)
    .reduce((acc, product) => acc + product.count * product.price , 0);
}

function renderProductInBasket(id){
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-productId="${id}"]`);
  if (!basketRowEl) {
    console.log(basketRowEl)
    renderNewProductInBasket(id);
    return;
  }
  basketRowEl.querySelector('.productTotalCount')
    .textContent = basket[id].count;
  basketRowEl.querySelector('.productTotalPrice')
    .textContent = basket[id].count * basket[id].price;


}

function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productTotalCount">${(basket[productId].count)}</span>
      </div>
      <div>
        $<span class="productPrice">${(basket[productId].price)}</span>
      </div>
      <div>
        $<span class="productTotalPrice">${((basket[productId].price) * 
            (basket[productId].count))}</span>
      </div>
    </div>
  `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}