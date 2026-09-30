import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const result = await createProduct(
        {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        },
        
      );

      if (result.success) {
        navigate("/products");
      } else {
        setError(result.message || "Failed to create product");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Navigation Breadcrumb / Back Link */}
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <span className="mr-1.5">←</span> Back to products
        </button>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-5 border-b border-slate-100">
            <h1 className="text-xl font-bold text-slate-900">Add New Product</h1>
            <p className="mt-1 text-sm text-slate-500">
              Provide the details below to add an item to your catalog.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Error Banner */}
            {error && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2">
                <span className="font-semibold text-rose-800">Error:</span>
                <span>{error}</span>
              </div>
            )}

            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Wireless Noise-Cancelling Headphones"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition duration-150"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Provide a detailed description of the product..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition duration-150 resize-y"
              />
            </div>

            {/* Price & Stock Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Price <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-medium text-sm">
                    ₹
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition duration-150"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Stock Quantity <span className="text-rose-500">*</span>
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  required
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition duration-150"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {loading ? "Adding Product..." : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;