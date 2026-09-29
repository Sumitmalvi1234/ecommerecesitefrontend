const API_URL = "https://ecommercesitebackend-szq3.onrender.com/api";

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    return response.json();
};


export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(userData)
    });

    return response.json();
};


export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);

    return response.json();
};


export const createProduct = async (productData, token) => {
    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
    });

    return response.json();
};


export const updateProduct = async (id, productData, token) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
    });

    return response.json();
};


export const deleteProduct = async (id, token) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
};