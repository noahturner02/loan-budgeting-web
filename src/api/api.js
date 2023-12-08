const axios = require("axios");
export async function customerLogin(username, password) {
  return axios
    .post("https://budgetting-application-5bb4faab3241.herokuapp.com/customers/login", {
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
  return axios.post("https://budgetting-application-5bb4faab3241.herokuapp.com/customers/registration", {
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
  return axios.get("https://budgetting-application-5bb4faab3241.herokuapp.com/transactions/" + username)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error
  });
}

export async function addNewTransaction(username, transaction) {
  return axios.post("https://budgetting-application-5bb4faab3241.herokuapp.com/transactions/" + username + "/new", {
    cardNumber: transaction.cardNumber,
    merchant: transaction.merchant,
    transCategory: transaction.transCategory,
    transAmount: transaction.transAmount,
    transDate: transaction.transDate
  })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

export async function editTransaction(username, transaction) {
  return axios.put("https://budgetting-application-5bb4faab3241.herokuapp.com/transactions/" + username + "/editing/id=" + transaction.transID + "?merchant=" + transaction.merchant + "&transCategory=" + transaction.transCategory + "&transDate=" + transaction.transDate + "&transAmount=" + transaction.transAmount)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

export async function deleteTransaction(username, transID) {
  return axios.delete("https://budgetting-application-5bb4faab3241.herokuapp.com/transactions/" + username + "/delete/id=" + transID)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

export async function editCustomer(account) {
  return axios.put("https://budgetting-application-5bb4faab3241.herokuapp.com/update/" + account.username + "?password=" + account.password + "&firstName=" + account.firstName + "&lastName=" + account.lastName + "&phoneNumber=" + account.phoneNumber + "&email=" + account.email + "&address=" + account.address)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

export async function getBalanceByMonth(username, card, numOfMonths) {
  return axios.get("https://budgetting-application-5bb4faab3241.herokuapp.com/transactions/" + username + "/balance-in-months-of-" + card + "?numOfMonths=" + numOfMonths)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

export async function getBalanceByDay(username, card, numOfDays) {
  return axios.get("https://budgetting-application-5bb4faab3241.herokuapp.com/transactions/" + username + "/balance-in-days-of-" + card + "?numOfDays=" + numOfDays)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

export async function getTotalTransactionAmountInDays(username, cardNumber, month, year){
  return axios.get("https://budgetting-application-5bb4faab3241.herokuapp.com/transactions/" + username + "/amount-in-days-of-" + cardNumber + "-in-" + month + "-" + year)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

export async function getTotalTransactionAmountInMonths(username, cardNumber, year){
  return axios.get("https://budgetting-application-5bb4faab3241.herokuapp.com/transactions/" + username + "/amount-in-months-of-" + cardNumber + "-in-" + year)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

export async function getCurrentBalance(card) {
  return axios.get("https://budgetting-application-5bb4faab3241.herokuapp.com/credit_card/current-balance-of-" + card)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}