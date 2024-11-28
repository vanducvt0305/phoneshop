const BASE_URL = "https://673e9132a9bc276ec4b4dac3.mockapi.io/Phone";

const phoneService = {
  getPhone: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
};

export default phoneService;
