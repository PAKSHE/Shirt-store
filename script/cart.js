document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();
});


function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    
    Swal.fire({
        title: "เพิ่มลงตะกร้าแล้ว!",
        text: `${name} ถูกเพิ่มลงตะกร้าของคุณ`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
}

// อัปเดตจำนวนสินค้าใน navbar
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}


// แสดงรายการสินค้าใน `cart.html`
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return; // ถ้าไม่มี element นี้ ให้หยุดทำงาน

    cartItemsContainer.innerHTML = "";
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
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    let cartTotal = document.getElementById("cart-total");
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2) + " THB";
    }
}


// เพิ่ม / ลดจำนวนสินค้า
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart[index];

    if (item.quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
        Swal.fire({
            title: "ลบสินค้าออกแล้ว!",
            text: `${item.name} ถูกลบออกจากตะกร้า`,
            icon: "warning",
            showConfirmButton: false,
            timer: 1500
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount(); // เรียกฟังก์ชันอัปเดตจำนวนสินค้า
}
