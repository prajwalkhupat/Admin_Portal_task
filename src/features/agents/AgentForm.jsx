
import { useState } from "react";
import { addAgent, updateAgent } from "../../api/mockFieldAgentApi";
import { toast } from "react-toastify";

function AgentForm({ selected, onClose, refresh }) {
  const [formData, setFormData] = useState(
    selected || {
      name: "",
      mobile: "",
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      toast.error("Valid 10-digit mobile number is required");
      return;
    }

    try {
      if (selected) {
        await updateAgent(selected.id, formData);
        toast.success("Agent updated successfully");
      } else {
        await addAgent(formData);
        toast.success("Agent added successfully");
      }
      refresh();
      onClose();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {selected ? "Edit Agent" : "Add Agent"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-2 p-2 border rounded"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Mobile"
          className="w-full mb-4 p-2 border rounded"
          value={formData.mobile}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, mobile: e.target.value }))
          }
        />
        <div className="flex justify-end gap-2">
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

export default AgentForm;
