import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, updateProduct } from "../api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productNotFound, setProductNotFound] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProducts();

        if (data.success) {
          const product = data.products.find((item) => item._id === id);

          if (!product) {
            setProductNotFound(true);
            setErrorMessage("Product not found. It may have been deleted.");
            return;
          }

          setFormData({
            name: product.name,
            description: product.description || "",
            price: product.price,
            stock: product.stock,
          });
        } else {
          setErrorMessage(data.message || "Failed to load product details.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching the product.");
      } compression: finally {
        setInitialLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      // --- FIXED: Remove manual 'token' passing parameters since api.js automatically injects token ---
      const data = await updateProduct(id, {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      if (data.success) {
        navigate("/products");
      } else {
        setErrorMessage(data.message || "Failed to update product");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading Screen State
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium text-slate-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Not Found State
  if (productNotFound) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">
            We couldn't locate the item you're trying to edit. It may have been removed.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb Back Button */}
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <span className="mr-1.5">←</span> Back to products
        </button>

        {/* Edit Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Edit Product</h1>
              <p className="mt-1 text-sm text-slate-500">
                Update the pricing, inventory count, and details for this item.
              </p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2.5 py-1 rounded">
              ID: {id?.slice(-6)}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2">
                <span className="font-semibold text-rose-800">Error:</span>
                <span>{errorMessage}</span>
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
                placeholder="Product name"
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
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                placeholder="Product description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition duration-150 resize-y"
              />
            </div>

            {/* Price & Stock Row */}
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

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-medium shadow-sm transition-colors"
              >
                {submitting ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>               
            
        </div>
      </div>
    </div>
  );
} 
export default EditProduct;