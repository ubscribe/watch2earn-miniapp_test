const avatars = [
  { id: 1, name: "Neo", image: "assets/avatars/neo.png", price: 500, currency: "ubscribe" },
  { id: 2, name: "Luna", image: "assets/avatars/luna.png", price: 750, currency: "ubscribe" },
  { id: 3, name: "Galaxy", image: "assets/avatars/galaxy.png", price: 20, currency: "stars" },
];

function renderAvatars() {
  const grid = document.getElementById("avatar-grid");
  avatars.forEach(avatar => {
    const card = document.createElement("div");
    card.className = "avatar-card";

    const currencyIcon = avatar.currency === "stars" ? "⭐" : "💰";

    card.innerHTML = `
      <img src="${avatar.image}" alt="${avatar.name}" />
      <div class="price">${currencyIcon} ${avatar.price} ${avatar.currency === "stars" ? 'Stars' : '$UBSCRIBE'}</div>
    `;

    card.addEventListener("click", () => buyAvatar(avatar));
    grid.appendChild(card);
  });
}

function buyAvatar(avatar) {
  if (avatar.currency === "stars") {
    Telegram.WebApp.openInvoice({
      slug: "your-stars-product-slug", // замените на свой slug из BotFather
      success_url: "https://ubscribe.io/avatar-success",
      payload: `buy_avatar_${avatar.id}`
    });
  } else {
    alert(`💰 Покупка "${avatar.name}" за ${avatar.price} $UBSCRIBE`);
    // Здесь можно отправить данные в Supabase
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  renderAvatars();
});
