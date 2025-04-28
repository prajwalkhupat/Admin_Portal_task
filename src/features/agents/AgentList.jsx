
import { useEffect, useState } from "react";
import { fetchAgents, updateAgent, deleteAgent } from "../../api/mockFieldAgentApi";
import { toast } from "react-toastify";

function AgentList({ onEdit }) {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadAgents() {
    try {
      setLoading(true);
      const data = await fetchAgents(search);
      setAgents(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;

    try {
      await deleteAgent(id);
      toast.success("Agent deleted successfully");
      loadAgents();
    } catch (error) {
      toast.error(error.message || "Failed to delete agent");
      loadAgents(); 
    }
  }

  async function toggleStatus(id, currentStatus) {
    const updatedList = agents.map((a) =>
      a.id === id ? { ...a, isActive: !currentStatus } : a
    );
    setAgents(updatedList); 

    try {
      await updateAgent(id, { isActive: !currentStatus });
      toast.success("Agent status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update status");
      setAgents((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isActive: currentStatus } : a))
      ); 
    }
  }

  useEffect(() => {
    loadAgents();
  }, [search]);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col sm:flex-row mb-4 gap-2">
        <input
          type="text"
          placeholder="Search agent..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={loadAgents}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.id}>
                <td className="p-2 border">{a.name}</td>
                <td className="p-2 border">{a.mobile}</td>
                <td className="p-2 border">
                  {a.isActive ? "Active" : "Inactive"}
                </td>
                <td className="p-2 border flex flex-col sm:flex-row gap-1">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => onEdit(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => toggleStatus(a.id, a.isActive)}
                  >
                    {a.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(a.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AgentList;
