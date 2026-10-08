
    const cartCount = document.getElementById("cartCount");
    const cartList = document.getElementById("cartList");
    const favoritesList = document.getElementById("favoritesList");
    const cartItems = [];
    const favoriteItems = new Set();
    let count = 0;

    document.querySelectorAll("[data-cart]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.dataset.cart;
        const price = button.dataset.price;
        cartItems.push({ item, price });
        count += 1;
        cartCount.textContent = count;
        button.textContent = "Added";
        renderCart();
      });
    });

    document.querySelectorAll("[data-favorite]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.dataset.favorite;
        button.classList.toggle("active");

        if (favoriteItems.has(item)) {
          favoriteItems.delete(item);
        } else {
          favoriteItems.add(item);
        }
        renderFavorites();
      });
    });

    document.querySelectorAll("[data-page]").forEach((button) => {
      button.addEventListener("click", () => {
        showPage(button.dataset.page);
      });
    });

    function showPage(page) {
      document.querySelectorAll("[data-page]").forEach((button) => {
        button.classList.toggle("active", button.dataset.page === page);
      });

      document.getElementById("homePage").style.display = page === "home" ? "block" : "none";
      document.querySelectorAll(".page-panel").forEach((panel) => {
        panel.classList.remove("active");
      });

      if (page !== "home") {
        document.getElementById(`${page}Page`).classList.add("active");
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderFavorites() {
      if (!favoriteItems.size) {
        favoritesList.innerHTML = '<div class="empty-note">No favorite meal yet. Tap the heart on any food card.</div>';
        return;
      }

      favoritesList.innerHTML = Array.from(favoriteItems).map((item) => (
        `<div class="list-row"><div><strong>${item}</strong><span>Saved meal</span></div><a class="mini-button primary" href="https://wa.me/2348135846600?text=Hello%2C%20I%20want%20to%20order%20${encodeURIComponent(item)}">Buy</a></div>`
      )).join("");
    }
    function renderCart() {
      if (!cartItems.length) {
        cartList.innerHTML = '<div class="empty-note">Your cart is empty. Tap Add on a food card.</div>';
        return;
      }

      cartList.innerHTML = cartItems.map(({ item, price }) => (
        `<div class="list-row"><div><strong>${item}</strong><span>${price}</span></div><a class="mini-button primary" href="https://wa.me/2348135846600?text=Hello%2C%20I%20want%20to%20order%20${encodeURIComponent(item)}">Buy</a></div>`
      )).join("");
    }
