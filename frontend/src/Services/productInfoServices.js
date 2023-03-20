import axios from 'axios';

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