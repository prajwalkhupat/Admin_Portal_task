
import { useState } from "react";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";

function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <OrderList onView={setSelectedOrderId} />
      {selectedOrderId && <OrderDetails orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />}
    </div>
  );
}

export default OrdersPage;
