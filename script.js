fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
  .then(response => response.json()) 
  .then(data => {
    let categories = data.categories; 
    let productsDiv = document.getElementById("products"); 
    let tabs = document.getElementById("tabs").children; 
    let activeTab = "Men"; 

    for (let category of categories) {
      if (category.category_name === activeTab || category.category_name === "Women" || category.category_name === "Kids") {
        for (let product of category.category_products) {
          let productCard = document.createElement("div");
          productCard.classList.add("product-card");
          productCard.classList.add(category.category_name.toLowerCase());

          let productImage = document.createElement("img");
          productImage.classList.add("product-image");
          productImage.src = product.image;

          let productImgtext = document.createElement("span");
          productImgtext.classList.add("product-imgText");
          if (product.badge_text) {
            productImgtext.textContent = product.badge_text;
          }

          let productInfo = document.createElement("div");
          productInfo.classList.add("product-info");

          let productNaming = document.createElement("div");
          productNaming.classList.add("product-naming");

          let productHeading = document.createElement("p");
          productHeading.classList.add("product-heading");
          productHeading.textContent = product.title;

          let productStore = document.createElement("p");
          productStore.classList.add("product-store");
          productStore.textContent = "\u2022 " + product.vendor;

          let productPricing = document.createElement("div");
          productPricing.classList.add("product-pricing");

          let productPrice = document.createElement("span");
          productPrice.classList.add("product-price");
          productPrice.textContent = "Rs " + product.price;

          let productOffer= document.createElement("span");
          productOffer.classList.add("product-offer");
          productOffer.textContent = "" + product.compare_at_price;

          let productDiscount = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;

          let productDiscountSpan = document.createElement("span");
          productDiscountSpan.classList.add("product-discount");
          productDiscountSpan.textContent = productDiscount.toFixed(0) + "% off";

          let productButton = document.createElement("button");
          productButton.classList.add("product-button");
          productButton.textContent = "Add to Cart";

          productCard.appendChild(productImage);
          if (product.badge_text) {
            productCard.appendChild(productImgtext);
          }
          productNaming.appendChild(productHeading);
          productNaming.appendChild(productStore);
          productInfo.appendChild(productNaming)
          productPricing.appendChild(productPrice);
          productPricing.appendChild(productOffer);
          productPricing.appendChild(productDiscountSpan);
          productInfo.appendChild(productPricing);
          productCard.appendChild(productInfo);
          productCard.appendChild(productButton);

          productsDiv.appendChild(productCard);
        }
      }
    }

    showCategory(activeTab);
  });

function showCategory(category) {
  let productCards = document.getElementsByClassName("product-card");
  let tabs = document.getElementById("tabs").children;
  activeTab = category;

  for (let productCard of productCards) {
    if (productCard.classList.contains(category.toLowerCase())) {
      productCard.style.display = "block";
    } else {
      productCard.style.display = "none";
    }
  }

  for (let tab of tabs) {
    if (tab.textContent.toLowerCase() === category.toLowerCase()) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  }
}
