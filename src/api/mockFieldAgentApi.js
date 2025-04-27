const agents = [
  {
    id: "agent_001",
    name: "Rahul Sharma",
    mobile: "9876543210",
    isActive: true,
  },
  {
    id: "agent_002",
    name: "Priya Mehta",
    mobile: "8765432109",
    isActive: true,
  },
  {
    id: "agent_003",
    name: "Amit Verma",
    mobile: "7654321098",
    isActive: false,
  },
  {
    id: "agent_004",
    name: "Sneha Kapoor",
    mobile: "6543210987",
    isActive: true,
  },
  {
    id: "agent_005",
    name: "Vikram Singh",
    mobile: "9123456780",
    isActive: true,
  },
  {
    id: "agent_006",
    name: "Neha Joshi",
    mobile: "8234567890",
    isActive: false,
  },
  {
    id: "agent_007",
    name: "Arjun Desai",
    mobile: "7345678901",
    isActive: true,
  },
  {
    id: "agent_008",
    name: "Kavya Nair",
    mobile: "8456789012",
    isActive: true,
  },
  {
    id: "agent_009",
    name: "Rohan Gupta",
    mobile: "9567890123",
    isActive: false,
  },
  {
    id: "agent_010",
    name: "Isha Malhotra",
    mobile: "9678901234",
    isActive: true,
  }
];
  

  function simulateDelay() {
    const delay = Math.random() * (2500 - 200) + 200;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
  
  function simulateError() {
    const random = Math.random();
    if (random < 0.1) {
      throw new Error("500 Server Error");
    }
  }
  
  export async function fetchAgents(search = "") {
    await simulateDelay();
    simulateError();
    if (search) {
      return agents.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.mobile.includes(search)
      );
    }
    return agents;
  }
  
  export async function addAgent(newAgent) {
    await simulateDelay();
    simulateError();
    const id = "agent_" + (agents.length + 1).toString().padStart(3, "0");
    agents.push({ ...newAgent, id, isActive: true });
  }
  
  export async function updateAgent(id, updates) {
    await simulateDelay();
    simulateError();
    const index = agents.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Agent not found");
    agents[index] = { ...agents[index], ...updates };
  }
  
  export async function deleteAgent(id) {
    await simulateDelay();
    simulateError();
    const index = agents.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Agent already deleted");
    agents.splice(index, 1);
  }