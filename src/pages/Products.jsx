import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../api";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    const result = await getProducts();
    if (result.success) {
      setProducts(result.products);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const token = localStorage.getItem("accessToken");
    const result = await deleteProduct(id, token);

    if (result.success) {
      loadProducts();
    } else {
      alert(result.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Bar Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Products
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your inventory, prices, and catalog.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/add-product")}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              + Add Product
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-sm font-medium shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-500">
              <span className="text-sm font-medium">Loading products...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-base font-semibold text-slate-700">No products found</p>
              <p className="mt-1 text-sm text-slate-500">Get started by creating a new item.</p>
              <button
                onClick={() => navigate("/add-product")}
                className="mt-4 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium text-sm hover:bg-indigo-100"
              >
                Add your first product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden"
                >
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Title & Price */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-lg font-semibold text-slate-900 line-clamp-1">
                        {product.name}
                      </h2>
                      <span className="text-lg font-bold text-slate-900 whitespace-nowrap">
                        ₹{product.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
                      {product.description || "No description provided."}
                    </p>

                    {/* Stock Pill Badge */}
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.stock > 0
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {product.stock > 0 ? `Stock: ${product.stock}` : "Out of stock"}
                      </span>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => navigate(`/edit-product/${product._id}`)}
                        className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-150"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors duration-150"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default Products;