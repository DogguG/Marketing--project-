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
window.onload=function () {
  iniApp();
  // var listDH = JSON.parse(localStorage.getItem('cart'));
  // console.log(listDH);
}
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

function loadItems(list) {
  let beginGet = limit * (thisPage - 1);
  let endGet = limit * thisPage - 1;
  let listProducts = [];
  if (list === undefined) {
    listProducts = document.querySelectorAll(".main .product");
  } else {
    listProducts = [...list];
  }
  // console.log(listProducts.length);
  // let listProducts = document.querySelectorAll(".main .product");

  listProducts.forEach((item, key) => {
    if (key >= beginGet && key <= endGet) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  listPage(list);
}

function addDataToHTML() {
  listProductsHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("product");
      newProduct.dataset.idsp = product.idsp;
      newProduct.dataset.tensp = product.tensp;
      newProduct.dataset.giasp = product.giasp;
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
    let product_id = positionClick.parentElement.dataset.idsp;
    let product_ten = positionClick.parentElement.dataset.tensp;
    let product_gia = positionClick.parentElement.dataset.giasp;
    addToCart(product_id,product_ten,product_gia);
  }
});

function addToCart(product_id,product_ten,product_gia) {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
        product_ten: product_ten,
        product_gia: product_gia
      }
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
      product_ten: product_ten,
      product_gia: product_gia
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
}

function addCartToMemory() {
  localStorage.setItem("cart", JSON.stringify(carts));
}

function addCartToHTML() {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement("div");
      newCart.classList.add("product");
      newCart.dataset.idsp = cart.product_id;
      let positionProduct = listProducts.findIndex(
        (value) => value.idsp == cart.product_id
      );
      let info = listProducts[positionProduct];
      newCart.innerHTML = `
      <div class="image">
              <img src="${info.hinhsp}" alt="">
          </div>
          <div class="name">
            ${info.tensp}
          </div>
          <div class="totalPrice">
            ${formatNumber(info.giasp * cart.quantity)}
          </div>
          <div class="quantity">
              <span class="minus">-</span>
              <span>${cart.quantity}</span>
              <span class="plus">+</span>
          </div>
      `;
      listCartHTML.appendChild(newCart);
    });
  }
  // console.log(totalQuantity);
  iconCartSpan.innerText = totalQuantity;
}

function formatNumber(num) {
  // Chuyển số thành chuỗi
  let str = num.toString();
  // Thêm ba số 0 vào cuối chuỗi
  str = str + "000";
  // Đảo ngược chuỗi
  str = str.split("").reverse().join("");
  // Thêm dấu chấm vào mỗi ba ký tự
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str[i];
    if ((i + 1) % 3 === 0 && i < str.length - 1) {
      result += ".";
    }
  }
  // Đảo ngược lại chuỗi kết quả và thêm "Vnd" vào cuối
  result = result.split("").reverse().join("") + " Vnd";
  return result;
}

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.idsp;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});

function changeQuantity(product_id, type) {
  let positionItemInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity =
          carts[positionItemInCart].quantity + 1;
        break;
      default:
        let valueChange = carts[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
}
function iniApp() {
  fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();
      // localStorage.clear();
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
        console.log(carts);
      }
    });
}

function listPage(list) {
  let count = 0;
  if (list === undefined) {
    count = Math.ceil(listProducts.length / limit);
  } else {
    count = Math.ceil(list.length / limit);
  }
  // let count = Math.ceil(listProducts.length / limit);

  document.querySelector(".listPage").innerHTML = "";

  if (thisPage != 1) {
    let prev = document.createElement("li");
    prev.innerText = "<<";
    prev.setAttribute("onclick", "changePage(" + (thisPage - 1) + ")");
    document.querySelector(".listPage").appendChild(prev);
  }
  for (i = 1; i <= count; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    if (i == thisPage) {
      newPage.classList.add("active");
    }
    if (list === undefined) {
      newPage.setAttribute("onclick", "changePage(" + i + ")");
    } else {
      newPage.setAttribute("onclick", "changePage(" + i + ",list)");
    }
    // newPage.setAttribute("onclick", "changePage(" + i + ")");
    document.querySelector(".listPage").appendChild(newPage);
  }

  if (thisPage != count) {
    let next = document.createElement("li");
    next.innerText = ">>";
    next.setAttribute("onclick", "changePage(" + (thisPage + 1) + ")");
    document.querySelector(".listPage").appendChild(next);
  }
}
function changePage(i, list) {
  thisPage = i;
  // if(list === undefined){
  //   alert("1");
  // } else {
  //   alert('2');
  // }
  // console.log(list)
  loadItems(list);
}
// iniApp();

function filterTable1() {
  const sanPhamElement = document.querySelector(".SanPham");
  const table = sanPhamElement.querySelectorAll(".product");
  const input = sanPhamElement.querySelector(".myInput");
  const filter = input.value.toUpperCase();
  let list = [];
  table.forEach((product) => {
    const txtValue = product.textContent || product.innerText;
    if (txtValue.toUpperCase().includes(filter)) {
      product.style.display = "";
      // console.log(product);
      list.push(product);
    } else {
      product.style.display = "none";
    }
    // product.style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
  });
  loadItems(list);
  // console.log(list.length);
}
