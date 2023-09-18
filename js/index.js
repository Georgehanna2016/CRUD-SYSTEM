var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var addbtn = document.getElementById("addbtn");
var indx = "";
var allProducts = [];
if (localStorage.getItem("allProducts") != null) {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));

  displayProduct();
}

function addProduct() {
  var product = {
    name: productName.value,
    price: Number(productPrice.value),
    category: productCategory.value,
    desc: productDesc.value,
  };
  if (
    productName.value == "" ||
    Number(productPrice.value) == "" ||
    productCategory.value == "" ||
    productDesc.value == ""
  ) {
        document.querySelector('.alert').classList.remove('d-none')
} else {
    if (addbtn.innerHTML == "ADD") {
      allProducts.push(product);
    clearForm();
    document.querySelector('.alert').classList.add('d-none')

    } 
    else if (addbtn.innerHTML == "Update") {
      allProducts.splice(indx, 1, product);
      clearForm();
      document.querySelector('.alert').classList.add('d-none')

      addbtn.innerHTML = "ADD";
    }
  }

  localStorage.setItem("allProducts", JSON.stringify(allProducts));


  displayProduct();
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function displayProduct() {
  var tableDisplay = "";

  for (var i = 0; i < allProducts.length; i++) {
    tableDisplay += `<tr>
    <td>${i + 1}</td>
    <td>${allProducts[i].name}</td>
    <td>${allProducts[i].price}</td>
    <td>${allProducts[i].category}</td>
    <td>${allProducts[i].desc}</td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete </button></td>
    <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
    </tr>`;
  }

  document.getElementById("tBody").innerHTML = tableDisplay;
}

function deleteProduct(index) {
  allProducts.splice(index, 1);
  displayProduct();
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
}
function updateProduct(index) {
  indx = index;
  addbtn.innerHTML = "Update";

  productName.value = allProducts[index].name;
  productPrice.value = allProducts[index].price;
  productCategory.value = allProducts[index].category;
  productDesc.value = allProducts[index].desc;
}

function searchProduct(term) {
  tableSearch = "";
  for (var i = 0; i < allProducts.length; i++) {
    if (
      allProducts[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      tableSearch += `<tr>
            <td>${i + 1}</td>
            <td>${allProducts[i].name}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].category}</td>
            <td>${allProducts[i].desc}</td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete </button></td>
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
            </tr>`;
    }
  }
  document.getElementById("tBody").innerHTML = tableSearch;
}
