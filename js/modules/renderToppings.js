import { getData } from "./getData.js";

export const renderToppings = async () => {
  const { en: enToppings, uk: ukTopings } = await getData(
    "https://go-go-pizza-api-14eo.onrender.com/api/toppings"
  );
  console.log("ukTopings: ", ukTopings);
  console.log("enToppings: ", enToppings);
  const toppingsList = document.querySelector(".toppings__list");
  toppingsList.textContent = "";

  const items = enToppings.map((enName, i) => {
    const item = document.createElement("li");
    item.classList.add("toppings__item");
    item.innerHTML = `
       <input class="toppings__checkbox" type="checkbox" id="${enName}" name="topping" value="${enName}">
       <label class="toppings__label" for="${enName}">${ukTopings[
      i
    ][0].toUpperCase()}${ukTopings[
      i
    ].slice(1).toLowerCase()}</label>
      `;

    return item;
  });

  toppingsList.append(...items);
};
