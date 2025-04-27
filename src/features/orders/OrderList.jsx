
import { useEffect, useState } from "react";
import { fetchOrders } from "../../api/mockOrderApi";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

function OrderList({ onView }) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const ordersPerPage = 5;

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await fetchOrders(search);
      if (data && data.length > 0) {
        setOrders(data);
      } else {
        toast.info("No orders found");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, [search, page]);

  const filteredOrders = orders.slice((page - 1) * ordersPerPage, page * ordersPerPage);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CSVLink
          data={orders}
          filename={"orders.csv"}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          Export CSV
        </CSVLink>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          onClick={loadOrders}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Order Number</th>
                <th className="p-2 border">Client Name</th>
                <th className="p-2 border">Mobile</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id}>
                  <td className="p-2 border">{o.orderNumber}</td>
                  <td className="p-2 border">{o.clientName}</td>
                  <td className="p-2 border">{o.mobileNumber}</td>
                  <td className="p-2 border">{o.product}</td>
                  <td className="p-2 border">₹{o.amountPaid}</td>
                  <td className="p-2 border">{o.paymentStatus}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => onView(o.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Prev
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={filteredOrders.length < ordersPerPage}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderList;

