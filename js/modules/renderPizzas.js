import { getData } from "./getData.js";
import { modalController } from "./modalController.js";

const btnReset = document.querySelector("button");
btnReset.classList.add("pizza__reset-toppings");
btnReset.textContent = "Скинути фільтр";
btnReset.type = "reset";
btnReset.setAttribute("form", "toppings");

const createCard = (data) => {
  const card = document.createElement("article");
  card.classList.add("card", "pizza__card");

  card.innerHTML = `
    <picture>
        <source srcset="${data.images[1]}" type="image/webp">
        <img class="card__img" src="${data.images[0]}" alt="${data.name.uk}">
     </picture>
        <div class="card__content">
            <h3 class="card__title">${data.name.uk[0].toUpperCase()}${data.name.uk
    .slice(1)
    .toLowerCase()}</h3>

            <p class="card__info">
                <span class="card__price">${data.price["25cm"]} грн</span>
                <span>/</span>
                <span class="card__weight">25 см</span>
            </p>

            <btn class="card__button" data-id="${data.id}">Вибрати</btn>
        </div>
    `;

  return card;
};

export const renderPizzas = async (toppings) => {
  const pizzas = await getData(
    `https://go-go-pizza-api-14eo.onrender.com/api/products${
      toppings ? `?toppings=${toppings}` : ""
    }`
  );
  const pizzaTitle = document.querySelector(".pizza__title");

  const pizzaList = document.querySelector(".pizza__list");
  pizzaList.textContent = "";

  if (pizzas.length) {
    pizzaTitle.textContent = "Піца";
    btnReset.remove();
    const items = pizzas.map((data) => {
      const item = document.createElement("li");
      item.classList.add("pizza__item");
      const card = createCard(data);
      item.append(card);
      return item;
    });

    pizzaList.append(...items);

    modalController({
      modal: ".modal-pizza",
      btnOpen: ".card__button",
      btnClose: ".modal__close",
      cbOpen(btnOpen) {
        console.log("btnOpen: ", btnOpen.dataset.id);
      },
    });
  } else {
    pizzaTitle.textContent = "Такої піци ми не маємо :(";
    pizzaTitle.after(btnReset);
  }
};

btnReset.addEventListener("click", () => {
  renderPizzas();
  document.querySelector(".toppings__reset").remove();
});
