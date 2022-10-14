const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

const USER = localStorage.getItem("user");
const userID = 25801;
const LOGIN = "login.html";

const loginOut = () => {
  localStorage.removeItem("user");
  location.reload();
};

const setProdID = (id) => {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}

const goToCart = () => window.location = "cart.html"

document.addEventListener("DOMContentLoaded", function () {
  if (
    USER == null ||
    USER == "null" ||
    USER == "undefined" ||
    USER == undefined
  ) {
    window.location = LOGIN;
  } else {
    document.getElementById("user").innerHTML = USER;
  }
});

const getCart = () => {
  let cart = localStorage.getItem("cart");
  if (
    cart == null ||
    cart == "null" ||
    cart == "undefined" ||
    cart == undefined
  ) {
    newCart = {
      user: userID,
      articles: []
    };
    localStorage.setItem("cart", JSON.stringify(newCart));
    return newCart;
  } else {
    cart = JSON.parse(cart);
    return cart;
  }
}

let cart = getCart();

const addToCart = (newArticle, aumentar = true) => {
  let articleIndex = cart.articles.findIndex((article) => article.id == newArticle.id);
  if (articleIndex < 0) {
    cart.articles.push(newArticle);
  }
  else if (aumentar) {
    cart.articles[articleIndex].count++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
