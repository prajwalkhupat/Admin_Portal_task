const orders = [
  {
    id: "order_001",
    orderNumber: "ORD12345",
    clientName: "Rahul Sharma",
    mobileNumber: "+919800112233",
    product: "Smartphone X",
    amountPaid: 15000,
    paymentStatus: "Paid",
    timestamp: "2025-04-25T10:30:00Z",
    geoCoordinates: { lat: 17.385044, lng: 78.486671 },
  },
  {
    id: "order_002",
    orderNumber: "ORD12346",
    clientName: "Anjali Verma",
    mobileNumber: "+919855556677",
    product: "Laptop Y",
    amountPaid: 55000,
    paymentStatus: "Pending",
    timestamp: "2025-04-24T15:20:00Z",
    geoCoordinates: { lat: 28.613939, lng: 77.209021 },
  },
  {
    id: "order_003",
    orderNumber: "ORD12347",
    clientName: "Vikram Singh",
    mobileNumber: "+919812345678",
    product: "Tablet Z",
    amountPaid: 22000,
    paymentStatus: "Paid",
    timestamp: "2025-04-23T12:45:00Z",
    geoCoordinates: { lat: 19.076090, lng: 72.877426 },
  },
  {
    id: "order_004",
    orderNumber: "ORD12348",
    clientName: "Neha Joshi",
    mobileNumber: "+919834567890",
    product: "Smartwatch A",
    amountPaid: 8000,
    paymentStatus: "Failed",
    timestamp: "2025-04-22T09:00:00Z",
    geoCoordinates: { lat: 13.082680, lng: 80.270718 },
  },
  {
    id: "order_005",
    orderNumber: "ORD12349",
    clientName: "Arjun Desai",
    mobileNumber: "+919876543210",
    product: "Camera B",
    amountPaid: 30000,
    paymentStatus: "Paid",
    timestamp: "2025-04-21T18:10:00Z",
    geoCoordinates: { lat: 22.572645, lng: 88.363892 },
  },
  {
    id: "order_006",
    orderNumber: "ORD12350",
    clientName: "Kavya Nair",
    mobileNumber: "+919822334455",
    product: "Headphones C",
    amountPaid: 5000,
    paymentStatus: "Pending",
    timestamp: "2025-04-20T14:50:00Z",
    geoCoordinates: { lat: 12.971599, lng: 77.594566 },
  },
  {
    id: "order_007",
    orderNumber: "ORD12351",
    clientName: "Rohan Gupta",
    mobileNumber: "+919899988877",
    product: "Smartphone M",
    amountPaid: 25000,
    paymentStatus: "Paid",
    timestamp: "2025-04-19T11:20:00Z",
    geoCoordinates: { lat: 26.912434, lng: 75.787271 },
  },
  {
    id: "order_008",
    orderNumber: "ORD12352",
    clientName: "Isha Malhotra",
    mobileNumber: "+919844556677",
    product: "Gaming Console D",
    amountPaid: 40000,
    paymentStatus: "Paid",
    timestamp: "2025-04-18T16:40:00Z",
    geoCoordinates: { lat: 23.022505, lng: 72.571362 },
  },
  {
    id: "order_009",
    orderNumber: "ORD12353",
    clientName: "Amit Verma",
    mobileNumber: "+919877665544",
    product: "Drone E",
    amountPaid: 60000,
    paymentStatus: "Pending",
    timestamp: "2025-04-17T13:35:00Z",
    geoCoordinates: { lat: 21.170240, lng: 72.831061 },
  },
  {
    id: "order_010",
    orderNumber: "ORD12354",
    clientName: "Sneha Kapoor",
    mobileNumber: "+919833221144",
    product: "Fitness Band F",
    amountPaid: 3500,
    paymentStatus: "Paid",
    timestamp: "2025-04-16T08:25:00Z",
    geoCoordinates: { lat: 18.520430, lng: 73.856744 },
  }
];



function simulateDelay() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 2500 + 200));
}

export async function fetchOrders(search = "") {
  await simulateDelay();
  return orders.filter(
    (o) =>
      o.orderNumber.includes(search) ||
      o.mobileNumber.includes(search) ||
      o.clientName.toLowerCase().includes(search.toLowerCase())
  );
}

export async function fetchOrderById(id) {
  await simulateDelay();
  return orders.find((o) => o.id === id);
}