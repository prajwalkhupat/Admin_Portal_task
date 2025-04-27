
import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../../api/mockProductApi";
import { toast } from "react-toastify";

function ProductList({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  async function loadProducts() {
    try {
      setLoading(true);
      let data = await fetchProducts(search);
      data = data.filter((p) => p.isActive);

      if (categoryFilter) {
        data = data.filter((p) => p.category === categoryFilter);
      }

      setProducts(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Soft delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      toast.success("Product marked as inactive");
      loadProducts();
    } catch (error) {
      toast.error(error.message || "Failed to delete");
    }
  }

  useEffect(() => {
    loadProducts();
  }, [search, categoryFilter]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border p-2 rounded"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Wearables">Wearables</option>
          <option value="Photography">Photography</option>
          <option value="Accessories">Accessories</option>
          <option value="Gaming">Gaming</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={loadProducts}
        >
          Refresh
        </button>
      </div>

      {/* Products table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Name</th>
                <th className="border border-gray-300 p-2 text-left">Price</th>
                <th className="border border-gray-300 p-2 text-left">Category</th>
                <th className="border border-gray-300 p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{p.name}</td>
                  <td className="border border-gray-300 p-2">₹{p.price}</td>
                  <td className="border border-gray-300 p-2">{p.category}</td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {currentProducts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
