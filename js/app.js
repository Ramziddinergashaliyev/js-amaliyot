const API__URL = "https://dummyjson.com";
const tbody = document.querySelector("tbody");
const categoryCard = document.querySelector(".sidebar__right__category");

async function productData(api, categoreData = "") {
  if (categoreData && categoreData !== "All") {
    const data = await fetch(`${api}/products/category/${categoreData}`);
    data
      .json()
      .then((res) => mapData(res))
      .catch((err) => console.log(err));
  } else {
    const data = await fetch(`${api}/products`);
    data
      .json()
      .then((res) => mapData(res))
      .catch((err) => console.log(err));
  }
}
productData(API__URL);

function mapData(data) {
  let cards = "";
  data.products.forEach((el) => {
    cards += `
    <tr>
      <td>
      <div class="table__img"><img src=${el.images[0]} alt="" /> ${el.title}</div>
      </td>
      <td>${el.brand}</td>
      <td class="table__rating">$${el.rating}</td>
      <td  class="table__price">$${el.price}</td>
      <td>${el.sku}</td>
    </tr>    
    `;
  });
  tbody.innerHTML = cards;
}

async function CategoryData(api) {
  const data = await fetch(`${api}/products/category-list`);
  data
    .json()
    .then((res) => category(res))
    .catch((err) => console.log(err));
}
CategoryData(API__URL);

function category(element) {
  let cat = "<li>All</li>";
  element.forEach((el) => {
    cat += `
    <li>${el}</li>
    `;
  });

  categoryCard.innerHTML = cat;
}

categoryCard.addEventListener("click", (e) => {
  let categoreData = e.target.innerHTML;
  productData(API__URL, categoreData);
});
