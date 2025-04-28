

import { useState } from "react";
import { addProduct, updateProduct } from "../../api/mockProductApi";
import { toast } from "react-toastify";

function ProductForm({ selected, onClose, refresh }) {
  const [formData, setFormData] = useState(
    selected || {
      name: "",
      price: "",
      description: "",
      category: "",
      status: "active",  
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (selected) {
        await updateProduct(selected.id, formData);
        toast.success("Product updated successfully");
      } else {
        await addProduct(formData);
        toast.success("Product added successfully");
      }
      refresh();
      onClose();
    } catch (error) {
      if (error.message.includes("409")) {
        toast.warning("Conflict detected. Please refresh and try again!");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {selected ? "Edit Product" : "Add Product"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-2 p-2 border rounded"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full mb-2 p-2 border rounded"
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: e.target.value }))
          }
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full mb-2 p-2 border rounded"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          required
        />
        <textarea
          placeholder="Description"
          className="w-full mb-2 p-2 border rounded"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {selected ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
