import Phone from "../models/Phone.js";
import { phoneServices } from "../services/PhoneServices.js";
import { getEle } from "../ultil/ultil.js";
import { KiemtraBranch, kiemTraRong, kiemTraSo } from "../ultil/validate.js";

const getInfo = () => {
  let id = getEle("#MaSP").value;
  let name = getEle("#phoneName").value;
  let price = getEle("#price").value;
  let screen = getEle("#screen").value;
  let backCamera = getEle("#backCamera").value;
  let frontCamera = getEle("#frontCamera").value;
  let img = getEle("#image").value;
  let desc = getEle("#description").value;
  let type = getEle("#branch").value;

  return new Phone(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
};

const renderPhoneList = (arrPhone) => {
  console.log("arrPhone: ", arrPhone);

  const content = arrPhone
    .map(
      ({ id, name, price, img, desc }) => `
      <tr>
        <td >${id}</td>
        <td >${name}</td>
        <td >${price}</td>
        <td >
          <img src="${img}" class="w-full"/>
        </td>
        <td >${desc}</td>
        <td >
          <button class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" 
           type="button" onclick="editPhone('${id}')">Cập nhật</button>
          <button class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" type="button" onclick="delPhone('${id}')">Xóa</button>
        </td>
      </tr>
    `
    )
    .join("");

  document.querySelector("#tblDanhSachSP").innerHTML = content;
};

const resetForm = () => {
  getEle("#MaSP").value = "";
  getEle("#phoneName").value = "";
  getEle("#price").value = "";
  getEle("#screen").value = "";
  getEle("#backCamera").value = "";
  getEle("#frontCamera").value = "";
  getEle("#image").value = "";
  getEle("#description").value = "";
  getEle("#branch").value = "";
};

getEle("#btnAddPhone").onclick = () => {
  getEle("#btnCapNhat").disabled = true;
  getEle("#btnThem").disabled = false;
  resetForm();
};

const fetchPhoneList = () => {
  phoneServices
    .getPhone()
    .then((response) => {
      console.log("response: ", response.data);

      renderPhoneList(response.data);
    })
    .catch((err) => {
      console.error("err: ", err);
    });
};

fetchPhoneList();

// getEle("#btnAddPhone").onclick = () => {
//   getEle("#btnCapNhat").disabled = true;
// };

const delPhone = (id) => {
  phoneServices
    .delPhone(id)
    .then((response) => {
      console.log("response: ", response);

      fetchPhoneList();
    })
    .catch((err) => {
      console.error("err: ", err);
    });
};

window.delPhone = delPhone;

const addPhone = () => {
  const phone = getInfo();
  console.log("phone: ", phone);

  let isValid = kiemTraRong(
    phone.name,
    "#errTenSP",
    "Tên sản phẩm không được để trống !"
  );

  isValid &=
    kiemTraRong(
      phone.price,
      "#errGiaSP",
      "Giá sản phẩm không được để trống !"
    ) &&
    kiemTraSo(phone.price, "#errGiaSP", "Giá chỉ được để số không để chữ.");

  isValid = kiemTraRong(
    phone.screen,
    "#errScreen",
    "Màn hình không được để trống !"
  );
  isValid = kiemTraRong(
    phone.backCamera,
    "#errBackCamera",
    "Camera sau không được để trống !"
  );

  isValid = kiemTraRong(
    phone.frontCamera,
    "#errFrontCamera",
    "Camera trước không được để trống !"
  );

  isValid = kiemTraRong(
    phone.img,
    "#errImage",
    "hình ảnh không được để trống !"
  );

  isValid = kiemTraRong(
    phone.desc,
    "#errMoTaSP",
    "Mô tả sản phẩm không được để trống !"
  );

  isValid = KiemtraBranch(phone.type, "#errBranch", "Vui lòng chọn 1 branch !");

  if (isValid) {
    phoneServices
      .addPhone(phone)
      .then((response) => {
        console.log("response: ", response);

        fetchPhoneList();

        $("#myModal").modal("hide");

        getEle("#btnCapNhat").disabled = false;

        resetForm();
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  }
};

window.addPhone = addPhone;

const editPhone = (id) => {
  phoneServices
    .getPhoneByID(id)
    .then((response) => {
      console.log("response: ", response);
      const sp = response.data;
      getEle("#MaSP").value = sp.id;
      getEle("#phoneName").value = sp.name;
      getEle("#price").value = sp.price;
      getEle("#screen").value = sp.screen;
      getEle("#backCamera").value = sp.backCamera;
      getEle("#frontCamera").value = sp.frontCamera;
      getEle("#image").value = sp.img;
      getEle("#description").value = sp.desc;
      getEle("#branch").value = sp.type;

      $("#myModal").modal("show");

      getEle("#btnThem").disabled = true;
    })
    .catch((err) => {
      console.error("err: ", err);
    });
};

window.editPhone = editPhone;

const updatePhone = () => {
  const sp = getInfo();
  console.log("sp: ", sp);

  let isValid = kiemTraRong(
    sp.name,
    "#errTenSP",
    "Tên sản phẩm không được để trống !"
  );

  isValid &=
    kiemTraRong(sp.price, "#errGiaSP", "Giá sản phẩm không được để trống !") &&
    kiemTraSo(sp.price, "#errGiaSP", "Giá chỉ được để số không để chữ.");

  isValid = kiemTraRong(
    sp.screen,
    "#errScreen",
    "Màn hình không được để trống !"
  );
  isValid = kiemTraRong(
    sp.backCamera,
    "#errBackCamera",
    "Camera sau không được để trống !"
  );

  isValid = kiemTraRong(
    sp.frontCamera,
    "#errFrontCamera",
    "Camera trước không được để trống !"
  );

  isValid = kiemTraRong(sp.img, "#errImage", "hình ảnh không được để trống !");

  isValid = kiemTraRong(
    sp.desc,
    "#errMoTaSP",
    "Mô tả sản phẩm không được để trống !"
  );

  isValid = KiemtraBranch(sp.type, "#errBranch", "Vui lòng chọn 1 branch !");

  if (isValid) {
    phoneServices
      .updatePhone(sp.id, sp)
      .then((response) => {
        console.log("response: ", response);

        resetForm();

        $("#myModal").modal("hide");

        fetchPhoneList();

        getEle("#btnThem").disabled = false;
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  }
};

window.updatePhone = updatePhone;

const searchPhoneByName = () => {
  const keyWord = getEle("#txtSearch").value.trim().toLowerCase();

  phoneServices
    .getPhone()
    .then((response) => {
      console.log("response: ", response);

      const phoneList = response.data;

      const result = phoneList.filter((sp) => {
        return sp.name.toLowerCase().includes(keyWord);
      });

      if (result.length > 0) {
        fetchPhoneList(result);
      } else {
        console.log("sp này không tồn tại");
      }
    })
    .catch((error) => {
      console.error("error: ", error);
    });
};

window.searchPhoneByName = searchPhoneByName;
