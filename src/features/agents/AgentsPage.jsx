
import { useState } from "react";
import AgentList from "./AgentList";
import AgentForm from "./AgentForm";

function AgentsPage() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleEdit(agent) {
    setSelected(agent);
    setOpen(true);
  }

  function handleAdd() {
    setSelected(null);
    setOpen(true);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Field Agents</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Agent
        </button>
      </div>

      <AgentList onEdit={handleEdit} key={refreshKey} />

      {open && (
        <AgentForm
          selected={selected}
          onClose={() => setOpen(false)}
          refresh={() => setRefreshKey((k) => k + 1)}
        />
      )}
    </div>
  );
}

export default AgentsPage;


