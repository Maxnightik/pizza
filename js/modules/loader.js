const loader = document.createElement("div");
loader.classList.add("loader");

const loaderSpiner = document.createElement("div");
loaderSpiner.classList.add("loader__spinner");

loader.append(loaderSpiner);

export const showLoader = () => {
  document.body.append(loader);
};

export const hideLoader = () => {
  loader.remove();
};
