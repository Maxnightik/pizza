import { hideLoader, showLoader } from "./loader.js";

export const getData = async (url) => {
  showLoader();
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch pizzas products");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching pizzas products: ${error}`);
    return [];
  } finally {
    hideLoader();
  }
};
