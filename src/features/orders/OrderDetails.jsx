
import { useEffect, useState } from "react";
import { fetchOrderById } from "../../api/mockOrderApi";
import { toast } from "react-toastify";

function OrderDetails({ orderId, onClose }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        const data = await fetchOrderById(orderId);
        if (data) {
          setOrder(data);
        } else {
          toast.error("Order not found");
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        {order ? (
          <div>
            <p><strong>Order Number:</strong> {order.orderNumber}</p>
            <p><strong>Client:</strong> {order.clientName}</p>
            <p><strong>Mobile:</strong> {order.mobileNumber}</p>
            <p><strong>Product:</strong> {order.product}</p>
            <p><strong>Amount Paid:</strong> ₹{order.amountPaid}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Geo-Location:</strong> Lat {order.geoCoordinates.lat}, Lng {order.geoCoordinates.lng}</p>
          </div>
        ) : (
          <p>Order not found</p>
        )}
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full">Close</button>
      </div>
    </div>
  );
}

export default OrderDetails;
