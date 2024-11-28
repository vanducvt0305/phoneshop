// axios({
//   url: "https://673e9132a9bc276ec4b4dac3.mockapi.io/Phone",
//   method: "GET",
// })
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((err) => {
//     console.log("err: ", err);
//   });

const BASE_URL = "https://673e9132a9bc276ec4b4dac3.mockapi.io/Phone";

export const phoneServices = {
  getPhone: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
  delPhone: (id) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "DELETE",
    });
  },
  addPhone: (phone) => {
    return axios({
      url: BASE_URL,
      method: "POST",
      data: phone,
    });
  },
  getPhoneByID: (id) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
  },
  updatePhone: (id, phone) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "PUT",
      data: phone,
    });
  },
};
