let cart = [];

let bobaStamps =
  Number(localStorage.getItem("bobaStamps")) || 0;


/* =========================================
   WELCOME + FEMALE VOICE
========================================= */

function speakWelcome() {

  if (!("speechSynthesis" in window)) {
    alert("Voice is not supported by this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const message =
    "Welcome to Your Café. I'm so happy you're here. Take a look around, discover something delicious, and make yourself at home.";

  const speech =
    new SpeechSynthesisUtterance(message);

  speech.rate = 0.92;
  speech.pitch = 1.15;
  speech.volume = 1;

  const voices =
    window.speechSynthesis.getVoices();

  const femaleVoice =
    voices.find(voice =>
      /female|samantha|victoria|karen|zira|aria|google us english/i
        .test(voice.name)
    );

  if (femaleVoice) {
    speech.voice = femaleVoice;
  }

  window.speechSynthesis.speak(speech);
}


function enterCafe() {

  const welcomeScreen =
    document.getElementById("welcomeScreen");

  if (!welcomeScreen) return;

  speakWelcome();

  welcomeScreen.classList.add("welcome-hidden");

  setTimeout(() => {
    welcomeScreen.style.display = "none";
  }, 900);
}


const welcomeButton =
  document.getElementById("welcomeButton");

if (welcomeButton) {
  welcomeButton.addEventListener(
    "click",
    enterCafe
  );
}


const voiceButton =
  document.getElementById("voiceButton");

if (voiceButton) {
  voiceButton.addEventListener(
    "click",
    speakWelcome
  );
}


/* =========================================
   CART
========================================= */

function addToCart(name, price) {

  const existingItem =
    cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
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


function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");

  const cartCount =
    document.getElementById("cartCount");

  if (!cartItems || !cartTotal || !cartCount) {
    return;
  }

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {

    total +=
      item.price * item.quantity;

    count += item.quantity;

    const itemElement =
      document.createElement("div");

    itemElement.className =
      "cart-item";

    itemElement.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>₹${item.price} × ${item.quantity}</p>
      </div>

      <div class="cart-controls">
        <button onclick="changeQuantity(${index}, -1)">
          −
        </button>

        <span>
          ${item.quantity}
        </span>

        <button onclick="changeQuantity(${index}, 1)">
          +
        </button>
      </div>
    `;

    cartItems.appendChild(itemElement);
  });


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your café bag is empty ☕
      </p>
    `;
  }


  cartTotal.textContent =
    `₹${total}`;

  cartCount.textContent =
    count;
}


function changeQuantity(index, change) {

  if (!cart[index]) return;

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


/* =========================================
   CART PANEL
========================================= */

function openCart() {

  const cartPanel =
    document.getElementById("cartPanel");

  const cartOverlay =
    document.getElementById("cartOverlay");

  if (cartPanel) {
    cartPanel.classList.add("open");
  }

  if (cartOverlay) {
    cartOverlay.classList.add("show");
  }
}


function closeCart() {

  const cartPanel =
    document.getElementById("cartPanel");

  const cartOverlay =
    document.getElementById("cartOverlay");

  if (cartPanel) {
    cartPanel.classList.remove("open");
  }

  if (cartOverlay) {
    cartOverlay.classList.remove("show");
  }
}


/* =========================================
   BAG ANIMATION
========================================= */

function animateBag() {

  const cartButton =
    document.getElementById("cartButton");

  if (!cartButton) return;

  cartButton.classList.remove("bag-bounce");

  void cartButton.offsetWidth;

  cartButton.classList.add("bag-bounce");
}


/* =========================================
   LOYALTY
========================================= */

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
      `${bobaStamps} / 8 stamps collected`;

    stampStatus.classList.remove(
      "reward-ready"
    );
  }
}


/* =========================================
   BOBA CHECK
========================================= */

function orderContainsBoba() {

  return cart.some(item => {

    const name =
      item.name.toLowerCase();

    return (
      name.includes("boba") ||
      name.includes("milk tea")
    );
  });
}


/* =========================================
   DEMO CHECKOUT
========================================= */

function completeDemoOrder() {

  if (cart.length === 0) {

    alert(
      "Your café bag is empty ☕"
    );

    return;
  }


  if (
    orderContainsBoba() &&
    bobaStamps < 8
  ) {

    bobaStamps += 1;

    localStorage.setItem(
      "bobaStamps",
      bobaStamps
    );

    updateLoyalty();


    if (bobaStamps >= 8) {

      alert(
        "🎉 Order placed!\n\n" +
        "You collected your 8th boba stamp!\n" +
        "Your FREE Classic Boba reward is now unlocked."
      );

    } else {

      alert(
        "✨ Order placed!\n\n" +
        `Boba stamp collected: ${bobaStamps} / 8`
      );
    }

  } else {

    alert(
      "✨ Order placed successfully!\n\n" +
      "Thank you for ordering from Your Café."
    );
  }


  cart = [];

  updateCart();

  closeCart();
}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterMenu(category) {

  const menuItems =
    document.querySelectorAll(".menu-item");

  const searchInput =
    document.getElementById("menuSearch");

  const noResults =
    document.getElementById("noResults");


  if (searchInput) {
    searchInput.value = "";
  }


  let visibleCount = 0;


  menuItems.forEach(item => {

    const nameElement =
      item.querySelector("h3");

    if (!nameElement) return;

    const name =
      nameElement.textContent.toLowerCase();

    let show = false;


    if (category === "all") {

      show = true;

    } else if (category === "boba") {

      show =
        name.includes("boba") ||
        name.includes("milk tea");

    } else if (category === "icecream") {

      show =
        name.includes("sundae") ||
        name.includes("pistachio") ||
        name.includes("chocolate") ||
        name.includes("cheesecake");

    } else if (category === "snacks") {

      show =
        name.includes("momos") ||
        name.includes("tacos") ||
        name.includes("corn dogs") ||
        name.includes("fries");

    } else if (category === "drinks") {

      show =
        name.includes("mojito") ||
        name.includes("cooler") ||
        name.includes("shake") ||
        name.includes("iced tea");

    } else if (category === "seafood") {

      show =
        name.includes("seafood") ||
        name.includes("prawns") ||
        name.includes("fish") ||
        name.includes("pasta");
    }


    item.style.display =
      show ? "" : "none";


    if (show) {
      visibleCount++;
    }

  });


  if (noResults) {

    noResults.style.display =
      visibleCount === 0
        ? "block"
        : "none";
  }


  const menu =
    document.getElementById("menu");

  if (menu) {

    menu.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
}


/* =========================================
   CATEGORY BUTTONS
========================================= */

const categoryButtons =
  document.querySelectorAll(
    ".category-grid button"
  );


categoryButtons.forEach(
  (button, index) => {

    button.addEventListener(
      "click",
      () => {

        const categories = [
          "boba",
          "icecream",
          "snacks",
          "drinks",
          "seafood"
        ];


        categoryButtons.forEach(btn => {
          btn.classList.remove("active");
        });


        button.classList.add("active");


        filterMenu(
          categories[index]
        );

      }
    );

  }
);


/* =========================================
   MENU SEARCH
========================================= */

function searchMenu() {

  const searchInput =
    document.getElementById("menuSearch");

  const menuItems =
    document.querySelectorAll(".menu-item");

  const noResults =
    document.getElementById("noResults");


  if (!searchInput) return;


  const query =
    searchInput.value
      .toLowerCase()
      .trim();


  let visibleCount = 0;


  menuItems.forEach(item => {

    const name =
      item.querySelector("h3")
        ?.textContent
        .toLowerCase() || "";


    const description =
      item.querySelector("p")
        ?.textContent
        .toLowerCase() || "";


    const matches =
      name.includes(query) ||
      description.includes(query);


    item.style.display =
      matches ? "" : "none";


    if (matches) {
      visibleCount++;
    }

  });


  if (noResults) {

    noResults.style.display =
      visibleCount === 0
        ? "block"
        : "none";
  }


  categoryButtons.forEach(btn => {
    btn.classList.remove("active");
  });
}


const menuSearch =
  document.getElementById("menuSearch");


if (menuSearch) {

  menuSearch.addEventListener(
    "input",
    searchMenu
  );
}


/* =========================================
   BUTTON EVENTS
========================================= */

const cartButton =
  document.getElementById("cartButton");


if (cartButton) {

  cartButton.addEventListener(
    "click",
    openCart
  );
}


const closeCartButton =
  document.getElementById("closeCart");


if (closeCartButton) {

  closeCartButton.addEventListener(
    "click",
    closeCart
  );
}


const cartOverlay =
  document.getElementById("cartOverlay");


if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    closeCart
  );
}


const exploreButton =
  document.getElementById("exploreButton");


if (exploreButton) {

  exploreButton.addEventListener(
    "click",
    () => {

      categoryButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      filterMenu("all");

    }
  );
}


const checkoutButton =
  document.getElementById("checkoutButton");


if (checkoutButton) {

  checkoutButton.addEventListener(
    "click",
    completeDemoOrder
  );
}


/* =========================================
   INITIAL STATE
========================================= */

updateCart();

updateLoyalty();
