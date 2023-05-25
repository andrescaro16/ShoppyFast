import axios from "axios";

let port = "http://192.168.1.14:3001";

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

//--------------------------------------------[cupones]----------------------------------------
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

export async function sendAplyCupon(formCupon) {
  try {
    console.log(formCupon);
    const response = await axios.post(
      `${port}/api/coupons/applyDiscount`,
      JSON.stringify(formCupon),
      {
        headers: {
          "Content-Type": "application/json"
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

//--------------------------------------------[Productos]----------------------------------------

export async function sendProductInfo(tokenId, ProductInfo) {
  const id = parseInt(ProductInfo.id);
  const price = parseInt(ProductInfo.price);
  const cantidad = parseInt(ProductInfo.cantidad);

  if (isNaN(id) || isNaN(price) || isNaN(cantidad)) {
    console.log('Los campos id, price y cantidad deben ser números enteros válidos.');
    return;
  }

  ProductInfo.id = id;
  ProductInfo.price = price;
  ProductInfo.cantidad = cantidad;

  try {
    const response = await axios.put(
      `${port}/api/products/${ProductInfo.id}`,
      ProductInfo,
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

export async function sendNewProduct(tokenId, ProductData) {
  try {
    const response = await axios.post(
      `${port}/api/products/AddNewProduct`,
      ProductData,
      {
        headers: {
          "x-access-token": tokenId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response;
  }
}
