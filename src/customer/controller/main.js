import phoneService from "../services/phoneService.js";
import Cart from "../model/cart.js";
const cart = new Cart();
let quantity = document.querySelector("#quantity");

const renderPhoneList = (arrPhone) => {
  const content = arrPhone
    .map(
      (Phone) =>
        `
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#">
    <img class="rounded-t-lg" src="../../img/${Phone.img}" alt="" />
</a>
<div class="p-5">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${Phone.name}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Price ${Phone.price}</p>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${Phone.desc}</p>
    <a href="#" id="addPhone"  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
      
    >
        Thêm vào giỏ hàng
         <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>
</div>
        `
    )
    .join("");
  document.querySelector("#phoneProduct").innerHTML = content;
  document.querySelectorAll("#addPhone").forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const newPhone = { ...arrPhone[index], soLuong: 1 };
      cart.addPhone(newPhone);
      e.target.innerHTML = "Đã thêm vào giỏ hàng";
      e.target.classList.add("!bg-orange-500");

      quantity.innerHTML = cart.cart.length;
      localStorage.setItem("listCart", JSON.stringify(cart.cart));
    });
  });
};

// RenderPhone
const fetchPhone = () => {
  phoneService
    .getPhone()
    .then((response) => {
      renderPhoneList(response.data);
    })
    .catch((err) => {});
};
fetchPhone();

// Xử lý Render thẻ Select
let phoneSelect = document.querySelector("#phoneSelect");
phoneSelect?.addEventListener("change", () => {
  if (phoneSelect.value === "tatCa") {
    fetchPhone();
  } else if (phoneSelect.value === "samsung") {
    phoneService
      .getPhone()
      .then((response) => {
        let samSungPhone = response.data.filter((phone) => {
          return phone.type == "samsung";
        });
        renderPhoneList(samSungPhone);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    {
      phoneService
        .getPhone()
        .then((response) => {
          let iphone = response.data.filter((phone) => {
            return phone.type == "iphone";
          });
          renderPhoneList(iphone);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

const renderCart = (listCart) => {
  const content = listCart
    .map((Phone) => {
      return `
    <tr class="bg-gray-50 hover:bg-gray-100">
     <td class="px-6 py-4 border border-gray-300">${Phone.id}</td>
     <td class="px-6 py-4 border border-gray-300">${Phone.name}</td>
     <td class="px-6 py-4 border border-gray-300"><img class="w-[100px]" src=../../img/${
       Phone.img
     } alt=''/></td>
     <td class="px-6 py-4 border border-gray-300 ">
     <button class="py-3 px-5 bg-orange-500 rounded-md mr-2" onclick="giamSoLuong('${
       Phone.id
     }')">-</button>
     ${Phone.soLuong}
     <button class="py-3 px-5 bg-orange-500 rounded-md ml-2" onclick="tangSoLuong('${
       Phone.id
     }')">+</button>
     </td>
     <td class="px-6 py-4 border border-gray-300">${Phone.price}</td>
     <td class="px-6 py-4 border border-gray-300">${
       Phone.price * Phone.soLuong
     }</td>
     <td class="px-6 py-4 border border-gray-300"><button class="py-3 px-6 bg-orange-500 rounded-md ml-2" onclick="xoaSanPham('${
       Phone.id
     }')">Xoá</button></td>
    </tr>
    `;
    })
    .join(""); // join() để nối các phần tử thành một chuỗi

  document.querySelector("#tbody").innerHTML = content;
};
let listCart = JSON.parse(localStorage.getItem("listCart"));
renderCart(listCart);

const tinhTongTien = () => {
  let listCart = JSON.parse(localStorage.getItem("listCart"));
  const total = listCart.reduce(
    (sum, phone) => sum + phone.price * phone.soLuong,
    0
  );
  document.querySelector("#totalPrice").innerHTML = total;
};
tinhTongTien();
const giamSoLuong = (id) => {
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
  const phoneClick = listCart.find((item) => item.id === id);

  if (phoneClick.soLuong == 1) {
    let DelListCart = listCart.filter((phone) => {
      return phone.id !== phoneClick.id;
    });
    localStorage.setItem("listCart", JSON.stringify(DelListCart));
    renderCart(DelListCart);
  } else {
    phoneClick.soLuong -= 1;
    localStorage.setItem("listCart", JSON.stringify(listCart));
    tinhTongTien();
    renderCart(listCart);
  }
};
const tangSoLuong = (id) => {
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
  const phoneClick = listCart.find((item) => item.id === id);
  phoneClick.soLuong += 1;
  localStorage.setItem("listCart", JSON.stringify(listCart));
  tinhTongTien();
  renderCart(listCart);
};

const xoaSanPham = (id) => {
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
  const phoneClick = listCart.find((item) => item.id === id);
  let DelListCart = listCart.filter((phone) => {
    return phone.id !== phoneClick.id;
  });

  localStorage.setItem("listCart", JSON.stringify(DelListCart));
  renderCart(DelListCart);
  tinhTongTien();
};
const thanhToan = () => {
  listCart = [];
  renderCart(listCart);
  tinhTongTien();
  localStorage.removeItem("listCart");
};
window.tinhTongTien = tinhTongTien;
window.giamSoLuong = giamSoLuong;
window.tangSoLuong = tangSoLuong;
window.xoaSanPham = xoaSanPham;
window.thanhToan = thanhToan;
