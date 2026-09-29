
let button = document.getElementById("exploreBtn");
let collections = document.getElementById("collections");

button.addEventListener("click", function() {
    collections.scrollIntoView({
        behavior: "smooth"
    });
});
let products = document.querySelectorAll(".trad");

let productModal = document.getElementById("productModal");
let modalImage = document.getElementById("modalImage");
let modalName = document.getElementById("modalName");
let modalDescription = document.getElementById("modalDescription");
let modalPrice = document.getElementById("modalPrice");

products.forEach(function(product) {

    product.addEventListener("click", function() {

        let image = product.querySelector("img");
        let name = product.querySelector("h2");
        let description = product.querySelector("p");
        let price = product.querySelector("h4");

        modalImage.src = image.src;
        modalName.innerText = name.innerText;
        modalDescription.innerText = description.innerText;
        modalPrice.innerText = price.innerText;

        productModal.style.display = "flex";

    });

});
let closeModal = document.getElementById("closeModal");

closeModal.addEventListener("click", function() {
    productModal.style.display = "none";
});
let cart = [];

let addToCartBtn = document.getElementById("addToCartBtn");
let cartCountDisplay = document.getElementById("cartCount");

let cartItems = document.getElementById("cartItems");
let cartTotal = document.getElementById("cartTotal");

addToCartBtn.addEventListener("click", function() {

    let productName = modalName.innerText;

    let productPrice = parseFloat(
        modalPrice.innerText.replace("$", "")
    );

    cart.push({
    name: productName,
    price: productPrice,
    quantity: 1
});

    cartCountDisplay.innerText = cart.length;

    displayCart();

   
    productModal.style.display = "none";

});


function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {

        total = total + (item.price * item.quantity);

        let div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>$${item.price}</p>

                <button onclick="decreaseQuantity(${index})">−</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>
            </div>

            <button class="remove-item" onclick="removeItem(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.innerText = total.toFixed(2);
}


function removeItem(index) {

    cart.splice(index, 1);

    cartCountDisplay.innerText = cart.length;

    displayCart();

}
let cartBtn = document.getElementById("cartBtn");
let cartPanel = document.getElementById("cartPanel");
let closeCart = document.getElementById("closeCart");

cartBtn.addEventListener("click", function() {
    cartPanel.style.display = "block";
});

closeCart.addEventListener("click", function() {
    cartPanel.style.display = "none";
});
let checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! 🎉");

    cart = [];

    cartCountDisplay.innerText = 0;

    displayCart();

    cartPanel.style.display = "none";
});
function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    displayCart();
}