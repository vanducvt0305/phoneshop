export default class Cart {
  constructor() {
    this.cart = [];
  }
  addPhone(phone) {
    const existingPhone = this.cart.find((item) => item.id === phone.id);
    if (existingPhone) {
      // Nếu sản phẩm đã có, tăng số lượng
      existingPhone.soLuong += phone.soLuong;
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ
      this.cart.push(phone);
    }
  }
}
