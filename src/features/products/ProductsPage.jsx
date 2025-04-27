

import { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

function ProductsPage() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleEdit(product) {
    setSelected(product);
    setOpen(true);
  }

  function handleAdd() {
    setSelected(null);
    setOpen(true);
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      <ProductList onEdit={handleEdit} key={refreshKey} />

      {open && (
        <ProductForm
          selected={selected}
          onClose={() => setOpen(false)}
          refresh={() => setRefreshKey((k) => k + 1)}
        />
      )}
    </div>
  );
}

export default ProductsPage;
