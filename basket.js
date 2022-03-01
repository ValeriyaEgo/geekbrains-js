'use strict';

const cartIconWrap = document.querySelector('.cartIconWrap');
const cartIconCount = document.querySelector('.cartIconWrap span');
const featuredItems = document.querySelector('.featuredItems');
const basketTotal = document.querySelector('.basketTotal');
const basketTotalValue = document.querySelector('.basketTotalValue');

const productList = {};
let productCount = 0;
let productsTotalPrice = 0;

cartIconWrap.addEventListener('click', function() {
    const basket = document.querySelector('.basket');
    if (basket.classList.contains('hidden')) {
        basket.classList.remove('hidden');
    } else {
        basket.classList.add('hidden');
    }
});

featuredItems.addEventListener('click', function(event) {
    if (!event.target.closest('.addToCart')){
        return;
    }

    const item = event.target.closest('.featuredItem');
    addToCart(item);
})

function addToCart(item){
    productCount++;
    productsTotalPrice += Number(item.dataset.price);
    cartIconCount.textContent = productCount.toString();
    if (!productList[item.dataset.id]){
        productList[item.dataset.id] = {
            id: item.dataset.id,
            name: item.dataset.name,
            price: item.dataset.price,
            count: 1,
        }
    } else {
        productList[item.dataset.id].count = productList[item.dataset.id].count + 1;
    }

    renderProductList();
    basketTotalValue.textContent = Number(productsTotalPrice).toFixed(2);
}

function renderProductList(){
    document.querySelectorAll('.basketRow').forEach(e => {
        if (!e.classList.contains('basketHeader')){
            e.remove();
        }
    });
    Object.keys(productList).forEach((productId) => {
        renderNewProduct(productId)
    });
    
}


function renderNewProduct(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${productList[productId].name}</div>
        <div>
          <span class="productCount">${productList[productId].count}</span> шт.
        </div>
        <div>$${productList[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(productList[productId].price * productList[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotal.insertAdjacentHTML("beforebegin", productRow);
  }