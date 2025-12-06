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

  document.querySelectorAll("#buttons button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector("#buttons button#btn-" + showt)
    .classList.add("active");
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
let n_custom = 1;
function addcustompic(e) {
  e.preventDefault();

  // create comparison element
  const comparisonTemplate = document.querySelector(".comparison.template");
  let newComparison = comparisonTemplate.cloneNode(true);
  newComparison.querySelector("h2").innerText = "Custom " + n_custom;
  let imgs1 = newComparison.querySelectorAll('img[slot="first"]');
  let imgs2 = newComparison.querySelectorAll('img[slot="second"]');
  newComparison
    .querySelector("input.opacity-slider")
    .addEventListener("input", slide(imgs1[1], imgs2[1]));
  newComparison.style.display = "unset";
  document.querySelector(".custom-comparisons").append(newComparison);

  // get form data (images)
  const form = e.target;
  const formData = new FormData(form);
  let p1 = formData.get("custompic1");
  let p2 = formData.get("custompic2");
  const reader1 = new FileReader();
  const reader2 = new FileReader();

  // update images
  reader1.onload = function (e) {
    imgs1.forEach((img) => {
      img.src = e.target.result;
    });
  };
  reader2.onload = function (e) {
    imgs2.forEach((img) => {
      img.src = e.target.result;
    });
  };
  reader1.readAsDataURL(p1);
  reader2.readAsDataURL(p2);

  n_custom++;
}
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const comparison = urlParams.get("c");
  show(comparison ?? "cover");
  console.log(`show(comparison ?? "cover");`);
  console.log(`show(${comparison ?? "cover"});`);

  document.querySelectorAll("img-opacity-slider").forEach((el) => {
    let slider = el.querySelector("input.opacity-slider");
    let img1 = el.querySelector("img:nth-child(1)");
    let img2 = el.querySelector("img:nth-child(2)");
    slider.addEventListener("input", slide(img1, img2));
  });
  swapblinkers();

  document.getElementById("custompic").addEventListener("submit", addcustompic);
});
