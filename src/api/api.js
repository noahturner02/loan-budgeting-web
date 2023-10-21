const axios = require("axios");
export async function customerLogin(username, password) {
  return axios
    .post("https://budgetingapplication.azurewebsites.net/customers/login", {
      username: username,
      password: password
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error
    });
    
}
