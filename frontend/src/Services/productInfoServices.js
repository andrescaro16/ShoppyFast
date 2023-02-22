const axios = require('axios');

export async function getProduct(id) {
    const response = await axios.get(
        `http://localhost:3001/api/products/${id}`
    );
    return response.data;
}

export async function getAllProduct() {
    const response = await axios.get(
        `http://localhost:3001/api/products/`
    );
    return response.data;
}