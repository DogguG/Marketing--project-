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
// window.onload=function () {
//   iniApp();

// }
const iconCart = document.querySelector(".icon-cart");
const body = document.querySelector("body");
const closeCart = document.querySelector(".close");
let carts = [];
let listCartHTML = document.querySelector(".listCart");
const iconCartSpan = document.querySelector(".icon-cart span");
let listProducts = [];
iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.remove("showCart");
});

// function addDataToHTML() {
//   listProductsHTML.innerHTML = "";
//   if (listProducts.length > 0) {
//     listProducts.forEach((product) => {
//       let newProduct = document.createElement("div");
//       newProduct.classList.add("product");
//       newProduct.innerHTML = `
//         <img src="${product.hinhsp}" alt="">
//         <h2>${product.tensp}</h2>
//         <div class="price">${product.giasp} Vnd</div>
//         <button class="addCart">Them vao</button>
//       `;
//       listProductsHTML.appendChild(newProduct);
//     });
//   }
// };
// function iniApp() {
//   fetch("product.json")
//     .then((response) => response.json())
//     .then((data) => {
//       listProducts = data;
//       addDataToHTML();
//       loadItems(); // Gọi loadItems() sau khi đã thêm sản phẩm vào DOM
//     });
// }
// iniApp();

// let limit = 8;
// let thisPage = 1;
// let list = document.querySelectorAll(".content-right .product");

// function loadItems() {
//   let beginGet = limit * (thisPage - 1);
//   let endGet = limit * thisPage - 1;
//   list.forEach((item, key) => {
//     if (key >= beginGet && key <= endGet) {
//       item.style.display = "block";
//     } else {
//       item.style.display = "none";
//     }
//   });
// }

let limit = 8;
let thisPage = 1;
let listProductsHTML = document.querySelector(".main");

function loadItems() {
  let beginGet = limit * (thisPage - 1);
  let endGet = limit * thisPage - 1;
  let listProducts = document.querySelectorAll(".main .product");

  listProducts.forEach((item, key) => {
    if (key >= beginGet && key <= endGet) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  listPage();
}

function addDataToHTML() {
  listProductsHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("product");
      newProduct.dataset.idsp = product.idsp;
      newProduct.innerHTML = `
        <img src="${product.hinhsp}" alt="">
        <h2>${product.tensp}</h2>
        <div class="price">${product.giasp} Vnd</div>
        <button class="addCart">Them vao</button>
      `;
      listProductsHTML.appendChild(newProduct);
    });
    loadItems();
  }
}

listProductsHTML.addEventListener("click", (even) => {
  let positionClick = even.target;
  if (positionClick.classList.contains("addCart")) {
    let product_id =positionClick.parentElement.dataset.idsp;
    addToCart(product_id);
  }
});

function addToCart(product_id) {
  let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
  if(carts.length <= 0) {
    carts = [{
      product_id: product_id,
      quantity: 1
    }];
  } else if(positionThisProductInCart < 0){
    carts.push({
      product_id: product_id,
      quantity: 1
    });
  } else {
    carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
}

function addCartToHTML() {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  if(carts.length > 0) {
    carts.forEach(cart => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement('div');
      newCart.classList.add('product');
      let positionProduct = listProducts.findIndex((value) => value.idsp == cart.product_id);
      let info = listProducts[positionProduct];
      newCart.innerHTML = `
      <div class="image">
              <img src="${info.hinhsp}" alt="">
          </div>
          <div class="name">
            ${info.tensp}
          </div>
          <div class="totalPrice">
            ${info.giasp * cart.quantity} Vnd
          </div>
          <div class="quantity">
              <span class="minus"><</span>
              <span>${cart.quantity}</span>
              <span class="plus">></span>
          </div>
      `;
      listCartHTML.appendChild(newCart);
    })
  }
  console.log(totalQuantity);
  iconCartSpan.innerText = totalQuantity;
}

function iniApp() {
  fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();
    });
}

// Gọi iniApp() khi tải trang

function listPage() {
  let count = Math.ceil(listProducts.length / limit);
  document.querySelector(".listPage").innerHTML = "";

  if (thisPage != 1) {
    let prev = document.createElement("li");
    prev.innerText = "Previous";
    prev.setAttribute("onclick", "changePage(" + (thisPage - 1) + ")");
    document.querySelector(".listPage").appendChild(prev);
  }
  for (i = 1; i <= count; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    if (i == thisPage) {
      newPage.classList.add("active");
    }
    newPage.setAttribute("onclick", "changePage(" + i + ")");
    document.querySelector(".listPage").appendChild(newPage);
  }

  if (thisPage != count) {
    let next = document.createElement("li");
    next.innerText = "Next";
    next.setAttribute("onclick", "changePage(" + (thisPage + 1) + ")");
    document.querySelector(".listPage").appendChild(next);
  }
}
function changePage(i) {
  thisPage = i;
  loadItems();
}
iniApp();
