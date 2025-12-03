function show(showt) {
  // set query param
  const url = new URL(window.location);
  url.searchParams.set("c", showt);
  history.pushState(null, "", url);

  document
    .querySelectorAll(
      "article.cover,article.opacity,article.blinkers,article.hover"
    )
    .forEach((e) => e.classList.add("hidden"));
  document
    .querySelectorAll("article." + showt)
    .forEach((e) => e.classList.remove("hidden"));

  document.querySelectorAll("header button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector("header button#btn-" + showt).classList.add("active");
}
function slide(img1, img2) {
  return function (e) {
    // funky maths eh
    let x = e.target.value ** (1 / 2);
    img1.style.opacity = 2 * x - x ** 2;
    img2.style.opacity = 1 - x ** 2;
  };
}
let state = false;
function swapblinkers() {
  let images1 = document.querySelectorAll("img-blinker img:nth-child(1)");
  let images2 = document.querySelectorAll("img-blinker img:nth-child(2)");
  console.log("swapping!");

  images1.forEach((img) => {
    img.style.opacity = state ? 1 : 0;
  });
  images2.forEach((img) => {
    img.style.opacity = state ? 0 : 1;
  });

  state = !state;

  setTimeout(() => {
    swapblinkers();
  }, 500 + (state ? 0 : 100));
}
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const comparison = urlParams.get("c");
  if (comparison) show(comparison);

  document.querySelectorAll("img-opacity-slider").forEach((el) => {
    let slider = el.querySelector("input.opacity-slider");
    let img1 = el.querySelector("img:nth-child(1)");
    let img2 = el.querySelector("img:nth-child(2)");
    slider.addEventListener("input", slide(img1, img2));
  });
  swapblinkers();
});
