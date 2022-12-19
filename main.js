var productNameInput = document.getElementById("productName");
var productpriceInput = document.getElementById("productPrice");
var productcategInput = document.getElementById("productCataegory");
var productdescInput = document.getElementById("productDesc");
var inputs = document.getElementsByClassName("form-control");
var addbtn = document.getElementById("addBtn");
var search = document.getElementById("searchInput");
var name = document.getElementById("nameAlert");
var currnetIndex = 0;
var products = [];

if (JSON.parse(localStorage.getItem("productList")) != null) {
  products = JSON.parse(localStorage.getItem("productList"));
  displayData();
}

addbtn.onclick = function () {
  if (addbtn.innerHTML == "add product") {
    addProducr();
  } else {
    updateProduct();
  }
  displayData();
  clearForm();
};

function addProducr() {
  var product = {
    name: productNameInput.value,
    price: productpriceInput.value,
    category: productcategInput.value,
    description: productdescInput.value,
  };
  products.push(product);
  localStorage.setItem("productList", JSON.stringify(products));
}
function displayData() {
  var list = "";
  for (var i = 0; i < products.length; i++) {
    list += `<tr><td>${products[i].name} </td>
      <td>${products[i].price}</td>
      <td>${products[i].category}</td>
      <td>${products[i].description}</td>
      <td><button onclick="getProductInfo(${i})" class='btn btn-warning'>update</button></td>
      <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>delete</button></td>
      </tr>`;
  }
  document.getElementById("tableBody").innerHTML = list;
}
function deleteProduct(index) {
  products.splice(index, 1);
  displayData();
  localStorage.setItem("productList", JSON.stringify(products));
}
function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
search.onkeyup = function () {
  var list = "";
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(search.value.toLowerCase())) {
      list += `<tr><td>${products[i].name} </td>
      <td>${products[i].price}</td>
      <td>${products[i].category}</td>
      <td>${products[i].description}</td>
      <td><button onclick="getProduct(${i})" class='btn btn-warning'>update</button></td>
      <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>delete</button></td>
      </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = list;
};

function getProductInfo(index) {
  currnetIndex = index;
  var currentProduct = products[index];
  productNameInput.value = currentProduct.name;
  productpriceInput.value = currentProduct.price;
  productcategInput.value = currentProduct.category;
  productdescInput.value = currentProduct.description;
  addbtn.innerHTML = "update product";
}
function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productpriceInput.value,
    category: productcategInput.value,
    description: productdescInput.value,
  };
  products[currnetIndex] = product;
  localStorage.setItem("productList", JSON.stringify(products));
  addbtn.innerHTML = "Add product";
}
productNameInput.onkeyup = function () {
  var nameRejex = /^[A-Z][a-z]{2,8}$/;
  if (nameRejex.test(productNameInput.value)) {
    addbtn.removeAttribute("disabled");
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  } else {
    addbtn.disabled = "true";
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
  }
};
productpriceInput.onkeyup = function () {
  var priceRejex = /^[1-9][0-9]?$|^100$/;
  if (priceRejex.test(productpriceInput.value)) {
    addbtn.removeAttribute("disabled");
    productpriceInput.classList.add("is-valid");
    productpriceInput.classList.remove("is-invalid");
    priceAlert.classList.add("d-none");
  } else {
    addbtn.disabled = "true";
    productpriceInput.classList.add("is-invalid");
    productpriceInput.classList.remove("is-valid");
    priceAlert.classList.remove("d-none");
  }
};
productcategInput.onkeyup = function () {
  var categRejex = /^[a-z]{2,11}$/;
  if (categRejex.test(productcategInput.value)) {
    addbtn.removeAttribute("disabled");
    productcategInput.classList.add("is-valid");
    productcategInput.classList.remove("is-invalid");
    categRejex.classList.add("d-none");
  } else {
    addbtn.disabled = "true";
    productcategInput.classList.add("is-invalid");
    productcategInput.classList.remove("is-valid");
    categRejex.classList.remove("d-none");
  }
};
