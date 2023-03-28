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


//Calcular total (con IVA)
export async function calculateTotal(subTotal) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/f/calculateTax`,
        { 'subTotal': subTotal }
      );
      return response.data.total;
    } catch (error) {
      return error.response.status;
    }
}


//Enviar datos login banco y él me retorna si se puede hacer el pago o no
export async function bankLogin(user) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/bankAccounts/bankAccountSignIn`,
        user,
      );
      //TESTING
      console.log(response.data.validation, response.data.validPurchase, response.data.balance)
      return {
        validUser: response.data.validation,
        validPurchase: response.data.validPurchase,
        availableBalance: response.data.balance,
      }
    } catch (error) {
      console.log(error)
      return error.response.status;
    }
}