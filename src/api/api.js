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

export async function customerRegister(customer) {
  return axios.post("https://budgetingapplication.azurewebsites.net/customers/registration", {
    firstName: customer.firstName,
    lastName: customer.lastName, 
    phoneNumber: customer.phoneNumber,
    username: customer.username,
    password: customer.password,
    address: customer.address,
    email: customer.email
  })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error
  });
}

export async function getAllTransactions(username) {
  return axios.get("https://budgetingapplication.azurewebsites.net/transactions/" + username)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error
  });
}

