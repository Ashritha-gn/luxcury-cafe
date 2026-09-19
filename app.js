let cart = [];


// =========================================
// LOYALTY
// =========================================

let bobaStamps =
  Number(localStorage.getItem("bobaStamps")) || 0;


// =========================================
// ADD ITEM TO BAG
// =========================================

function addToCart(name, price) {

  const existingItem = cart.find(
    item => item.name === name
  );

  if (existingItem) {

    existingItem.quantity++;

  } else {

    cart.push({
      name: name,
      price: price,
      quantity: 1
    });

  }

  updateCart();

  openCart();

  animateBag();

}


// =========================================
// UPDATE CART
// =========================================

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cartCount");

  const cartTotal =
    document.getElementById("cartTotal");


  let totalItems = 0;
  let totalPrice = 0;


  cart.forEach(item => {

    totalItems += item.quantity;

    totalPrice +=
      item.price * item.quantity;

  });


  cartCount.textContent =
    totalItems;


  cartTotal.textContent =
    "₹" + totalPrice;


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your bag is empty.
      </p>
    `;

    return;

  }


  cartItems.innerHTML = "";


  cart.forEach((item, index) => {

    const itemElement =
      document.createElement("div");

    itemElement.className =
      "cart-item";


    itemElement.innerHTML = `

      <div>

        <strong>
          ${item.name}
        </strong>

        <small>
          ₹${item.price} × ${item.quantity}
        </small>

      </div>


      <div class="quantity-controls">

        <button
          onclick="changeQuantity(${index}, -1)"
        >
          −
        </button>

        <span>
          ${item.quantity}
        </span>

        <button
          onclick="changeQuantity(${index}, 1)"
        >
          +
        </button>

      </div>

    `;


    cartItems.appendChild(
      itemElement
    );

  });

}


// =========================================
// CHANGE QUANTITY
// =========================================

function changeQuantity(index, amount) {

  cart[index].quantity += amount;


  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }


  updateCart();

}


// =========================================
// OPEN CART
// =========================================

function openCart() {

  document
    .getElementById("cartPanel")
    .classList.add("open");


  document
    .getElementById("cartOverlay")
    .classList.add("show");

}


// =========================================
// CLOSE CART
// =========================================

function closeCart() {

  document
    .getElementById("cartPanel")
    .classList.remove("open");


  document
    .getElementById("cartOverlay")
    .classList.remove("show");

}


// =========================================
// BAG ANIMATION
// =========================================

function animateBag() {

  const bag =
    document.getElementById("cartButton");


  bag.animate(

    [
      {
        transform: "scale(1)"
      },

      {
        transform:
          "scale(1.18) rotate(-6deg)"
      },

      {
        transform:
          "scale(1.18) rotate(6deg)"
      },

      {
        transform:
          "scale(1) rotate(0)"
      }

    ],

    {
      duration: 500
    }

  );

}


// =========================================
// LOYALTY DISPLAY
// =========================================

function updateLoyalty() {

  const stampGrid =
    document.getElementById("stampGrid");

  const stampStatus =
    document.getElementById("stampStatus");


  if (!stampGrid || !stampStatus) {
    return;
  }


  const stamps =
    stampGrid.querySelectorAll("span");


  stamps.forEach((stamp, index) => {

    stamp.classList.toggle(
      "filled",
      index < bobaStamps
    );

  });


  if (bobaStamps >= 8) {

    stampStatus.textContent =
      "🎉 Reward unlocked! Enjoy 1 FREE Classic Boba.";

    stampStatus.classList.add(
      "reward-ready"
    );

  } else {

    stampStatus.textContent =
      bobaStamps +
      " / 8 stamps collected";

    stampStatus.classList.remove(
      "reward-ready"
    );

  }

}


// =========================================
// BOBA CHECK
// =========================================

function orderContainsBoba() {

  return cart.some(item =>
    item.name
      .toLowerCase()
      .includes("boba")
  );

}


// =========================================
// DEMO CHECKOUT
// =========================================

function completeDemoOrder() {

  if (cart.length === 0) {

    alert(
      "Your café bag is empty."
    );

    return;

  }


  const hasBoba =
    orderContainsBoba();


  if (hasBoba && bobaStamps < 8) {

    bobaStamps++;

    localStorage.setItem(
      "bobaStamps",
      bobaStamps
    );

  }


  if (hasBoba) {

    if (bobaStamps >= 8) {

      alert(
        "🎉 Order complete!\n\n" +
        "You earned your 8th boba stamp!\n\n" +
        "🧋 FREE Classic Boba unlocked!"
      );

    } else {

      alert(
        "☕ Order complete!\n\n" +
        "🧋 You earned 1 Boba Stamp!\n\n" +
        bobaStamps +
        " / 8 stamps collected."
      );

    }

  } else {

    alert(
      "☕ Order complete!\n\n" +
      "Your order has
