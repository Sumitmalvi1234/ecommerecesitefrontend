import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
    const token = localStorage.getItem("accessToken");

    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/products" />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/add-product"
                    element={token ? <AddProduct /> : <Navigate to="/login" />}
                />

                <Route
                    path="/edit-product/:id"
                    element={token ? <EditProduct /> : <Navigate to="/login" />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;