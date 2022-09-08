// ______________________swiper slider________________________
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 4,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    250: {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerGroup: 1,

    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerGroup: 1,

    },
    768: {
      slidesPerView: 1,
      spaceBetween: 40,
      slidesPerGroup: 1,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// ________________________-counter_______________________
$("#counter").each(function () {
  console.log(counter);
  $(this)
    .prop("Counter", 0)
    .animate(
      {
        Counter: $(this).text(),
      },
      {
        duration: 4000,
        easing: "swing",
        step: function (now) {
          $(this).text(Math.ceil(now));
        },
      }
    );
});
// __________________________cart_________________________
let final_cart = document.querySelector(".output");
let modal_output_btn = document.createElement("button");
modal_output_btn.className = "btn btn-primary forbgc";
final_cart.setAttribute("data-toggle", "modal");
final_cart.setAttribute("data-target", "#exampleModal");
let counting_items = document.querySelector(".counting_items");
final_cart.appendChild(modal_output_btn);
final_cart.appendChild(modal_output_btn);
function counter_fun() {
  let counting_items = document.querySelector(".counting_items");

  let counter = JSON.parse(localStorage.getItem("counter"));
  if (counter == null) {
    counting_items.innerHTML = 0;
  } else {
    counting_items.innerHTML = `${counter}`;
  }
}

let buy_buttons = document.querySelectorAll(".m3");
buy_buttons.forEach((btns, ind) => {
  btns.addEventListener("click", localData);
  function localData(btns) {
    btns.preventDefault();
    let whole_data = btns.target.parentElement.parentElement;
    let whole_data1 = btns.target.parentElement;
    let price = whole_data.querySelector(".para2").innerText;
    let brand = whole_data.querySelector(".para1").innerText;

    let brand_img = whole_data1.querySelector(".m2").src;
    let obj = { brand, price, brand_img };
    let getdata = JSON.parse(localStorage.getItem("info"));
    let counter = JSON.parse(localStorage.getItem("counter"));
    if (getdata) {
      getdata.push(obj);
      counter = counter + 1;
      localStorage.setItem("info", JSON.stringify(getdata));
      localStorage.setItem("counter", JSON.stringify(counter));
    } else {
      localStorage.setItem("info", JSON.stringify([obj]));
      localStorage.setItem("counter", JSON.stringify(1));
    }
    counter_fun();
  }
});

final_cart.addEventListener("click", finalcart);
function finalcart() {
  let list = document.querySelector(".list");
  list.innerHTML = "";
  let getdata = JSON.parse(localStorage.getItem("info"));
  getdata.forEach((e, i) => {
    list.innerHTML += `
  <div class="card-group my-3 loopremove">
  <div class="card rendered_cards">
  <h5 class="card-title single_del">(${1 + i})</h5>
        
     <img class="card-img-top my-2 setinnerpic" src="${
       e.brand_img
     }" alt="Card image cap">
    <div class="card-body ">
     
      <h5 class="card-title ">Brand :${e.brand}</h5>
      <p class="card-text ">Price :${e.price}</p>
    </div>
  <h5 onclick="del(${i})" class="card-title single_del">X</h5>

    
        `;
  });
}
function del(i) {
  let counter = JSON.parse(localStorage.getItem("counter"));
  let getdata = JSON.parse(localStorage.getItem("info"));
  counter = counter - 1;
  getdata.splice(i, 1);
  localStorage.setItem("info", JSON.stringify(getdata));
  localStorage.setItem("counter", JSON.stringify(counter));
  finalcart();
  counter_fun();
}
let clearall = document.querySelector(".clearall");

clearall.addEventListener("click", () => {
  let counting_items = document.querySelector(".counting_items");
  let counter = JSON.parse(localStorage.getItem("counter"));
  let getdata = JSON.parse(localStorage.getItem("info"));
  let list = document.querySelector(".list");
  counting_items.innerHTML = "";
  localStorage.clear();
  list.innerHTML = "your cart is empty...";
});

counter_fun();
