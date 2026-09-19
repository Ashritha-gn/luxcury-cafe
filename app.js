// ==========================================
// YOUR CAFÉ - BASIC INTERACTIONS
// ==========================================

let cartCount = 0;

const cartButton = document.querySelector(".cart-button");
const cartNumber = document.querySelector(".cart-button span");
const exploreButton = document.querySelector(".primary-button");
const categoryButtons = document.querySelectorAll(".category-grid button");
const foodCards = document.querySelectorAll(".food-card");


// ==========================================
// CART
// ==========================================

function addToCart() {
  cartCount++;

  cartNumber.textContent = cartCount;

  cartButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.2)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 400,
      easing: "ease-out"
    }
  );
}


// ==========================================
// EXPLORE MENU
// ==========================================

exploreButton.addEventListener("click", () => {

  document.querySelector(".categories").scrollIntoView({
    behavior: "smooth"
  });

});


// ==========================================
// CATEGORY BUTTONS
// ==========================================

categoryButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const categoryName =
      button.querySelector("strong").textContent;

    console.log("Selected category:", categoryName);

    button.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.95)" },
        { transform: "scale(1)" }
      ],
      {
        duration: 250
      }
    );

  });

});


// ==========================================
// FOOD CARD INTERACTION
// ==========================================

foodCards.forEach((card) => {

  card.addEventListener("click", () => {

    addToCart();

    card.animate(
      [
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(1.08) rotate(3deg)" },
        { transform: "scale(1) rotate(0deg)" }
      ],
      {
        duration: 500,
        easing: "ease-out"
      }
    );

  });

});


// ==========================================
// WELCOME MESSAGE
// ==========================================

window.addEventListener("load", () => {

  console.log("Welcome to Your Café ☕");

});
