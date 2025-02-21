document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(product) {
    let existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCart();
    updateCartCount();


    Swal.fire({
        title: "เพิ่มลงตะกร้าแล้ว!",
        text: `${product.name} ถูกเพิ่มลงตะกร้าของคุณ`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
}


function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let cartItem = document.createElement("div");
        cartItem.className = "grid grid-cols-4 gap-4 text-gray-600 py-3 border-b";
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>
                <button onclick="updateQuantity(${index}, -1)" class="bg-red-500 text-white px-2 rounded">-</button>
                ${item.quantity}
                <button onclick="updateQuantity(${index}, 1)" class="bg-green-500 text-white px-2 rounded">+</button>
            </span>
            <span>${item.price.toFixed(2)} THB</span>
            <span>${itemTotal.toFixed(2)} THB</span>
            <button onclick="removeFromCart(${index})" class="bg-red-500 text-white px-2 rounded">ลบ</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2) + " THB";
}


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
});


function removeFromCart(index) {
    let item = cart[index];
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartCount();

   
    Swal.fire({
        title: "ลบสินค้าออกแล้ว!",
        text: `${item.name} ถูกลบออกจากตะกร้า`,
        icon: "warning",
        showConfirmButton: false,
        timer: 1500
    });
}


function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}


document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const productElement = button.closest(".product");
        const product = {
            id: productElement.getAttribute("data-id"),
            name: productElement.getAttribute("data-name"),
            price: parseInt(productElement.getAttribute("data-price"))
        };
        addToCart(product);
    });
});


renderCart();
updateCartCount();