import axios from "axios";


export async function getProduct(id) {
    try {
      const response = await axios.get(
          `http://localhost:3001/api/products/${id}`
      );
      return response.data;
    } catch (error) {
        return error.response.status
    }
}


export async function getAllProduct() {
    const response = await axios.get(
        `http://localhost:3001/api/products/`
    );
    return response.data;
}


export async function calculateTotal(subTotal) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/f/calculateTax`,
        { 'subTotal': subTotal }
      );
      return Number(response.data.total.toFixed());
    } catch (error) {
      return error.response.status;
    }
}


export async function bankLogin(user) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/bankAccounts/bankAccountSignIn`,
        user,
      );
      return {
        validUser: response.data.validation,
        validPurchase: response.data.validPurchase,
        availableBalance: response.data.balance,
      }
    } catch (error) {
      return error.response.status;
    }
}


export async function confirmPurchase(userPurchase) {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/f/confirmPurchase`,
      userPurchase,
    );
    return response.data;
  } catch (error) {
    return error.response.status;
  }
}


export async function saveInvoice(invoice) {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/f/saveInvoice`,
      invoice,
    );
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.status;
  }
}


export async function sendInvoice(dataInvoice) {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/f/sendInvoice`,
      dataInvoice,
    );
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.status;
  }
}


export async function getBestSellingProducts(date, tokenId) {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/analytics/getBestSellingProducts`,
      date,
      {
        headers: {
          "x-access-token": tokenId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.status;
  }
}