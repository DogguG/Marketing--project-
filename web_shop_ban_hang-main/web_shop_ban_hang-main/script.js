// const next = document.querySelector('.next')
// const prev = document.querySelector('.prev')
// const comment = document.querySelector('#list-comment')
// const commentItem = document.querySelectorAll('#list-comment .item')
// var translateY = 0
// var count = commentItem.length

// next.addEventListener('click', function (event) {
//   event.preventDefault()
//   if (count == 1) {
//     // Xem hết bình luận
//     return false
//   }
//   translateY += -400
//   comment.style.transform = `translateY(${translateY}px)`
//   count--
// })

// prev.addEventListener('click', function (event) {
//   event.preventDefault()
//   if (count == 3) {
//     // Xem hết bình luận
//     return false
//   }
//   translateY += 400
//   comment.style.transform = `translateY(${translateY}px)`
//   count++
// })

//=================================San Pham===============================
const iconCart = document.querySelector(".icon-cart");
const body = document.querySelector("body");
const closeCart = document.querySelector(".close");
let listProducts = [];
let listProductsHTML = document.querySelector(".content-right");

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.remove("showCart");
});

const addDataToHTML = () => {
  listProductsHTML.innerHTML = '';
  if (listProducts.length > 0) {
    listProducts.forEach(product => {
      let newProduct = document.createElement('div');
      newProduct.classList.add('product');
      newProduct.innerHTML = `
      <img src="${product.hinhsp}" alt="">
      <h2>${product.tensp}</h2>
      <div class="price">${product.giasp} Vnd</div>
      <button class="addCart">Them vao</button>
      `;
      listProductsHTML.appendChild(newProduct);
    });
  }
};
const iniApp = () => {
  fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();
    });
};

iniApp();
