import axios from "axios";

let port = "http://10.161.59.167:3001";

export async function getProduct(id) {
    try {
      const response = await axios.get(
          `${port}/api/products/${id}`
      );
      return response.data;
    } catch (error) {
        return error.response.status
    }
}


export async function getAllProduct() {
    const response = await axios.get(
        `${port}/api/products/`
    );
    return response.data;
}


export async function calculateTotal(subTotal) {
    try {
      const response = await axios.post(
        `${port}/api/f/calculateTax`,
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
        `${port}/api/bankAccounts/bankAccountSignIn`,
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
      `${port}/api/f/confirmPurchase`,
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
      `${port}/api/f/saveInvoice`,
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
      `${port}/api/f/sendInvoice`,
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
      `${port}/api/analytics/getBestSellingProducts`,
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


export async function getLessSellingProducts(date, tokenId) {
  try {
    const response = await axios.post(
      `${port}/api/analytics/getLessSellingProducts`,
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


export async function sendAdminInfo(formData) {
  try {
    const response = await axios.post(`${port}/api/admin/signin`, formData);
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.status;
  }
}

export async function sendCupon(formCupon, tokenId) {
  try {
    console.log(formCupon);
    const response = await axios.post(
      `${port}/api/coupons/createCoupon`,
      formCupon,
      {
        headers: {
          "x-access-token": tokenId
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.status;
  }
}

