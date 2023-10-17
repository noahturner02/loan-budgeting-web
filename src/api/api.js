const axios = require("axios");
export function customerLogin(username, password) {
  return axios
    .post("https://budgetingapplication.azurewebsites.net/customer/login", {
      username: username,
      password: password
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
}
