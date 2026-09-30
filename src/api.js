// ✅ FIXED: Added the required /api path to the end of the string
const API_URL = "https://onrender.com";

// Helper function to dynamically grab the token from storage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
};

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
        body: JSON.stringify(userData)
    });
    return response.json();
};

export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: getAuthHeaders() 
    });
    return response.json();
};

export const createProduct = async (productData) => {
    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: getAuthHeaders(), 
        body: JSON.stringify(productData)
    });
    return response.json();
};

export const updateProduct = async (id, productData) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(), 
        body: JSON.stringify(productData)
    });
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders() 
    });
    return response.json();
};
